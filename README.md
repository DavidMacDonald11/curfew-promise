# curfew-promise
A wrapper around a sync or async function that creates a promise.
This promise will reject itself if the wrapped function took too long to resolve. 

# Installation
```bash
$ npm i curfew-promise
```

# Syntax
```javascript
const curfewPromise = require("curfew-promise");

// curfew is the time in milliseconds. 
// func is the function (sync or async) to run.
// ...args are any arguments for func
// func will run until it finishes or until curfew has elapsed.
curfewPromise(curfew, func, ...args);
```

# Example 1
```javascript
const curfewPromise = require("curfew-promise");

// This will give a curfew of 1 second to add two numbers.
// The result will (most likely) be a resolved promise with value 9.
curfewPromise(1000, (num1, num2) => {
    return num1 + num2;
}, 5, 4);
```

# Example 2
```javascript
const curfewPromise = require("curfew-promise");

// The function will recursively generate Fibonacci numbers.
// It pauses for 1 second before each number.
function fib(num1, num2, amount) {
    const next = num1 + num2;
    console.log(next);

    if(amount-- > 1)
        setTimeout(fib, 1000, num2, next, amount);
}

// This will give a curfew of 10 seconds to generate 8 Fibonacci numbers.
curfewPromise(10000, fib, 1, 1, 8);
```

# Warning Example
I found this out the hard way while trying to test this.
Since JavaScript isn't actually mutli-threaded, if you have a one line async function that is very slow, it will be treated like a synchronous function. 
This is because once the line begins, JavaScript will wait for it to end before moving on. If you'd like to know more, feel free to read my [blog post](https://theintrospectivethinker529047368.wordpress.com/2020/12/13/its-easy-to-break-promises/) about it.

```javascript
const curfewPromise = require("curfew-promise");

// This will run forever and never even create a promise
curfewPromise(0, async () => { while(true); });

// This will wait until the for loop completes before creating a promise.
curfewPromise(0, async () => {
    for(i = 0; i < 10000000; i += .01);
});
```
