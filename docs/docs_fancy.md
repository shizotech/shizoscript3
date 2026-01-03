# 📄 **Shizonet Script Language Reference**

Welcome to the official reference for the Shizonet scripting language – a lightweight, cross‑platform scripting system that ships a collection of convenient namespaces for file I/O, mathematics, networking, documentation utilities, tests, and standard library helpers.

> **Tip:** To keep your scripts clean, you can bring a namespace into the global scope with  
> `using <namespace>;` – e.g. `using std;` makes all `std.*` members accessible directly.

---

## 📁 Namespace `fileio` – File System Helpers

| Function | Parameters | Description |
|--------|------------|-------------| 
| **fileio.copy(src, dest)** | `src: string` – Source file or directory. <br> `dest: string` – Destination path. | Copies a file or an entire directory tree.   <br> Destination folders are created automatically if missing. |
| **fileio.exists(path)** | `path: string` | Returns `true` if the given path exists (file or directory). |
| **fileio.file_dir()** | – | <strong>Placeholder</strong> – This is a stub; real usage depends on internal logic. |
| **fileio.file_name()** | – | <strong>Placeholder</strong> – Represents the filename part extracted from a full path. |
| **fileio.files(path, recursive = true)** | `path: string` – Directory to scan.<br>`recursive: bool` – `true` to descend into sub‑folders. | Returns a list of file paths (strings) inside the given directory. |
| **fileio.is_directory(path)** | `path: string` | Returns `true` if the path points to a directory. |
| **fileio.is_file(path)** | `path: string` | Returns `true` if the path points to a regular file. | 
| **fileio.mkdir()** | – | <strong>Placeholder</strong> – Creates a new directory; usage specifics are internal. |
| **fileio.move(src, dest)** | `src: string` – File/dir to move.<br>`dest: string` – New location or name. | Tries to rename/move the path. Falls back to a copy/delete strategy if the underlying OS cannot rename. | 
| **fileio.pure_name()** | – | <strong>Placeholder</strong> – Returns the bare filename without any path or extension. |
| **fileio.read_file(path)** | `path: string` | Reads the entire file into a *binary buffer* (`byte[]`). | 
| **fileio.read_json(path)** | `path: string` | Parses a JSON file and returns a native native object (`dictionary`, `list`, etc.). |
| **fileio.read_string(path)** <br>**fileio.read_text(path)** | `path: string` | Reads the file as a UTF‑8 string and returns it. They are aliases. |
| **fileio.remove(path)** | `path: string \| list` – One or more paths. | Recursively removes a file or directory. |  |
| **fileio.rename(src, dest)** | `src: string` – Existing path.<br>`dest: string` – New name or location. | Like `fileio.move`, but strictly performs a rename operation. | 
| **fileio.write_file(path, data)** | `path: string`<br>`data: object` – Serializable value | Serialises `data` into binary and writes it to `path`. Returns `true` if successful. | 
| **fileio.write_json(path, data)** | `path: string`<br>`data: string` – JSON text | Writes the exact JSON string to a file. **Never** mutates the source string; copy it if reused. |
| **fileio.write_string(path, data)** <br>**fileio.write_text(path, data)** | `path: string`<br>`data: string` | Writes text to a file; the two functions are interchangeable. |

> **Example Usage**
> ```shz
> using fileio;
> 
> // Copy a config folder
> fileio.copy("C:/Configs", "D:/Backup/Configs");
>  ```

---

## 🔢 Namespace `math` – Trigonometry, Math Utilities & Constants

| Constant | Value | Description |
|----------|-------|-------------| 
| `math.PI` | 3.141593 | The value of π (pi). |

| Function | Parameters | Description |
|----------|------------|-------------| 
| **math.abs(value)** | `value: float` | Absolute value of a number. |
| **math.acos(x)** | `x: float` (-1 ≤ x ≤ 1) | Inverse cosine (arccos). |
| **math.asin(x)** | `x: float` (-1 ≤ x ≤ 1) | Inverse sine (arcsin). |
| **math.atan(x)** | `x: float` | Inverse tangent (arctan). |
| **math.atan2(y, x)** | `y: float`, `x: float` | `atan2` produces the angle from `x` and `y` vectors. |
| **math.cbrt(x)** | `x: float` | Cube root. |
| **math.ceil(value)** | `value: float` | Smallest integer ≥ value. |
| **math.clamp(x, min, max)** | `x: float`, `min: float`, `max: float` | Constrain `x` within `[min, max]`. |
| **math.cos(x)** | `x: float` | Cosine of `x` (radians). |
| **math.exp(x)** | `x: float` | `e^x`, the natural exponential. | 
| **math.floor(value)** | `value: float` | Largest integer ≤ value. |
| **math.fract(x)** | `x: float` | Fractional part of `x` (x − floor(x)). | 
| **math.lerp(a, b, t)** | `a: float`, `b: float`, `t: float (0..1)` | Linear interpolation. |
| **math.log(x)** | `x: float` (> 0) | Natural logarithm (`ln`). |
| **math.log10(x)** | `x: float` (> 0) | Base‑10 logarithm. | 
| **math.log2(x)** | `x: float` (> 0) | Base‑2 logarithm. | 
| **math.max(values …)** | `values: float…` | Largest value. |
| **math.min(values …)** | `values: float…` | Smallest value. |
| **math.pow(base, exp)** | `base: float`, `exp: float` | Exponentiation. | 
| **math.rand()** | – | Random float in `[0, 1)`. | 
| **math.round(value)** | `value: float` | Nearest integer. |
| **math.sign(x)** | `x: float` | Returns `+1`, `0`, or `-1`. |
| **math.sin(x)** | `x: float` | Sine of `x` (radians). | 
| **math.smoothstep(edge0, edge1, x)** | `edge0: float`, `edge1: float`, `x: float` | Smooth interpolation between `edge0` and `edge1`. |
| **math.sqrt(x)** | `x: float` | Square root. |
| **math.tan(x)** | `x: float` | Tangent of `x` (radians). | 

---

## 🌐 Namespace `shizonet` – Lightweight Networking

| Function | Parameters | Description |
|----------|------------|-------------|
| **shizonet.client(node_name, port = SHZNET_CLIENT_PORT)** | `node_name: string`, `port: int` | Creates a new network *client* instance that connects to **0.0.0.0** on the given port (defaults to the library constant). | 
| **shizonet.server(node_name, port = SHZNET_SERVER_PORT)** | `node_name: string`, `port: int` | Creates a new network *server* instance that listens on the specified port. | 

> **Example**
> ```shz
> using shizonet; // Network API
> auto cli = shizonet.client("ClientA", 9000);
> auto srv = shizonet.server("ServerB", 9000);
> ```

---

## 📚 Namespace `shzdocs` – Built‑in Documentation Browser

| Function | Parameters | Description |
|----------|------------|-------------| 
| **shzdocs.find_all(Keyword)** | `Keyword: string` | Search all documented symbols (functions, classes, variables) containing `Keyword` and return the matches. |
| **shzdocs.get_all()** | – | Retrieve the complete documentation tree (useful for generating custom docs). |

---

## 🧪 Namespace `shztests` – Quick Test Helpers

| Function | Parameters | Description |
|----------|------------|-------------| 
| **shztests.check_object()** | – | <strong>Placeholder</strong> – Used internally by test frameworks. |
| **shztests.test_object()** | – | Creates and returns a test object instance for sandboxed tests. | 

---

## ⚙️ Namespace `std` – Standard Library

> All standard library functions are available after `using std;`.  
> `std` also contains message‑box constants used by **std.messagebox**.

| Constant | Value | Description |
|----------|-------|-------------|
| `std.MB_ICONERROR` | 16 | Display icon for error messages. |
| `std.MB_ICONINFORMATION` | 64 | Icon for informational messages. |
| `std.MB_ICONWARNING` | 48 | Warning icon. |
| `std.MB_OK` | 0 | `OK` button(s). |
| `std.MB_OKCANCEL` | 1 | `OK` and `Cancel` buttons. |
| `std.MB_RETRYCANCEL` | 5 | `Retry` and `Cancel`. |
| `std.MB_YESNO` | 4 | `Yes` & `No`. |
| `std.MB_YESNOCANCEL` | 3 | `Yes`, `No`, and `Cancel`. |

### Core Helpers

| Function | Parameters | Description |
|----------|------------|-------------| 
| **std.argc()** | – | Returns the total number of command‑line arguments. |
| **std.argv(index)** | `index: int` | Returns the `index`‑th command‑line argument. |
| **std.buffer()** | – | Creates a new `shz_std_buffer` object (generic binary buffer). |
| **std.cd(path)** | `path: string` | Change the current working directory. |
| **std.count(value)** | `value: object` | Alias for `len()`: the number of elements. |
| **std.cout()** | – | Print to terminal (direct output). |
| **std.error()** | – | Print to the console’s error stream. |
| **std.float()** | – | <strong>Placeholder** – Intended as a type‑converter. |
| **std.free(value)** | `value: object` | Frees/ deletes an object (GC‑like). | 
| **std.has_admin_privilege()** | – | Returns `true` if the script runs with administrator rights (Windows only). |
| **std.hideconsole()** | – | Detaches and hides the console window (Windows). |
| **std.import()** | – | <strong>Placeholder** – Dynamically imports modules. |
| **std.import_all()** | – | <strong>Placeholder** – Bulk import. |
| **std.indentation()** | – | <strong>Placeholder** – Helper for formatting output. |
| **std.input(prompt)** | `prompt: string` | Reads a line of text from stdin, optionally prefixed by `prompt`. | 
| **std.int()** | – | <strong>Placeholder** – Type‑converter. |
| **std.is_function(value)** | – | <strong>Placeholder** – Returns `true` if `value` is callable. |
| **std.is_json(value)** | – | <strong>Placeholder** – Checks if a string is valid JSON. | 
| **std.is_list(value)** | – | <strong>Placeholder** – Detects array types. |
| **std.is_string(value)** | – | <strong>Placeholder** – Detects string types. |
| **std.json(json)** | `json: string` | Parses a JSON string and creates a JSON object. | 
| **std.len(value)** | `value: object` | Alias for `len()`. |
| **std.messagebox(text, caption, buttons)** | `text: string`, `caption: string`, `buttons: btns` | Shows a GUI message box with the specified text, caption and button set (uses the constants from `std`). |
| **std.millis()** | – | <strong>Placeholder** – Current time in milliseconds. |
| **std.print()** | – | Console printing – accepts multiple arguments, prints them spaced. |
| **std.runtime_error()** | – | Prints an error message to the console. | 
| **std.sleep(milliseconds)** | `milliseconds: Duration` | Pauses script execution asynchronously. |
| **std.string(value)** | `value: string` | Returns a new `std.string` instance (wrapper). |
| **std.system(command)** | `command: string` | Executes a shell command, returning its exit code. | 
| **std.system_path(path)** | `path: string` | Expands env vars and normalises a file system path. | 
| **std.thread(callback)** | `callback: function` | Creates a new thread that runs `callback`. | 
| **std.timestamp()** | – | <strong>Placeholder** – Current time stamp. |
| **std.vaddress(value)** | `value: variable` | Returns the memory address of `value`. | 
| **std.vtype(value)** | `value: variable` | Returns the runtime type name of `value`. | 
| **std.warn()** | – | Prints a warning message. | 
| **std.wd()** | – | <strong>Placeholder** – Current working directory. |
| **std.web_get(url)** | `url: string` | Simple HTTP GET, returns response body as string. |

> **Example: Console IO & Math**
> ```shz
> using std;
> using math;
> 
> print("Hello, world!");
> 
> auto num = -3.14;
> print("Absolute value:", math.abs(num));
> 
> // Basic arithmetic
> auto result = math.log2(8) + math.pow(2, 3);
> print("Result =", result);
> ```

---

## 📦 Getting Started

1. **Create a script file**: `my_script.shz`
2. **Import namespaces**:
   ```shz
   using std;
   using fileio;
   using math;
   ```
3. **Write your script**:
   ```shz
   print("Copying config:", ...);
   ```
4. **Run**:  
   ```bash
   shizonet my_script.shz
   ```  

---

## ⚖️ Licensing

This documentation is provided under the [MIT License](LICENSE). Feel free to adapt or extend it for your own use‑cases. Happy coding!