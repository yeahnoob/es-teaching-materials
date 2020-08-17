/*
 * ## Arrow function expressions
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
 *
 * An arrow function expression is a syntactically compact alternative to a regular function expression
 * , although without its own bindings to the this, arguments, super, or new.target keywords.
 * Arrow function expressions are ill suited as methods, and they cannot be used as constructors.
 *
 */

class Person {
  constructor(name) {
    this.name = name;
  }

  // Use non-arrow functions for methods that will be called using the object.method() syntax. Those are the functions that will receive a meaningful this value from their caller.
  addSuffix(suffix) {
    setTimeout(function() {
      console.log('.. Normal Function with `this.` .. \n' + suffix + this.name);
    }, 100);
  }

  // In JS Bad history, hack `self.` for `this.` in normal funcion.
  addSuffixHistory(suffix) {
    const self = this;
    setTimeout(function() {
      console.log('.. Normal Function with hacking `self.` for `this.` .. \n' + suffix + self.name);
    }, 100);

  }

  // Use arrow functions for everything else.
  addSuffixArrow = (suffix) => {
    setTimeout(() => {
      console.log('.. Arrow Function with `this.`.. \n' + suffix + this.name);
    }, 100);
  }

}

const name = 'Bob';
let person = new Person(name);
person.addSuffix('Dr. ');
person.addSuffixHistory('Dr. ');
person.addSuffixArrow('General. ');
