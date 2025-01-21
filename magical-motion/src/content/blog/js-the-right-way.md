---
title: "JavaScript The Right Way"
date: "2021-03-18"
author: Villager Liao
---

# [JavaScript The Right Way](https://jstherightway.org/)

## Must See

[Arindam Paul - JavaScript VM internals, EventLoop, Async and ScopeChains](https://www.youtube.com/watch?v=QyUFheng6J0)

```js
a = 1;
var b = 2;

function f(z) {
  b = 3;
  c = 4;
  var d = 5;
  e = 6;

  function g() {
    var e = 0;
    d = 2 * d;
    return d;
  }
  
  return g; // no call operator
  var e;
}

myG = f(1); // return a function "g"
myG(); // return 10;
```

Global Scope (Window)
| key | value         | gc |
| --- | ------------- | -- |
| b   | ~~2~~ 3       | o  |
| f   | -> lambda "f" | o  |
| a   | 1             | o  |
| c   | 4             | o  |
| myG | -> lambda "g" | o  |

Local scope for execution of f (`[[scope]]` copy window)
| key          | value           | gc |
| ------------ | --------------- | -- |
| z            | 1               | o  |
| this         | *               | o  |
| <- arguments | -> pseudoArr[1] | o  |
| d            | ~~5~~ 10        | o  |
| e            | 6               | o  |
| g            | -> lambda "g"   | o  |

Local scope for execution of g (`[[scope]]` copy f)
| key          | value     | gc |
| ------------ | --------- | -- |
| this         | *         | x  |
| <- arguments | pseudoArr | x  |
| e            | 0         | x  |

## GOOD PARTS

### OBJECT ORIENTED

JavaScript has strong object-oriented programming capabilities, even though some debates have taken place due to the differences in object-oriented JavaScript compared to other languages.

### ANONYMOUS FUNCTIONS

Anonymous functions are functions that are dynamically declared at runtime. They’re called anonymous functions because they aren’t given a name in the same way as normal functions.

### FUNCTIONS AS FIRST-CLASS OBJECTS

Functions in JavaScript are first class objects. This means that JavaScript functions are just a special type of object that can do all the things that regular objects can do.

### LOOSE TYPING

For many front-end developers, JavaScript was their first taste of a scripting and/or interpretive language. To these developers, the concept and implications of loosely typed variables may be second nature. However, the explosive growth in demand for modern web applications has resulted in a growing number of back-end developers that have had to dip their feet into the pool of client-side technologies. Many of these developers are coming from a background of strongly typed languages, such as C# or Java, and are unfamiliar with both the freedom and the potential pitfalls involved in working with loosely typed variables.

primitives

- number
- string
- boolean

types of objects

- function
- array
- date
- regexp

special cases

- null
- undefined

```js
7 + 7 + 7; // 21
7 + 7 + "7"; // 147
"7" + 7 + 7; // 777
```

```js
1 == true; // true
1 === true; // false

7 == "7"; // true
7 === "7"; // false
```

```js
true == !"0"; // false
true == !!"0"; // true
```

### SCOPING AND HOISTING

Scoping: In JavaScript, functions are our de facto scope delimiters for declaring vars, which means that usual blocks from loops and conditionals (such as if, for, while, switch and try) DON'T delimit scope, unlike most other languages. Therefore, those blocks will share the same scope as the function which contains them. This way, it might be dangerous to declare vars inside blocks as it would seem the var belongs to that block only.

Hoisting: On runtime, all var and function declarations are moved to the beginning of each function (its scope) - this is known as Hoisting. Having said so, it is a good practice to declare all the vars altogether on the first line, in order to avoid false expectations with a var that got declared late but happened to hold a value before - this is a common problem for programmers coming from languages with block scope.

```js
var foo = 1;
function bar() {
  if (!foo) {
    var foo = 10;
  }
  alert(foo);
}
bar(); // 10
```

```js
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
alert(a); // 1
```

```js
// create temporary scopes within a function
function foo() {
  var x = 1;
  if (x) {
    (function () {
      var x = 2;
      // some other code
    }());
  }
  // x is still 1.
}
```

Declarations, Names, and Hoisting

1. Language-defined: All scopes are, by default, given the names this and arguments.
2. Formal parameters: Functions can have named formal parameters, which are scoped to the body of that function.
3. Function declarations: These are of the form function foo() {}.
4. Variable declarations: These take the form var foo;.

```js
function foo() {
  bar();
  var x = 1;
}
// is actually interpreted like this:
function foo() {
  var x;
  bar();
  x = 1;
}
```

```js
// Notice that the assignment portion of the declarations were not hoisted. Only the name is hoisted.
function test() {
  foo(); // TypeError "foo is not a function"
  bar(); // "this will run!"
  var foo = function () { // function expression assigned to local variable 'foo'
    alert("this won't run!");
  }
  function bar() { // function declaration, given the name 'bar'
    alert("this will run!");
  }
}
test();
```

Name Resolution Order

The most important special case to keep in mind is name resolution order. Remember that there are four ways for names to enter a given scope. The order I listed them above is the order they are resolved in. In general, if a name has already been defined, it is never overridden by another property of the same name. This means that a function declaration takes priority over a variable declaration. This does not mean that an assignment to that name will not work, just that the declaration portion will be ignored. There are a few exceptions:

- The built-in name arguments behaves oddly. It seems to be declared following the formal parameters, but before function declarations. This means that a formal parameter with the name arguments will take precedence over the built-in, even if it is undefined. This is a bad feature. Don’t use the name arguments as a formal parameter.
- Trying to use the name this as an identifier anywhere will cause a SyntaxError. This is a good feature.
- If multiple formal parameters have the same name, the one occurring latest in the list will take precedence, even if it is undefined.

```js
// Named Function Expressions
foo(); // TypeError "foo is not a function"
bar(); // valid
baz(); // TypeError "baz is not a function"
spam(); // ReferenceError "spam is not defined"

var foo = function () {}; // anonymous function expression ('foo' gets hoisted)
function bar() {}; // function declaration ('bar' and the function body get hoisted)
var baz = function spam() {}; // named function expression (only 'baz' gets hoisted)

foo(); // valid
bar(); // valid
baz(); // valid
spam(); // ReferenceError "spam is not defined"
```

What the Standard Says

_If the variable statement occurs inside a FunctionDeclaration, the variables are defined with function-local scope in that function, as described in section 10.1.3. Otherwise, they are defined with global scope (that is, they are created as members of the global object, as described in section 10.1.3) using property attributes { DontDelete }. Variables are created when the execution scope is entered. A Block does not define a new execution scope. Only Program and FunctionDeclaration produce a new scope. Variables are initialised to undefined when created. A variable with an Initialiser is assigned the value of its AssignmentExpression when the VariableStatement is executed, not when the variable is created._

## FUNCTION BINDING

Function binding is most probably the least of your concerns when beginning with JavaScript, but when you realize that you need a solution to the problem of how to keep the context of this within another function, then you might realize that what you actually need is Function.prototype.bind().

```js
var myObj = {
    specialFunction: function () {},
    anotherSpecialFunction: function () {},
    getAsyncData: function (cb) {
        cb();
    },
    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};

myObj.render();
```

```js
this.specialFunction()

Uncaught TypeError: Object [object global] has no method 'specialFunction'
```

```js
// Function.prototype.bind() might look like
Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}
```

```js
var foo = {
    x: 3
}
var bar = function(){
    console.log(this.x);
}

bar(); // undefined
var boundFunc = bar.bind(foo);
boundFunc(); // 3
```

## CLOSURE FUNCTION

Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created in. It is an important concept to understand as it can be useful during development, like emulating private methods. It can also help to learn how to avoid common mistakes, like creating closures in loops.
[MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

- Closure is an implicit, permanent link between a function and it's scope chain
- Anytime you execute a funtion, it runs with a scope chain based on where it was defined (not where it is run)
- The function's hidden `[[scope]]` refernece
  - holds the scope chain (preventing garbage collection)
  - is copied as the new scope's "outer environment reference", anytime the function is run, recreating the original chain

```js
// implicit closure
var data = "My Data!"
setTimeout(function() {
  console.log(data);
}, 3000)

// explicit closure
function makeAdder(n) {
  var inc = n;
  var sum = 0;
  return function add() {
    sum = sum + inc;
    return sum;
  };
}

var adder3 = makeAdder(3)
```

## STRICT MODE

ECMAScript 5's strict mode is a way to opt in to a restricted variant of JavaScript. Strict mode isn't just a subset: it intentionally has different semantics from normal code. Browsers not supporting strict mode will run strict mode code with different behavior from browsers that do, so don't rely on strict mode without feature-testing for support for the relevant aspects of strict mode. Strict mode code and non-strict mode code can coexist, so scripts can opt into strict mode incrementally.
[MDN - Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

## IMMEDIATELY-INVOKED FUNCTION EXPRESSION (IIFE)

An immediately-invoked function expression is a pattern which produces a lexical scope using JavaScript's function scoping. Immediately-invoked function expressions can be used to avoid variable hoisting from within blocks, protect against polluting the global environment and simultaneously allow public access to methods while retaining privacy for variables defined within the function.

_This pattern has been referred to as a self-executing anonymous function, but @cowboy ([Ben Alman](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)) introduced the term IIFE as a more semantically accurate term for the pattern._

```js
// Either of the following two patterns can be used to immediately invoke
// a function expression, utilizing the function's execution context to
// create "privacy."
(function(){ /* code */ }()); // Crockford recommends this one
(function(){ /* code */ })(); // But this one works just as well

// Because the point of the parens or coercing operators is to disambiguate
// between function expressions and function declarations, they can be
// omitted when the parser already expects an expression
var i = function(){ return 10; }();
true && function(){ /* code */ }();
0, function(){ /* code */ }();

// If you don't care about the return value, or the possibility of making
// your code slightly harder to read, you can save a byte by just prefixing
// the function with a unary operator.
!function(){ /* code */ }();
~function(){ /* code */ }();
-function(){ /* code */ }();
+function(){ /* code */ }();

// Here's another variation, from @kuvos - I'm not sure of the performance
// implications, if any, of using the `new` keyword, but it works.
// http://twitter.com/kuvos/status/18209252090847232
new function(){ /* code */ }
new function(){ /* code */ }() // Only need parens if passing arguments
```

```js
// This doesn't work like you might think, because the value of `i` never
// gets locked in. Instead, every link, when clicked (well after the loop
// has finished executing), alerts the total number of elements, because
// that's what the value of `i` actually is at that point.
var elems = document.getElementsByTagName( 'a' );
for ( var i = 0; i < elems.length; i++ ) {
  elems[ i ].addEventListener( 'click', function(e){
    e.preventDefault();
    alert( 'I am link #' + i );
  }, 'false' );
}

// This works, because inside the IIFE, the value of `i` is locked in as
// `lockedInIndex`. After the loop has finished executing, even though the
// value of `i` is the total number of elements, inside the IIFE the value
// of `lockedInIndex` is whatever the value passed into it (`i`) was when
// the function expression was invoked, so when a link is clicked, the
// correct value is alerted.
var elems = document.getElementsByTagName( 'a' );
for ( var i = 0; i < elems.length; i++ ) {
  (function( lockedInIndex ){
    elems[ i ].addEventListener( 'click', function(e){
      e.preventDefault();
      alert( 'I am link #' + lockedInIndex );
    }, 'false' );
  })( i );
}

// You could also use an IIFE like this, encompassing (and returning) only
// the click handler function, and not the entire `addEventListener`
// assignment. Either way, while both examples lock in the value using an
// IIFE, I find the previous example to be more readable.
var elems = document.getElementsByTagName( 'a' );
for ( var i = 0; i < elems.length; i++ ) {
  elems[ i ].addEventListener( 'click', (function( lockedInIndex ){
    return function(e){
      e.preventDefault();
      alert( 'I am link #' + lockedInIndex );
    };
  })( i ), 'false' );
}
```

```js
// This is a self-executing function. It's a function that executes (or
// invokes) itself, recursively:
function foo() { foo(); }

// This is a self-executing anonymous function. Because it has no
// identifier, it must use the  the `arguments.callee` property (which
// specifies the currently executing function) to execute itself.
var foo = function() { arguments.callee(); };

// This *might* be a self-executing anonymous function, but only while the
// `foo` identifier actually references it. If you were to change `foo` to
// something else, you'd have a "used-to-self-execute" anonymous function.
var foo = function() { foo(); };

// Some people call this a "self-executing anonymous function" even though
// it's not self-executing, because it doesn't invoke itself. It is
// immediately invoked, however.
(function(){ /* code */ }());

// Adding an identifier to a function expression (thus creating a named
// function expression) can be extremely helpful when debugging. Once named,
// however, the function is no longer anonymous.
(function foo(){ /* code */ }());

// IIFEs can also be self-executing, although this is, perhaps, not the most
// useful pattern.
(function(){ arguments.callee(); }());
(function foo(){ foo(); }());

// One last thing to note: this will cause an error in BlackBerry 5, because
// inside a named function expression, that name is undefined. Awesome, huh?
(function foo(){ foo(); }());
```

The Module Pattern

```js
// Create an anonymous function expression that gets invoked immediately,
// and assign its *return value* to a variable. This approach "cuts out the
// middleman" of the named `makeWhatever` function reference.
var counter = (function(){
  var i = 0;

  return {
    get: function(){
      return i;
    },
    set: function( val ){
      i = val;
    },
    increment: function() {
      return ++i;
    }
  };
}());

// `counter` is an object with properties, which in this case happen to be
// methods.
counter.get(); // 0
counter.set( 3 );
counter.increment(); // 4
counter.increment(); // 5

counter.i; // undefined (`i` is not a property of the returned object)
i; // ReferenceError: i is not defined (it only exists inside the closure)
```

## PATTERNS

While JavaScript contains design patterns that are exclusive to the language, many classical design patterns can also be implemented.

A good way to learn about these is Addy Osmani’s open source book [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/), and the links below are (in the majority) based on it.

### What is a Pattern?

1. Patterns are proven solutions
2. Patterns can be easily reused
3. Patterns can be expressive

- Reusing patterns assists in preventing minor issues that can cause major problems in the application development process.
- Patterns can provide generalized solutions which are documented in a fashion that doesn't require them to be tied to a specific problem.
- Certain patterns can actually decrease the overall file-size footprint of our code by avoiding repetition.
- Patterns add to a developer's vocabulary, which makes communication faster.
- Patterns that are frequently used can be improved over time by harnessing the collective experiences other developers using those patterns contribute back to the design pattern community.

### The Structure Of A Design Pattern

- A **context**
- A system of **forces** that arises in that context and
- A **configuration** that allows these forces to resolve themselves in context

With this in mind, let’s now take a look at a summary of the component elements for a design pattern. A design pattern should have a:

- **Pattern name** and a **description**
- **Context outline** – the contexts in which the pattern is effective in responding to the users needs.
- **Problem statement** – a statement of the problem being addressed so we can understand the intent of the pattern.
- **Solution** – a description of how the user’s problem is being solved in an understandable list of steps and perceptions.
- **Design** – a description of the pattern’s design and in particular, the user’s behavior in interacting with it
- **Implementation** – a guide to how the pattern would be implemented
Illustrations – a visual representation of classes in the pattern (e.g. a diagram)
- **Examples** – an implementation of the pattern in a minimal form
- **Co-requisites** – what other patterns may be needed to support use of the pattern being described?
- **Relations** – what patterns does this pattern resemble? does it closely mimic any others?
- **Known usage** – is the pattern being used in the wild? If so, where and how?
- **Discussions** – the team or author’s thoughts on the exciting benefits of the pattern

### Creational Design Patterns

Creational design patterns focus on handling object creation mechanisms where objects are created in a manner suitable for the situation we're working in. The basic approach to object creation might otherwise lead to added complexity in a project whilst these patterns aim to solve this problem by controlling the creation process.

- [Factory](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript): This makes an instance of several derived classes based on interfaced data or events.

```js
// Types.js - Constructors used behind the scenes
// A constructor for defining new cars
function Car( options ) {
  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}
 
// A constructor for defining new trucks
function Truck( options){
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}


// FactoryExample.js
// Define a skeleton vehicle factory
function VehicleFactory() {}
 
// Define the prototypes and utilities for this factory
 
// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;
 
// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function ( options ) {
  switch(options.vehicleType){
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
    //defaults to VehicleFactory.prototype.vehicleClass (Car)
  }
 
  return new this.vehicleClass( options );
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle( {
            vehicleType: "car",
            color: "yellow",
            doors: 6 } );

// Test to confirm our car was created using the vehicleClass/prototype Car
// Outputs: true
console.log( car instanceof Car );
// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log( car );
```

- Abstract Factories

```js
var abstractVehicleFactory = (function () {
  // Storage for our vehicle types
  var types = {};
 
  return {
      getVehicle: function ( type, customizations ) {
          var Vehicle = types[type];
 
          return (Vehicle ? new Vehicle(customizations) : null);
      },
      registerVehicle: function ( type, Vehicle ) {
          var proto = Vehicle.prototype;
 
          // only register classes that fulfill the vehicle contract
          if ( proto.drive && proto.breakDown ) {
              types[type] = Vehicle;
          }
 
          return abstractVehicleFactory;
      }
  };
})();

// Usage:
abstractVehicleFactory.registerVehicle( "car", Car );
abstractVehicleFactory.registerVehicle( "truck", Truck );
 
// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle( "car", {
            color: "lime green",
            state: "like new" } );
 
// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle( "truck", {
            wheelSize: "medium",
            color: "neon yellow" } );
```

- [Prototype](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#prototypepatternjavascript): A fully initialized instance used for copying or cloning.

```js
var vehicle = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};

var car = Object.create(vehicle, {
  "id": {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },
  "model": {
    value: "Ford",
    enumerable: true
  }
});
```

- [Mixin](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript)

```js
// Define a simple Car constructor
var Car = function ( settings ) {
    this.model = settings.model || "no model provided";
    this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function () {};

Mixin.prototype = {
    driveForward: function () {
        console.log( "drive forward" );
    },
    driveBackward: function () {
        console.log( "drive backward" );
    },
    driveSideways: function () {
        console.log( "drive sideways" );
    }
};
 
// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in givingClass.prototype ) {
            // check to make sure the receiving class doesn't
            // have a method of the same name as the one currently
            // being processed
            if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }

            // Alternatively (check prototype chain as well):
            // if ( !receivingClass.prototype[methodName] ) {
            // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            // }
        }
    }
}

// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car({
    model: "Ford Escort",
    color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();
// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );

var mySportsCar = new Car({
    model: "Porsche",
    color: "red"
});

mySportsCar.driveSideways();
// Outputs:
// drive sideways
```

- [Singleton](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript): A class with only a single instance with global access points.

```js
var mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();

    return {
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
      publicProperty: "I am also public",
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }

      return instance;
    }
  };
})();

// Usage:
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true

// Note: as we are working with random numbers, there is a
// mathematical possibility both numbers will be the same,
// however unlikely. The above example should otherwise still
// be valid.
```

### Structural Design Patterns

Structural patterns are concerned with object composition and typically identify simple ways to realize relationships between different objects. They help ensure that when one part of a system changes, the entire structure of the system doesn't need to do the same. They also assist in recasting parts of the system which don't fit a particular purpose into those that do.

- [Adapter](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#wrapperpatternjquery): Match interfaces of different classes therefore classes can work together despite incompatible interfaces.
- [Bridge](http://www.joezimjs.com/javascript/javascript-design-patterns-bridge/): Separates an object's interface from its implementation so the two can vary independently.

```js
var RemoteControl = function(tv) {
    this.tv = tv;
    this.on = function() {
        this.tv.on();
    };
    this.off = function() {
        this.tv.off();
    };
    this.setChannel = function(ch) {
        this.tv.tuneChannel(ch);
    };
};

/* Newer, Better Remote Control */
var PowerRemote = function(tv) {
    this.tv = tv;
    this.currChannel = 0;
    this.setChannel = function(ch) {
        this.currChannel = ch;
        this.tv.tuneChannel(ch);
    };
    this.nextChannel = function() {
        this.setChannel(this.currChannel + 1);
    };
    this.prevChannel = function() {
        this.setChannel(this.currChannel - 1);
    };
};
PowerRemote.prototype = new RemoteControl();

/** TV Interface
    Since there are no Interfaces in JavaScript I am just
    going to use comments to define what the implementors
    should implement

    function on
    function off
    function tuneChannel(channel)
*/

/* Sony TV */
var SonyTV = function() {
    this.on = function() {
        console.log('Sony TV is on');
    };
    this.off = function() {
        console.log('Sony TV is off');
    };
    this.tuneChannel = function(ch) {
        console.log('Sony TV tuned to channel ' + ch);
    };
}

/* Toshiba TV */
var ToshibaTV = function() {
    this.on = function() {
        console.log('Welcome to Toshiba entertainment');
    };
    this.off = function() {
        console.log('Goodbye Toshiba user');
    };
    this.tuneChannel = function(ch) {
        console.log('Channel ' + ch + ' is set on your Toshiba television');
    };
}

/* Let's see it in action */
var sony = new SonyTV(),
    toshiba = new ToshibaTV(),
    std_remote = new RemoteControl(sony),
    pwr_remote = new PowerRemote(toshiba);

std_remote.on();            // prints "Sony TV is on"
std_remote.setChannel(55);  // prints "Sony TV tuned to channel 55"
std_remote.setChannel(20);  // prints "Sony TV tuned to channel 20"
std_remote.off();           // prints "Sony TV is off"

pwr_remote.on();            // prints "Welcome to Toshiba entertainment"
pwr_remote.setChannel(55);  // prints "Channel 55 is set on your Toshiba television"
pwr_remote.nextChannel();   // prints "Channel 56 is set on your Toshiba television"
pwr_remote.prevChannel();   // prints "Channel 55 is set on your Toshiba television"
pwr_remote.off();           // prints "Goodbye Toshiba user"
```

- [Composite](http://www.joezimjs.com/javascript/javascript-design-patterns-composite/): A structure of simple and composite objects which makes the total object more than just the sum of its parts.
- [Decorator](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#decoratorpatternjavascript): Dynamically add alternate processing to objects.
- [Facade](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript): A single class that hides the complexity of an entire subsystem.

```js
// A Facade is then used to supply a much simpler API to accessing these methods
var module = (function() {
    var _private = {
        i: 5,
        get: function() {
            console.log( "current value:" + this.i);
        },
        set: function( val ) {
            this.i = val;
        },
        run: function() {
            console.log( "running" );
        },
        jump: function(){
            console.log( "jumping" );
        }
    };

    return {
        facade: function( args ) {
            _private.set(args.val);
            _private.get();
            if ( args.run ) {
                _private.run();
            }
        }
    };
}());

// Outputs: "current value: 10" and "running"
module.facade( {run: true, val: 10} );
```

- [Flyweight](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailflyweight): A fine-grained instance used for efficient sharing of information that is contained elsewhere.
- [Module](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript): In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we're able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope.

```js
var myNamespace = (function (mixin) {
  var myPrivateVar, myPrivateMethod;
  // A private counter variable
  myPrivateVar = 0;
  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      // Call mixin method
      mixin.method(foo)
      console.log( foo );
  };

  return {
    // A public variable
    myPublicVar: "foo",
    // A public function utilizing privates
    myPublicFunction: function( bar ) {
      // Increment our private counter
      myPrivateVar++;
      // Call our private method using bar
      myPrivateMethod( bar );
    }
  };
})(mixin);
```

- [Revealing Module](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript):

```js
var myRevealingModule = (function () {
  var privateCounter = 0;

  function privateFunction() {
      privateCounter++;
  }

  function publicFunction() {
      publicIncrement();
  }

  function publicIncrement() {
      privateFunction();
  }

  function publicGetCount(){
    return privateCounter;
  }

  // Reveal public pointers to
  // private functions and properties
  return {
      start: publicFunction,
      increment: publicIncrement,
      count: publicGetCount
  };
})();

myRevealingModule.start();
```

- [Proxy](http://www.joezimjs.com/javascript/javascript-design-patterns-proxy/): A place holder object representing the true object.

### Behavioral Design Patterns

Behavioral patterns focus on improving or streamlining the communication between disparate objects in a system.

- [Chain of Responsibility](http://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/): A way of passing a request between a chain of objects to find the object that can handle the request.
- [Command](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#commandpatternjavascript): Encapsulate a command request as an object to enable, logging and/or queuing of requests, and provides error-handling for unhandled requests.
- [Mediator](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript): Defines simplified communication between classes to prevent a group of classes from referring explicitly to each other.
- [Observer](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript): A way of notifying change to a number of classes to ensure consistency between the classes.

  - **Subject**: maintains a list of observers, facilitates adding or removing observers
  - **Observer**: provides an update interface for objects that need to be notified of a Subject's changes of state
  - **ConcreteSubject**: broadcasts notifications to observers on changes of state, stores the state of ConcreteObservers
  - **ConcreteObserver**: stores a reference to the ConcreteSubject, implements an update interface for the Observer to ensure state is consistent with the Subject's

### MV* PATTERNS

- [MVC Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvc)
- [MVP Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvp)
- [MVVM Pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvvm)

## BOOKS

### [JS BOOKS](https://jsbooks.revolunet.com/)

## Reference

### [MDN](https://developer.mozilla.org/en-US/docs/Web/Tutorials)

### [JavaScript Patterns](https://shichuan.github.io/javascript-patterns/)
