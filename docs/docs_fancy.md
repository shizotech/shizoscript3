# ShizScript Language Reference

> A lightweight, JavaScript‑/Python‑style scripting language with a **simple syntax** and a wide set of utilities.  
> The documentation below covers all **available namespaces** and their public API.

---

## Table of Contents

1. [Namespaces](#namespaces)
   - [fileio](#fileio)
   - [math](#math)
   - [shizonet](#shizonet)
   - [shzdocs](#shzdocs)  
   - [shztests](#shztests)
   - [std](#std)  
2. [Usage](#usage)
3. [Examples](#examples)  

---

## Namespaces

Namespaces group related functions and constants.  
They can be imported with the `using` keyword:

```shiz
using fileio;   // imports fileio namespace
```

If you import the namespace, members can be used without the namespace prefix:

```shiz
using fileio;
copy("src.txt", "dest.txt");   // same as fileio.copy(...) after import
```

---

### Namespace: `fileio`

| Symbol | Type | Description |
|--------|------|-------------|
| `fileio` | namespace | Provides utilities for file and directory manipulation. |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `fileio.copy` | `src: string, dest: string` | Copy a file or directory. Creates destination folders if needed. |
| `fileio.exists` | `path: string` | Return `true` if the specified path exists (file or folder). | 
| `fileio.file_dir` | `path: string` | *Not documented.* Return the directory component of `path`. |
| `fileio.file_name` | `path: string` | *Not documented.* Return the file name component of `path`. |
| `fileio.files` | `path: string, recursive: bool = true` | List all files in a directory. If `recursive` is `false`, only top‑level files are returned. |
| `fileio.is_directory` | `path: string` | Return `true` if the path refers to a directory. |
| `fileio.is_file` | `path: string` | Return `true` if the path refers to a file. |
| `fileio.mkdir` | `path: string` | *Not documented.* Create a directory (including intermediate paths). |
| `fileio.move` | `src: string, dest: string` | Move a file or directory. Uses rename; falls back to copy/del if rename fails. |
| `fileio.pure_name` | `path: string` | *Not documented.* Return the base name of `path` without extension. |
| `fileio.read_file` | `path: string` | Read a file into a binary buffer. |
| `fileio.read_json` | `path: string` | Read a JSON file and return the parsed object. | 
| `fileio.read_string` | `path: string` | Read a text file into a string. |
| `fileio.read_text` | `path: string` | Synonym for `read_string`. |
| `fileio.remove` | `path: string | list` | Recursively delete the specified file(s) or directory. |
| `fileio.rename` | `src: string, dest: string` | Rename a file or directory. |
| `fileio.write_file` | `path: string, data: object` | Write a binary object to a file. Returns `true` on success. |
| `fileio.write_json` | `path: string, data: string` | Write a JSON string to a file. Do **not** modify the source string in other threads. |
| `fileio.write_string` | `path: string, data: string` | Write a text string to a file. |
| `fileio.write_text` | `path: string, data: string` | Synonym for `write_string`. |


---

### Namespace: `math`

| Symbol | Type | Description |
|--------|------|-------------| 
| `math` | namespace | Provides mathematical constants and utilities. |
| `math.PI` | constant | `3.141593` – value of π. |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------| 
| `math.abs` | `value: float` | Return the absolute value of the input. |
| `math.acos` | `x: float` | Inverse cosine – returns an angle in radians. |
| `math.asin` | `x: float` | Inverse sine – returns an angle in radians. | 
| `math.atan` | `x: float` | Inverse tangent – returns an angle in radians. |
| `math.atan2` | `y: float, x: float` | Calculate `atan2(y, x)` – arctangent from coordinates. |
| `math.cbrt` | `x: float` | Cube root of `x`. |
| `math.ceil` | `value: float` | Return the smallest integer ≥ “value”. |
| `math.clamp` | `x: float, min: float, max: float` | Clamp `x` to stay between `min` and `max`. | 
| `math.cos` | `x: float` | Cosine of an angle in radians. |
| `math.exp` | `x: float` | Exponential function `e^x`. |
| `math.floor` | `value: float` | Return the largest integer ≤ “value”. |
| `math.fract` | `x: float` | Return the fractional part of `x`. |
| `math.lerp` | `a: float, b: float, t: float` | Linear interpolation: `(1‑t) * a + t * b`. |
| `math.log` | `x: float` | Natural logarithm (base e). |
| `math.log10` | `x: float` | Base‑10 logarithm. |
| `math.log2` | `x: float` | Base‑2 logarithm. |
| `math.max` | `values: float...` | Return the maximum of the given numbers. | 
| `math.min` | `values: float...` | Return the minimum of the given numbers. | 
| `math.pow` | `base: float, exp: float` | Compute `base^exp`. | 
| `math.rand` | `()` | Random floating point in `[0, 1)`. |
| `math.round` | `value: float` | Round to the nearest integer. |
| `math.sign` | `x: float` | Return `+1` if x > 0, `-1` if x < 0, or `0` if x = 0. | 
| `math.sin` | `x: float` | Sine of an angle in radians. |
| `math.smoothstep` | `edge0: float, edge1: float, x: float` | Smoothstep interpolation. | 
| `math.sqrt` | `x: float` | Square root of `x`. |
| `math.tan` | `x: float` | Tangent of an angle in radians. |


---

### Namespace: `shizonet` (Network)

| Symbol | Type | Description |
|--------|------|-------------| 
| `shizonet` | namespace | Provides client/server utilities for inter-node communication. |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------| 
| `shizonet.client` | `node_name: string, port: int = SHZNET_CLIENT_PORT` | Create a new network client with the given node name and optional listening port. |
| `shizonet.server` | `node_name: string, port: int = SHZNET_SERVER_PORT` | Create a new network server with the given node name and optional listening port. |


---

### Namespace: `shzdocs`

| Symbol | Type | Description |
|--------|------|-------------| 
| `shzdocs` | namespace | Documentation query helpers. |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `shzdocs.find_all` | `Keyword: string` | Return all documentation entries that include the given keyword. | 
| `shzdocs.get_all` | `()` | Return documentation for all available functions, classes, etc. |

---

### Namespace: `shztests` (Testing)

| Symbol | Type | Description |
|--------|------|-------------|  |
| `shztests` | namespace | Test harness utilities. |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `shztests.check_object` | `()` | Placeholder – perform a test check. | 
| `shztests.test_object` | `() -> test_object` | Return test object instance. |


---

### Namespace: `std` (Standard Library)

| Symbol | Type | Description |
|--------|------|-------------|  |
| `std` | namespace | Core utilities and system interaction. |
| `std.MB_ICONERROR` | constant | 16 |
| `std.MB_ICONINFORMATION` | constant | 64 |
| `std.MB_ICONWARNING` | constant | 48 |
| `std.MB_OK` | constant | 0 | 
| `std.MB_OKCANCEL` | constant | 1 |
| `std.MB_RETRYCANCEL` | constant | 5 |
| `std.MB_YESNO` | constant | 4 |
| `std.MB_YESNOCANCEL` | constant | 3 |

#### Functions

| Function | Signature | Description |
|----------|-----------|-------------| 
| `std.argc` | `()` | Return the number of command‑line arguments. |
| `std.argv` | `index: int` | Return the `index`‑th command‑line argument. |
| `std.buffer` | `()` | Create a new `shz_std_buffer` object. |
| `std.cd` | `path: string` | Change the current working directory. |
| `std.count` | `value: Container | string | object` | Alias for `len()`. |
| `std.cout` | `(...args)` | Print values directly to the terminal. |
| `std.error` | `(...args)` | Print to the console (stderr). |
| `std.float` | `()` | Placeholder – create a float object. |
| `std.free` | `obj` | Delete an object. |
| `std.has_admin_privilege` | `()` | Return `true` if the script runs with administrator rights. | 
| `std.hideconsole` | `()` | Detach and hide the console window (Windows only). |
| `std.import` | `()` | Placeholder – load a specific module. |
| `std.import_all` | `()` | Placeholder – load all modules. |
| `std.indentation` | `()` | Placeholder – handle indentation. |
| `std.input` | `prompt: string = ""` | Read a line from stdin, optionally displaying a prompt. | 
| `std.int` | `()` | Placeholder – create an integer object. | 
| `std.is_function` | `()` | Placeholder – check if a variable is a function. | 
| `std.is_json` | `()` | Placeholder – check if a variable is a JSON object. | 
| `std.is_list` | `()` | Placeholder – check if a variable is a list. | 
| `std.is_string` | `()` | Placeholder – check if a variable is a string. | 
| `std.json` | `json: string = ""` | Create a JSON object, optionally parsed from a string. |
| `std.len` | `value: Container | string | object` | Return length of a container, string or object. | 
| `std.messagebox` | `text: string, caption: string, buttons: btns` | Display a modal message box. | 
| `std.millis` | `()` | Placeholder – current milliseconds. | 
| `std.print` | `(...args)` | Print to console output. | 
| `std.runtime_error` | `()` | Placeholder – raise a runtime error. | 
| `std.sleep` | `milliseconds: int` | Asynchronously pause execution for the specified duration. |  |
| `std.string` | `value: string = ""` | Create a new string object. |
| `std.system` | `command: string` | Execute a shell command and return its exit code. | 
| `std.system_path` | `path: string` | Expand environment variables and normalise filesystem path. | 
| `std.thread` | `callback: function` | Create a new thread executing the provided function. | 
| `std.timestamp` | `()` | Placeholder – get current timestamp. | 
| `std.vaddress` | `value: any` | Inspect memory address of a variable. | 
| `std.vtype` | `value: any` | Determine the type of a variable. | 
| `std.warn` | `(...args)` | Print a warning to console output. | 
| `std.wd` | `()` | Placeholder – working directory helper. | 
| `std.web_get` | `url: string` | Perform an HTTP GET request and return the raw response body. |


---

## Usage

1. **Import the desired namespace**   (or use the fully‑qualified name).
2. **Call functions** or access constants as shown in the examples.

```shiz
using fileio;
use math;                // import all math utilities

// copy a file
fileio.copy("config.json", "/etc/config.json");

// simple math
var area = math.PI * 5 * 5;
print("Area of circle:", area);

// server
node = shizonet.server("mynode", 9090);
```

---

## Examples

### Listing a directory (recursive)

```shiz
files = fileio.files("/home/user/project", true);
foreach(file in files) {
    print(file);
}
```

### Quick math snippet

```shiz
var a = 3;
var b = 4;
var c = math.sqrt(a * a + b * b);   // Pythagorean theorem
print("hypotenuse = ", c);           // Outputs: hypotenuse = 5
```

### Basic network client

```shiz
client = shizonet.client("myclient", 8000);
client.send("Hello, server!");
```

### Show a message box

```shiz
std.messagebox("Operation completed successfully.",
               "Info", std.MB_OK | std.MB_ICONINFORMATION);
```


---

> **Note:** All functions are *asynchronous* unless explicitly stated; use `await` if needed in a coroutine context.

---

*For more advanced topics, consult the in‑language docs or contact the development team.*