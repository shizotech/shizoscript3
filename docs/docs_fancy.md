# Shizoscript Documentation

## Table of Contents
- [File I/O](#file-io)
- [Math](#math)
- [Shizonet](#shizonet)
- [Shzdocs](#shzdocs)
- [Shztests](#shztests)
- [Standard Library](#standard-library)

## File I/O

The `fileio` namespace provides functions for file and directory operations.

### Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `copy` | `src: string` - Source path<br>`dest: string` - Destination path | Copy file or directory (folders will be created if required) |
| `exists` | `path: string` - Path to test | Check if path is a directory |
| `file_dir` | | Placeholder description |
| `file_name` | | Placeholder description |
| `files` | `path: string` - Directory to list<br>`recursive: bool` (default: true) - true = include subfolders; false = top-level only | List files in directory |
| `is_directory` | `path: string` - Path to test | Check if path is a directory |
| `is_file` | `path: string` - Path to test | Check if path is a file |
| `mkdir` | | Placeholder description |
| `move` | `src: string` - Path to file or directory<br>`dest: string` - New location or name | Move file or directory (uses rename or copy/delete fallback) |
| `pure_name` | | Placeholder description |
| `read_file` | `path: string` - Path to the file | Read file into binary buffer |
| `read_json` | `path: string` - Path to the JSON file | Read JSON file and return parsed object |
| `read_string` | `path: string` - File path to read as text | Read text file into string |
| `read_text` | `path: string` - File path to read as text | Read text file into string |
| `remove` | `path: string|list` - File(s) or directory to delete | Remove files or directories (recursive) |
| `rename` | `src: string` - Path of the existing file<br>`dest: string` - New name or destination path | Rename file or directory |
| `write_file` | `path: string` - File path to write to<br>`data: object` - Object to serialize and write as binary | Write binary data from a serializable object to a file, returning true if the write succeeds |
| `write_json` | `path: string` - Path to the destination file<br>`data: string` - JSON string to write | Writes a JSON string to a file. IMPORTANT: Do NOT MODIFY the json that is passed, in another thread! Always pass unique non-mutable jsons (copy before if needed). |
| `write_string` | `path: string` - Destination file path<br>`data: string` - Text string to be written | Write string to file |
| `write_text` | `path: string` - Destination file path<br>`data: string` - Text string to be written | Write string to file |

## Math

The `math` namespace provides mathematical functions and constants.

### Constants

| Constant | Value |
|----------|-------|
| `PI` | 3.141593 |

### Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `abs` | `value: float` - Input number (integer or floating point) | Return the absolute value of a numeric input |
| `acos` | `x: float` - Value in range [-1,1] | Inverse cosine (arccos) |
| `asin` | `x: float` - Value in range [-1,1] | Inverse sine (arcsin) |
| `atan` | `x: float` - Ratio y/x | Inverse tangent (arctan) |
| `atan2` | `y: float`<br>`x: float` | Arctangent from y and x |
| `cbrt` | `x: float` - Value | Cube root |
| `ceil` | `value: float` - Input number | Return the smallest integer greater than or equal to the given number |
| `clamp` | `x: float` - Value<br>`min: float` - Minimum value<br>`max: float` - Maximum value | Clamp value between min and max |
| `cos` | `x: float` - Angle in radians | Cosine of angle (radians) |
| `exp` | `x: float` - Exponent | Exponential function (e^x) |
| `floor` | `value: float` - Floating point number to floor | Return the largest integer less than or equal to the given number |
| `fract` | `x: float` - Value | Fractional part of value |
| `lerp` | `a: float` - Start value<br>`b: float` - End value<br>`t: float` - Interpolation factor (0..1) | Linear interpolation |
| `log` | `x: float` - Value > 0 | Natural logarithm (base e) |
| `log10` | `x: float` - Value > 0 | Base-10 logarithm |
| `log2` | `x: float` - Value > 0 | Base-2 logarithm |
| `max` | `values: float...` - One or more numbers | Maximum of values |
| `min` | `values: float...` - One or more numbers | Minimum of values |
| `pow` | `base: float`<br>`exp: float` | Power function |
| `rand` | | Random float in range [0,1] |
| `round` | `value: float` - Floating point number to round | Return the nearest integer value to the given number |
| `sign` | `x: float` - Returns +1, 0, or -1 | Sign of number |
| `sin` | `x: float` - Angle in radians | Sine of angle (radians) |
| `smoothstep` | `edge0: float` - Lower boundary<br>`edge1: float` - Upper boundary<br>`x: float` - Value to evaluate | Smoothstep interpolation |
| `sqrt` | `x: float` - Value to square-root | Square root |
| `tan` | `x: float` - Angle in radians | Tangent of angle (radians) |

## Shizonet

The `shizonet` namespace provides network functionality.

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `client` | `node_name: string` - Node name<br>`port: int` - Client listening port (default: SHZNET_CLIENT_PORT) | `shizonet.client` | Create a new network client with the specified node name and optional port |
| `server` | `node_name: string` - Node name<br>`port: int` - Server listening port (default: SHZNET_SERVER_PORT) | `shizonet.server` | Create a new network server with the specified node name and optional port |

## Shzdocs

The `shzdocs` namespace provides documentation-related functions.

### Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `find_all` | `Keyword: string` - Returns all matches that include the keyword | Get documentation about all function, classes, etc. |
| `get_all` | | Get documentation about all function, classes, etc. |

## Shztests

The `shztests` namespace provides testing functionality.

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `check_object` | | | |
| `test_object` | | `test_object` | |

## Standard Library

The `std` namespace contains standard library functions and constants.

### Constants

| Constant | Value |
|----------|-------|
| `MB_ICONERROR` | 16 |
| `MB_ICONINFORMATION` | 64 |
| `MB_ICONWARNING` | 48 |
| `MB_OK` | 0 |
| `MB_OKCANCEL` | 1 |
| `MB_RETRYCANCEL` | 5 |
| `MB_YESNO` | 4 |
| `MB_YESNOCANCEL` | 3 |

### Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `argc` | | Return argc |
| `argv` | `index: int` | Return argv |
| `buffer` | | `std.buffer` - Instantiate a new shz_std_buffer object |
| `cd` | `path: string` - New working directory path | Change current working directory |
| `count` | `value: Container, string, or object` | Alias of len() - returns number of elements |
| `cout` | | Print to terminal directly |
| `error` | | Print to console output |
| `float` | | Placeholder description |
| `free` | | Delete an object |
| `has_admin_privilege` | | Returns true if run as administrator. |
| `hideconsole` | | Detach and hide the console window (Windows only) |
| `import` | | Placeholder description |
| `import_all` | | Placeholder description |
| `indentation` | | Placeholder description |
| `input` | `prompt: string` - Optional message displayed before reading input | Reads a line of text from standard input, optionally displaying a prompt message. |
| `int` | | Placeholder description |
| `is_function` | | Placeholder description |
| `is_json` | | Placeholder description |
| `is_list` | | Placeholder description |
| `is_string` | | Placeholder description |
| `json` | `json: string` - Optional JSON string to parse into the new object | `std.json` - Create a new JSON object, optionally initialized from a JSON string |
| `len` | `value: Container, string, or object` | Return size/length of a list, map, array, string, or object container |
| `messagebox` | `text: string` - Message text<br>`caption: string` - message box caption<br>`buttons: btns` | Display a message box with specified text and optional caption |
| `millis` | | Placeholder description |
| `print` | | Print to console output |

**Examples:**
```shz
print("Hello World");
```

```shz
print("test_var = ", test_var, ".");
```

```shz
combined_str = print(var1, var2, var3);
```

| Function | Parameters | Description |
|----------|------------|-------------|
| `runtime_error` | | Print to console output |
| `sleep` | `milliseconds: Duration to pause execution` | Suspend script execution for a duration (async) |
| `string` | `value: string` - Initial string value | `std.string` - Create a new string, optionally initialized with a given value |
| `system` | `command: string` - Command string to be passed to the system shell | Execute a shell command and return its exit code. |
| `system_path` | `path: string` - Path with environment variables | Expand environment variables and normalize a filesystem path |
| `thread` | `callback: function` - attach to a function | `std.thread` - threading |
| `timestamp` | | Placeholder description |
| `vaddress` | `value: Variable to inspect` | Get the type of a variable |
| `vtype` | `value: Variable to inspect` | Get the type of a variable |
| `warn` | | Print to console output |
| `wd` | | Placeholder |
| `web_get` | `url: string` - HTTP or HTTPS URL | Perform a simple HTTP GET request and return the response body |