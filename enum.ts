//cтатус студ.
enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}
//тип курсу
enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}
//семестр
enum Semester {
    First = "First",
    Second = "Second"
}
//оцінки
enum GradeEnum {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}
//факультет
enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

// інтерфейси
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeEnum;
    date: Date;
    semester: Semester;
}


// класUniversityManagementSystem

class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];

    // Студент -> курси (реєстрація)
    private studentCourses: Map<number, number[]> = new Map();
    // Доп сервісні методи

    private generateId(list: any[]): number {
        return list.length > 0 ? list[list.length - 1].id + 1 : 1;
    }

    // основний функціонаал
 //реєстрація нов. студ.
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = {
            id: this.generateId(this.students),
            ...student
        };
        this.students.push(newStudent);
        return newStudent;
    }
//куєстрація на курс
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) throw new Error("Student not found");
        if (!course) throw new Error("Course not found");

        if (student.faculty !== course.faculty) {
            throw new Error("Student cannot register for a course from another faculty");
        }

        // перевірка на переповнення
        const registeredCount = Array.from(this.studentCourses.values())
            .filter(list => list.includes(courseId)).length;

        if (registeredCount >= course.maxStudents) {
            throw new Error("Course is full");
        }

        if (!this.studentCourses.has(studentId)) {
            this.studentCourses.set(studentId, []);
        }

        const list = this.studentCourses.get(studentId)!;

        if (list.includes(courseId)) {
            throw new Error("Student already registered for this course");
        }

        list.push(courseId);
    }
//додавання оцінки
    setGrade(studentId: number, courseId: number, grade: GradeEnum): void {
        const registered = this.studentCourses.get(studentId)?.includes(courseId);

        if (!registered) {
            throw new Error("Student is not registered for this course");
        }

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: Semester.First
        });
    }
//зміна статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Student not found");

        // Заборона: випускник не може повернутися в Active
        if (student.status === StudentStatus.Graduated && newStatus === StudentStatus.Active) {
            throw new Error("Cannot return to Active after graduation");
        }

        student.status = newStatus;
    }

    /** Повернути студентів по факультету */
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    /** Повернути всі оцінки студента */
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    /** Курси доступні для факультету та семестру */
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    /** Середня оцінка студента */
    calculateAverageGrade(studentId: number): number {
        const grades = this.getStudentGrades(studentId);
        if (grades.length === 0) return 0;

        const sum = grades.reduce((acc, g) => acc + g.grade, 0);
        return sum / grades.length;
    }

    /** Список відмінників факультету */
    getExcellentStudents(faculty: Faculty): Student[] {
        return this.getStudentsByFaculty(faculty)
            .filter(st => this.calculateAverageGrade(st.id) >= 4.5);
    }

    
    addCourse(course: Omit<Course, "id">): Course {
        const newCourse: Course = {
            id: this.generateId(this.courses),
            ...course
        };
        this.courses.push(newCourse);
        return newCourse;
    }
}




// Приклад використання (можеш видалити перед пушем)

const ums = new UniversityManagementSystem();

const st = ums.enrollStudent({
    fullName: "Іван Петренко",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS-12"
});

const course = ums.addCourse({
    name: "Алгоритми",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
});

ums.registerForCourse(st.id, course.id);
ums.setGrade(st.id, course.id, GradeEnum.Excellent);

console.log("Average:", ums.calculateAverageGrade(st.id));
