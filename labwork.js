// 1. Створіть клас для автомобіля з такими властивостями, як марка, модель і рік випуску.
// Потім створіть екземпляр автомобіля та встановіть його властивості. Виконайте дане
// завдання:
// • З використанням функції конструктора
// • З використанням синтаксису класс

// З використанням функції конструктора:

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const car = new Car('Toyota', 'Camry', 2022);
console.log(car); // { make: 'Toyota', model: 'Camry', year: 2022 }

// З використанням синтаксису класс:

class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

const car = new Car('Toyota', 'Camry', 2022);
console.log(car); // { make: 'Toyota', model: 'Camry', year: 2022 }


// 2. Створіть два екземпляри даного класу користуючись методом Object.create()

// Об'єкт-прототип
const carPrototype = {
  // Властивості
  make: "",
  model: "",
  year: 0,

  // Метод для виведення інформації про автомобіль
  displayInfo() {
    console.log(`Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`);
  }
};

// Створення першого екземпляру класу
const car1 = Object.create(carPrototype);
car1.make = "Honda";
car1.model = "Civic";
car1.year = 2015;
car1.displayInfo(); // Make: Honda, Model: Civic, Year: 2015

// Створення другого екземпляру класу
const car2 = Object.create(carPrototype);
car2.make = "Toyota";
car2.model = "Corolla";
car2.year = 2020;
car2.displayInfo(); // Make: Toyota, Model: Corolla, Year: 2020


// 3. Створіть класс персона який містить поля імя, прізвище, рік народження. Створіть даний
// клас не використовуючи class синтаксис. Додайте в даний клас методи які виводитимуть
// вік та повне імя особи

function Person(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
}

Person.prototype.getFullName = function() {
  return this.firstName + " " + this.lastName;
}

Person.prototype.getAge = function() {
  const currentYear = new Date().getFullYear();
  return currentYear - this.birthYear;
}

// Ми можемо створити екземпляр класу за допомогою наступного коду:

const person = new Person("John", "Doe", 1985);

// І потім використовувати методи класу, наприклад:

console.log(person.getFullName()); // "John Doe"
console.log(person.getAge()); // 38 (залежно від поточного року)


// 4. Створіть субкласс класу персона який міститиме поле посада тп перевизначає метод
// виведення повного імені додаючи туди посаду особи

// Батьківський клас
function Person(firstName, lastName, birthYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthYear = birthYear;
}

// Методи батьківського класу
Person.prototype.getAge = function() {
  const currentYear = new Date().getFullYear();
  return currentYear - this.birthYear;
}

Person.prototype.getFullName = function() {
  return this.firstName + " " + this.lastName;
}

// Субклас
function Employee(firstName, lastName, birthYear, position) {
  Person.call(this, firstName, lastName, birthYear);
  this.position = position;
}

// Спадковість прототипу батьківського класу
Employee.prototype = Object.create(Person.prototype);

// Перевизначення методу батьківського класу
Employee.prototype.getFullName = function() {
  return this.firstName + " " + this.lastName + ", " + this.position;
}

// Створення екземпляру субкласу
const employee = new Employee("John", "Doe", 1980, "Manager");

// Виведення інформації про екземпляр субкласу
console.log(employee.getFullName()); // "John Doe, Manager"
console.log(employee.getAge()); // 42


// 5. Напишіть метод який приймає два обєкти та визначає чи вони обєкти одног класу та
// виводить в консоль фразу з іменами класів обєктів

function checkClass(obj1, obj2) {
  if (obj1.constructor === obj2.constructor) {
    console.log(`Both objects are instances of ${obj1.constructor.name}`);
  } else {
    console.log(`Objects are instances of different classes: ${obj1.constructor.name} and ${obj2.constructor.name}`);
  }
}


// 6. Створіть метод який приймає екземпляр класу Person та перетворює його у екземпляр
// ObservedPerson. Екземпляр ObservedPerson має вести себе аналогічно до класу Person та
// при виклику його методів буде виводити в консоль кількість викликів.

class ObservedPerson {
  constructor(person) {
    const handler = {
      get(target, propKey, receiver) {
        if (typeof target[propKey] === 'function') {
          return function(...args) {
            console.log(`Method ${propKey} is called`);
            return Reflect.apply(target[propKey], receiver, args);
          };
        }
        return Reflect.get(target, propKey, receiver);
      },
    };

    return new Proxy(person, handler);
  }
}

const person = new Person('John', 'Doe', 1980);
const observedPerson = new ObservedPerson(person);

observedPerson.getFullName(); // Method getFullName is called; John Doe
observedPerson.getAge(); // Method getAge is called; 43
observedPerson.setLastName('Smith'); // Method setLastName is called
observedPerson.getFullName(); // Method getFullName is called; John Smith


// 7. Створіть абстрактний клас під назвою Shape, який визначає методи для обчислення площі
// та периметра. Змусьте дочірні класи імплементувати ці методи.

function Shape() {
  throw new Error('Cannot create instance of an abstract class');
}

Shape.prototype.calculateArea = function() {
  throw new Error('Abstract method has no implementation');
};

Shape.prototype.calculatePerimeter = function() {
  throw new Error('Abstract method has no implementation');
};


// 8. Створіть масив фігур, що включає екземпляри кожного класу фігур. Перегляньте масив і
// викличте методи площі та периметра для кожної фігури.

class Shape {
  getArea() {}
  getPerimeter() {}
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  getArea() {
    return Math.PI * this.radius ** 2;
  }
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

const shapes = [
  new Rectangle(10, 5),
  new Circle(7),
  new Rectangle(6, 8),
  new Circle(3),
];

shapes.forEach((shape) => {
  console.log(`Area: ${shape.getArea()}, Perimeter: ${shape.getPerimeter()}`);
});