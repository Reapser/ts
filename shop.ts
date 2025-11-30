
// Крок 1: Типи товарів
export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

export type Electronics = BaseProduct & {
  category: "electronics";
  warranty: number; // місяці гарантії
};

export type Clothing = BaseProduct & {
  category: "clothing";
  size: string;
  material: string;
};


export type Book = BaseProduct & {
  category: "book";
  author: string;
  pages: number;
};



// Крок 2: Створення функцій для пошуку товарів
export const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  if (!Array.isArray(products)) return undefined;
  return products.find((p) => p.id === id);
};

export const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  if (!Array.isArray(products) || maxPrice < 0) return [];
  return products.filter((p) => p.price <= maxPrice);
};

// Крок 3: Кошик
export type CartItem<T> = {
  product: T;
  quantity: number;
};

export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T | undefined,
  quantity: number
): CartItem<T>[] => {
  if (!product || quantity <= 0) return cart;

  const existing = cart.find((item) => item.product.id === product.id);

  if (existing) {
    existing.quantity += quantity;
    return [...cart];
  }

  return [...cart, { product, quantity }];
};

export const calculateTotal = <T extends BaseProduct>(
  cart: CartItem<T>[]
): number => {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

// Крок 4: Тестові дані та демонстрація


const electronics: Electronics[] = [
  {
    id: 1,
    name: "Телефон",
    price: 10000,
    category: "electronics",
    warranty: 24,
    description: "Смартфон із сучасними характеристиками"
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 35000,
    category: "electronics",
    warranty: 12
  }
];

const clothes: Clothing[] = [
  {
    id: 10,
    name: "Куртка",
    price: 2500,
    category: "clothing",
    size: "L",
    material: "cotton"
  }
];

const books: Book[] = [
  {
    id: 20,
    name: "Пригоди Шерлока Холмса",
    price: 450,
    category: "book",
    author: "Артур Конан Дойл",
    pages: 350
  }
];




// Пошук товару
const phone = findProduct(electronics, 1);
console.log("Знайдений товар:", phone);

// Фільтрація
const cheapElectronics = filterByPrice(electronics, 15000);
console.log("Дешеві товари:", cheapElectronics);

// Робота з кошиком
let cart: CartItem<BaseProduct>[] = [];

cart = addToCart(cart, phone, 1);
cart = addToCart(cart, books[0], 2);

console.log("Кошик:", cart);

// Загальна сума
const total = calculateTotal(cart);
console.log("Сума:", total);
