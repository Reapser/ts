

/* ========== БАЗОВІ TYPE ALIASES ========== */

export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";


export type TimeSlot =
  | "8:30-10:00"
  | "10:15-11:45"
  | "12:15-13:45"
  | "14:00-15:30"
  | "15:45-17:15";

export type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

/* ========== основні структури ========== */
export type Professor = {
  id: number;
  name: string;
  department: string;
};

export type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

export type Course = {
  id: number;
  name: string;
  type: CourseType;
};

export type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

/* ========== Доп TYPE-И для зберігання ========== */
type StoredLesson = Lesson & { id: number };

/* ========== TYPE для конф ========== */
export type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};

/* ========== поч дан. ========== */
export const ALL_DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const ALL_SLOTS: TimeSlot[] = [
  "8:30-10:00",
  "10:15-11:45",
  "12:15-13:45",
  "14:00-15:30",
  "15:45-17:15",
];

// Масиви даних
export const professors: Professor[] = [];
export const classrooms: Classroom[] = [];
export const courses: Course[] = [];

// schedule зберігає StoredLesson (має id)
export const schedule: StoredLesson[] = [];

/* ========== утил ========== */

// Генератор унікальних id для lesson'ів (простий інкремент)
let nextLessonId = 1;
const generateLessonId = (): number => nextLessonId++;

/* ========== Дод / Вид ========== */

export function addProfessor(professor: Professor): void {
  const exists = professors.some((p) => p.id === professor.id);
  if (exists) {
    throw new Error(`Professor with id=${professor.id} already exists.`);
  }
  professors.push(professor);
}

export function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  if (conflict) {
    // Не додаємо заняття, якщо знайдено конфлікт
    return false;
  }
  const id = generateLessonId();
  const stored: StoredLesson = { ...lesson, id };
  schedule.push(stored);
  return true;
}

/* ========== Валід ТА Конф ========== */

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
  // Перевірка на існування професора, курсу, аудиторії (базова валідація)
  const profExists = professors.some((p) => p.id === lesson.professorId);
  if (!profExists) {
    // Вважаємо що відсутність професора — це "неможливо додати", але не повертаємо ScheduleConflict
    throw new Error(`Professor with id=${lesson.professorId} does not exist.`);
  }
  const courseExists = courses.some((c) => c.id === lesson.courseId);
  if (!courseExists) {
    throw new Error(`Course with id=${lesson.courseId} does not exist.`);
  }
  const classroomExists = classrooms.some(
    (r) => r.number === lesson.classroomNumber
  );
  if (!classroomExists) {
    throw new Error(
      `Classroom with number='${lesson.classroomNumber}' does not exist.`
    );
  }

  for (const s of schedule) {
    if (
      s.dayOfWeek === lesson.dayOfWeek &&
      s.timeSlot === lesson.timeSlot
    ) {
      if (s.professorId === lesson.professorId) {
        return { type: "ProfessorConflict", lessonDetails: lesson };
      }
      if (s.classroomNumber === lesson.classroomNumber) {
        return { type: "ClassroomConflict", lessonDetails: lesson };
      }
    }
  }
  return null;
}

/* ========== ПОШУК / ФІЛЬТРАЦІЯ ========== */

export function findAvailableClassrooms(
  timeSlot: TimeSlot,
  dayOfWeek: DayOfWeek
): string[] {
  // всі аудиторії, які зайняті в цей timeSlot+day
  const occupied = new Set(
    schedule
      .filter((s) => s.dayOfWeek === dayOfWeek && s.timeSlot === timeSlot)
      .map((s) => s.classroomNumber)
  );

  // повертаємо ті, яких немає в occupied
  return classrooms
    .map((r) => r.number)
    .filter((num) => !occupied.has(num));
}

//Повертає розклад конкретного професора (масив Lesson)
export function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule
    .filter((s) => s.professorId === professorId)
    .map((s) => {
      // віддаємо Lesson (без id)
      const { id: _id, ...lesson } = s;
      return lesson as Lesson;
    });
}

/* ========== АНАЛІЗ / ЗВІТИ ========== */


export function getClassroomUtilization(classroomNumber: string): number {
  const totalPossible = ALL_DAYS.length * ALL_SLOTS.length; // 5*5 = 25
  if (totalPossible === 0) return 0;
  const occupied = schedule.filter(
    (s) => s.classroomNumber === classroomNumber
  ).length;
  const percent = (occupied / totalPossible) * 100;
  // округлюємо до 2 знаків
  return Math.round(percent * 100) / 100;
}


export function getMostPopularCourseType(): CourseType | null {
  if (schedule.length === 0) return null;

  // Порахуємо по courseId, знайдемо тип для кожного courseId, сумуємо
  const counts: Record<CourseType, number> = {
    Lecture: 0,
    Seminar: 0,
    Lab: 0,
    Practice: 0,
  };

  for (const s of schedule) {
    const course = courses.find((c) => c.id === s.courseId);
    if (!course) continue; // якщо курс не знайдено — ігноруємо
    counts[course.type] = (counts[course.type] || 0) + 1;
  }

  // знайдемо максимум
  let bestType: CourseType | null = null;
  let bestCount = -1;
  (Object.keys(counts) as CourseType[]).forEach((t) => {
    if (counts[t] > bestCount) {
      bestCount = counts[t];
      bestType = t;
    }
  });

  return bestType;
}

/* ========== Модиф дан ========== */


export function reassignClassroom(
  lessonId: number,
  newClassroomNumber: string
): boolean {
  const idx = schedule.findIndex((s) => s.id === lessonId);
  if (idx === -1) return false;

  // Перевіряємо, чи існує нова аудиторія
  const classroomExists = classrooms.some((r) => r.number === newClassroomNumber);
  if (!classroomExists) {
    throw new Error(`Classroom '${newClassroomNumber}' does not exist.`);
  }

  // Створимо тимчасовий lesson з новою аудиторією для валідації.
  const current = schedule[idx];
  const candidate: Lesson = {
    courseId: current.courseId,
    professorId: current.professorId,
    classroomNumber: newClassroomNumber,
    dayOfWeek: current.dayOfWeek,
    timeSlot: current.timeSlot,
  };

  
  const removed = schedule.splice(idx, 1)[0];
  try {
    const conflict = validateLesson(candidate);
    if (conflict) {
      // відновлюємо елемент і повертаємо false
      schedule.splice(idx, 0, removed);
      return false;
    }
    const updated: StoredLesson = { ...removed, classroomNumber: newClassroomNumber };
    schedule.splice(idx, 0, updated);
    return true;
  } catch (err) {
    schedule.splice(idx, 0, removed);
    throw err;
  }
}


export function cancelLesson(lessonId: number): void {
  const idx = schedule.findIndex((s) => s.id === lessonId);
  if (idx === -1) {
    return;
  }
  schedule.splice(idx, 1);
}
