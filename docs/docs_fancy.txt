# API Reference

> This document provides a full, readable reference for all namespaces, functions, constants, and classes exposed by the scripting language.

---

## FileIO (`fileio`)

> **Imports**  
> ```shz
> using fileio;
> ```

### Constants
| Constant | Description |
|----------|-------------|  
| `fileio.copy` | – |  
| `fileio.exists` | – |  
| `fileio.file_dir` | placeholder_desc |  
| `fileio.file_name` | placeholder_desc |  
| `fileio.files` | – |  
| `fileio.is_directory` | – |  
| `fileio.is_file` | – |  
| `fileio.mkdir` | placeholderdesc |  
| `fileio.move` | – |  
| `fileio.pure_name` | placeholder_desc |  
| `fileio.read_file` | – |  
| `fileio.read_json` | – |  
| `fileio.read_string` | – |  
| `fileio.read_text` | – |  
| `fileio.remove` | – |  
| `fileio.rename` | – |  
| `fileio.write_file` | – |  
| `fileio.write_json` | – |  
| `fileio.write_string` | – |  
| `fileio.write_text` | – |

### Functions

| Function | Signature | Description |
|----------|----------|-------------|
| `fileio.copy` | `fileio.copy(src: string, dest: string)` | Copy file or directory. *Folders will be created if required* |  
| `fileio.exists` | `fileio.exists(path: string)` | Check if path is a directory |
| `fileio.file_dir` | `fileio.file_dir()` | placeholder_desc |
| `fileio.file_name` | `fileio.file_name()` | placeholder_desc |
| `fileio.files` | `fileio.files(path: string, recursive: bool = true)` | List files in directory |
| `fileio.is_directory` | `fileio.is_directory(path: string)` | Check if path is a directory |
| `fileio.is_file` | `fileio.is_file(path: string)` | Check if path is a file |
| `fileio.mkdir` | `fileio.mkdir()` | placeholderdesc |  
| `fileio.move` | `fileio.move(src: string, dest: string)` | Move file or directory (uses rename or copy/delete fallback) |  
| `fileio.pure_name` | `fileio.pure_name()` | placeholder_desc |
| `fileio.read_file` | `fileio.read_file(path: string)` | Read file into binary buffer |  
| `fileio.read_json` | `fileio.read_json(path: string)` | Read JSON file and return parsed object |  
| `fileio.read_string` | `fileio.read_string(path: string)` | Read text file into string |  
| `fileio.read_text` | `fileio.read_text(path: string)` | Read text file into string |
| `fileio.remove` | `fileio.remove(path: string | list)` | Remove files or directories (recursive) |
| `fileio.rename` | `fileio.rename(src: string, dest: string)` | Rename file or directory |
| `fileio.write_file` | `fileio.write_file(path: string, data: object)` | Write binary data from a serializable object to a file, returning true if the write succeeds |
| `fileio.write_json` | `fileio.write_json(path: string, data: string)` | Writes a JSON string to a file. *IMPORTANT:* Do NOT MODIFY the json that is passed, in another thread! Always pass unique non‑mutable jsons (copy before if needed). |
| `fileio.write_string` | `fileio.write_string(path: string, data: string)` | Write string to file |
| `fileio.write_text` | `fileio.write_text(path: string, data: string)` | Write string to file |

---

## Math (`math`)

> **Imports**  
> ```shz
> using math;
> ```

### Constants
| Constant | Value |
|----------|-------|
| `math.PI` | 3.141593 |

### Functions

| Function | Signature | Description |
|----------|----------|-------------|  
| `math.abs` | `math.abs(value: float)` | Return the absolute value of a numeric input |
| `math.acos` | `math.acos(x: float)` | Inverse cosine (arccos) |
| `math.asin` | `math.asin(x: float)` | Inverse sine (arcsin) |  
| `math.atan` | `math.atan(x: float)` | Inverse tangent (arctan) |
| `math.atan2` | `math.atan2(y: float, x: float)` | Arctangent from y and x |  
| `math.cbrt` | `math.cbrt(x: float)` | Cube root |
| `math.ceil` | `math.ceil(value: float)` | Return the smallest integer greater than or equal to the given number |
| `math.clamp` | `math.clamp(x: float, min: float, max: float)` | Clamp value between min and max |
| `math.cos` | `math.cos(x: float)` | Cosine of angle (radians) |
| `math.exp` | `math.exp(x: float)` | Exponential function (e^x) |  
| `math.floor` | `math.floor(value: float)` | Return the largest integer less than or equal to the given number |
| `math.fract` | `math.fract(x: float)` | Fractional part of value |
| `math.lerp` | `math.lerp(a: float, b: float, t: float)` | Linear interpolation |
| `math.log` | `math.log(x: float)` | Natural logarithm (base e) |
| `math.log10` | `math.log10(x: float)` | Base‑10 logarithm |
| `math.log2` | `math.log2(x: float)` | Base‑2 logarithm |
| `math.max` | `math.max(values: float...)` | Maximum of values |
| `math.min` | `math.min(values: float...)` | Minimum of values |
| `math.pow` | `math.pow(base: float, exp: float)` | Power function |
| `math.rand` | `math.rand()` | Random float in range [0,1) |
| `math.round` | `math.round(value: float)` | Return the nearest integer value to the given number |
| `math.sign` | `math.sign(x: float)` | Sign of number (returns +1, 0, or -1) |  
| `math.sin` | `math.sin(x: float)` | Sine of angle (radians) |
| `math.smoothstep` | `math.smoothstep(edge0: float, edge1: float, x: float)` | Smoothstep interpolation |
| `math.sqrt` | `math.sqrt(x: float)` | Square root |  
| `math.tan` | `math.tan(x: float)` | Tangent of angle (radians) |

---

## Shizonet (`shizonet`)  

> **Imports**  
> ```shz
> using shizonet; 
> ```

### Functions

| Function | Signature | Description |
|----------|----------|-------------|  
| `shizonet.client` | `shizonet.client(node_name: string, port: int = SHZNET_CLIENT_PORT) -> shizonet.client` | Create a new network client with the specified node name and optional port |
| `shizonet.server` | `shizonet.server(node_name: string, port: int = SHZNET_SERVER_PORT) -> shizonet.server` | Create a new network server with the specified node name and optional port |

---

## ShzDocs (`shzdocs`)  

> **Imports**  
> ```shz
> using shzdocs;
> ```

### Functions

| Function | Signature | Description |
|----------|----------|-------------|
| `shzdocs.find_all` | `shzdocs.find_all(Keyword: string)` | Get documentation about all function, classes, etc. |
| `shzdocs.get_all` | `shzdocs.get_all()` | Get documentation about all function, classes, etc. |

---

## ShzTests (`shztests`)  

> **Imports**     
> ```shz
> using shztests;
> ```

### Functions

| Function | Signature | Description |
|----------|----------|-------------|  
| `shztests.check_object` | `shztests.check_object()` |  |
| `shztests.test_object` | `shztests.test_object() -> test_object` |  |

---

## Standard Library (`std`)  

> **Imports**  
> ```shz
> using std;
> ```

### Constants

| Constant | Value | Meaning |
|----------|-------|--------|  
| `std.MB_ICONERROR` | 16 | Message‑box icon: error |
| `std.MB_ICONINFORMATION` | 64 | Message‑box icon: information |
| `std.MB_ICONWARNING` | 48 | Message‑box icon: warning |
| `std.MB_OK` | 0 | OK button only |
| `std.MB_OKCANCEL` | 1 | OK and Cancel buttons |
| `std.MB_RETRYCANCEL` | 5 | Retry and Cancel buttons |
| `std.MB_YESNO` | 4 | Yes and No buttons |
| `std.MB_YESNOCANCEL` | 3 | Yes, No, and Cancel buttons |

### Functions

| Function | Signature | Description |
|----------|----------|-------------|
| `std.argc` | `std.argc()` | Return argc |
| `std.argv` | `std.argv(index: int)` | Return argv |
| `std.buffer` | `std.buffer() -> std.buffer` | Instantiate a new shz_std_buffer object |
| `std.cd` | `std.cd(path: string)` | Change current working directory |
| `std.count` | `std.count(value: Container, string, or object)` | Alias of len(): returns number of elements |  
| `std.cout` | `std.cout()` | Print to terminal directly |
| `std.error` | `std.error()` | Print to console output |
| `std.float` | `std.float()` | placholder_desc |  
| `std.free` | `std.free()` | Delete an object |
| `std.has_admin_privilege` | `std.has_admin_privilege()` | Returns true if run as administrator |
| `std.hideconsole` | `std.hideconsole()` | Detach and hide the console window (Windows only) |
| `std.import` | `std.import()` | placeholder_desc |
| `std.import_all` | `std.import_all()` | placeholder_desc |
| `std.indentation` | `std.indentation()` | placholder_desc |
| `std.input` | `std.input(prompt: string)` | Reads a line of text from standard input, optionally displaying a prompt message. |
| `std.int` | `std.int()` | placholder_desc |
| `std.is_function` | `std.is_function()` | placholder_desc |
| `std.is_json` | `std.is_json()` | placholder_desc |
| `std.is_list` | `std.is_list()` | placholder_desc |
| `std.is_string` | `std.is_string()` | placholder_desc |
| `std.json` | `std.json(json: string) -> std.json` | Create a new JSON object, optionally initialized from a JSON string |
| `std.len` | `std.len(value: Container, string, or object)` | Return size/length of a list, map, array, string, or object container |
| `std.messagebox` | `std.messagebox(text: string, caption: string, buttons: btns)` | Display a message box with specified text and optional caption |
| `std.millis` | `std.millis()` | placholder_desc |
| `std.print` | `std.print()` | Print to console output |
| `std.runtime_error` | `std.runtime_error()` | Print to console output |
| `std.sleep` | `std.sleep(milliseconds: Duration)` | Suspend script execution for a duration (async) |
| `std.string` | `std.string(value: string) -> std.string` | Create a new string, optionally initialized with a given value |
| `std.system` | `std.system(command: string)` | Execute a shell command and return its exit code. |
| `std.system_path` | `std.system_path(path: string)` | Expand environment variables and normalize a filesystem path |
| `std.thread` | `std.thread(callback: function) -> std.thread` | threading |
| `std.timestamp` | `std.timestamp()` | placholder_desc |
| `std.vaddress` | `std.vaddress(value: Variable)` | Get the type of a variable |
| `std.vtype` | `std.vtype(value: Variable)` | Get the type of a variable |  
| `std.warn` | `std.warn()` | Print to console output |  
| `std.wd` | `std.wd()` | placeholder |
| `std.web_get` | `std.web_get(url: string)` | Perform a simple HTTP GET request and return the response body |

---

### Usage examples

```shz
# FileIO
using fileio;
if (fileio.exists("foo.txt")) { print("Exists!"); }

# Math
using math;
print(math.sin(math.PI / 4));

# Standard library
using std;
std.print("Hello, world!");
std.sleep(2000);           # wait two seconds
```

---

*All symbols are available only after importing the corresponding namespace.  
For detailed usage or examples, refer to the official documentation or call the helper functions from the `shzdocs` module.*