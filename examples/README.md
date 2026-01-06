# ShizoScript — Quick Introduction

ShizoScript is designed to be both beginner-friendly and capable of handling production-ready, complex workflows. It combines simplicity for small scripts with advanced features like classes, objects, and namespaces for larger projects.

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

- Only single-level references are allowed; references to references are forbidden.  
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
	
	print_name() {
		std.print(this.name); 
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

### Loops

Only `for` loops exist (no `while`):

```javascript
for(i = 0; i < 10; i++) { // Loop 10 times
    std.print("Looping");
}
```

But you can use 'for' instead of 'while' directly.

```javascript
for(condition) { // Loop 10 times
    std.print("Looping");
	std.sleep(100);
}
```

## More Complex Concepts

Shizoscript can run multiple tasks concurrently.
Threading is supported via 'std.thread'

More documentation is about to be added...

---
