# Shizoscript Documentation

## Table of Contents
- [fileio](#fileio-namespace)  
- [math](#math-namespace)  
- [shizonet](#shizonet-namespace)  
- [shzdocs](#shzdocs-namespace)  
- [shztests](#shztests-namespace)  
- [std](#std-namespace)  

---

## fileio Namespace
Provides file and directory operations.

### Functions
| Function | Signature | Description |
|----------|-----------|-------------|
| `copy` | `copy(src: string, dest: string)` | Copy file or directory |
| `exists` | `exists(path: string)` | Check if path exists |
| `file_dir` | `file_dir()` | Placeholder description |
| `file_name` | `file_name()` | Placeholder description |
| `files` | `files(path: string, recursive: bool = true)` | List files in directory |
| `is_directory` | `is_directory(path: string)` | Check if path is a directory |
| `is_file` | `is_file(path: string)` | Check if path is a file |
| `mkdir` | `mkdir()` | Placeholder description |
| `move` | `move(src: string, dest: string)` | Move file or directory |
| `pure_name` | `pure_name()` | Placeholder description |
| `read_file` | `read_file(path: string)` | Read file into binary buffer |
| `read_json` | `read_json(path: string)` | Read JSON file and return parsed object |
| `read_string` | `read_string(path: string)` | Read text file into string |
| `read_text` | `read_text(path: string)` | Read text file into string |
| `remove` | `remove(path: string|list)` | Remove files or directories |
| `rename` | `rename(src: string, dest: string)` | Rename file or directory |
| `write_file` | `write_file(path: string, data: object)` | Write binary data to file |
| `write_json` | `write_json(path: string, data: string)` | Write JSON string to file |
| `write_string` | `write_string(path: string, data: string)` | Write string to file |
| `write_text` | `write_text(path: string, data: string)` | Write string to file |

---

## math Namespace
Mathematical functions and constants.

### Constants
| Name | Value |
|------|-------|
| `PI` | 3.141593 |

### Functions
| Function | Signature | Description |
|----------|-----------|-------------|
| `abs` | `abs(value: float)` | Return absolute value |
| `acos` | `acos(x: float)` | Inverse cosine (arccos) |
| `asin` | `asin(x: float)` | Inverse sine (arcsin) |
| `atan` | `atan(x: float)` | Inverse tangent (arctan) |
| `atan2` | `atan2(y: float, x: float)` | Arctangent from y and x |
| `cbrt` | `cbrt(x: float)` | Cube root |
| `ceil` | `ceil(value: float)` | Smallest integer ≥ input |
| `clamp` | `clamp(x: float, min: float, max: float)` | Clamp value between min/max |
| `cos` | `cos(x: float)` | Cosine of angle (radians) |
| `exp` | `exp(x: float)` | Exponential function (e^x) |
| `floor` | `floor(value: float)` | Largest integer ≤ input |
| `fract` | `fract(x: float)` | Fractional part of value |
| `lerp` | `lerp(a: float, b: float, t: float)` | Linear interpolation |
| `log` | `log(x: float)` | Natural logarithm (base e) |
| `log10` | `log10(x: float)` | Base-10 logarithm |
| `log2` | `log2(x: float)` | Base-2 logarithm |
| `max` | `max(values: float...)` | Maximum of values |
| `min` | `min(values: float...)` | Minimum of values |
| `pow` | `pow(base: float, exp: float)` | Power function |
| `rand` | `rand()` | Random float in [0,1) |
| `round` | `round(value: float)` | Nearest integer to input |
| `sign` | `sign(x: float)` | Sign of number (+1, 0, -1) |
| `sin` | `sin(x: float)` | Sine of angle (radians) |
| `smoothstep` | `smoothstep(edge0: float, edge1: float, x: float)` | Smoothstep interpolation |
| `sqrt` | `sqrt(x: float)` | Square root |
| `tan` | `tan(x: float)` | Tangent of angle (radians) |

---

## shizonet Namespace
Network communication utilities.

### Functions
| Function | Signature | Description |
|----------|-----------|-------------|
| `client` | `client(node_name: string, port: int)` | Create a network client |
| `server` | `server(node_name: string, port: int)` | Create a network server |

---

## shzdocs Namespace
Documentation system functions.

### Functions
| Function | Signature | Description |
|----------|-----------|-------------| 
| `find_all` | `find_all(Keyword: string)` | Get documentation matching keyword |
| `get_all` | `get_all()` | Get all documentation |

---

## shztests Namespace
Testing framework functions.

### Functions
| Function | Signature | Description |
|----------|-----------|-------------|
| `check_object` | `check_object()` | Placeholder |
| `test_object` | `test_object()` | Placeholder |

---

## std Namespace
Standard library constants and functions.

### Constants
| Name | Value |
|------|-------|
| `MB_ICONERROR` | 16 |
| `MB_ICONINFORMATION` | 64 |
| `MB_ICONWARNING` | 48 |
| `MB_OK` | 0 |
| `MB_OKCANCEL` | 1 |
| `MB_RETRYCANCEL` | 5 |
| `MB_YESNO` | 4 |
| `MB_YESNOCANCEL` | 3 |

### Functions
| Function | Signature | Description |
|----------|-----------|-------------| 
| `argc` | `argc()` | Return argument count |
| `argv` | `argv(index: int)` | Return argument at index |
| `buffer` | `buffer()` | Create a new shz_std_buffer object |
| `cd` | `cd(path: string)` | Change working directory |
| `count` | `count(value)` | Alias of len() - returns element count |
| `cout` | `cout()` | Print to terminal directly |
| `error` | `error()` | Print to console output |
| `float` | `float()` | Placeholder description |
| `free` | `free()` | Delete an object |
| `has_admin_privilege` | `has_admin_privilege()` | Returns true if run as administrator |
| `hideconsole` | `hideconsole()` | Hide console window (Windows only) |
| `import` | `import()` | Placeholder description |
| `import_all` | `import_all()` | Placeholder description |
| `indentation` | `indentation()` | Placeholder description |
| `input` | `input(prompt: string)` | Read line from stdin with optional prompt |
| `int` | `int()` | Placeholder description |
| `is_function` | `is_function()` | Placeholder description |
| `is_json` | `is_json()` | Placeholder description |
| `is_list` | `is_list()` | Placeholder description |
| `is_string` | `is_string()` | Placeholder description |
| `json` | `json(json: string)` | Create JSON object from string |
| `len` | `len(value)` | Return size/length of container |
| `messagebox` | `messagebox(text: string, caption: string, buttons: btns)` | Display message box |
| `millis` | `millis()` | Placeholder description |
| `print` | `print()` | Print to console output |
| `runtime_error` | `runtime_error()` | Print to console output |
| `sleep` | `sleep(milliseconds)` | Pause execution for duration |
| `string` | `string(value: string)` | Create new string object |
| `system` | `system(command: string)` | Execute shell command |
| `system_path` | `system_path(path: string)` | Expand environment variables |
| `thread` | `thread(callback: function)` | Create thread from function |
| `timestamp` | `timestamp()` | Placeholder description |
| `vaddress` | `vaddress(value)` | Get variable address |
| `vtype` | `vtype(value)` | Get variable type |
| `warn` | `warn()` | Print to console output |
| `wd` | `wd()` | Placeholder description |
| `web_get` | `web_get(url: string)` | Perform HTTP GET request |

### `print` Examples
```sh
print("Hello World");
```

```sh
print("test_var = ", test_var, ".");
```

```sh
combined_str = print(var1, var2, var3);
```