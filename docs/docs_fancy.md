# ShizoScript Standard Library Documentation

A complete reference for the built‑in modules that come with ShizoScript.  
All namespaces share the same calling convention: the module name is prefixed to each exported function (`fileio.copy(...)`, `math.abs(...)`, etc.).  The `using` keyword can be used in a script to bring a namespace into the global scope, after which the functions may be called without the prefix (e.g. `copy(...)` instead of `fileio.copy(...)`).

---

## Table of Contents

- [fileio](#fileio)  
  - [Constants](#fileio-constants)  
  - [Functions](#fileio-functions)  
- [math](#math)  
  - [Constant](#math-constants)   (only `PI`)  
  - [Functions](#math-functions)   (numeric helpers)  
- [shizonet](#shizonet)   (network helpers)  
  - [Functions](#shizonet-functions)   (client / server constructors)  
- [shzdocs](#shzdocs)   (documentation API)  
  - [Functions](#shzdocs-functions)   (search / lookup)  
- [shztests](#shztests)   (test harness)  
  - [Functions](#shztests-functions)   (object checks)  
- [std](#std)   (core utilities)   (large set)  
  - [Constants](#std-constants)  
  - [Functions](#std-functions)  

---

## <a name="fileio"></a>fileio

File‑system manipulation and I/O functions.  
All paths are relative to the current working directory unless an absolute path is supplied.

### <a name="fileio-constants"></a>Constants

| Name  | Value | Description |
|-------|-------|-------------|
| None | – | No constants are defined in the `fileio` namespace. |

### <a name="fileio-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **copy** | `copy(src: string, dest: string)` | Copy a file or directory. Folders in `dest` are created automatically if missing. |
| **exists** | `exists(path: string)` | Check if a path exists (file *or* directory). Returns `true`/`false`. |
| **file_dir** | `file_dir()` | **Placeholder – to be implemented.** |
| **file_name** | `file_name()` | **Placeholder – to be implemented.** |
| **files** | `files(path: string, recursive: bool = true)` | List all files in a directory. If `recursive` is `false` only the top‑level files are returned. |  
| **is_directory** | `is_directory(path: string)` | Returns `true` if the given path is a directory. |
| **is_file** | `is_file(path: string)` | Returns `true` if the given path is a regular file. |
| **mkdir** | `mkdir()` | **Placeholder – to be implemented.** |
| **move** | `move(src: string, dest: string)` | Move a file or directory. Uses rename if possible; otherwise falls back to copy + delete. |
| **pure_name** | `pure_name()` | **Placeholder – to be implemented.** |
| **read_file** | `read_file(path: string)` | Read the entire file into a binary buffer. |
| **read_json** | `read_json(path: string)` | Read a JSON file and return the parsed object. |
| **read_string** | `read_string(path: string)` | Read a text file into a string. |
| **read_text** | `read_text(path: string)` | Alias of `read_string`. |
| **remove** | `remove(path: string | list)` | Recursively delete the file(s) or directory(s). |  
| **rename** | `rename(src: string, dest: string)` | Rename a file or directory. |
| **write_file** | `write_file(path: string, data: object)` | Serialize `data` into binary form and write to `path`. Returns `true` on success. |
| **write_json** | `write_json(path: string, data: string)` | Write a *pre‑formatted* JSON string to a file. Do **not** modify the string after passing it. |  
| **write_string** | `write_string(path: string, data: string)` | Write a string to a file. |
| **write_text** | `write_text(path: string, data: string)` | Alias of `write_string`. |  

---

## <a name="math"></a>math

Mathematical utilities.

### <a name="math-constants"></a>Constants

| Name | Value | Description |
|------|-------|-------------|
| **PI** | `3.141593` | The value of π to six decimal places. |  

### <a name="math-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **abs** | `abs(value: float)` | Return the absolute value of `value`. |
| **acos** | `acos(x: float)` | Inverse cosine of `x`. `x` must be in `[-1, 1]`. |  
| **asin** | `asin(x: float)` | Inverse sine of `x`. `x` must be in `[-1, 1]`. |
| **atan** | `atan(x: float)` | Inverse tangent of `x`. |
| **atan2** | `atan2(y: float, x: float)` | Compute arctangent by separating `y` and `x` components. |
| **cbrt** | `cbrt(x: float)` | Cube root of `x`. |
| **ceil** | `ceil(value: float)` | Smallest integer ≥ `value`. |
| **clamp** | `clamp(x: float, min: float, max: float)` | Clamp `x` into the inclusive interval `[min, max]`. |
| **cos** | `cos(x: float)` | Cosine of `x` (radians). |
| **exp** | `exp(x: float)` | e<sup>**x**</sup>. |
| **floor** | `floor(value: float)` | Largest integer ≤ `value`. |
| **fract** | `fract(x: float)` | Fractional part of `x` (`x - floor(x)`). |
| **lerp** | `lerp(a: float, b: float, t: float)` | Linear interpolation between `a` and `b` using `t` in `[0,1]`. |
| **log** | `log(x: float)` | Natural logarithm (base *e*). `x` > 0. |
| **log10** | `log10(x: float)` | Base‑10 logarithm. `x` > 0. |  
| **log2** | `log2(x: float)` | Base‑2 logarithm. `x` > 0. |  
| **max** | `max(values: float...)` | Return the largest of the supplied numbers. |  
| **min** | `min(values: float...)` | Return the smallest of the supplied numbers. |  
| **pow** | `pow(base: float, exp: float)` | Compute base<sup>exp</sup>. |  
| **rand** | `rand()` | Returns a pseudo‑random float in `[0, 1)`. |
| **round** | `round(value: float)` | Return the nearest integer to `value`. |
| **sign** | `sign(x: float)` | Return `+1` if `x > 0`, `0` if `x = 0`, `-1` if `x < 0`. |
| **sin** | `sin(x: float)` | Sine of `x` (radians). |
| **smoothstep** | `smoothstep(edge0: float, edge1: float, x: float)` | Smooth interpolation between `edge0` and `edge1`. |
| **sqrt** | `sqrt(x: float)` | Square root of `x`. |
| **tan** | `tan(x: float)` | Tangent of `x` (radians). |

---

## <a name="shizonet"></a>shizonet

Network utilities for building simple client/server applications.

### <a name="shizonet-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **client** | `client(node_name: string, port: int = SHZNET_CLIENT_PORT) -> shizonet.client` | Create a new network **client**. `node_name` identifies the local node; `port` is the listening local port. |
| **server** | `server(node_name: string, port: int = SHZNET_SERVER_PORT) -> shizonet.server` | Create a new network **server** instance. Parameters are analogous to `client`. |

---

## <a name="shzdocs"></a>shzdocs

Light‑weight API for querying the built‑in documentation database.

### <a name="shzdocs-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **find_all** | `find_all(Keyword: string)` | Retrieve all entries that contain the supplied keyword. |
| **get_all** | `get_all()` | Return the entire documentation set. |

---

## <a name="shztests"></a>shztests

Simple unit test helpers. (Current functionality is minimal.)

### <a name="shztests-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **check_object** | `check_object()` | **Placeholder – functionality TBD.** |  
| **test_object** | `test_object() -> test_object` | **Placeholder – functionality TBD.** |

---

## <a name="std"></a>std

Core language utilities, including console I/O, process control, and data handling.  
These functions are fundamental to almost every script.

### <a name="std-constants"></a>Constants

| Name | Value | Description |
|------|-------|-------------|
| `MB_ICONERROR` | `16` | Flag for message box icons. |  
| `MB_ICONINFORMATION` | `64` | “Information” icon. |
| `MB_ICONWARNING` | `48` | “Warning” icon. |
| `MB_OK` | `0` | “OK” button only. |
| `MB_OKCANCEL` | `1` | “OK” and “Cancel”. |
| `MB_RETRYCANCEL` | `5` | “Retry” and “Cancel”. |
| `MB_YESNO` | `4` | “Yes” and “No”. |
| `MB_YESNOCANCEL` | `3` | “Yes”, “No”, and “Cancel”. |

### <a name="std-functions"></a>Functions

| Function | Signature | Description |
|---|---|---|
| **argc** | `argc()` | Return the number of command‑line arguments. |
| **argv** | `argv(index: int)` | Return the `index`‑th command‑line argument. |
| **buffer** | `buffer() -> std.buffer` | Instantiate a new `shz_std_buffer` object. |
| **cd** | `cd(path: string)` | Change current working directory. |
| **count** | `count(value: Container | string | object)` | Alias of `len()`: returns size of the container. |
| **cout** | `cout()` | Directly print to the terminal (raw output). |
| **error** | `error()` | Write a message to stderr. |
| **float** | `float()` | **Placeholder – functionality TBD.** |
| **free** | `free()` | Delete an object from memory. |
| **has_admin_privilege** | `has_admin_privilege()` | Return `true` if the script runs with administrator (Windows) or root privileges. |
| **hideconsole** | `hideconsole()` | Detach and hide the console window (Windows only). |  
| **import** | `import()` | **Placeholder – functionality TBD.** |  
| **import_all** | `import_all()` | **Placeholder – functionality TBD.** |
| **indentation** | `indentation()` | **Placeholder – functionality TBD.** |
| **input** | `input(prompt: string)` | Read a line from stdin, optionally displaying `prompt`. |
| **int** | `int()` | **Placeholder – functionality TBD.** |
| **is_function** | `is_function()` | **Placeholder – functionality TBD.** |
| **is_json** | `is_json()` | **Placeholder – functionality TBD.** |
| **is_list** | `is_list()` | **Placeholder – functionality TBD.** |
| **is_string** | `is_string()` | **Placeholder – functionality TBD.** |
| **json** | `json(json: string) -> std.json` | Create a JSON object; optional initial JSON string. |
| **len** | `len(value: Container | string | object)` | Return size of a container, string, or object. |  
| **messagebox** | `messagebox(text: string, caption: string, buttons)` | Display a message box; `buttons` can be any of the `MB_*` constants. |
| **millis** | `millis()` | **Placeholder – functionality TBD.** |
| **print** | `print(...)` | Print values to stdout. The function **returns** the concatenated string when called as: `combined_str = print(a, b, c)`; otherwise it outputs directly.  
  ```text
  +-----------------------+
  | print("Hello World"); |
  +-----------------------+

  +----------------------------------------------+
  | print("test_var = ", test_var, "."); |
  +----------------------------------------------+  
  ``` |
| **runtime_error** | `runtime_error()` | Raise a runtime error and terminate script execution. |
| **sleep** | `sleep(milliseconds: Duration)` | Suspend execution asynchronously for *milliseconds* milliseconds. |
| **string** | `string(value: string) -> std.string` | Create new string instance; optionally initialize with `value`. |
| **system** | `system(command: string)` | Execute `command` in the shell and return its exit code. |  
| **system_path** | `system_path(path: string)` | Expand environment variables and normalize the file path. |  
| **thread** | `thread(callback: function) -> std.thread` | Spawn a new thread that runs `callback`. |  
| **timestamp** | `timestamp()` | **Placeholder – functionality TBD.** |  
| **vaddress** | `vaddress(value: Variable)` | Return the raw memory address of `value`. |  
| **vtype** | `vtype(value: Variable)` | Return the type of `value`. |   |
| **warn** | `warn()` | Write a warning message to stdout. |  
| **wd** | `wd()` | **Placeholder – functionality TBD.** |  
| **web_get** | `web_get(url: string)` | Perform a simple HTTP GET request; returns response body as a string. |

---

### Notes

* **Placeholders** marked in the table are functions or constants that are currently
  unimplemented or whose documentation has not been finalized.  
  The module will be updated when these features are added.

* When importing a namespace into the global scope (`using fileio;`), all constants
  and functions become directly available, e.g. `copy(...)` instead of `fileio.copy(...)`.  
  This can be convenient but may also pollute the global namespace, so use it judiciously.

* Error handling: Many functions return **boolean** values or raise runtime errors on failure.  
  For operations that may fail (e.g., file I/O, network), check the return value or catch exceptions accordingly.

* Threading: `std.thread(callback)` starts a new thread that runs the supplied callback
  asynchronously; the main script continues immediately.  Synchronisation primitives
  (locks, mutexes) are not provided by the standard library; use `std.sleep()` or
  other means to coordinate.

---

#### Example: Read a JSON file and sum one of its numeric fields

```shz
using fileio
using math

local cfg = read_json("config.json")
local count = 0

for item in cfg do
  count = count + item.value
end

print("Total value:", count, "\n")
```

#### Example: Create a simple TCP echo server

```shz
using shizonet

local server = shizonet.server("EchoServer", 12345)

server.on_message = function(client, data)
  client.send(data)  -- Echo back the same data
end

print("Echo server listening on port 12345...")
```

---

Feel free to explore each namespace to discover all utilities available in ShizoScript. Happy scripting!