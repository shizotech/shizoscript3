# ShizoScript Documentation

ShizoScript is a dynamically-typed scripting language designed for simplicity and flexibility. Key features include:
- No explicit typing system (all variables are dynamically typed)
- Source files use `.shio` extension, compiled binaries use `.shx`
- `using` keyword imports namespaces into the global scope
- C-style syntax with classes, functions, and control structures
- Built-in support for file I/O, math operations, networking, and system functions

## Table of Contents
- [File I/O Namespace](#file-io-namespace)
- [Math Namespace](#math-namespace)
- [ShizoNet Namespace](#shizonet-namespace)
- [ShizDocs Namespace](#shzdocs-namespace)
- [ShizTests Namespace](#shztests-namespace)
- [Standard Library Namespace](#std-namespace)

---

## File I/O Namespace
Handles file and directory operations with intuitive path manipulation.

| Function | Parameters | Description |
|----------|------------|-------------|
| `copy` | `src: string`<br>`dest: string` | Copy file or directory (creates folders if needed) |
| `dirs` | `path: string`<br>`recursive: bool (default: true)` | List directories inside a directory |
| `exists` | `path: string` | Check if path exists |
| `file_dir` | `path: string` | Extract directory from a file path |
| `file_name` | `path: string` | Extract filename with extension |
| `files` | `path: string`<br>`recursive: bool (default: true)` | List files in directory |
| `is_directory` | `path: string` | Check if path is a directory |
| `is_file` | `path: string` | Check if path is a file |
| `mkdir` | | Create directory (placeholder) |
| `move` | `src: string`<br>`dest: string` | Move/rename file or directory |
| `pure_name` | `path: string` | Extract filename without extension |
| `read_file` | `path: string` | Read file into binary buffer |
| `read_json` | `path: string` | Read and parse JSON file |
| `read_string` | `path: string` | Read text file into string |
| `read_text` | `path: string` | Read text file into string |
| `remove` | `path: string\|list` | Delete files/directories (recursive) |
| `rename` | `src: string`<br>`dest: string` | Rename file or directory |
| `write_file` | `path: string`<br>`data: object` | Write serializable object as binary |
| `write_json` | `path: string`<br>`data: string` | Write JSON string to file |
| `write_string` | `path: string`<br>`data: string` | Write string to file |
| `write_text` | `path: string`<br>`data: string` | Write string to file |

---

## Math Namespace
Comprehensive mathematical functions and constants.

### Constants
- `PI` → 3.141593

### Functions
| Function | Parameters | Description |
|----------|------------|-------------|
| `abs` | `value: float` | Absolute value |
| `acos` | `x: float` | Inverse cosine (arccos) |
| `asin` | `x: float` | Inverse sine (arcsin) |
| `atan` | `x: float` | Inverse tangent (arctan) |
| `atan2` | `y: float`<br>`x: float` | Arctangent from y/x |
| `cbrt` | `x: float` | Cube root |
| `ceil` | `value: float` | Ceiling value |
| `clamp` | `x: float`<br>`min: float`<br>`max: float` | Clamp between min/max |
| `cos` | `x: float` | Cosine (radians) |
| `exp` | `x: float` | Exponential (e^x) |
| `floor` | `value: float` | Floor value |
| `fract` | `x: float` | Fractional part |
| `lerp` | `a: float`<br>`b: float`<br>`t: float` | Linear interpolation |
| `log` | `x: float` | Natural logarithm |
| `log10` | `x: float` | Base-10 logarithm |
| `log2` | `x: float` | Base-2 logarithm |
| `max` | `values: float...` | Maximum of values |
| `min` | `values: float...` | Minimum of values |
| `pow` | `base: float`<br>`exp: float` | Power function |
| `rand` | | Random float [0,1] |
| `round` | `value: float` | Nearest integer |
| `sign` | `x: float` | Sign (+1, 0, -1) |
| `sin` | `x: float` | Sine (radians) |
| `smoothstep` | `edge0: float`<br>`edge1: float`<br>`x: float` | Smoothstep interpolation |
| `sqrt` | `x: float` | Square root |
| `tan` | `x: float` | Tangent (radians) |

---

## ShizoNet Namespace
Networking components for client-server communication.

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `client` | `node_name: string`<br>`port: int (default: SHZNET_CLIENT_PORT)` | `shizonet.client` | Create network client |
| `server` | `node_name: string`<br>`port: int (default: SHZNET_SERVER_PORT)` | `shizonet.server` | Create network server |

---

## ShzDocs Namespace
Documentation introspection utilities.

| Function | Parameters | Description |
|----------|------------|-------------|
| `find_all` | `Keyword: string` | Get all documentation containing keyword |
| `get_all` | | Get all function/class documentation |

---

## ShizTests Namespace
Testing framework utilities.

| Function | Returns | Description |
|----------|---------|-------------|
| `check_object` | | Object checking utility |
| `test_object` | `test_object` | Object testing utility |

---

## Standard Library Namespace
Core system functions and UI constants.

### Message Box Constants
| Constant | Value | Description |
|----------|-------|-------------|
| `MB_ICONERROR` | 16 | Error icon |
| `MB_ICONINFORMATION` | 64 | Information icon |
| `MB_ICONWARNING` | 48 | Warning icon |
| `MB_OK` | 0 | OK button |
| `MB_OKCANCEL` | 1 | OK/Cancel buttons |
| `MB_RETRYCANCEL` | 5 | Retry/Cancel buttons |
| `MB_YESNO` | 4 | Yes/No buttons |
| `MB_YESNOCANCEL` | 3 | Yes/No/Cancel buttons |

### Functions
| Function | Parameters | Description |
|----------|------------|-------------|
| `argc` | | Return argument count |
| `argv` | `index: int` | Return argument value |
| `buffer` | | Create new buffer object |
| `cd` | `path: string` | Change working directory |
| `count` | `value: Container, string, or object` | Alias of len() |
| `cout` | | Print to terminal |
| `error` | | Print error to console |
| `float` | `value: any` | Convert to float |
| `free` | | Delete object |
| `has_admin_privilege` | | Check admin privileges |
| `hideconsole` | | Hide console (Windows) |
| `import` | `module: string` | Import external module |
| `import_all` | | Initialize all modules |
| `indentation` | `text: string` | Calculate indentation level |
| `input` | `prompt: string` | Read user input |
| `int` | `value: any` | Convert to integer |
| `is_function` | `value: any` | Check if function |
| `is_json` | `value: any` | Check if JSON object |
| `is_list` | `value: any` | Check if list |
| `is_string` | `value: any` | Check if string |
| `json` | `json: string` | Create JSON object |
| `len` | `value: Container, string, or object` | Return size/length |
| `messagebox` | `text: string`<br>`caption: string`<br>`buttons: btns` | Display message box |
| `millis` | | Current time in ms |
| `print` | | Print to console |
| `runtime_error` | | Print runtime error |
| `sleep` | `milliseconds: Duration` | Pause execution |
| `string` | `value: string` | Create string object |
| `system` | `command: string` | Execute shell command |
| `system_path` | `path: string` | Expand environment variables |
| `thread` | `callback: function` | Create thread |
| `timestamp` | | Current date/time |
| `vaddress` | `value: Variable` | Get variable address |
| `vtype` | `value: Variable` | Get variable type |
| `warn` | | Print warning to console |
| `wd` | | Get working directory |
| `web_get` | `url: string` | HTTP GET request |