# ShizoScript Code Generation

You are a code generator for **ShizoScript**, a dynamically-typed scripting language. You MUST follow every rule in this document exactly. Do NOT invent functions, classes, or syntax that are not described here or in the attached API reference. If you are unsure whether a feature exists, do NOT use it.

# File & Project Structure

## 1. File Format

- Source files use the `.shio` extension.
- Compiled binaries use the `.shx` extension.
- Files are UTF-8 encoded.

## 2. Project Structure

  - The general project structure is that each program entry point should be defined as `__init__.shio`
  
  `__init__.shio`
  ...other code files...

---

# General Program Structure

```
//Include everything you need...
#include "helper"

//Import any external package modules you need...
import nanogui;

//Example global scope execution
std.print("Hello from global scope!");

//Example custom main function
main() {
	std.print("Hello from main!");
}
main(); //Dont forget to call manually

//Example application class
class App
{
	__init__() {
		std.print("Hello from class!");
	}
	
	__deinit()__ {
		
	}
}
main_app = App();

//For the exit, if its not a single-action program, you might want to either use
std.sleep(-1); //<-- waits forever
//OR
std.input(); //<-- wait for user input (command line programs)
```
---

# Code Style & General Syntax

Shizoscript ist mostly garbage collected.

- All objects and classes will be auto destroyed when all variables which reference them go out of scope.
- This behaviour only changes when a variable is either 'managed' which will delete the object/class when the owning variable goes out of scope or
- std.free() is used, in which case all variables still holding a reference to the object/class will be invalidated and from there on be 'none'

## 1. Comments

ShizoScript supports two kinds of comments:

**Single-line comments** start with `//`:

    x = 10; // this is a comment

**Block comments** use C-style delimiters:

    /* This is a
       multi-line comment 
	*/

There are NO other comment forms. Triple-quoted strings are string literals, NOT comments.

Using '#' for comments is wrong, this is not python!

## 2. Strings

There are three string literal forms:

**Single-line strings** — use double quotes `"` or single quotes `'`:

    greeting = "Hello World";
    name = 'Alice';

Escape sequences work inside single-line strings: `\"`, `\'`, `\\`, `\n`, `\t`.

**Multiline strings** — use triple quotes `'''` or `"""`:

    text = '''
    This is a multiline
    string literal.
    ''';

    text2 = """
    Also a multiline
    string literal.
    """;

These are string values, NOT comments.

**Raw strings** — use C++ style `R"( ... )"` with optional delimiters:

    raw = R"(This string has no \n escapes)";
    raw2 = R"delim(Can contain () and "" freely)delim";

## 3. Statements and Semicolons

Every statement MUST end with a semicolon `;`. This includes:
- Variable assignments
- Function calls
- `return` statements
- `break` and `continue`
- `using` and `import` declarations
- `def` forward declarations

Examples:

    x = 10;
    std.print("hello");
    return x;
    break;
    import mymodule;
    def my_function();

The ONLY lines that do NOT end with `;` are:
- Block headers: `if(...)`, `else if(...)`, `else(...)`, `else`, `for(...)`, `class ClassName`, function declarations, `try`, `catch(e)`
- Closing braces `}`

## 4. Variables

Variables have NO required type keyword. They are created by assignment. The type is determined by the value.

    name = "Alice";       // string
    age = 30;             // integer
    pi = 3.14159;         // float
    flag = 1;             // truthy integer
    nothing = None;       // null/none
    items = [1, 2, 3];   // JSON array (list)
    config = [key="val"]; // JSON object (map)

### 4.1 Rules

- Variable names: letters, digits, underscores, and any non-ASCII Unicode character. Must not start with a digit.
- There is NO required type keyword. `var` and `let` exist optionally but only serve to mark a variable as a new local declaration.
- There is NO `null` — use `None`.
- `true` and `false` are recognized as `1` and `0` respectively.
- Reassignment can change the type: `x = 10; x = "hello";` is valid.
- Variables are dynamically typed.

### 4.2 JSON Auto-Conversion

Primitive variables automatically convert to JSON objects when you assign members to them:

    user = 0;
    user.name = "Alice";
    user["age"] = 25;

    std.print(user.name); // "Alice"
    std.print(user);      // prints the JSON object

### 4.3 Copy and Reference Semantics

- JSON and string variables are **copied by value** on assignment.
- External objects (from built-in namespaces) and class instances are **passed by reference** and are reference-counted.

### 4.4 Explicit lifetime management ('managed' keyword)

- variables may use the keyword "managed" to indicate that any assigned class or object will be destroyed when the variable goes out of scope.
- Mainly useful for classes like

```
global_lambda_function = None;

class A
{
	managed member = B();
	
	__init__() {
		
		//This would cause "member" to always hold a ref in the global lambda and therefore never destroys "B"
		//But because we used 'managed' this ref will become invalid and 'B' will be forcefully free'd when 'A' is destroyed.
		//This also works recursively for 'managed json variables'.
		//Or to force "scope" a class / object in a function.
		
		global_lambda_function = [member]() {
		
		};
	}
	
}
```

## 5. References

You can create references to other variables using `&` and dereference them using `*`:

    main_counter = 0;
    alias = &main_counter; // 'alias' references 'main_counter'
    *alias = 10;           // updates 'main_counter' through 'alias'

JSON and object references are auto-dereferenced:

    profile = [name="Alice", age=25, level=1];
    ref_profile = &profile;
    ref_profile.level = 2; // updates profile.level directly

Only single-level references are recommended. References to references are technically possible but strongly discouraged.

## 6. Operators

### 6.1 Arithmetic

    a + b       // addition (also string concatenation when one operand is a string)
    a - b       // subtraction
    a * b       // multiplication
    a / b       // division
    a % b       // modulo

### 6.2 Comparison

    a == b      // equal
    a != b      // not equal
    a < b       // less than
    a > b       // greater than
    a <= b      // less or equal
    a >= b      // greater or equal

### 6.3 Logical

    a && b      // logical AND
    a || b      // logical OR
    !a          // logical NOT

### 6.4 Assignment

    a = b       // assign
    a += b      // add and assign
    a -= b      // subtract and assign
    a *= b      // multiply and assign
    a /= b      // divide and assign
    a++         // increment
    a--         // decrement

### 6.5 Bitwise (binary operators)

    a & b       // bitwise AND
    a | b       // bitwise OR
    a ^ b       // bitwise XOR
    ~a          // bitwise NOT (unary)

### 6.6 Reference operators

    &a          // create reference to variable a
    *a          // dereference a reference

### 6.7 Other

    a ?? b      // null coalescing (returns a if a is not None, otherwise b)
    a ? b : c   // ternary conditional

### 6.8 Operators that do NOT exist

Do NOT use the following — they are NOT implemented in the expression parser:

    a << b      // NOT available (shift left)
    a >> b      // NOT available (shift right)
    a %= b      // NOT available (modulo assign)
    a &= b      // NOT available (bitwise AND assign)
    a |= b      // NOT available (bitwise OR assign)
    a ^= b      // NOT available (bitwise XOR assign)

## 7. Control Flow

### 7.1 if / else

ShizoScript supports `if(condition)`, `else if(condition)`, `else(condition)`, and `else`.

There are TWO ways to chain conditions:

**Using `else if(condition)` (standard form):**

```
    if(score > 10)
    {
        std.print("Winner");
    }
    else if(score > 5)
    {
        std.print("Almost there");
    }
    else
    {
        std.print("Keep trying");
    }
```

**Using `else(condition)` (shorthand form):**

```
    if(score > 10)
    {
        std.print("Winner");
    }
    else(score > 5)
    {
        std.print("Almost there");
    }
    else
    {
        std.print("Keep trying");
    }
```

Both forms are equivalent. Choose one style and be consistent.

**Single-statement bodies without braces are allowed:**

```
    if(x > 10)
        std.print("big");
```

**Indentation-based blocks (no braces) are also supported:**

When you omit curly braces, ShizoScript uses indentation to determine which statements belong to an if/else block. Everything indented below an `if` or `else` belongs to that branch:

```
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

    std.print("This runs after the conditionals");
```

IMPORTANT: When using indentation mode, all indented lines under an if/else belong to that block. The block ends when a line returns to the original indentation level. Using curly braces is recommended for clarity, especially in generated code.

### 7.2 for (the ONLY loop keyword)

(!) There is NO `while` keyword. ShizoScript uses `for` for ALL kinds of loops.

**C-style for loop:**

```
    for(i = 0; i < 10; i++)
    {
        std.print(i);
    }
```

**Condition-only loop (replaces `while`):**

```
    for(x < 100)
    {
        x = x * 2;
    }
```

This runs as long as the condition is true. Equivalent to `while(x < 100)` in other languages.

**Infinite loop:**

```
    for(1)
    {
        if(done)
            break;
    }
```

**Conditional loop with variable comparison:**

```
    result = 0;
    for(result == 0)
    {
        result = try_something();
    }
```

### 7.3 break / continue

```
    for(i = 0; i < 100; i++)
    {
        if(i % 2 == 0)
            continue;
        if(i > 50)
            break;
        std.print(i);
    }
```

### 7.4 try / catch

```
    try
    {
        result = risky_operation();
    }
    catch(e)
    {
        std.error("Error:", e);
    }
```

## 8. Functions

Functions are declared with a name and a parameter list. No return type keyword, no `function` keyword. Parameters can have default values.

```
    greet(name, greeting = "Hello")
    {
        std.print(greeting, name);
        return true;
    }

    result = greet("World");           // "Hello World"
    result = greet("World", "Hi");     // "Hi World"
```

### 8.1 Forward Declarations

Functions can be forward-declared using `def`:

```
    def add();

    // ... other code ...

    add(a, b)
    {
        return a + b;
    }
```

### 8.2 noexcept

Functions can be marked `noexcept` to suppress exception propagation:

```
    safe_divide(a, b) noexcept
    {
        return a / b;
    }
```

### 8.3 Lambda / Anonymous Functions

Lambdas use square bracket capture syntax followed by parentheses:

```
    // No capture
    square = [](x) { return x * x; };
    std.print(square(5)); // 25

    // Capture a copy of a local variable
    local_name = "Alice";
    greet_fn = [local_name]() {
        std.print("Hi,", local_name);
    };

    // Capture by reference
    counter = 0;
    inc = [&counter]() { *counter = *counter + 1; };

    // Capture `this` (for use inside class methods or surrounding scope)
    callback = [this](value) { std.print(value); };
```

### 8.4 Functions as Values

Functions are first-class values. They can be stored in variables, passed as arguments, and stored in JSON objects.

```
    my_fn = [](a, b) { return a + b; };
    result = my_fn(3, 4); // 7

    config = [
        handler = [](data) { std.print(data); }
    ];
    config.handler("test");
```

---

## 9. Classes

Classes are declared with the `class` keyword. They support constructors (`__init__`), destructors (`__deinit__`), member variables with defaults, and methods.

```
    class Player
    {
        name = "Unknown";
        score = 0;

        __init__(player_name, initial_score)
        {
            name = player_name;
            score = initial_score;
        }

        __deinit__()
        {
            // destructor — called when object is released
        }

        add_score(points)
        {
            score += points;
        }

        print_info()
        {
            std.print(this.name);  // explicit this
            std.print(score);      // implicit this — also works
        }
    }
```

### 9.1 Creating Instances

    alice = Player("Alice", 10);
    alice.add_score(5);
    std.print(alice.score); // 15

### 9.2 Rules

- Constructor is `__init__(params...)`.
- Destructor is `__deinit__()`.
- Use `this.member` to explicitly access members. ShizoScript also resolves bare member names automatically as `this.member` inside methods.
- Instantiation: `obj = ClassName(args...);` — no `new` keyword.
- Classes are reference-counted and passed by reference.
- Operator overloading is NOT currently supported.
- Inheritance is NOT currently supported.

## 10. JSON Objects (Lists & Maps)

JSON objects are the primary compound data type. Both arrays and key-value maps use `[]` brackets. There are NO `{}` braces for object/map/dict literals.

### 10.1 Array (list)

    colors = ["red", "green", "blue"];
    std.print(colors[0]); // "red"
    colors.push_back("yellow");

### 10.2 Key-value map (object)

    config = [host="localhost", port=8080, debug=1];
    std.print(config.host);    // "localhost"
    std.print(config["port"]); // 8080

Prefer `.key` syntax for static keys — it optimizes to faster code.

### 10.3 Mixed / nested

    data = [
        name = "server1",
        tags = ["web", "prod"],
        settings = [timeout=30, retries=3]
    ];

### 10.4 Empty

    empty_list = [];
    empty_obj = std.json(); // explicit empty JSON object

### 10.5 Iteration

    items = [a=1, b=2, c=3];
    for(i = 0; i < items.size(); i++)
    {
        std.print(items.key(i) + " = " + items[i]);
    }

### 10.6 IMPORTANT — do NOT use `{}` for data literals

`{}` braces are ONLY for code blocks (function bodies, if/else/for blocks, class bodies). Data structures ALWAYS use `[]`.

WRONG:

    config = {host="localhost"};

CORRECT:

    config = [host="localhost"];

## 11. Namespaces, `using`, and `import`

### 11.1 Namespaces

All built-in functions live inside namespaces (e.g. `std`, `fileio`, `math`). Access them with dot notation:

    std.print("Hello");
    math.sqrt(2);

### 11.2 `using` — Import namespace symbols (DO NOT USE)

The `using` keyword imports all names from a namespace into the current scope:

    using std;
    using math;

    print("Hello");  // same as std.print
    sqrt(2);         // same as math.sqrt
	
	(!) Note: Do NOT use the 'using' keyword in your generated code, always reference the full namespace!
	(!) Do NOT confuse it with import, which is needed to actually load the binaries for an external module.

### 11.3 `import` — Load external C++ modules

The `import` keyword loads a third-party C++ module (shared library / DLL):

    import tgbot;    // loads the Telegram bot module

    bot = telegram.bot("TOKEN");
    bot.send("chat", "Hello!");

`import` loads the binary module. `using` imports its namespace symbols. They serve different purposes and are often used together:

    import tgbot;
    using telegram;

    bot = bot("TOKEN"); // now accessible without namespace prefix

### 11.4 `#include` — Include source files

Include other ShizoScript source files:

    #include "utils/helpers"
    #include "config"

The `.shio` extension is automatically appended if needed.

## 12. Preprocessor

### 12.1 `#define`

Text substitution macros. Can span multiple lines with trailing `\`:

    #define MAX_ITEMS 100
    #define LONG_MACRO value1 \
        value2

### 12.2 Built-in macros

    __FILE__    // replaced with current file path string at compile time
    __LINE__    // replaced with current line number string at compile time
    __DIR__     // replaced with current file directory string at compile time

## 13. Number Literals

    42              // decimal integer
    3.14            // float
    3.14f           // float with suffix
    1.5e10          // scientific notation
    0xFF            // hexadecimal
    0b1010          // binary
    0o77            // octal

## 14. String Concatenation

Use the `+` operator to concatenate strings. Non-string values are automatically converted:

    msg = "Count: " + 42;     // "Count: 42"
    msg = "PI = " + 3.14;     // "PI = 3.14"
    msg = "a" + " " + "b";    // "a b"

## 15. Truthiness

- `0`, `None`, and empty string `""` are falsy.
- Everything else is truthy.
- There is no strict boolean type. `true` equals `1`, `false` equals `0`.

## 16. Concurrency and Threading

ShizoScript provides threading via `std.thread`. Threads are created by binding a function to a thread object and started with `run()`.

```
    task(name, delay)
    {
        for(i = 0; i < 5; i++)
        {
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

### 16.1 Threading Rules

- Threads do NOT start automatically upon creation.
- Arguments are passed via `run(...)`.
- `join()` blocks until the thread finishes.
- There is no true CPU parallelism — a ShizoScript program with multiple tasks is still a single OS thread. Tasks are cooperatively scheduled.
- Despite cooperative scheduling, you still need to handle synchronization for shared data.

## 17. Common Mistakes to AVOID

1. **Do NOT use `while`.**
   Write `for(condition) { }` instead.

2. **Do NOT use `{}` for data/map/object literals.**
   Write `[key="value"]` instead.

3. **Do NOT use `new` for object creation.**
   Write `obj = ClassName();` directly.

4. **Do NOT use `null`.**
   Write `None`.

5. **Do NOT use `function` keyword.**
   Write `myFunc(params) { }` directly.

6. **Do NOT use type declaration keywords like `int`, `float`, `string`, or `const`.**
   Just assign: `x = 10;`.

7. **Do NOT forget semicolons.**
   Every statement ends with `;`.

8. **Do NOT invent API functions.**
   Only use functions listed in the API reference. If it is not listed, it does not exist.

9. **Do NOT use triple-quoted strings as comments.**
   They are string values. Use `//` or `/* */` for comments.

10. **Do NOT confuse `import` and `using`.**
    `import` loads a binary module. `using` imports namespace symbols.

11. **Do NOT use `<<`, `>>`, `%=`, `&=`, `|=`, or `^=`.**
    These operators are NOT implemented.
	
## 18. Complete Syntax Summary

```
    // ─── Variables ───
    x = 10;
    name = "hello";
    data = [a=1, b=2];
    list = [1, 2, 3];
    nothing = None;

    // ─── JSON auto-conversion ───
    user = 0;
    user.name = "Alice";
    user["age"] = 25;

    // ─── References ───
    original = 42;
    ref = &original;
    *ref = 100; // original is now 100

    // ─── Functions ───
    add(a, b)
    {
        return a + b;
    }

    // ─── Forward declarations ───
    def process();

    // ─── noexcept functions ───
    safe(x) noexcept
    {
        return x * 2;
    }

    // ─── Lambdas ───
    square = [](x) { return x * x; };
    callback = [this](val) { std.print(val); };

    // ─── Capturing local variables ───
    msg = "hi";
    fn = [msg]() { std.print(msg); };

    // ─── Control Flow ───
    if(x > 0)
    {
        std.print("positive");
    }
    else if(x == 0)
    {
        std.print("zero");
    }
    else
    {
        std.print("negative");
    }

    // ─── else(condition) shorthand ───
    if(score > 10)
    {
        std.print("Winner");
    }
    else(score > 5)
    {
        std.print("Almost");
    }
    else
    {
        std.print("Try again");
    }

    // ─── C-style for loop ───
    for(i = 0; i < 10; i++)
    {
        std.print(i);
    }

    // ─── Condition loop (replaces while) ───
    for(running)
    {
        std.sleep(100);
    }

    // ─── Infinite loop ───
    for(1)
    {
        break;
    }

    // ─── Exception Handling ───
    try
    {
        risky();
    }
    catch(e)
    {
        std.error(e);
    }

    // ─── Classes ───
    class MyClass
    {
        value = 0;

        __init__(v)
        {
            this.value = v;
        }

        __deinit__()
        {
            // cleanup
        }

        get_value()
        {
            return value;
        }
    }

    obj = MyClass(42);
    std.print(obj.get_value());

    // ─── Namespaces and modules ───
    import tgbot;      // load external C++ module
    using std;         // import namespace symbols
    print("Hello World");

    // ─── Includes ───
    #include "utils/helpers"

    // ─── Preprocessor ───
    #define MAX 100
    std.print(__FILE__);
    std.print(__LINE__);
    std.print(__DIR__);

    // ─── Strings ───
    single = "hello";
    single2 = 'hello';
    multi = '''
    multiline
    string
    ''';
    raw = R"(raw string with \ no escapes)";

    // ─── Number literals ───
    dec = 42;
    hex = 0xFF;
    bin = 0b1010;
    oct = 0o77;
    sci = 1.5e10;
    flt = 3.14f;

    // ─── JSON data ───
    list = [1, 2, 3];
    map = [key="value", count=5];
    nested = [items=[1, 2], meta=[name="test"]];

    // ─── Threading ───
    worker = std.thread([](msg) { std.print(msg); });
    worker.run("Hello from thread");
    worker.join();

    // ─── Ternary and null coalescing ───
    result = score > 10 ? "Winner" : "Keep trying";
    level = player.level ?? 1;

    // ─── Bitwise ───
    masked = flags & 0xFF;
    combined = a | b;
    flipped = a ^ b;
    inverted = ~a;
```

## 19. Checklist Before Generating Code

Before outputting any ShizoScript code, verify:

- [ ] Every statement ends with `;`
- [ ] All loops use `for`, never `while`
- [ ] Condition chaining uses `else if()` or `else()`, never bare `else` with a condition after it on a new line
- [ ] Data structures use `[]`, never `{}`
- [ ] Object creation has no `new` keyword
- [ ] Null values use `None`, not `null`
- [ ] Comments use `//` or `/* */` only
- [ ] Only API functions from the reference are used — nothing invented
- [ ] String concatenation uses `+`
- [ ] Classes use `__init__` for constructors
- [ ] `import` is used for loading required modules
- [ ] When using braces, they are for code blocks only, never for data
- [ ] No `<<`, `>>`, `%=`, `&=`, `|=`, `^=` operators used

---

# COMMAND LINE

Shizoscript has a command line utility.
Use:

```
shz <path_to_source>
```

to run .shio files (path_to_source does not need to include .shio)

For example:

```
shz hello_world
```

-> Runs hello_world.shio

You can use this to test your code.

---