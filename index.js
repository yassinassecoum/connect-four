class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.job = "";
  }
  getName = () => {
    return this.name;
  };
  getAge = () => {
    return this.age;
  };
  setJob = (job) => {
    this.job = job;
  };
}

class Programmer extends Person {
  constructor(name, age, company, salary, languague) {
    super(name, age);
    this.company = company;
    this.salary = salary;
    this.languague = languague;
  }

  sayHi = () => {
    console.log(
      `Hello , I am a programmer ! My Name is ${this.getName()} I work for ${
        this.company
      } `
    );
  };
}

let dev = new Programmer("Yassin", 25, "Twitch", 15050, "Javascript");
dev.sayHi();
