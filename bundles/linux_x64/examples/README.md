# ShizoScript — Quick Introduction

ShizoScript is designed to be both beginner-friendly and capable of handling production-ready, complex workflows. It combines simplicity for small scripts with advanced features like classes, objects, and namespaces for larger projects.

**To view / edit the .shio example files, Notepad++ with C++ syntax highlighting enabled or any other code editor with C++ syntax highlighting are recommended.**

---

## Table of Contents

1. [Variables](#variables)  
2. [References](#references)  
3. [Functions](#functions)  
4. [Imports and Namespaces](#imports-and-namespaces)  
5. [Classes](#classes)  
6. [Operators and Expressions](#operators-and-expressions)  
7. [Control Flow](#control-flow)
8. [More Complex Concepts](#complex-concepts)

---

## Variables

Defining variables is straightforward:

```javascript
counter = 1; // Set 'counter' to 1
```

Variables in ShizoScript are dynamically typed and can be reassigned to any type:

```javascript
counter = 1;
counter = "one"; // Valid: 'counter' is now a string
```

### JSON-like Behavior

Primitive variables automatically convert to JSON objects if you assign members:

```javascript
user = 0;          
user.name = "Alice";     
user["age"] = 25; 

std.print(user.name); // Prints "Alice"
std.print(user);      // Prints the JSON object
```

> **Tip:** Prefer the `.name` syntax for static keys, as it optimizes to faster code.  
> Built-in functions for JSON objects are available in `std.json`.

### Objects

Variables can also hold external objects:

```javascript
test = std.test_object(); // Assuming test_object() exists
test.some_function("Hello, world!"); // Call a function of the object
```

> **Note:**  
> - JSON and string variables are copied by value.  
> - External objects are passed by reference and are reference-counted.

---

## References

You can create references to other variables:

```javascript
main_counter = 0;
alias = &main_counter; // 'alias' references 'main_counter'
*alias = 10;           // Updates 'main_counter' through 'alias'
```

- Only single-level references are allowed; references to references are not strictly forbidden, but you will have a hard time managing those and are therefore discouraged.  
- JSON and objects are auto-dereferenced:

```javascript
profile = ["name"="Alice","age"=25,"level"=1];
ref_profile = &profile;
ref_profile.level = 2; // Updates 'profile.level'
```

---

## Functions

### Named Functions

```javascript
greet(name, greeting = "Hello") {
    std.print(greeting, name);
    return true;
}
```

### Anonymous Functions (Lambdas)

```javascript
say_hello = [](name) {
    std.print("Hello,", name);
};
```

Functions can capture local variables:

```javascript
main() {
    local_name = "Alice";
    
    greet_fn = [local_name]() { // Captures a copy
        std.print("Hi,", local_name);
    };
    
    greet_fn();
}

main(); //Call main, shizoscript doesnt do that automatically
```

Forward declaration is supported:

```javascript
def add(); // Declare function first

...

add() {
    return a + b;
}
```

Calling a function:

```javascript
greet("Alice", "Welcome"); // Prints: Welcome Alice
```

---

## Imports and Namespaces

External functions are organized into **namespaces**.

Without importing:

```javascript
std.print("Hello");
```

Import all symbols from a namespace:

```javascript
using std;

print("Hello"); // Works now
```

Import third-party C++ packages:

```javascript
import tgbot; // Load dependencies

bot = telegram.bot();
bot.send_message("Hi!");
```

Or import the entire namespace:

```javascript
using telegram;

bot2 = bot();
bot2.send_message("Hi again!");
```

---

## Classes

Class definition:

```javascript
class Player {
    name = "Unknown";
    score = 0;

    __init__(player_name, initial_score) {
        name = player_name;
        score = initial_score;
    }
    
    __deinit__() {
        // Destructor
    }
	
	// Access via 'this' pointer
	// Note that by default, 
	// if you dont write 'this.member' 
	// shizoscript will append 'this' automatically internally.
	
	print() {
		std.print(this.name); 
		std.print(score); //Also works -> becomes this.score
		//std.print(this.non_exist); //This would raise a syntax compile error.
	}
	
    add_score(points) {
        score += points;
    }
}
```

Creating instances:

```javascript
alice = Player("Alice", 10);
alice.add_score(5);
std.print(alice.score); // Prints 15
```

> **Note:** Classes, like objects, are reference-counted and passed by reference.
> **Note:** Operator overloading is not yet implemented but will be soon, after that inheritance, function overrides and all object oriented goodies.

---

## Operators and Expressions

ShizoScript supports most standard C-style operators:

- Binary: `+`, `-`, `*`, `/`, `++`, `--`, `||`, `&&`  
- Unary and ternary:

```javascript
result = score > 10 ? "Winner" : "Keep trying";
level = player.level ?? 1; // If 'player.level' is undefined, defaults to 1
```

---

## Control Flow

### Conditionals

ShizoScript uses `else` instead of `else if`:

```javascript
if(score > 10) {
    std.print("Winner");
}
else(score > 5) {
    std.print("Almost there");
}
else {
    std.print("Keep trying");
}
```

If you dont like curly brackets, or find them cumbersome you can also use indentation:

```javascript
if(score > 10)
    std.print("Winner");
	std.print("With a score of:");
	std.print(score);
else(score > 5) 
    std.print("Almost there");
	if(fails < 5)
		std.print("Just a few more...");
	else
		std.print("Maybe give up?");
else
    std.print("Keep trying");

std.print("This is executed after the conditionals");
```

Everything that is indented below an "if" or "else" will belong to that statement.
In the future, this concept will be adapted to everything else that uses curly brackets.

### Loops

Only `for` loops exist (no `while`):

```javascript
for(i = 0; i < 10; i++) { // Loop 10 times
    std.print("Looping");
}
```

But you can use 'for' instead of 'while' directly.

```javascript
for(condition) { // Loop until condition becomes false
    std.print("Looping");
	std.sleep(100);
}
```

## More Complex Concepts

ShizoScript supports more advanced runtime features intended for larger or long-running applications. These features are optional and do not complicate simple scripts unless explicitly used.

### Concurrency and Threading

ShizoScript provides explicit threading via `std.thread`. Threads are created by binding a function to a thread object and started manually.

```javascript
task(name, delay) {
    for(i = 0; i < 5; i++) {
        std.print(name, i);
        std.sleep(delay);
    }
}

t1 = std.thread(task);
t2 = std.thread(task);

t1.run("Task A", 100);
t2.run("Task B", 200);

t1.join();
t2.join();
```

Key properties of the threading model:

- Threads do **not** start automatically upon creation  
- Arguments are passed to the thread function via `run(...)`  
- `join()` blocks until the thread finishes execution  
- Threads share memory; synchronization is the programmer’s responsibility.

Not so important but technical insight:

- There is no "CPU" concurrency since a shizoscript program with multiple tasks is still only a single thread, but you still have to take care of synchronization.
- Shizoscript uses "real" threading internally where it makes sense, to speed up execution, this process might temporarily stall a 'task'.


### Progressive Code Strictness (Conceptual)

One of ShizoScript’s core design goals is to allow code to evolve naturally:

- Quick, loosely written scripts for experimentation  
- Gradual refinement into stricter, production-ready code  
- Optional enforcement of typing, structure, and error handling  

While not all of these features are fully implemented yet, the language is designed to support incremental tightening of constraints rather than forcing a single programming style.

### Status

Many advanced features are still evolving. This documentation reflects both current behavior and intended direction. As ShizoScript matures, this section will expand with additional details on:

- Error handling strategies  
- Type enforcement modes  
- Tooling and code transformation support  
- C++ interoperability guarantees  

---
