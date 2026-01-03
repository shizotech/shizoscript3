# ShizoScript – Standard Library Documentation

> ShizoScript is a lightweight scripting language.  
> The book‑keeping below describes **all** official namespaces that ship with the standard package.  
> Each namespace is an isolated scope that can be imported into the global namespace by using its `using` keyword.

> **NOTE** – Functions that contain the word *placeholder* in their description are still unfinished.  
> The placeholder text will be replaced with a proper description in a future release.  

---

## Table of Contents

1. [File I/O](#fileio)  
    1.1 [Constants](#fileio-constants)  
    1.2 [Functions](#fileio-functions)  
2. [Math](#math)  
    2.1 [Constant](#math-constants)    
    2.2 [Functions](#math-functions)  
3. [Networking – `shizonet`](#shizonet)  
4. [Documentation – `shzdocs`](#shzdocs)  
5. [Testing – `shztests`](#shztests)  
6. [Standard utilities – `std`](#std)  
    6.1 [Constants](#std-constants)  
    6.2 [Functions](#std-functions)  



---

## File I/O – `fileio` <a name="fileio"></a>  

> Direct access to the file system (read, write, copy, list, delete, …).

### Constants <a name="fileio-constants"></a>  
*None*  

### Functions <a name="fileio-functions"></a>  



| Function | Parameters | Return | Description |
|---|---|---|---|---|
| **copy** | `src: string`, `dest: string` | *void* | Copies a file or a directory to *dest*. If intermediate directories do not exist they are created automatically. |
| **exists** | `path: string` | `bool` | Checks whether a path exists (file or directory). |
| **file_dir** | *none* | `string` | **Placeholder** – intended to return the directory part of a file path. |  
| **file_name** | *none* | `string` | **Placeholder** – intended to return the file name (including extension). |  
| **files** | `path: string`, `recursive: bool (default: true)` | `list[string]` | Enumerates the files contained in *path*. If *recursive* is `false`, only the top‑level files are returned. |  
| **is_directory** | `path: string` | `bool` | Returns `true` if *path* is a directory. |  
| **is_file** | `path: string` | `bool` | Returns `true` if *path* is a regular file. |  
| **mkdir** | *none* | `bool` | **Placeholder** – intended to create a directory (single or nested). |  
| **move** | `src: string`, `dest: string` | `bool` | Moves a file or directory from *src* to *dest*. Implementation tries to use rename and falls back to copy/delete if needed. |  
| **pure_name** | *none* | `string` | **Placeholder** – intended to return the file name without path or extension. |  
| **read_file** | `path: string` | `bytes` | Reads the file at *path* into a binary buffer. |  
| **read_json** | `path: string` | `object` | Reads a JSON file and parses it into an object. |  
| **read_string** | `path: string` | `string` | **Duplicate** – reads a text file into a string. |  
| **read_text** | `path: string` | `string` | Same as `read_string`. |  
| **remove** | `path: string|list` | `bool` | Deletes a file, directory or a list of such paths. Directories are removed recursively. |  
| **rename** | `src: string`, `dest: string` | `bool` | Renames a file or directory. |  
| **write_file** | `path: string`, `data: object` | `bool` | Serializes *data* (must be binary‑serializable) to a binary file. Returns `true` on success. |  
| **write_json** | `path: string`, `data: string` | `bool` | Writes the supplied JSON string to *path* without modifying *data*. **Important** – avoid sharing a mutable JSON string across threads. |  
| **write_string** | `path: string`, `data: string` | `bool` | Writes a text string to *path*. |  
| **write_text** | `path: string`, `data: string` | `bool` | Same as `write_string`. |  

> **Tip** – Use `fileio.read_json` and `fileio.write_json` for JSON handling.  
> Use `fileio.copy`/`move` for file transfer.  
> For directory traversal use `fileio.files`.  

---


## Math – `math` <a name="math"></a>  



### Constant <a name="math-constants"></a>  

| Constant | Value | Description |
|---|---|---|
| `math.PI` | `3.141593` | Approximate value of π (rounded to six decimal places). |  

### Functions <a name="math-functions"></a>  

| Function | Parameters | Return | Description |
|---|---|---|---|  
| **abs** | `value: float` | `float` | Absolute value. |
| **acos** | `x: float` | `float` | Inverse cosine (arccos). |
| **asin** | `x: float` | `float` | Inverse sine (arcsin). |
| **atan** | `x: float` | `float` | Inverse tangent (arctan). |
| **atan2** | `y: float, x: float` | `float` | Arctangent of *y*/*x* handling quadrants. |
| **cbrt** | `x: float` | `float` | Cube root. |
| **ceil** | `value: float` | `int` | Smallest integer ≥ *value*. |  
| **clamp** | `x: float, min: float, max: float` | `float` | Restricts *x* to the inclusive interval [*min*, *max*]. |
| **cos** | `x: float` | `float` | Cosine of *x* (radians). |
| **exp** | `x: float` | `float` | e<sup>x</sup>. |
| **floor** | `value: float` | `int` | Largest integer ≤ *value*. |  
| **fract** | `x: float` | `float` | Fractional part of *x* (e.g., 3.14 → 0.14). |
| **lerp** | `a: float, b: float, t: float` | `float` | Linear interpolation: *a* + (*b*–*a*)×*t*. |   |
| **log** | `x: float` | `float` | Natural logarithm (base e). |
| **log10** | `x: float` | `float` | Base‑10 logarithm. |
| **log2** | `x: float` | `float` | Base‑2 logarithm. |  
| **max** | `values: float…` | `float` | Maximum of the provided numbers. |
| **min** | `values: float…` | `float` | Minimum of the provided numbers. |
| **pow** | `base: float, exp: float` | `float` | Powers: *base*<sup>*exp*</sup>. |
| **rand** | *none* | `float` | Random float in range [0, 1). |  
| **round** | `value: float` | `int` | Nearest integer to *value*. |  
| **sign** | `x: float` | `int` | Returns +1 for positive, –1 for negative, 0 for zero. |
| **sin** | `x: float` | `float` | Sine of *x* (radians). |  
| **smoothstep** | `edge0: float, edge1: float, x: float` | `float` | Smoothstep interpolation between *edge0* and *edge1*. |  
| **sqrt** | `x: float` | `float` | Square root of *x*. |  
| **tan** | `x: float` | `float` | Tangent of *x* (radians). |  

> **Example** – Linear interpolation between two values:   ```shizo
> x = math.lerp(10, 20, 0.3)   // → 13
> ```  

---


## Networking – `shizonet` <a name="shizonet"></a>  



### Functions  

| Function | Parameters | Return | Description |
|---|---|---|---|  
| **client** | `node_name: string, port: int (default: SHZNET_CLIENT_PORT)` | `shizonet.client` | Creates a client network node with the given *node_name* and optional listening port. |
| **server** | `node_name: string, port: int (default: SHZNET_SERVER_PORT)` | `shizonet.server` | Creates a server network node with the given *node_name* and optional listening port. |

> **Prerequisites** – The underlying OS networking stack must allow the chosen port.  
> `SHZNET_CLIENT_PORT` and `SHZNET_SERVER_PORT` are default constants defined elsewhere in the standard library.

---


## Documentation – `shzdocs` <a name="shzdocs"></a>  



### Functions  

| Function | Parameters | Return | Description |
|---|---|---|---|   |
| **find_all** | `Keyword: string` | `list[doc]` | Retrieves documentation entries for all symbols that contain *Keyword*. |
| **get_all** | *none* | `list[doc]` | Returns the full set of documentation objects for all built‑in symbols. |  

> **Tip** – Use `shzdocs.find_all("buffer")` to discover all overloads of the `buffer` constructor.

---


## Testing – `shztests` <a name="shztests"></a>  



### Functions  

| Function | Parameters | Return | Description |
|---|---|---|---|    |
| **check_object** | *none* | `bool` | **Placeholder** – intended to validate a test object. |
| **test_object** | *none* | `test_object` | **Placeholder** – creates or returns a test object. |

---


## Standard Utilities – `std` <a name="std"></a>  



### Constants <a name="std-constants"></a>  

| Constant | Value | Description |
|---|---|---|  
| `MB_ICONERROR` | `16` | Icon type for message boxes: error. |
| `MB_ICONINFORMATION` | `64` | Icon: information. |
| `MB_ICONWARNING` | `48` | Icon: warning. |
| `MB_OK` | `0` | Single `OK` button. |
| `MB_OKCANCEL` | `1` | `OK` and `Cancel`. |
| `MB_RETRYCANCEL` | `5` | `Retry` and `Cancel`. |
| `MB_YESNO` | `4` | `Yes` and `No`. |
| `MB_YESNOCANCEL` | `3` | `Yes`, `No`, `Cancel`. |

### Functions <a name="std-functions"></a>  

| Function | Parameters | Return | Description |
|---|---|---|---|  
| **argc** | *none* | `int` | Number of command‑line arguments. |  
| **argv** | `index: int` | `string` | Value of the command‑line argument at *index*. |  
| **buffer** | *none* | `std.buffer` | Creates a new binary buffer object. |  
| **cd** | `path: string` | `void` | Changes the script’s current working directory. |  
| **count** | `value: Container|string|object` | `int` | Returns the number of elements in *value*. Equivalent to `len`. |  
| **cout** | *none* | `void` | Directly writes the next output to the terminal (bypasses buffering). |  
| **error** | *none* | `void` | Prints an error message to the console. |  
| **float** | *none* | `std.float` | **Placeholder** – intended to create a high‑precision floating point object. |  
| **free** | *none* | `void` | Deallocates a previously allocated object. |  
| **has_admin_privilege** | *none* | `bool` | Returns `true` if the script is running with administrator (or root) permissions. |  
| **hideconsole** | *none* | `void` | Detaches and hides the console window (Windows only). |  
| **import** | *none* | `void` | **Placeholder** – loads a single module. |  
| **import_all** | *none* | `void` | **Placeholder** – loads all modules in the environment. |  
| **indentation** | *none* | `int` | **Placeholder** – returns the current indentation level for formatted output. |  
| **input** | `prompt: string` | `string` | Reads a line from stdin, optionally printing *prompt*. |  
| **int** | *none* | `std.int` | **Placeholder** – intended to create an integer object. |  
| **is_function** | *none* | `bool` | **Placeholder** – returns `true` if the current value is a function. |  
| **is_json** | *none* | `bool` | **Placeholder** – checks whether data is a valid JSON structure. |  
| **is_list** | *none* | `bool` | **Placeholder** – tests if a value is a list. |  
| **is_string** | *none* | `bool` | **Placeholder** – tests if a value is a string. |  
| **json** | `json: string` | `std.json` | Parses *json* and returns a mutable JSON object. |
| **len** | `value: Container|string|object` | `int` | Returns size/length of *value* (lists, strings, maps, etc.). |
| **messagebox** | `text: string, caption: string, buttons: btns` | `int` | Displays a modal message box. *buttons* is one of the `MB_*` constants. |
| **millis** | *none* | `int` | **Placeholder** – uptime in milliseconds. |
| **print** | *varargs* | `void` | Writes formatted output to the console. Returns the concatenated string when called as an expression. |
| **runtime_error** | *none* | `void` | Prints an error message to standard error and terminates execution. |  
| **sleep** | `milliseconds: int` | `void` | Asynchronous pause for *milliseconds*. |
| **string** | `value: string` | `std.string` | Wraps an arbitrary string into a mutable string object. |
| **system** | `command: string` | `int` | Executes *command* in the host shell and returns the exit status. |
| **system_path** | `path: string` | `string` | Expands environment variables and normalises *path*. |
| **thread** | `callback: function` | `std.thread` | Creates a new thread that runs *callback*. |
| **timestamp** | *none* | `int` | **Placeholder** – returns epoch‑time stamp (seconds). |
| **vaddress** | `value: Variable` | `string` | Returns the type (Vtype) of *value* as a string. |
| **vtype** | `value: Variable` | `int` | Returns an integer code representing the type of *value*. |  
| **warn** | *none* | `void` | Prints a warning message to the console. |
| **wd** | *none* | `string` | **Placeholder** – returns the current working directory. |
| **web_get** | `url: string` | `string` | Performs an HTTP/HTTPS GET and returns the response body. |

> **Quick start** – To print a greeting:  
> ```shizo
> using std;
> print("Hello, ShizoScript!");
> ```  
>  
> **Getting a command‑line argument** –  
> ```shizo
> let arg0 = std.argv(0);
> print("First argument:", arg0);
> ```  

---


## Summary

The standard library provides a comprehensive set of primitives covering:

* **File operations** (`fileio`) – robust file and directory manipulation.  
* **Mathematical functions** (`math`) – from simple arithmetic to trigonometry and logarithms.  
* **Networking** (`shizonet`) – client/server node utilities.  
* **Documentation tools** (`shzdocs`) – introspection of the standard library.  
* **Testing helpers** (`shztests`) – skeleton test utilities.  
* **System utilities** (`std`) – console I/O, process control, memory management, time, and environment integration.

> **Enjoy writing clean, maintainable scripts with these ready‑made tools!**

--- 

*For the latest updates, consult the ShizoScript compiler changelog or contact the community on GitHub.*