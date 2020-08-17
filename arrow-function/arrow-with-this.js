class Person {
  constructor(name) {
    this.name = name;
  }

  getNameArrow = () => {
    setTimeout(() => {
      console.log('.. Arrow Function .. ' + this.name);
    }, 100);
    return this.name;
  }

  getName = function() {
    setTimeout(function() {
      console.log('.. Normal Function .. ' + this.name);
    }, 100);
  }
}

let person = new Person('Bob');
person.getNameArrow();
person.getName();
console.log('.. Without Function .. ' + this.name);
