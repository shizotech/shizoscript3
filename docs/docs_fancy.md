# ShizoScript Language Reference

> **Version:** 3.x  
> **File Extensions:** `.shio` (source), `.shx` (compiled binary)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Language Basics](#2-language-basics)
3. [Standard Library — `std`](#3-standard-library--std)
4. [File I/O — `fileio`](#4-file-io--fileio)
5. [Math — `math`](#5-math--math)
6. [Networking — `shizonet`](#6-networking--shizonet)
7. [HTTP Client — `curl`](#7-http-client--curl)
8. [Web Server — `webserver`](#8-web-server--webserver)
9. [Subprocess — `subprocess`](#9-subprocess--subprocess)
10. [MQTT — `mqtt`](#10-mqtt--mqtt)
11. [Telegram — `telegram`](#11-telegram--telegram)
12. [Linear Algebra — `eigen`](#12-linear-algebra--eigen)
13. [GUI — `nanogui`](#13-gui--nanogui)
14. [Archive — `zip`](#14-archive--zip)
15. [Python Integration — `python`](#15-python-integration--python)
16. [Documentation Utilities — `shzdocs`](#16-documentation-utilities--shzdocs)

---

## 1. Introduction

**ShizoScript** is a dynamically-typed, C-style scripting language designed for rapid prototyping, automation, networking, and embedded AI workflows. It compiles to a custom bytecode and runs on a lightweight virtual machine with built-in async/threading support.

### Key Features

- **Dynamically typed** — no explicit type annotations required.
- **C-style syntax** — braces `{}` for blocks, semicolons `;` to terminate statements, `//` for single-line comments.
- **First-class functions & lambdas** — functions can be stored in variables, passed as arguments, and used as closures.
- **Built-in JSON** — JSON-like objects (`[]` literal syntax) serve as the primary compound data structure (arrays, maps, and key-value stores).
- **Async & threading** — native thread and async task primitives for concurrent workloads.
- **Exception handling** — `try {} catch(e) {}` blocks for structured error recovery.
- **Rich standard library** — networking, file I/O, HTTP, MQTT, GUI, Telegram bots, Python interop, and more, available as importable modules.
- **Namespace system** — libraries are organized into namespaces. The `using` keyword imports a namespace into global scope.
- **Cross-platform** — runs on Windows, Linux, and WebAssembly (Emscripten).

---

## 2. Language Basics

### 2.1 Source Files

| Extension | Description |
|-----------|-------------|
| `.shio` | ShizoScript source file |
| `.shx` | Compiled ShizoScript binary |

Include other source files with:

```shizoscript
#include "path/to/file"
```

### 2.2 Comments

```shizoscript
// This is a single-line comment
```

### 2.3 Variables

Variables are declared by assignment. There are no type keywords — the type is inferred from the assigned value.

```shizoscript
name = "ShizoScript";       // string
count = 42;                  // integer
ratio = 3.14;                // float
flag = true;                 // boolean (truthy integer)
nothing = None;              // none/null value
data = [key="value", x=10]; // JSON object (key-value map)
items = [1, 2, 3];          // JSON array (list)
```

### 2.4 Operators

| Category | Operators |
|----------|-----------|
| Arithmetic | `+`, `-`, `*`, `/`, `%` |
| Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` |
| Logical | `&&`, `\|\|`, `!` |
| Assignment | `=`, `+=`, `-=`, `*=`, `/=` |
| String concat | `+` (when one operand is a string) |

### 2.5 Control Flow

**If / Else:**

> Note that there is no 'else if' only 'else'

```shizoscript
if(x > 10)
{
    std.print("big");
}
else(x > 5)
{
    std.print("medium");
}
else
{
    std.print("small");
}
```

**For loop (C-style):**

```shizoscript
for(i = 0; i < 10; i++)
{
    std.print(i);
}
```

**Infinite / conditional loop:**

```shizoscript
// Loop while condition is true (1 = always true = infinite loop)
for(1)
{
    // ...
    if(done)
        break;
}

// Loop while variable matches condition
for(result == 0)
{
    result = try_something();
}
```

**Break / Continue:**

```shizoscript
for(i = 0; i < 100; i++)
{
    if(i % 2 == 0)
        continue;
    if(i > 50)
        break;
    std.print(i);
}
```

> Note that there is no separate 'while' keyword in shizoscript.

### 2.6 Functions

Functions are declared with a name and parameter list. Parameters can have default values.

```shizoscript
greet(name, greeting = "Hello")
{
    return greeting + ", " + name + "!";
}

result = greet("World");           // "Hello, World!"
result = greet("World", "Hi");     // "Hi, World!"
```

**Lambda / anonymous functions:**

```shizoscript
square = [](x) { return x * x; };
std.print(square(5)); // 25

// Capture context with [this]
callback = [this](value) { std.print(value); };
```

### 2.7 Classes

Classes support constructors (`__init__`), member variables, and methods.

```shizoscript
class Vec2
{
    x = 0;
    y = 0;

    __init__(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    length()
    {
        return math.sqrt(x * x + y * y);
    }

    add(other)
    {
        return Vec2(x + other.x, y + other.y);
    }

    to_string()
    {
        return "(" + x + ", " + y + ")";
    }
}

a = Vec2(3, 4);
std.print(a.length());    // 5.0
std.print(a.to_string()); // (3, 4)
```

### 2.8 JSON Objects (Lists & Maps)

JSON objects are the primary compound data type. They can act as arrays, dictionaries, or both.

```shizoscript
// Array-style
colors = ["red", "green", "blue"];
std.print(colors[0]); // "red"
colors.push_back("yellow");

// Map-style (key-value)
config = [host="localhost", port=8080, debug=1];
std.print(config.host);    // "localhost"
std.print(config["port"]); // 8080

// Iteration
for(i = 0; i < config.size(); i++)
{
    std.print(config.key(i) + " = " + config[i]);
}
```

### 2.9 Exception Handling

```shizoscript
try
{
    result = risky_operation();
}
catch(e)
{
    std.error("Something went wrong: ", e);
}
```

### 2.10 Namespaces and `using`

All built-in and module functions live inside namespaces. Access them with dot notation, or import into global scope with `using`.

```shizoscript
// Qualified access
std.print("Hello");
math.sqrt(2);

// Import namespace into global scope
using std;
using math;

print("Hello");  // same as std.print
sqrt(2);         // same as math.sqrt
```

---

## 3. Standard Library — `std`

```shizoscript
using std;
```

### 3.1 Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `std.MB_OK` | `0` | OK button only |
| `std.MB_OKCANCEL` | `1` | OK and Cancel buttons |
| `std.MB_YESNOCANCEL` | `3` | Yes, No, and Cancel buttons |
| `std.MB_YESNO` | `4` | Yes and No buttons |
| `std.MB_RETRYCANCEL` | `5` | Retry and Cancel buttons |
| `std.MB_ICONERROR` | `16` | Error icon |
| `std.MB_ICONWARNING` | `48` | Warning icon |
| `std.MB_ICONINFORMATION` | `64` | Information icon |

### 3.2 Functions

---

#### `std.print(values...)`

Print one or more values to the console output. Multiple arguments are space-separated. Returns the combined string.

```shizoscript
std.print("Hello World");
std.print("x =", x, "y =", y);
combined = std.print("Result:", 42);
```

---

#### `std.cout(values...)`

Print directly to the terminal (stdout) without the internal logging layer. Does not append a newline.

```shizoscript
std.cout("Loading");
for(i = 0; i < 5; i++)
{
    std.cout(".");
    std.sleep(500);
}
std.cout("\n");
```

---

#### `std.error(values...)`

Print an error message to the console error stream.

```shizoscript
std.error("File not found:", filename);
```

---

#### `std.warn(values...)`

Print a warning message to the console.

```shizoscript
std.warn("Deprecated function called");
```

---

#### `std.runtime_error(values...)`

Raise a runtime error, halting execution.

```shizoscript
if(!valid)
    std.runtime_error("Invalid state encountered");
```

---

#### `std.len(value)`

Return the size/length of a list, map, string, or object container.

- **value** — Container, string, or object.

```shizoscript
items = [1, 2, 3, 4];
std.print(std.len(items)); // 4
std.print(std.len("Hello")); // 5
```

---

#### `std.count(value)`

Alias for `std.len()`.

```shizoscript
std.print(std.count([10, 20, 30])); // 3
```

---

#### `std.sleep(milliseconds)`

Suspend script execution for the given duration in milliseconds. This is async-aware and does not block other tasks.

- **milliseconds** — Duration to pause execution.

```shizoscript
std.print("Waiting...");
std.sleep(1000);
std.print("Done!");
```

---

#### `std.millis()`

Get the current time in milliseconds since epoch.

```shizoscript
start = std.millis();
do_work();
elapsed = std.millis() - start;
std.print("Took", elapsed, "ms");
```

---

#### `std.timestamp()`

Get the current date and time as a string in `DD-MM-YYYY HH:MM:SS` format.

```shizoscript
std.print("Current time:", std.timestamp());
```

---

#### `std.int(value)`

Convert a value to an integer.

- **value** — Value to convert (string, float, bool, etc.).

```shizoscript
n = std.int("42");     // 42
n = std.int(3.99);     // 3
```

---

#### `std.float(value)`

Convert a value to a floating-point number.

- **value** — Value to convert.

```shizoscript
f = std.float("3.14"); // 3.14
f = std.float(42);     // 42.0
```

---

#### `std.vtype(value)`

Get the type name of a variable or script object as a string.

- **value** — Variable to inspect.

```shizoscript
std.print(std.vtype(42));        // "int"
std.print(std.vtype("hello"));   // "string"
std.print(std.vtype([1, 2]));    // "json"
```

---

#### `std.vaddress(value)`

Get the internal memory address of a variable (useful for debugging).

- **value** — Variable to inspect.

```shizoscript
x = 42;
std.print(std.vaddress(x));
```

---

#### `std.is_function(value)`

Check if a value is a function. Returns `1` (true) or `0` (false).

- **value** — Value to check.

```shizoscript
fn = [](x) { return x; };
std.print(std.is_function(fn));  // 1
std.print(std.is_function(42));  // 0
```

---

#### `std.is_class(value, classtype?)`

Check if a value is a class instance, optionally checking for a specific class type.

- **value** — Value to check.
- **classtype** *(optional)* — Specific class type to match.

```shizoscript
obj = MyClass();
std.print(std.is_class(obj));              // 1
std.print(std.is_class(obj, "MyClass"));   // 1
```

---

#### `std.is_json(value)`

Check if a value is a JSON object.

- **value** — Value to check.

```shizoscript
data = [name="test"];
std.print(std.is_json(data));  // 1
std.print(std.is_json(42));    // 0
```

---

#### `std.is_list(value)`

Check if a value is a list (JSON array).

- **value** — Value to check.

```shizoscript
items = [1, 2, 3];
std.print(std.is_list(items)); // 1
```

---

#### `std.is_string(value)`

Check if a value is a string.

- **value** — Value to check.

```shizoscript
std.print(std.is_string("hi")); // 1
std.print(std.is_string(42));   // 0
```

---

#### `std.free(object)`

Manually release/delete an object or class instance.

```shizoscript
obj = SomeClass();
// ... use obj ...
std.free(obj);
```

---

#### `std.import(module)`

Import an external module by name or file path.

- **module** — Name or path of the module to import.

```shizoscript
std.import("my_custom_module");
```

---

#### `std.input(prompt?)`

Read a line of text from standard input, optionally displaying a prompt message.

- **prompt** *(optional)* — Message displayed before reading input.

```shizoscript
name = std.input("Enter your name: ");
std.print("Hello,", name);
```

---

#### `std.system(command, capture?, print_output?)`

Execute a shell command. Returns the exit code by default, or the captured output string if `capture` is enabled.

- **command** — Command string to pass to the system shell.
- **capture** *(optional)* — `1` to capture stdout+stderr and return as string.
- **print_output** *(optional)* — When capture is `1`, set to `1` to also print output, `0` to suppress.

```shizoscript
// Simple execution
exit_code = std.system("echo Hello");

// Capture output
output = std.system("ls -la", 1, 0);
std.print(output);
```

---

#### `std.system_path(path)`

Expand environment variables and normalize a filesystem path.

- **path** — Path string with environment variables.

```shizoscript
home = std.system_path("%USERPROFILE%/Documents");
std.print(home);
```

---

#### `std.indentation(text)`

Calculate the indentation level of a text string. Spaces count as 1 unit, tabs count as 4 units.

- **text** — Text to analyze.

```shizoscript
level = std.indentation("    hello"); // 4
level = std.indentation("\thello");   // 4
```

---

#### `std.argc()`

Return the number of command-line arguments passed to the script.

```shizoscript
std.print("Argument count:", std.argc());
```

---

#### `std.argv(index)`

Return a command-line argument by index.

- **index** — Zero-based index of the argument.

```shizoscript
for(i = 0; i < std.argc(); i++)
{
    std.print("arg[" + i + "] =", std.argv(i));
}
```

---

#### `std.wd()`

Get the current working directory path.

```shizoscript
std.print("Working dir:", std.wd());
```

---

#### `std.cd(path)`

Change the current working directory.

- **path** — New working directory path.

```shizoscript
std.cd("/home/user/project");
```

---

#### `std.os_platform()`

Get the name of the current operating system/platform.

```shizoscript
std.print("Running on:", std.os_platform()); // e.g. "Windows", "Linux"
```

---

#### `std.has_admin_privilege()`

Returns `1` if the process is running with administrator/root privileges.

```shizoscript
if(std.has_admin_privilege())
    std.print("Running as admin");
```

---

#### `std.local_executable()`

Get the path to the currently running executable.

```shizoscript
std.print("Executable:", std.local_executable());
```

---

#### `std.hideconsole()`

Detach and hide the console window (Windows only).

```shizoscript
std.hideconsole();
```

---

#### `std.messagebox(text, caption?, buttons?)`

Display a native message box (Windows).

- **text** — Message text.
- **caption** *(optional)* — Window caption.
- **buttons** *(optional)* — Button combination using `MB_*` constants.

```shizoscript
result = std.messagebox(
    "Save changes?",
    "Confirm",
    std.MB_YESNOCANCEL + std.MB_ICONWARNING
);
```

---

#### `std.web_get(url)`

Perform a simple HTTP GET request and return the response body as a string.

- **url** — HTTP or HTTPS URL.

```shizoscript
html = std.web_get("https://example.com");
std.print(html);
```

---

### 3.3 Classes

---

### `std.json`

The JSON object is the primary compound data structure in ShizoScript. It can represent arrays (lists), key-value maps, or mixed structures.

#### Constructor

```shizoscript
// Create empty JSON object
j = std.json();

// Parse from JSON string
j = std.json('{"name": "test", "value": 42}');

// Create with suppress_errors flag
j = std.json(raw_string, true);
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `json` | string *(optional)* | JSON string to parse |
| `suppress_errors` | bool *(optional)* | Suppress parsing error messages |

#### Methods

---

##### `.size()`

Returns the number of elements in the JSON array or the number of keys in a JSON object.

```shizoscript
data = [1, 2, 3];
std.print(data.size()); // 3
```

---

##### `.has(key)`

Check if the JSON object contains a given key. Returns `1` or `0`.

- **key** — Key string to check.

```shizoscript
config = [host="localhost", port=8080];
std.print(config.has("host"));  // 1
std.print(config.has("user"));  // 0
```

---

##### `.key(index)`

Return the key name at a specified index. Negative indices count from the end.

- **index** — Zero-based index.

```shizoscript
obj = [a=1, b=2, c=3];
std.print(obj.key(0));  // "a"
std.print(obj.key(-1)); // "c"
```

---

##### `.push(value)` / `.push_back(value)`

Append a value to the end of the JSON array.

- **value** — Value to insert.

```shizoscript
items = [];
items.push_back("apple");
items.push_back("banana");
std.print(items); // ["apple", "banana"]
```

---

##### `.push_cyclic(value, max_entries)`

Append a value to the array, removing elements from the front if the size would exceed `max_entries`.

- **value** — Value to insert.
- **max_entries** — Maximum number of elements the list may hold.

```shizoscript
log = [];
for(i = 0; i < 20; i++)
    log.push_cyclic("entry_" + i, 5);
// log contains only the last 5 entries
```

---

##### `.erase(key)` / `.remove(key)`

Remove a key or index from the JSON object. Returns whether the removal succeeded.

- **key** — Key string or numeric index.

```shizoscript
data = [a=1, b=2, c=3];
data.erase("b");
std.print(data); // {a: 1, c: 3}
```

---

##### `.resize(size)`

Resize a JSON list to the specified size, truncating or padding as needed.

- **size** — New size.

```shizoscript
items = [1, 2, 3, 4, 5];
items.resize(3);
std.print(items); // [1, 2, 3]
```

---

##### `.append(other, overwrite?)`

Append another JSON object into this one. If `overwrite` is true (default), existing keys are replaced.

- **other** — JSON object to merge.
- **overwrite** *(optional)* — Replace existing keys (default `true`).

```shizoscript
base = [a=1, b=2];
extra = [b=99, c=3];
base.append(extra);
std.print(base); // {a: 1, b: 99, c: 3}
```

---

##### `.merge(other, overwrite?)`

Merge another JSON object into this one. Behaves like `.append()`.

```shizoscript
config = [debug=0];
config.merge([debug=1, verbose=1]);
```

---

##### `.copy()`

Create a deep copy of the JSON object.

```shizoscript
original = [a=1, b=[nested=2]];
clone = original.copy();
clone.a = 99;
std.print(original.a); // still 1
```

---

##### `.string(compact?)`

Convert the JSON object to its string representation.

- **compact** *(optional)* — `0` for compact output, non-zero for pretty-printed.

```shizoscript
data = [name="test", value=42];
std.print(data.string());
```

---

##### `.compact_string()`

Convert to compact (minified) JSON string.

```shizoscript
json_str = data.compact_string();
```

---

##### `.from_string(json)`

Parse a JSON string and populate the object.

- **json** — JSON string to parse.

```shizoscript
obj = std.json();
obj.from_string('{"key": "value"}');
```

---

##### `.combine_string(separator?)`

Concatenate all string values in the JSON object with an optional separator.

- **separator** *(optional)* — Separator between values.

```shizoscript
words = ["Hello", "World"];
result = words.combine_string(" ");
std.print(result); // "Hello World"
```

---

##### `.sort()`

Sort entries by key in case-insensitive ascending order.

```shizoscript
data = [c=3, a=1, b=2];
data.sort();
// Order: a, b, c
```

---

##### `.rsort()` / `.sort_reverse()`

Sort entries by key in descending order.

```shizoscript
data = [a=1, c=3, b=2];
data.rsort();
// Order: c, b, a
```

---

##### `.sort_by(key, descending?)`

Sort entries by a child key in each value object.

- **key** — Child key to sort by.
- **descending** *(optional)* — Sort descending (default `false`).

```shizoscript
users = [
    [name="Charlie", age=30],
    [name="Alice", age=25],
    [name="Bob", age=28]
];
users.sort_by("name");
// Sorted: Alice, Bob, Charlie
```

---

##### `.filter(filter)`

Filter entries by a callback function or key substring.

- **filter** — Function `(key, value) -> bool` or string for key substring matching.

```shizoscript
data = [apple=1, banana=2, avocado=3];
result = data.filter("a"); // entries with "a" in the key

// With callback
result = data.filter([](key, value) { return value > 1; });
```

---

##### `.filter_key(filter)`

Filter entries whose keys contain the given substring(s).

- **filter** — Substring or list of substrings.

```shizoscript
settings = [color_bg=0, color_fg=1, font_size=12];
colors = settings.filter_key("color");
```

---

##### `.filter_value(filter)`

Return entries whose string values include the given substring.

- **filter** — Substring to search for.

```shizoscript
data = [a="hello world", b="goodbye", c="hello there"];
matches = data.filter_value("hello");
```

---

##### `.foreach(callback)`

Iterate over each key/value pair, invoking a callback.

- **callback** — Function `(key, value) -> bool`. Return `true` to include in result.

```shizoscript
data = [x=10, y=20, z=30];
data.foreach([](key, value) {
    std.print(key, "=", value);
    return true;
});
```

---

##### `.map(callback)`

Return a new JSON where each value is replaced by the result of the callback.

- **callback** — Function `(key, value) -> new_value`.

```shizoscript
prices = [apple=1.0, banana=0.5];
doubled = prices.map([](key, val) { return val * 2; });
```

---

##### `.reduce(callback, initial)`

Reduce all entries into a single value using a callback.

- **callback** — Function `(accumulator, key, value) -> new_accumulator`.
- **initial** — Starting accumulator value.

```shizoscript
nums = [1, 2, 3, 4, 5];
sum = nums.reduce([](acc, key, val) { return acc + val; }, 0);
std.print(sum); // 15
```

---

##### `.any(filter)`

Returns `true` if any entry matches the substring or callback.

- **filter** — Function or string.

```shizoscript
tags = ["urgent", "info", "debug"];
has_urgent = tags.any("urgent"); // 1
```

---

##### `.all(filter)`

Returns `true` if all entries match the substring or callback.

- **filter** — Function or string.

```shizoscript
scores = [10, 20, 30];
all_positive = scores.all([](k, v) { return v > 0; }); // 1
```

---

##### `.unique()`

Remove duplicate entries. For lists, duplicates are detected by value. For objects, duplicate keys are removed (first occurrence kept).

```shizoscript
items = [1, 2, 2, 3, 3, 3];
items = items.unique();
std.print(items); // [1, 2, 3]
```

---

##### `.to_list()`

Convert to a list by removing all keys.

```shizoscript
data = [a=1, b=2, c=3];
list = data.to_list();
std.print(list); // [1, 2, 3]
```

---

### `std.string`

A string object with rich manipulation methods. String literals in ShizoScript are natively strings, but `std.string()` can be used to explicitly construct one.

#### Constructor

```shizoscript
s = std.string("Hello World");
s = std.string(); // empty string
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | string *(optional)* | Initial string value |

#### Methods

---

##### `.length()` / `.size()`

Get the length (number of characters) of the string.

```shizoscript
s = "Hello";
std.print(s.length()); // 5
```

---

##### `.contains(sub)`

Check if the string contains a substring. Returns `1` or `0`.

```shizoscript
s = "Hello World";
std.print(s.contains("World")); // 1
```

---

##### `.empty()`

Check if the string is empty.

```shizoscript
s = "";
std.print(s.empty()); // 1
```

---

##### `.find(substring)`

Find the position (zero-based index) of a substring. Returns `-1` if not found.

```shizoscript
pos = "Hello World".find("World"); // 6
```

---

##### `.rfind(sub)`

Find the last occurrence of a substring, searching backwards.

```shizoscript
s = "aabbccaa";
pos = s.rfind("aa"); // 6
```

---

##### `.find_first_of(chars)` / `.find_last_of(chars)`

Find the first/last occurrence of any character from the given set.

```shizoscript
s = "hello.world/test";
pos = s.find_first_of("./"); // 5
```

---

##### `.find_first_not_of(chars)` / `.find_last_not_of(chars)`

Find the first/last character not in the specified set.

```shizoscript
s = "   hello";
pos = s.find_first_not_of(" "); // 3
```

---

##### `.starts(prefix)` / `.ends(suffix)`

Check if the string starts/ends with a given prefix/suffix.

```shizoscript
s = "config.json";
std.print(s.starts("config")); // 1
std.print(s.ends(".json"));    // 1
```

---

##### `.substr(start, length?)`

Extract a substring. Supports Python-style negative indices.

- **start** — Starting index (negative counts from end).

```shizoscript
s = "Hello World";
std.print(s.substr(6));     // "World"
std.print(s.substr(-5));    // "World"
std.print(s.substr(0, 5));  // "Hello"
```

---

##### `.split(delim, max_parts?, strip?)`

Split the string into a JSON array of parts.

- **delim** — Delimiter to split by.
- **max_parts** *(optional)* — Maximum number of resulting strings (`-1` = unlimited).
- **strip** *(optional)* — Strip whitespace from individual parts.

```shizoscript
parts = "a,b,c,d".split(",");
std.print(parts); // ["a", "b", "c", "d"]

parts = "a, b, c".split(",", -1, true);
// ["a", "b", "c"] (stripped)
```

---

##### `.replace(search_or_map, replace?)`

Replace all occurrences of a substring, or apply a JSON map of replacements.

- **search_or_map** — String to find, or JSON map `[old=new, ...]`.
- **replace** *(optional)* — Replacement string (when first param is a string).

```shizoscript
s = "Hello World";
s = s.replace("World", "ShizoScript");

// Map-based replacement
s = s.replace([" "="_", "o"="0"]);
```

---

##### `.replace_first(search, replace)`

Replace only the first occurrence of a substring.

```shizoscript
s = "aaa".replace_first("a", "b"); // "baa"
```

---

##### `.replace_inplace(search, replace)`

Replace all occurrences in-place (modifies the string directly).

```shizoscript
s = "test test test";
s.replace_inplace("test", "ok");
```

---

##### `.uppercase()` / `.lowercase()`

Return an upper/lower case copy of the string.

```shizoscript
std.print("hello".uppercase()); // "HELLO"
std.print("HELLO".lowercase()); // "hello"
```

---

##### `.uppercase_inplace()` / `.lowercase_inplace()`

Convert in-place.

```shizoscript
s = "hello";
s.uppercase_inplace();
std.print(s); // "HELLO"
```

---

##### `.trim()` / `.ltrim()` / `.rtrim()` / `.strip()`

Remove leading and/or trailing whitespace. `strip()` is an alias for `trim()`.

```shizoscript
s = "  hello  ";
std.print(s.trim());  // "hello"
std.print(s.ltrim()); // "hello  "
std.print(s.rtrim()); // "  hello"
```

---

##### `.trim_inplace()` / `.ltrim_inplace()` / `.rtrim_inplace()` / `.strip_inplace()`

In-place versions of the trim functions.

---

##### `.rstrip_lines()`

Remove trailing whitespace from each line while preserving newlines.

```shizoscript
code = "line1   \nline2  \n";
code = code.rstrip_lines(); // "line1\nline2\n"
```

---

##### `.reverse()` / `.reverse_inplace()`

Return a reversed copy, or reverse in-place.

```shizoscript
std.print("hello".reverse()); // "olleh"
```

---

##### `.center(width)`

Center the string within a given width using padding.

```shizoscript
std.print("hi".center(10)); // "    hi    "
```

---

##### `.ljust(width)` / `.rjust(width)`

Left/right-justify the string by padding to the target width.

```shizoscript
std.print("hi".ljust(10) + "|");  // "hi        |"
std.print("hi".rjust(10) + "|");  // "        hi|"
```

---

##### `.removechars(chars)`

Remove all occurrences of the specified characters.

```shizoscript
s = "h-e-l-l-o";
std.print(s.removechars("-")); // "hello"
```

---

##### `.removecharsexcept(chars)`

Remove all characters except those specified.

```shizoscript
s = "abc123def456";
std.print(s.removecharsexcept("0123456789")); // "123456"
```

---

##### `.removeprefix(prefix)` / `.removesuffix(suffix)`

Remove a prefix/suffix if present.

```shizoscript
s = "test_function";
std.print(s.removeprefix("test_")); // "function"
```

---

##### `.extract(left, right)`

Extract the substring between specified left and right delimiters.

```shizoscript
html = "<title>Hello</title>";
title = html.extract("<title>", "</title>"); // "Hello"
```

---

##### `.regex_match(pattern)`

Check if the entire string matches a regular expression pattern.

```shizoscript
valid = "test123".regex_match("[a-z]+[0-9]+"); // 1
```

---

##### `.regex_search(pattern)`

Search for a pattern and return the starting position of the match.

```shizoscript
pos = "hello 123 world".regex_search("[0-9]+"); // 6
```

---

##### `.regex_findall(pattern)`

Find all matches and return as a JSON array.

```shizoscript
matches = "a1 b2 c3".regex_findall("[a-z][0-9]");
// ["a1", "b2", "c3"]
```

---

##### `.regex_replace(pattern, replacement)`

Replace all regex matches with a replacement string.

```shizoscript
result = "hello 123 world 456".regex_replace("[0-9]+", "#");
// "hello # world #"
```

---

##### `.regex_replace_inplace(pattern, replacement)`

In-place regex replacement.

---

##### `.regex_split(pattern)`

Split using a regex pattern, returning a JSON array.

```shizoscript
parts = "one1two2three".regex_split("[0-9]");
// ["one", "two", "three"]
```

---

##### `.regex_escape()`

Escape regex metacharacters in the string.

```shizoscript
safe = "file.txt (copy)".regex_escape();
// "file\\.txt \\(copy\\)"
```

---

##### `.substr_inplace(start, length?)`

Modify the string in-place to become its own substring.

---

### `std.thread`

Create and manage asynchronous tasks running script functions on separate threads.

#### Constructor

```shizoscript
// Create with a callback function
t = std.thread([](arg1, arg2) {
    std.print("Working with", arg1, arg2);
});

// Create without callback
t = std.thread();
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function *(optional)* | Function to execute in the thread |

#### Methods

---

##### `.run(args...)`

Execute the callback function asynchronously, passing optional arguments.

```shizoscript
worker = std.thread([](data) {
    std.sleep(1000);
    std.print("Processed:", data);
});

worker.run("batch_1");
worker.run("batch_2");
worker.join(); // wait for all tasks
```

---

##### `.join()`

Wait for all active tasks to complete.

```shizoscript
t = std.thread([](n) {
    std.sleep(n * 100);
    std.print("Task done after", n * 100, "ms");
});

t.run(5);
t.run(3);
t.join(); // blocks until both tasks finish
```

---

### `std.module`

Load and execute ShizoScript files as isolated modules. Enables calling functions and accessing variables from loaded scripts.

#### Constructor

```shizoscript
mod = std.module();
```

#### Methods

---

##### `.load_file(path)`

Load and execute a module from a `.shio` file.

- **path** — Path to the script file.

```shizoscript
mod = std.module();
mod.load_file("utils/helpers.shio");
```

---

##### `.load_code(code, source_path?)`

Load and execute a module from a source code string.

- **code** — Script source code.
- **source_path** *(optional)* — Source path for diagnostics.

```shizoscript
mod = std.module();
mod.load_code('greet(name) { return "Hello " + name; }');
```

---

##### `.has(name)`

Check if a global variable or function exists in the module.

- **name** — Global name to check.

```shizoscript
if(mod.has("greet"))
    std.print("Function found!");
```

---

##### `.get(name)`

Get a global variable or function reference from the module.

- **name** — Global name to retrieve.

```shizoscript
fn = mod.get("greet");
```

---

##### `.call(name, args...)`

Call a function from the module's global scope.

- **name** — Function name to invoke.
- **args** — Arguments to pass.

```shizoscript
result = mod.call("greet", "World");
std.print(result); // "Hello World"
```

---

## 4. File I/O — `fileio`

```shizoscript
using fileio;
```

### 4.1 Functions

---

#### `fileio.exists(path)`

Check if a file or directory exists at the given path. Returns `1` or `0`.

```shizoscript
if(fileio.exists("config.json"))
    std.print("Config found");
```

---

#### `fileio.is_file(path)` / `fileio.is_directory(path)`

Check if the given path is a file or a directory.

```shizoscript
if(fileio.is_file("data.txt"))
    std.print("It's a file");

if(fileio.is_directory("logs/"))
    std.print("It's a directory");
```

---

#### `fileio.is_within_dir(base_dir, path)`

Check if a path is inside a directory (resolves `..` and symlinks when possible).

```shizoscript
safe = fileio.is_within_dir("/var/www", "/var/www/../etc/passwd"); // 0
```

---

#### `fileio.read_text(path)` / `fileio.read_string(path)`

Read a text file and return its contents as a string.

```shizoscript
content = fileio.read_text("readme.md");
std.print(content);
```

---

#### `fileio.write_text(path, data)` / `fileio.write_string(path, data)`

Write a string to a file.

```shizoscript
fileio.write_text("output.txt", "Hello, file!");
```

---

#### `fileio.read_json(path)`

Read and parse a JSON file, returning a JSON object.

```shizoscript
config = fileio.read_json("config.json");
std.print(config.host);
```

---

#### `fileio.write_json(path, data)`

Write a JSON object to a file.

> **Important:** Do not modify the JSON object being written in another thread. Pass a copy if needed.

```shizoscript
config = [host="localhost", port=8080];
fileio.write_json("config.json", config);
```

---

#### `fileio.read_file(path)`

Read a file into a binary buffer.

```shizoscript
binary = fileio.read_file("image.png");
```

---

#### `fileio.write_file(path, data)`

Write binary data from a serializable object to a file. Returns `true` on success.

```shizoscript
fileio.write_file("output.bin", binary_data);
```

---

#### `fileio.files(path, recursive?)`

List files in a directory. Returns a JSON array of file paths.

- **path** — Directory to list.
- **recursive** *(optional, default: true)* — Include subfolders.

```shizoscript
all_files = fileio.files("src/", true);
top_only = fileio.files("src/", false);
```

---

#### `fileio.dirs(path, recursive?)`

List directories inside a directory. Returns a JSON array.

- **path** — Directory to list.
- **recursive** *(optional, default: true)* — Include nested subdirectories.

```shizoscript
folders = fileio.dirs("project/");
```

---

#### `fileio.find_file(path)`

Search for a file and return its resolved absolute path.

```shizoscript
found = fileio.find_file("config.json");
if(found)
    std.print("Found at:", found);
```

---

#### `fileio.copy(src, dest)`

Copy a file or directory. Destination folders are created if required.

```shizoscript
fileio.copy("data/report.csv", "backup/report.csv");
```

---

#### `fileio.copy_if_changed(src, dest)`

Copy only if the source is newer than the destination.

```shizoscript
fileio.copy_if_changed("src/main.shio", "deploy/main.shio");
```

---

#### `fileio.move(src, dest)`

Move a file or directory (rename or copy+delete fallback).

```shizoscript
fileio.move("old_name.txt", "new_name.txt");
```

---

#### `fileio.rename(src, dest)`

Rename a file or directory.

```shizoscript
fileio.rename("temp.txt", "final.txt");
```

---

#### `fileio.remove(path)`

Remove files or directories recursively.

- **path** — File path, directory path, or list of paths.

```shizoscript
fileio.remove("temp/");
fileio.remove(["file1.tmp", "file2.tmp"]);
```

---

#### `fileio.mkdir(path)`

Create a directory.

```shizoscript
fileio.mkdir("output/reports");
```

---

#### `fileio.file_name(path)`

Extract the filename from a path string.

```shizoscript
std.print(fileio.file_name("/home/user/test.txt")); // "test.txt"
```

---

#### `fileio.file_dir(path)`

Extract the directory portion from a file path.

```shizoscript
std.print(fileio.file_dir("/home/user/test.txt")); // "/home/user"
```

---

#### `fileio.pure_name(path)`

Extract the filename without extension.

```shizoscript
std.print(fileio.pure_name("archive.tar.gz")); // "archive.tar"
```

---

### 4.2 Classes

---

### `fileio.container`

A sandboxed filesystem interface limited to a local root directory. All paths are resolved relative to the configured root, preventing directory traversal attacks.

#### Constructor

```shizoscript
fs = fileio.container("data/user_uploads");
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Path to the root directory |

#### Methods

The container mirrors all `fileio` namespace functions, but all paths are relative to the container's root directory:

`.read_text(path)`, `.write_text(path, data)`, `.read_json(path)`, `.write_json(path, data)`, `.read_file(path)`, `.write_file(path, data)`, `.read_string(path)`, `.write_string(path, data)`, `.files(path, recursive?)`, `.dirs(path, recursive?)`, `.exists(path)`, `.is_file(path)`, `.is_directory(path)`, `.copy(src, dest)`, `.copy_if_changed(src, dest)`, `.move(src, dest)`, `.rename(src, dest)`, `.remove(path)`, `.mkdir(path)`, `.file_name(path)`, `.file_dir(path)`, `.pure_name(path)`

Additional methods:

---

##### `.set(path)`

Change the container's root directory.

```shizoscript
fs = fileio.container("data/");
fs.set("other_data/");
```

---

##### `.is_valid(path)`

Check whether a path can be safely resolved within the container root.

```shizoscript
fs.is_valid("../etc/passwd");    // 0 — path escapes root
fs.is_valid("uploads/file.txt"); // 1
```

---

##### `.get_size()`

Get the current tracked size of all files in the container, in bytes.

```shizoscript
std.print("Used:", fs.get_size(), "bytes");
```

---

##### `.get_limit()` / `.set_limit(limit_bytes)`

Get or set the maximum allowed total file size in bytes (`0` = unlimited).

```shizoscript
fs.set_limit(1024 * 1024 * 100); // 100 MB limit
std.print("Limit:", fs.get_limit());
```

---

## 5. Math — `math`

```shizoscript
using math;
```

### 5.1 Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `math.PI` | `3.141593` | The mathematical constant pi |

### 5.2 Functions

| Function | Description | Example |
|----------|-------------|---------|
| `math.abs(x)` | Absolute value | `math.abs(-5)` -> `5` |
| `math.floor(x)` | Largest integer <= x | `math.floor(3.7)` -> `3` |
| `math.ceil(x)` | Smallest integer >= x | `math.ceil(3.2)` -> `4` |
| `math.round(x)` | Nearest integer | `math.round(3.5)` -> `4` |
| `math.sign(x)` | Sign: +1, 0, or -1 | `math.sign(-3)` -> `-1` |
| `math.clamp(x, min, max)` | Clamp between min and max | `math.clamp(15, 0, 10)` -> `10` |
| `math.min(values...)` | Minimum of values | `math.min(3, 1, 4)` -> `1` |
| `math.max(values...)` | Maximum of values | `math.max(3, 1, 4)` -> `4` |
| `math.sqrt(x)` | Square root | `math.sqrt(9)` -> `3` |
| `math.cbrt(x)` | Cube root | `math.cbrt(27)` -> `3` |
| `math.pow(base, exp)` | Power function | `math.pow(2, 10)` -> `1024` |
| `math.exp(x)` | e^x | `math.exp(1)` -> `2.718...` |
| `math.log(x)` | Natural logarithm (ln) | `math.log(math.exp(1))` -> `1` |
| `math.log2(x)` | Base-2 logarithm | `math.log2(8)` -> `3` |
| `math.log10(x)` | Base-10 logarithm | `math.log10(100)` -> `2` |
| `math.sin(x)` | Sine (radians) | `math.sin(math.PI / 2)` -> `1` |
| `math.cos(x)` | Cosine (radians) | `math.cos(0)` -> `1` |
| `math.tan(x)` | Tangent (radians) | `math.tan(math.PI / 4)` -> `1` |
| `math.asin(x)` | Inverse sine | `math.asin(1)` -> `PI/2` |
| `math.acos(x)` | Inverse cosine | `math.acos(1)` -> `0` |
| `math.atan(x)` | Inverse tangent | `math.atan(1)` -> `PI/4` |
| `math.atan2(y, x)` | Arctangent from y and x | `math.atan2(1, 1)` -> `PI/4` |
| `math.fract(x)` | Fractional part | `math.fract(3.75)` -> `0.75` |
| `math.lerp(a, b, t)` | Linear interpolation | `math.lerp(0, 10, 0.5)` -> `5` |
| `math.smoothstep(e0, e1, x)` | Smooth Hermite interpolation | `math.smoothstep(0, 1, 0.5)` -> `0.5` |
| `math.rand()` | Random float in [0, 1] | `math.rand()` -> `0.7283...` |

```shizoscript
// Example: distance between two 2D points
distance(x1, y1, x2, y2)
{
    dx = x2 - x1;
    dy = y2 - y1;
    return math.sqrt(dx * dx + dy * dy);
}

std.print(distance(0, 0, 3, 4)); // 5.0
```

---

## 6. Networking — `shizonet`

```shizoscript
using shizonet;
```

The `shizonet` namespace provides a peer-to-peer networking layer with automatic device discovery, command routing, and streaming.

### 6.1 Classes

---

### `shizonet.server`

Create a network server node that listens for connections and handles commands.

#### Constructor

```shizoscript
srv = shizonet.server("MyServer");
srv = shizonet.server("MyServer", 9000); // custom port
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `node_name` | string | Unique name for this server node |
| `port` | int *(optional)* | Server listening port |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `enabled` | variable | Enable/disable the server |
| `ip` | variable | Server IP address |
| `mac` | variable | Server MAC address |
| `name` | variable | Server node name |
| `artnet_sync` | variable | Art-Net sync setting |

#### Methods

---

##### `.on_connect(callback)`

Register a callback invoked for each new client connection.

```shizoscript
srv.on_connect([](device) {
    std.print("Connected:", device.name, "from", device.ip);
});
```

---

##### `.on_disconnect(callback)`

Register a callback invoked when a client disconnects.

```shizoscript
srv.on_disconnect([](device) {
    std.print("Disconnected:", device.name);
});
```

---

##### `.on_command(cmd, callback)`

Register a callback for incoming commands. The callback receives the sending device and the data.

- **cmd** — Command name string.
- **callback** — Function `(device, data)`.

```shizoscript
srv.on_command("status_update", [](device, data) {
    std.print(device.name, "reports:", data);
});
```

---

##### `.on_get(cmd, callback)`

Register a handler for request-response commands. The callback must return a value.

```shizoscript
srv.on_get("get_time", [](device, data) {
    return std.timestamp();
});
```

---

##### `.on_stream(cmd, callback)`

Register a streaming data handler.

```shizoscript
srv.on_stream("sensor_data", [](device, data) {
    std.print("Sensor:", data);
});
```

---

##### `.get(command, value?, timeout?)`

Send a GET request and return the response.

```shizoscript
result = srv.get("status");
result = srv.get("compute", [input=42], 5000);
```

---

##### `.get_all(command, data?, callback?, timeout?)`

Send a GET command to all connected devices.

```shizoscript
count = srv.get_all("ping", None, [](device, response) {
    std.print(device.name, "responded:", response);
}, 3000);
```

---

##### `.send_osc(ip, config, port?)`

Send OSC messages to the specified IP and port.

- **port** *(optional, default: 8000)*.

```shizoscript
srv.send_osc("192.168.1.100", [
    address="/channel/1/level",
    args=[255]
], 8000);
```

---

### `shizonet.client`

Create a network client node that connects to servers.

#### Constructor

```shizoscript
client = shizonet.client("MyClient");
client = shizonet.client("MyClient", 9001);
```

The `shizonet.client` class shares the same methods and properties as `shizonet.server`: `.on_connect()`, `.on_disconnect()`, `.on_command()`, `.on_get()`, `.on_stream()`, `.get()`, `.get_all()`, `.send_osc()`.

---

### `shizonet.device`

Represents a discovered or connected remote device. Obtained through connection callbacks.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | variable | Device name |
| `ip` | variable | Device IP address |
| `mac` | variable | Device MAC address |
| `online` | variable | Online status |
| `type` | variable | Device type identifier |

#### Methods

---

##### `.send(command, data?, timeout?, wait_finish?)`

Send a command reliably, optionally waiting for completion.

```shizoscript
device.send("set_color", [r=255, g=0, b=0]);
device.send("firmware_update", binary_data, 30000, true);
```

---

##### `.send_fast(command, data)`

Send a command over an unreliable (fast) connection. Best for high-frequency data like sensor values.

```shizoscript
device.send_fast("position", [x=1.5, y=2.3]);
```

---

##### `.send_queue(command, data?, timeout?, wait_finish?)`

Send via a queued reliable connection.

```shizoscript
device.send_queue("log_entry", [msg="Event occurred"]);
```

---

##### `.get(command, value?, timeout?)` / `.fetch(command, value?, timeout?)`

Send a GET or FETCH request to this specific device and return the response.

```shizoscript
status = device.get("status");
info = device.fetch("device_info", None, 5000);
```

---

##### `.get_static_buffer_count()` / `.get_static_buffer_names()` / `.get_static_buffer_desc(identifier)`

Query static buffer information on the device.

```shizoscript
count = device.get_static_buffer_count();
names = device.get_static_buffer_names();
desc = device.get_static_buffer_desc(0);
desc = device.get_static_buffer_desc("main_buffer");
```

---

### `shizonet.artnet_device`

Represents a discovered Art-Net device on the network.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | variable | Device name |
| `ip` | variable | Device IP address |
| `mac` | variable | Device MAC address |
| `online` | variable | Online status |
| `type` | variable | Device type identifier |

---

## 7. HTTP Client — `curl`

```shizoscript
using curl;
```

### `curl.curl`

A full-featured HTTP client based on libcurl, supporting GET, POST, DELETE, streaming, and custom requests.

#### Constructor

```shizoscript
http = curl.curl();
```

#### Methods

---

##### `.get(url, headers?, timeout_ms?)`

Perform an HTTP GET request.

**Returns:** JSON `{ ok, http_code, body, content_type }`

```shizoscript
http = curl.curl();
res = http.get("https://api.example.com/data");
if(res.ok)
    std.print(res.body);
else
    std.print("Error:", res.http_code);
```

---

##### `.post(url, payload, headers?, timeout_ms?)`

Perform an HTTP POST with a string payload.

**Returns:** JSON `{ ok, http_code, body, content_type }`

```shizoscript
http = curl.curl();
headers = ["Content-Type"="application/json"];
body = '{"name": "test"}';
res = http.post("https://api.example.com/items", body, headers);
std.print(res.body);
```

---

##### `.delete(url, headers?, timeout_ms?)`

Perform an HTTP DELETE request.

**Returns:** JSON `{ ok, http_code, body, content_type }`

```shizoscript
res = http.delete("https://api.example.com/items/42");
```

---

##### `.request(method, url, body?, headers?, timeout_ms?, binary?)`

Generic HTTP request supporting any method.

**Returns:** JSON `{ ok, http_code, body, content_type }`

```shizoscript
res = http.request("PUT", "https://api.example.com/items/42",
    '{"updated": true}',
    [
        "Content-Type"="application/json",
        "Authorization"="Bearer token123"
    ]
);
```

---

##### `.start_stream(method, url, body?, headers?, timeout_ms?)`

Start a streaming HTTP request. Use `.poll_stream()` to receive chunks.

```shizoscript
http.start_stream("GET", "https://api.example.com/stream", None, [
    "Accept"="text/event-stream"
]);
```

---

##### `.poll_stream()`

Drain pending stream chunks. Returns accumulated data since last poll.

```shizoscript
for(1)
{
    chunk = http.poll_stream();
    if(chunk)
        std.cout(chunk);
    std.sleep(100);
}
```

---

##### `.stop_stream()`

Abort the active streaming request. Returns `1` if stop was signaled.

```shizoscript
http.stop_stream();
```

---

##### `.last_error()`

Get the last error message from the HTTP wrapper.

```shizoscript
if(!res.ok)
    std.print("Error:", http.last_error());
```

---

##### `.version()`

Get the version of the underlying libcurl library.

```shizoscript
std.print("curl version:", http.version());
```

---

## 8. Web Server — `webserver`

```shizoscript
using webserver;
```

### `webserver.http_server`

An HTTP web server for handling incoming requests.

#### Constructor

```shizoscript
srv = webserver.http_server();
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `port` | variable | Current server port |
| `running` | variable | Whether the server is running |

#### Methods

---

##### `.init(port)`

Initialize the server on the specified port.

```shizoscript
srv = webserver.http_server();
srv.init(8080);
```

---

##### `.route(method, path, callback)`

Register a route handler. The callback receives a request object.

- **method** — HTTP method (`"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"*"` for any).
- **path** — URL path pattern (supports regex).

```shizoscript
srv.route("GET", "/api/hello", [](req) {
    return [
        status=200,
        body="Hello World!",
        content_type="text/plain"
    ];
});

srv.route("POST", "/api/data", [](req) {
    std.print("Received:", req.body);
    return [
        status=201,
        body='{"ok": true}',
        content_type="application/json"
    ];
});
```

---

##### `.static(url_pattern, file_or_directory)`

Serve static files from a directory, protected against directory traversal.

```shizoscript
srv.static("/assets", "public/assets");
srv.static("/", "public/index.html");
```

---

##### `.start()` / `.stop()`

Start or stop the server.

```shizoscript
srv.start();
std.print("Server running on port", srv.port);

// Later...
srv.stop();
```

---

### `webserver.https_server`

HTTPS variant of the web server requiring TLS certificate files.

#### Constructor

```shizoscript
srv = webserver.https_server();
```

#### Methods

##### `.init(port, cert_file, key_file)`

Initialize with port and TLS certificate/key files.

```shizoscript
srv = webserver.https_server();
srv.init(443, "certs/server.crt", "certs/server.key");
```

All other methods (`.route()`, `.static()`, `.start()`, `.stop()`) are identical to `http_server`.

---

## 9. Subprocess — `subprocess`

```shizoscript
using subprocess;
```

### `subprocess.process`

Spawn and manage child processes, similar to Python's `subprocess.Popen`.

#### Constructor

```shizoscript
proc = subprocess.process();
```

#### Methods

---

##### `.start(args, cwd?, shell?, env?)`

Start a subprocess.

- **args** — Argument list. If `shell=true`, use a single string in `args[0]`.
- **cwd** *(optional)* — Working directory.
- **shell** *(optional)* — Run via shell (`cmd.exe /C` or `/bin/sh -c`).
- **env** *(optional)* — Environment entries as `["KEY=VALUE", ...]`.

```shizoscript
proc = subprocess.process();
proc.start(["python", "script.py", "--verbose"], "scripts/", false);

// Shell command
proc2 = subprocess.process();
proc2.start(["echo Hello && echo World"], None, true);
```

---

##### `.pid()`

Get the process ID.

```shizoscript
std.print("PID:", proc.pid());
```

---

##### `.poll()`

Check process status. Returns the return code if finished, or `None` if still running.

```shizoscript
while(proc.poll() == None)
{
    std.print("Still running...");
    std.sleep(500);
}
```

---

##### `.wait()`

Block until the process exits and return the exit code.

```shizoscript
exit_code = proc.wait();
std.print("Exited with:", exit_code);
```

---

##### `.exited()`

Returns `true` if the process has exited.

```shizoscript
if(proc.exited())
    std.print("Process finished");
```

---

##### `.returncode()`

Get the cached return code, or `None` if still running.

```shizoscript
code = proc.returncode();
```

---

##### `.stop()`

Send Ctrl+C / SIGINT for graceful shutdown.

```shizoscript
proc.stop();
```

---

##### `.terminate()`

Request process termination (SIGTERM / TerminateProcess).

```shizoscript
proc.terminate();
```

---

##### `.kill()`

Force kill the process (SIGKILL / TerminateProcess).

```shizoscript
proc.kill();
```

---

## 10. MQTT — `mqtt`

```shizoscript
using mqtt;
```

### `mqtt.mqtt`

MQTT client for publish/subscribe messaging with brokers.

#### Constructor

```shizoscript
client = mqtt.mqtt();
```

#### Methods

---

##### `.configure(server_uri, client_id)`

Create/replace the internal MQTT async client.

```shizoscript
client = mqtt.mqtt();
client.configure("tcp://broker.example.com:1883", "shizo_client_01");
```

---

##### `.connect(username?, password?, clean_session?, keep_alive?)`

Connect to the broker (blocking, runs on worker thread).

```shizoscript
client.connect("user", "pass123", true, 60);
```

---

##### `.disconnect()`

Disconnect from the broker.

```shizoscript
client.disconnect();
```

---

##### `.is_connected()`

Returns `true` if currently connected.

```shizoscript
if(client.is_connected())
    std.print("Connected to MQTT broker");
```

---

##### `.subscribe(topic, qos?)`

Subscribe to a topic.

```shizoscript
client.subscribe("sensors/temperature", 1);
client.subscribe("alerts/#", 0);
```

---

##### `.publish(topic, payload, qos?, retained?)`

Publish a message to a topic.

```shizoscript
client.publish("sensors/temperature", "22.5", 1, false);
```

---

##### `.set_callbacks(on_message?, on_connect?, on_disconnect?, on_error?)`

Set script callbacks for MQTT events (invoked by `.poll()`).

```shizoscript
client.set_callbacks(
    [](topic, payload, qos, retained) {
        std.print("Message on", topic, ":", payload);
    },
    []() { std.print("Connected!"); },
    []() { std.print("Disconnected!"); },
    [](err) { std.error("MQTT error:", err); }
);
```

---

##### `.poll()`

Drain queued messages and invoke the `on_message` callback. Returns the number of delivered messages. Call this periodically in your main loop.

```shizoscript
for(1)
{
    client.poll();
    std.sleep(100);
}
```

---

#### Full MQTT Example

```shizoscript
using mqtt;
using std;

client = mqtt.mqtt();
client.configure("tcp://localhost:1883", "my_app");

client.set_callbacks(
    [](topic, payload, qos, retained) {
        print("Received on", topic, ":", payload);
    },
    []() { print("Connected to broker"); },
    []() { print("Disconnected"); },
    [](err) { error("MQTT:", err); }
);

client.connect("", "", true, 60);
client.subscribe("home/sensors/#", 1);

for(1)
{
    client.poll();
    sleep(100);
}
```

---

## 11. Telegram — `telegram`

```shizoscript
using telegram;
```

### `telegram.bot`

Full-featured Telegram Bot API client.

#### Constructor

```shizoscript
bot = telegram.bot("YOUR_BOT_TOKEN");
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `bot_token` | string | Bot authentication token from @BotFather |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `on_any_message` | variable | Callback invoked for every incoming message |

#### Methods — Sending Messages

---

##### `.send(chatdata, text, options?)`

Send a text message.

```shizoscript
bot.on_any_message = [](msg) {
    bot.send(msg, "Hello! You said: " + msg.text);
};
```

---

##### `.send_choice(chatdata, options?)`

Send a message with inline keyboard buttons.

```shizoscript
bot.send_choice(msg, [
    text="Choose an option:",
    buttons=[
        [text="Option A", callback_data="a"],
        [text="Option B", callback_data="b"]
    ]
]);
```

---

##### `.send_photo(chatdata, photo, options?)`

Send a photo (file ID, URL, or local path).

```shizoscript
bot.send_photo(msg, "https://example.com/image.jpg", [caption="Nice photo!"]);
```

---

##### `.send_document(chatdata, document, options?)`

Send a document/file.

```shizoscript
bot.send_document(msg, "report.pdf", [caption="Monthly report"]);
```

---

##### `.send_audio(chatdata, audio, options?)` / `.send_voice(chatdata, voice, options?)`

Send audio files or voice messages.

```shizoscript
bot.send_audio(msg, "song.mp3", [caption="Listen to this!"]);
```

---

##### `.send_video(chatdata, video, options?)` / `.send_video_note(chatdata, video_note, options?)`

Send videos or circular video notes.

```shizoscript
bot.send_video(msg, "clip.mp4", [caption="Check this out"]);
```

---

##### `.send_animation(chatdata, animation, options?)`

Send a GIF animation.

```shizoscript
bot.send_animation(msg, "funny.gif");
```

---

##### `.send_sticker(chatdata, sticker, options?)`

Send a sticker.

```shizoscript
bot.send_sticker(msg, "sticker_file_id");
```

---

##### `.send_location(chatdata, latitude, longitude, options?)`

Send a geographic location.

```shizoscript
bot.send_location(msg, 52.5200, 13.4050); // Berlin
```

---

##### `.send_chat_action(chatid, action, threadid?)`

Show a chat action indicator (typing, uploading, etc.).

```shizoscript
bot.send_chat_action(msg.chatid, "typing");
```

---

#### Methods — Message Management

##### `.edit_message(chatdata, text)` / `.edit_caption(chatdata, caption)` / `.edit_reply_markup(chatdata, buttons?)`

Edit an existing message's text, caption, or buttons.

```shizoscript
bot.edit_message(msg, "Updated text!");
```

---

##### `.delete_message(chatid, msgid)`

Delete a message.

```shizoscript
bot.delete_message(msg.chatid, msg.msgid);
```

---

##### `.forward_message(to_chatid, from_chatid, msgid)` / `.copy_message(to_chatid, from_chatid, msgid)`

Forward or copy a message.

```shizoscript
bot.forward_message(admin_chatid, msg.chatid, msg.msgid);
```

---

#### Methods — Chat Administration

##### `.get_chat(chatid)` / `.get_chat_member(chatid, userid)` / `.get_chat_member_count(chatid)` / `.get_chat_administrators(chatid)`

Query chat and member information.

```shizoscript
info = bot.get_chat(msg.chatid);
count = bot.get_chat_member_count(msg.chatid);
admins = bot.get_chat_administrators(msg.chatid);
```

---

##### `.ban_chat_member(chatid, userid, until_date?, revoke_messages?)`

Ban a user from a chat.

```shizoscript
bot.ban_chat_member(msg.chatid, spammer_id);
```

---

##### `.unban_chat_member(chatid, userid, only_if_banned?)`

Unban a user.

```shizoscript
bot.unban_chat_member(msg.chatid, user_id, true);
```

---

##### `.restrict_chat_member(chatid, userid, permissions, until_date?)`

Restrict a member's permissions.

```shizoscript
bot.restrict_chat_member(msg.chatid, user_id, [
    can_send_messages=false,
    can_send_media=false
]);
```

---

##### `.promote_chat_member(chatid, userid, rights?)` / `.set_chat_administrator_custom_title(chatid, userid, title)`

Promote a user to admin or set a custom title.

```shizoscript
bot.promote_chat_member(msg.chatid, user_id, [can_pin_messages=true]);
bot.set_chat_administrator_custom_title(msg.chatid, user_id, "Moderator");
```

---

##### `.leave_chat(chatid)`

Make the bot leave a chat.

```shizoscript
bot.leave_chat(msg.chatid);
```

---

## 12. Linear Algebra — `eigen`

```shizoscript
using eigen;
```

The `eigen` namespace provides 2D, 3D, and 4D vector types with integer (`i`), float (`f`), and double (`d`) precision variants.

### Vector Types

| Type | Components | Precision |
|------|-----------|-----------|
| `eigen.vec2i` | x, y | integer |
| `eigen.vec2f` | x, y | float |
| `eigen.vec2d` | x, y | double |
| `eigen.vec3i` | x, y, z | integer |
| `eigen.vec3f` | x, y, z | float |
| `eigen.vec3d` | x, y, z | double |
| `eigen.vec4i` | x, y, z, w | integer |
| `eigen.vec4f` | x, y, z, w | float |
| `eigen.vec4d` | x, y, z, w | double |

#### Constructors

```shizoscript
v2 = eigen.vec2f();         // (0, 0)
v3 = eigen.vec3f();         // (0, 0, 0)
v4 = eigen.vec4f();         // (0, 0, 0, 0)
```

#### Properties

All vector types expose their components directly:

```shizoscript
v = eigen.vec3f();
v.x = 1.0;
v.y = 2.0;
v.z = 3.0;
std.print(v.x, v.y, v.z);
```

#### Methods (Common to All Vector Types)

---

##### `.set(x, y, ...)`

Set all components at once.

```shizoscript
v = eigen.vec3f();
v.set(1.0, 2.0, 3.0);
```

---

##### `.length()` / `.length_sq()`

Get the vector length or squared length (avoids sqrt for comparisons).

```shizoscript
v = eigen.vec3f();
v.set(3.0, 4.0, 0.0);
std.print(v.length());    // 5.0
std.print(v.length_sq()); // 25.0
```

---

##### `.normalize()` / `.normalized()`

Normalize in-place, or return a normalized copy.

```shizoscript
v = eigen.vec3f();
v.set(3.0, 0.0, 4.0);
unit = v.normalized(); // length = 1.0
v.normalize();         // modifies v directly
```

---

##### `.dot(other)`

Compute the dot product with another vector.

```shizoscript
a = eigen.vec3f(); a.set(1.0, 0.0, 0.0);
b = eigen.vec3f(); b.set(0.0, 1.0, 0.0);
std.print(a.dot(b)); // 0.0 (perpendicular)
```

---

##### `.distance(other)` / `.distance_sq(other)`

Distance or squared distance to another vector.

```shizoscript
a = eigen.vec2f(); a.set(0.0, 0.0);
b = eigen.vec2f(); b.set(3.0, 4.0);
std.print(a.distance(b)); // 5.0
```

---

##### `.angle(other)`

Angle between two vectors in radians.

```shizoscript
a = eigen.vec2f(); a.set(1.0, 0.0);
b = eigen.vec2f(); b.set(0.0, 1.0);
std.print(a.angle(b)); // ~1.5708 (PI/2)
```

---

##### `.lerp(other, t)`

Linear interpolation between two vectors.

```shizoscript
a = eigen.vec3f(); a.set(0.0, 0.0, 0.0);
b = eigen.vec3f(); b.set(10.0, 10.0, 10.0);
mid = a.lerp(b, 0.5); // (5, 5, 5)
```

---

##### `.clamp(min, max)` / `.min(other)` / `.max(other)` / `.abs()`

Component-wise clamping, minimum, maximum, and absolute value.

```shizoscript
v = eigen.vec3f();
v.set(-1.0, 5.0, 3.0);
result = v.abs(); // (1, 5, 3)
```

---

##### `.is_zero(epsilon?)`

Check if the vector is near zero.

```shizoscript
v = eigen.vec3f();
v.set(0.0, 0.0, 0.0);
std.print(v.is_zero()); // 1
```

---

##### `.equals(other, epsilon?)`

Compare with another vector, with optional epsilon tolerance.

```shizoscript
a = eigen.vec2f(); a.set(1.0, 2.0);
b = eigen.vec2f(); b.set(1.0, 2.0);
std.print(a.equals(b)); // 1
```

---

##### `.to_string(epsilon?)`

Get a string representation.

```shizoscript
v = eigen.vec3f();
v.set(1.5, 2.5, 3.5);
std.print(v.to_string()); // e.g. "(1.5, 2.5, 3.5)"
```

---

## 13. GUI — `nanogui`

```shizoscript
using nanogui;
```

The `nanogui` namespace provides an OpenGL-based GUI toolkit with windows, widgets, layouts, and NanoVG vector drawing.

### 13.1 Classes

---

### `nanogui.context`

The top-level GUI context that manages screens and rendering.

#### Constructor

```shizoscript
gui = nanogui.context();
```

#### Methods

---

##### `.screen(options...)`

Create a new application window (screen).

| Parameter | Default | Description |
|-----------|---------|-------------|
| `width` | monitor width | Window width in pixels |
| `height` | monitor height | Window height in pixels |
| `caption` | `"test"` | Window title |
| `resizable` | `true` | Allow resizing |
| `maximized` | `true` | Start maximized |
| `fullscreen` | `false` | Fullscreen mode |
| `depth_buffer` | `false` | Enable depth buffer |
| `stencil_buffer` | `false` | Enable stencil buffer |
| `float_buffer` | `true` | Enable float buffer |
| `gl_major` | `3` | OpenGL major version |
| `gl_minor` | `2` | OpenGL minor version |

```shizoscript
gui = nanogui.context();
screen = gui.screen(1280, 720, "My Application", true, false, false);
```

---

##### `.fps()` / NanoVG Drawing Methods

The context provides NanoVG vector drawing primitives for custom rendering:

```shizoscript
gui.nvgBeginPath();
gui.nvgRect(pos, size);
gui.nvgFillColor(color);
gui.nvgFill();
gui.nvgStrokeColor(color);
gui.nvgStroke();
```

**Available NanoVG methods:**

| Method | Description |
|--------|-------------|
| `nvgBeginPath()` | Begin a new path |
| `nvgMoveTo(pos)` | Move to position |
| `nvgLineTo(pos)` | Line to position |
| `nvgBezierTo(c1, c2, p)` | Cubic Bezier curve |
| `nvgQuadTo(c, p)` | Quadratic Bezier curve |
| `nvgArcTo(p1, p2, radius)` | Arc |
| `nvgArc(center, radius, a0, a1, dir)` | Arc path |
| `nvgRect(pos, size)` | Rectangle |
| `nvgRoundedRect(pos, size, radius)` | Rounded rectangle |
| `nvgRoundedRectVarying(pos, size, r0, r1, r2, r3)` | Varying corner radii |
| `nvgCircle(center, radius)` | Circle |
| `nvgEllipse(center, radius)` | Ellipse |
| `nvgFill()` | Fill current path |
| `nvgStroke()` | Stroke current path |
| `nvgFillColor(rgba)` | Set fill color (vec4f, 0..1) |
| `nvgStrokeColor(rgba)` | Set stroke color (vec4f, 0..1) |
| `nvgScissor(pos, size)` | Set scissor rectangle |
| `nvgIntersectScissor(pos, size)` | Intersect scissor |
| `nvgTranslate(delta)` | Translate transform |
| `nvgScale(scale)` | Scale transform |

---

### `nanogui.screen`

The top-level window that contains all other widgets.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `caption` | variable | Window title |
| `background` | variable | Background color |
| `pixel_ratio` | variable | Display pixel ratio |
| `frame_index` | variable | Current frame counter |
| `frame_time` | variable | Time of current frame |
| `shutdown_glfw` | variable | GLFW shutdown flag |

*(Plus all inherited widget properties: `visible`, `enabled`, `focused`, `font_size`, `child_count`, etc.)*

#### Screen-Specific Methods

| Method | Description |
|--------|-------------|
| `.draw_all()` | Render the screen and all widgets |
| `.draw_setup()` / `.draw_contents()` / `.draw_teardown()` | Manual render pipeline |
| `.clear()` | Clear the framebuffer |
| `.redraw()` | Request a redraw |
| `.nvg_flush()` | Flush pending NanoVG commands |
| `.framebuffer_size()` | Get framebuffer size in pixels |
| `.set_size(size)` / `.size()` | Set/get window size |
| `.move_window(delta)` | Move window by offset |
| `.perform_layout()` | Recompute widget layout |
| `.on_render(callback)` | Set render callback |

---

### `nanogui.widget` (Base Class)

All GUI elements inherit from `widget`. This section documents the shared interface.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `visible` | variable | Widget visibility |
| `enabled` | variable | Widget enabled state |
| `focused` | variable | Focus state |
| `font_size` | variable | Font size |
| `has_font_size` | variable | Whether font size is explicitly set |
| `tooltip` | variable | Tooltip text |
| `cursor` | variable | Cursor style |
| `child_count` | variable | Number of children |
| `parent` | variable | Parent widget |
| `icon_extra_scale` | variable | Icon scaling factor |

#### Geometry Methods

| Method | Description |
|--------|-------------|
| `.position()` / `.set_position(pos)` | Get/set position (vec2i) |
| `.size()` / `.set_size(size)` | Get/set size (vec2i) |
| `.width()` / `.set_width(w)` | Get/set width |
| `.height()` / `.set_height(h)` | Get/set height |
| `.fixed_size()` / `.set_fixed_size(size)` | Get/set fixed size |
| `.absolute_position()` | Get absolute position |
| `.contains(point)` | Point-in-widget test |
| `.visible_recursive()` | Check visibility including parents |

#### Anchor Methods (Responsive Layout)

| Method | Description |
|--------|-------------|
| `.set_anchor_top(value, percent?)` | Set top anchor |
| `.set_anchor_bottom(value, percent?)` | Set bottom anchor |
| `.set_anchor_left(value, percent?)` | Set left anchor |
| `.set_anchor_right(value, percent?)` | Set right anchor |
| `.clear_anchor_top/bottom/left/right()` | Clear individual anchors |
| `.clear_anchors()` | Clear all anchors |

#### Child Management

| Method | Description |
|--------|-------------|
| `.add_child(child)` | Add a child widget |
| `.add_child_at(index, child)` | Insert child at index |
| `.remove_child(child)` | Remove a child |
| `.remove_child_at(index)` | Remove child by index |
| `.child_at(index)` | Get child at index |
| `.child_index(child)` | Get index of child |
| `.find_widget(point)` | Find widget at position |

#### Layout Methods

| Method | Description |
|--------|-------------|
| `.box_layout(orientation, alignment, margin, spacing)` | Set BoxLayout |
| `.group_layout(margin, spacing, group_spacing, group_indent)` | Set GroupLayout |
| `.grid_layout(orientation, resolution, alignment, margin, spacing)` | Set GridLayout |
| `.advanced_grid_layout(cols, rows, margin)` | Set AdvancedGridLayout |
| `.layout()` | Get the current layout object |
| `.perform_layout()` | Recompute layout |
| `.preferred_size()` | Get preferred size |

#### Widget Factory Methods

All widgets can create child widgets directly:

| Method | Returns | Description |
|--------|---------|-------------|
| `.button(caption, icon?)` | widget | Button |
| `.toolbutton(icon, caption?)` | widget | Tool button |
| `.checkbox(caption)` | widget | Checkbox |
| `.label(caption, font?, font_size?)` | label | Text label |
| `.textbox(value?)` | widget | Text input |
| `.textarea()` | widget | Multi-line text |
| `.slider(value, range?, highlight_range?, color?)` | slider | Slider control |
| `.progressbar()` | widget | Progress bar |
| `.combobox()` | widget | Dropdown |
| `.colorpicker(color?)` | widget | Color picker |
| `.colorwheel(color?)` | widget | Color wheel |
| `.graph(caption?)` | widget | Data graph |
| `.imagepanel()` | widget | Image panel |
| `.imageview()` | widget | Image viewer |
| `.canvas(samples?, depth?, stencil?, clear?)` | widget | OpenGL canvas |
| `.tabwidget(font?)` | widget | Tab container |
| `.popupbutton(caption, icon?)` | widget | Popup button |
| `.popup()` | window | Popup window |
| `.new_window(title?)` | window | Child window |
| `.vscrollpanel()` | vscroll | Scrollable panel |
| `.widget()` | widget | Generic container |
| `.messagedialog(type, title, msg, btn?, alt_btn?, alt?)` | window | Message dialog |

#### Event Callbacks

| Method | Callback Signature | Description |
|--------|--------------------|-------------|
| `.on_draw(cb)` | `()` | Custom draw |
| `.on_mouse_button(cb)` | `(pos, button, down, modifiers)` | Mouse click |
| `.on_mouse_motion(cb)` | `(pos, rel, button, modifiers)` | Mouse move |
| `.on_mouse_drag(cb)` | `(pos, rel, button, modifiers)` | Mouse drag |
| `.on_mouse_enter(cb)` | `(pos, enter)` | Mouse enter/leave |
| `.on_scroll(cb)` | `(pos, rel)` | Scroll event |
| `.on_keyboard(cb)` | `(key, scancode, action, modifiers)` | Key press |
| `.on_keyboard_character(cb)` | `(codepoint)` | Character input |
| `.on_focus(cb)` | `(focused)` | Focus change |

```shizoscript
btn = screen.button("Click Me");
btn.on_mouse_button([](pos, button, down, mods) {
    if(down)
        std.print("Button clicked!");
    return true;
});
```

#### Misc

| Method | Description |
|--------|-------------|
| `.screen()` | Get parent screen |
| `.window()` | Get parent window |
| `.theme()` | Get theme object |
| `.request_focus()` | Request input focus |

---

### `nanogui.window`

A draggable, titled window container within a screen.

#### Additional Properties

| Property | Type | Description |
|----------|------|-------------|
| `title` | variable | Window title |
| `modal` | variable | Modal flag |
| `movable` | variable | Allow dragging |
| `resizable` | variable | Allow resizing |
| `resizable_left` | variable | Allow left-edge resize |
| `resizable_right` | variable | Allow right-edge resize |
| `resizable_bottom` | variable | Allow bottom-edge resize |

#### Additional Methods

| Method | Description |
|--------|-------------|
| `.center()` | Center on the screen |
| `.dispose()` | Dispose the window |
| `.button_panel()` | Get or create the button panel |

```shizoscript
gui = nanogui.context();
screen = gui.screen(1280, 720, "Demo");

win = screen.new_window("Settings");
win.group_layout();
win.label("Volume:", "sans-bold", 18);
slider = win.slider(0.5);
slider.on_change([](value) {
    std.print("Volume:", value);
});

screen.perform_layout();
screen.draw_all();
```

---

### `nanogui.label`

A text label with font and color control.

#### Additional Properties

| Property | Type | Description |
|----------|------|-------------|
| `caption` | variable | Label text |
| `font` | variable | Font name |
| `color` | variable | Text color |

---

### `nanogui.slider`

A horizontal slider with range, highlight, and value callbacks.

#### Additional Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | variable | Current value |
| `highlight_color` | variable | Highlight color |

#### Additional Methods

| Method | Description |
|--------|-------------|
| `.range()` / `.set_range(range)` | Get/set slider range (vec2f) |
| `.highlighted_range()` / `.set_highlighted_range(range)` | Get/set highlighted range |
| `.on_change(callback)` | Value change callback `(value)` |
| `.on_final(callback)` | Final value callback `(value)` (on release) |

```shizoscript
slider = win.slider(0.5);
slider.on_change([](val) { std.print("Value:", val); });
slider.on_final([](val) { std.print("Final:", val); });
```

---

### `nanogui.vscroll`

A vertical scroll panel that wraps content taller than its own height.

```shizoscript
scroll = win.vscrollpanel();
content = scroll.widget();
content.group_layout();

for(i = 0; i < 50; i++)
    content.label("Item " + i);
```

---

### `nanogui.theme`

Controls the visual appearance of all widgets.

#### Properties

The theme exposes a large number of color and size properties:

| Category | Properties |
|----------|-----------|
| **Colors** | `text_color`, `text_color_shadow`, `disabled_text_color`, `icon_color`, `border_dark`, `border_light`, `border_medium`, `drop_shadow`, `transparent` |
| **Buttons** | `button_corner_radius`, `button_font_size`, `button_gradient_top/bot_focused/unfocused/pushed` |
| **Windows** | `window_corner_radius`, `window_drop_shadow_size`, `window_fill_focused/unfocused`, `window_header_gradient_top/bot`, `window_header_height`, `window_header_sep_top/bot`, `window_title_focused/unfocused`, `window_popup`, `window_popup_transparent` |
| **Tabs** | `tab_border_width`, `tab_button_horizontal/vertical_padding`, `tab_control_width`, `tab_inner_margin`, `tab_max/min_button_width` |
| **Text** | `standard_font_size`, `text_box_font_size`, `text_box_up/down_icon` |
| **Fonts** | `font_sans_regular`, `font_sans_bold`, `font_mono_regular`, `font_icons` |
| **Icons** | `icon_scale`, `check_box_icon`, `popup_chevron_left/right_icon`, `message_*_icon` |

#### Methods

##### `.to_json()` / `.from_json(json)`

Serialize/deserialize the theme as JSON for saving/loading custom themes.

```shizoscript
theme = screen.theme();
theme_data = theme.to_json();
fileio.write_json("my_theme.json", theme_data);

// Load later
theme.from_json(fileio.read_json("my_theme.json"));
```

---

### `nanogui.layout`

Layout objects are attached to widgets via layout methods.

#### Methods

| Method | Description |
|--------|-------------|
| `.perform_layout(widget)` | Execute layout for a widget |
| `.preferred_size(widget)` | Get preferred size for a widget |

---

#### Full nanogui Example

```shizoscript
using nanogui;
using std;
using eigen;

gui = nanogui.context();
screen = gui.screen(1024, 768, "NanoGUI Demo", true, false);

// Create a window
win = screen.new_window("Controls");
win.group_layout(15, 6, 14, 20);

// Add widgets
win.label("Brightness", "sans-bold");
brightness = win.slider(0.5);
brightness.on_change([](val) {
    print("Brightness:", val);
});

win.label("Options", "sans-bold");
win.checkbox("Enable feature A");
win.checkbox("Enable feature B");

btn = win.button("Apply");
btn.on_mouse_button([](pos, button, down, mods) {
    if(down) print("Settings applied!");
    return true;
});

screen.perform_layout();

// Main render loop
screen.on_render([]() {
    // Custom rendering per frame
});

screen.draw_all();
```

---

## 14. Archive — `zip`

```shizoscript
using zip;
```

### `zip.file`

Create and save ZIP archives.

#### Constructor

```shizoscript
archive = zip.file();
```

#### Methods

---

##### `.add(path, content)` / `.add_file(path, content)`

Add a file entry to the archive.

- **path** — Path/name of the file within the archive.
- **content** — File content.

```shizoscript
archive = zip.file();
archive.add("readme.txt", "Hello from the archive!");
archive.add("data/config.json", '{"key": "value"}');
```

---

##### `.save(path)`

Save the archive to disk.

- **path** — Output file path.

```shizoscript
archive.save("output.zip");
std.print("Archive saved!");
```

---

#### Full ZIP Example

```shizoscript
using zip;
using fileio;

archive = zip.file();

// Add multiple files
files = fileio.files("src/", true);
for(i = 0; i < files.size(); i++)
{
    content = fileio.read_text(files[i]);
    archive.add(files[i], content);
}

archive.save("backup.zip");
std.print("Backup created!");
```

---

## 15. Python Integration — `python`

> **Module:** `shzmodule_python` — must be loaded as an external module.

The Python bridge embeds a CPython interpreter, allowing you to execute Python code, evaluate expressions, import modules, and call Python functions directly from ShizoScript. Data is automatically converted between ShizoScript and Python types.

### Type Mapping

| ShizoScript | Python |
|-------------|--------|
| `int` | `int` |
| `float` | `float` |
| `string` | `str` |
| `None` | `None` |
| JSON object | `dict` |
| JSON array | `list` |
| binary buffer | `bytes` |

### Functions

---

#### `python.version()`

Get the version string of the embedded Python interpreter.

```shizoscript
import python

std.print("Python version:", python.version());
```

---

#### `python.last_error()`

Get the last error message from the Python bridge.

```shizoscript
import python

result = python.exec("invalid python code !!!");
if(!result)
    std.print("Error:", python.last_error());
```

---

#### `python.exec(code)`

Execute a Python code string. Returns `1` on success, `None` on error.

- **code** — Python source code string.

```shizoscript
import python

python.exec("import math");
python.exec("result = math.factorial(10)");
value = python.get_global("result");
std.print("10! =", value); // 3628800
```

---

#### `python.eval(expression)`

Evaluate a Python expression and return the result directly as a ShizoScript value.

- **expression** — Python expression string.

```shizoscript
import python

result = python.eval("2 ** 32");
std.print(result); // 4294967296

pi = python.eval("__import__('math').pi");
std.print(pi); // 3.14159...
```

---

#### `python.call(module, function, args?)`

Call a Python function by module and function name. Arguments are passed as a JSON array.

- **module** — Python module name.
- **function** — Function name within the module.
- **args** *(optional)* — JSON array of positional arguments.

```shizoscript
import python

result = python.call("math", "gcd", [24, 36]);
std.print("GCD:", result); // 12

result = python.call("os.path", "join", ["/home", "user", "docs"]);
std.print(result); // "/home/user/docs"
```

---

#### `python.import(module)`

Import a Python module so it is available for subsequent `eval()` and `exec()` calls. Returns the module short name.

- **module** — Python module name (e.g. `"json"`, `"os.path"`).

```shizoscript
import python

python.import("json");
python.import("os");

files = python.eval("os.listdir('.')");
std.print(files);
```

---

#### `python.exec_file(path)`

Execute a `.py` file. Returns `1` on success, `None` on error.

- **path** — Path to the Python file.

```shizoscript
import python

python.exec_file("scripts/analysis.py");
result = python.get_global("analysis_result");
```

---

#### `python.set_global(name, value)`

Set a variable in Python's `__main__` namespace. Returns `1` on success.

- **name** — Variable name.
- **value** — Value to set (automatically converted to Python type).

```shizoscript
import python

python.set_global("data", [x=10, y=20, label="test"]);
python.exec("print(data)"); // {'x': 10, 'y': 20, 'label': 'test'}
```

---

#### `python.get_global(name)`

Get a variable from Python's `__main__` namespace. Returns `None` if not found.

- **name** — Variable name to retrieve.

```shizoscript
import python

python.exec("import sys");
python.exec("version_info = list(sys.version_info[:3])");
ver = python.get_global("version_info");
std.print("Python", ver[0] + "." + ver[1] + "." + ver[2]);
```

---

### Full Example

```shizoscript
import python

using std;

// Set up data in Python
python.set_global("numbers", [4, 8, 15, 16, 23, 42]);

// Run Python code
python.exec("
total = sum(numbers)
average = total / len(numbers)
sorted_nums = sorted(numbers, reverse=True)
");

// Retrieve results
total = python.get_global("total");
avg = python.get_global("average");
sorted = python.get_global("sorted_nums");

print("Total:", total);
print("Average:", avg);
print("Sorted:", sorted);

// Use Python libraries
python.import("json");
config = python.eval('json.dumps({"host": "localhost", "port": 8080}, indent=2)');
print(config);
```

---

## 16. Documentation Utilities — `shzdocs`

```shizoscript
using shzdocs;
```

Built-in documentation lookup for all registered functions, classes, and namespaces.

### Functions

---

#### `shzdocs.get_all()`

Retrieve documentation for all registered functions, classes, and namespaces.

```shizoscript
docs = shzdocs.get_all();
std.print(docs);
```

---

#### `shzdocs.find_all(keyword)`

Search documentation for all entries matching a keyword.

- **keyword** — Search string.

```shizoscript
results = shzdocs.find_all("json");
std.print(results);
```

---

#### `shzdocs.load_all_modules()`

Load all available modules so their documentation becomes searchable.

```shizoscript
shzdocs.load_all_modules();
all_docs = shzdocs.get_all();
```

---

## Appendix: Quick Reference

### Common Patterns

```shizoscript
// File reading with error handling
try
{
    data = fileio.read_json("config.json");
    std.print("Loaded config:", data.host);
}
catch(e)
{
    std.error("Failed to load config:", e);
}

// HTTP API call
http = curl.curl();
res = http.get("https://api.example.com/status");
if(res.ok)
{
    data = std.json(res.body);
    std.print("Status:", data.status);
}

// Threaded work
worker = std.thread([](task_id) {
    std.print("Processing task", task_id);
    std.sleep(1000);
    std.print("Task", task_id, "done");
});

for(i = 0; i < 5; i++)
    worker.run(i);

worker.join();
std.print("All tasks complete");
```