/*
 * ## Arrow function expressions
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
 *
 * An arrow function expression is a syntactically compact alternative to a regular function expression
 * , although without its own bindings to the this, arguments, super, or new.target keywords.
 * Arrow function expressions are ill suited as methods, and they cannot be used as constructors.
 *
 */

// Class in OO style
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
    // console.log('.. Arrow Function as non-method.. \n' + suffix + this.name);
    setTimeout(() => {
      console.log('.. Arrow Function with `this.`.. \n' + suffix + this.name);
    }, 100);
  }

}

const name = 'Bob';
this.name = 'Tony';
let person = new Person(name);
person.addSuffix('Dr. ');
person.addSuffixHistory('Dr. ');
person.addSuffixArrow('General. ');


// Function in OO style
function LivingPerson() {
  // The Person() constructor defines `this` as an instance of itself.
  const self = this;
  this.age = 0;

  const stopIndex = setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this`
    // as the global object (because it's where growUp() is executed.), 
    // which is different from the `this`
    // defined by the Person() constructor.
    self.age++;
    console.log('.. The Age of Living Person .. \n', self.age);
  }, 1000);
  return stopIndex;
}

const stopIndex = LivingPerson();


// Arrow functions & Normal function used a Methods in an Object
function asMethodsInObject(currentAge=0) {
  return {
    age: currentAge,
    nextYearArrow: () => {
      console.log('.. Arrow Function as Methods in an Object .. ',
        this.age,
        JSON.stringify(this)
      );
    },
    nextYear: function() {
      console.log('.. Normal Function as Methods in an Object .. ',
        this.age,
        JSON.stringify(this)
      );
    }
  };
}
const p2 = new asMethodsInObject();
p2.nextYearArrow();
p2.nextYear();
