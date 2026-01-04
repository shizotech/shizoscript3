# ShizoScript Documentation

ShizoScript is a dynamically-typed scripting language designed for simplicity and flexibility. Key features include:
- No explicit typing system
- `.shio` source files compile to `.shx` binaries
- `using` keyword imports namespaces into the global scope (e.g., `using std;` allows `print()` instead of `std.print()`)
- Class-based object-oriented programming with inheritance
- Built-in support for file I/O, math operations, networking, and threading

## Table of Contents
- [fileio Namespace](#fileio-namespace)
- [math Namespace](#math-namespace)
- [shizonet Namespace](#shizonet-namespace)
- [shzdocs Namespace](#shzdocs-namespace)
- [shztests Namespace](#shztests-namespace)
- [std Namespace](#std-namespace)

---

## fileio Namespace
Provides comprehensive file and directory operations.

| Function | Parameters | Description |
|----------|------------|-------------|
| `copy` | `src: string` - Source path<br>`dest: string` - Destination path | Copy file or directory (creates folders if needed) |
| `dirs` | `path: string` - Directory to list<br>`recursive: bool` (default: true) | List directories inside a directory |
| `exists` | `path: string` - Path to test | Check if path exists |
| `file_dir` | `path: string` - File path | Extract directory from file path |
| `file_name` | `path: string` - File path | Extract filename with extension |
| `files` | `path: string` - Directory to list<br>`recursive: bool` (default: true) | List files in directory |
| `is_directory` | `path: string` - Path to test | Check if path is a directory |
| `is_file` | `path: string` - Path to test | Check if path is a file |
| `mkdir` | | Create directory (placeholder) |
| `move` | `src: string` - Source path<br>`dest: string` - Destination path | Move file/directory (rename or copy/delete fallback) |
| `pure_name` | `path: string` - File path | Extract filename without extension |
| `read_file` | `path: string` - File path | Read file into binary buffer |
| `read_json` | `path: string` - JSON file path | Read and parse JSON file |
| `read_string` | `path: string` - File path | Read text file into string |
| `read_text` | `path: string` - File path | Read text file into string |
| `remove` | `path: string|list` - File(s) or directory | Remove files/directories (recursive) |
| `rename` | `src: string` - Existing path<br>`dest: string` - New name/path | Rename file or directory |
| `write_file` | `path: string` - Destination path<br>`data: object` - Data to serialize | Write binary data to file |
| `write_json` | `path: string` - Destination path<br>`data: string` - JSON string | Write JSON to file (thread-safe) |
| `write_string` | `path: string` - Destination path<br>`data: string` - Text string | Write string to file |
| `write_text` | `path: string` - Destination path<br>`data: string` - Text string | Write string to file |

---

## math Namespace
Mathematical functions and constants.

### Constants
| Constant | Value |
|----------|-------|
| `PI` | 3.141593 |

### Functions
| Function | Parameters | Description |
|----------|------------|-------------|
| `abs` | `value: float` | Absolute value |
| `acos` | `x: float` (range [-1,1]) | Inverse cosine (arccos) |
| `asin` | `x: float` (range [-1,1]) | Inverse sine (arcsin) |
| `atan` | `x: float` | Inverse tangent (arctan) |
| `atan2` | `y: float`, `x: float` | Arctangent from y and x |
| `cbrt` | `x: float` | Cube root |
| `ceil` | `value: float` | Smallest integer ≥ input |
| `clamp` | `x: float`, `min: float`, `max: float` | Clamp value between min/max |
| `cos` | `x: float` (radians) | Cosine of angle |
| `exp` | `x: float` | Exponential function (e^x) |
| `floor` | `value: float` | Largest integer ≤ input |
| `fract` | `x: float` | Fractional part of value |
| `lerp` | `a: float`, `b: float`, `t: float` (0..1) | Linear interpolation |
| `log` | `x: float` (>0) | Natural logarithm (base e) |
| `log10` | `x: float` (>0) | Base-10 logarithm |
| `log2` | `x: float` (>0) | Base-2 logarithm |
| `max` | `values: float...` | Maximum of values |
| `min` | `values: float...` | Minimum of values |
| `pow` | `base: float`, `exp: float` | Power function |
| `rand` | | Random float in [0,1] |
| `round` | `value: float` | Nearest integer to input |
| `sign` | `x: float` | Sign of number (+1, 0, -1) |
| `sin` | `x: float` (radians) | Sine of angle |
| `smoothstep` | `edge0: float`, `edge1: float`, `x: float` | Smoothstep interpolation |
| `sqrt` | `x: float` | Square root |
| `tan` | `x: float` (radians) | Tangent of angle |

---

## shizonet Namespace
Networking functionality for client-server communication.

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `client` | `node_name: string` - Node name<br>`port: int` - Listening port (default: SHZNET_CLIENT_PORT) | `shizonet.client` | Create a network client |
| `server` | `node_name: string` - Node name<br>`port: int` - Listening port (default: SHZNET_SERVER_PORT) | `shizonet.server` | Create a network server |

---

## shzdocs Namespace
Documentation tools for code introspection.

| Function | Parameters | Description |
|----------|------------|-------------|
| `find_all` | `Keyword: string` | Get documentation for all matches containing keyword |
| `get_all` | | Get documentation for all functions, classes, etc. |

---

## shztests Namespace
Testing utilities.

| Function | Returns | Description |
|----------|---------|-------------|
| `check_object` | | Object checking utility |
| `test_object` | `test_object` | Object testing utility |

---

## std Namespace
Standard library with core system functions and constants.

### Constants
| Constant | Value | Description |
|----------|-------|-------------|
| `MB_ICONERROR` | 16 | Message box icon: Error |
| `MB_ICONINFORMATION` | 64 | Message box icon: Information |
| `MB_ICONWARNING` | 48 | Message box icon: Warning |
| `MB_OK` | 0 | Message box button: OK |
| `MB_OKCANCEL` | 1 | Message box button: OK/Cancel |
| `MB_RETRYCANCEL` | 5 | Message box button: Retry/Cancel |
| `MB_YESNO` | 4 | Message box button: Yes/No |
| `MB_YESNOCANCEL` | 3 | Message box button: Yes/No/Cancel |

### Functions
| Function | Parameters | Description |
|----------|------------|-------------|
| `argc` | | Return argument count |
| `argv` | `index: int` | Return argument at index |
| `buffer` | | Create new shz_std_buffer object |
| `cd` | `path: string` - New directory path | Change working directory |
| `count` | `value: Container, string, or object` | Alias for len() - element count |
| `cout` | | Print directly to terminal |
| `error` | | Print to console error output |
| `float` | `value: any` - Value to convert | Convert to float |
| `free` | | Delete object |
| `has_admin_privilege` | | Returns true if run as administrator |
| `hideconsole` | | Detach/hide console window (Windows only) |
| `import` | `module: string` - Module name/path | Import external module |
| `import_all` | | Initialize all function modules |
| `indentation` | `text: string` - Text to analyze | Calculate indentation level (spaces=1, tabs=4) |
| `input` | `prompt: string` - Optional prompt | Read line from stdin |
| `int` | `value: any` - Value to convert | Convert to integer |
| `is_function` | `value: any` - Value to check | Check if value is a function |
| `is_json` | `value: any` - Value to check | Check if value is a JSON object |
| `is_list` | `value: any` - Value to check | Check if value is a list |
| `is_string` | `value: any` - Value to check | Check if value is a string |
| `json` | `json: string` - Optional JSON string | Create JSON object (optionally from string) |
| `len` | `value: Container, string, or object` | Return size/length of container |
| `messagebox` | `text: string` - Message text<br>`caption: string` - Caption<br>`buttons: btns` - Buttons | Display message box |
| `millis` | | Get current time in milliseconds since epoch |
| `print` | | Print to console output |
| `runtime_error` | | Print runtime error |
| `sleep` | `milliseconds: Duration` | Suspend execution (async) |
| `string` | `value: string` - Initial value | Create string object |
| `system` | `command: string` - Shell command | Execute shell command, return exit code |
| `system_path` | `path: string` - Path with env vars | Expand environment variables and normalize path |
| `thread` | `callback: function` - Function | Create thread (returns std.thread) |
| `timestamp` | | Get current time in DD-MM-YYYY HH:MM:SS format |
| `vaddress` | `value: Variable` | Get variable address |
| `vtype` | `value: Variable` | Get variable type |
| `warn` | | Print warning to console |
| `wd` | | Get current working directory path |
| `web_get` | `url: string` - HTTP/HTTPS URL | Perform HTTP GET request, return response body |