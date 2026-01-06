# ShizoScript Documentation

> **ShizoScript** is a lightweight, embeddable scripting language designed for rapid prototyping and automation.  
> - **No explicit typing** – the language infers types at runtime.  
> - **Source files** have the `.shio` extension; compiled binaries are `.shx`.  
> - The `using` keyword imports all names from a namespace into the global scope, allowing you to write `print()` instead of `std.print()`.  
> - The syntax is a hybrid of C‑style braces and Python‑style indentation for blocks.  
> - Functions, classes, and namespaces are defined with the `namespace`, `class`, and `function` keywords.  
> - Comments are `//` for single line and `/* … */` for block comments.

> **Example**  
> ```sh
> using std;
> 
> std.print("Hello, world!");
> 
> class Greeter {
>     greet(name) {
>         std.print("Hello, " + name + "!");
>     }
> }
> 
> g = Greeter();
> g.greet("ShizoScript");
> ```

---

## Table of Contents

- [Namespaces](#namespaces)
  - [fileio](#fileio)
  - [leveldb](#leveldb)
  - [math](#math)
  - [shizonet](#shizonet)
  - [shzdocs](#shzdocs)
  - [shztests](#shztests)
  - [std](#std)
  - [telegram](#telegram)
  - [testmodule](#testmodule)
  - [zip](#zip)
- [Object Types](#object-types)
  - [leveldb.iterator](#leveldbiterator)
  - [leveldb.kvdb](#leveldbkvdb)
  - [shizonet.artnet_device](#shizonetartnet_device)
  - [shizonet.client](#shizonetclient)
  - [shizonet.device](#shizonetdevice)
  - [shizonet.server](#shizonetserver)
  - [std.json](#stdjson)
  - [std.string](#stdstring)
  - [std.thread](#stdthread)
  - [telegram.bot](#telegrambot)
  - [test_object](#test_object)
  - [zip.file](#zipfile)

---

## Namespaces

### fileio

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `fileio.copy` | `copy(src: string, dest: string)` | Copy a file or directory. Creates destination folders if needed. |
| `fileio.copy_if_changed` | `copy_if_changed(src: string, dest: string)` | Copy only if the source is newer than the destination. |
| `fileio.dirs` | `dirs(path: string, recursive: bool = true)` | List directories inside `path`. `recursive` includes subfolders. |
| `fileio.exists` | `exists(path: string)` | Check if a path exists (file or directory). |
| `fileio.file_dir` | `file_dir(path: string)` | Return the directory component of a file path. |
| `fileio.file_name` | `file_name(path: string)` | Return the filename (with extension) from a path. |
| `fileio.files` | `files(path: string, recursive: bool = true)` | List files inside `path`. `recursive` includes subfolders. |
| `fileio.is_directory` | `is_directory(path: string)` | Return `true` if `path` is a directory. |
| `fileio.is_file` | `is_file(path: string)` | Return `true` if `path` is a regular file. |
| `fileio.mkdir` | `mkdir(path: string)` | Create a directory (including parents). |
| `fileio.move` | `move(src: string, dest: string)` | Move a file or directory. Uses rename or copy/delete fallback. |
| `fileio.pure_name` | `pure_name(path: string)` | Return the filename without extension. |
| `fileio.read_file` | `read_file(path: string)` | Read a file into a binary buffer. |
| `fileio.read_json` | `read_json(path: string)` | Read a JSON file and return the parsed object. |
| `fileio.read_string` | `read_string(path: string)` | Read a text file into a string. |
| `fileio.read_text` | `read_text(path: string)` | Alias for `read_string`. |
| `fileio.remove` | `remove(path: string | list)` | Delete files or directories recursively. |
| `fileio.rename` | `rename(src: string, dest: string)` | Rename or move a file/directory. |
| `fileio.write_file` | `write_file(path: string, data: object)` | Write binary data to a file. Returns `true` on success. |
| `fileio.write_json` | `write_json(path: string, data: string)` | Write a JSON string to a file. Do not modify the JSON in another thread. |
| `fileio.write_string` | `write_string(path: string, data: string)` | Write a text string to a file. |
| `fileio.write_text` | `write_text(path: string, data: string)` | Alias for `write_string`. |

---

### leveldb

| Constant / Variable | Value | Description |
|---------------------|-------|-------------|

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `leveldb.kvdb` | `kvdb(path: string)` | Create a LevelDB database object. If `path` is provided, it opens that database. |

---

### math

| Constant | Value | Description |
|----------|-------|-------------|
| `math.PI` | `3.141593` | Pi constant. |

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `math.abs` | `abs(value: float)` | Return the absolute value. |
| `math.acos` | `acos(x: float)` | Inverse cosine. |
| `math.asin` | `asin(x: float)` | Inverse sine. |
| `math.atan` | `atan(x: float)` | Inverse tangent. |
| `math.atan2` | `atan2(y: float, x: float)` | Arctangent of `y/x`. |
| `math.cbrt` | `cbrt(x: float)` | Cube root. |
| `math.ceil` | `ceil(value: float)` | Smallest integer ≥ value. |
| `math.clamp` | `clamp(x: float, min: float, max: float)` | Clamp `x` between `min` and `max`. |
| `math.cos` | `cos(x: float)` | Cosine. |
| `math.exp` | `exp(x: float)` | Exponential e^x. |
| `math.floor` | `floor(value: float)` | Largest integer ≤ value. |
| `math.fract` | `fract(x: float)` | Fractional part of `x`. |
| `math.lerp` | `lerp(a: float, b: float, t: float)` | Linear interpolation. |
| `math.log` | `log(x: float)` | Natural logarithm. |
| `math.log10` | `log10(x: float)` | Base‑10 logarithm. |
| `math.log2` | `log2(x: float)` | Base‑2 logarithm. |
| `math.max` | `max(values: float...)` | Maximum of values. |
| `math.min` | `min(values: float...)` | Minimum of values. |
| `math.pow` | `pow(base: float, exp: float)` | Power function. |
| `math.rand` | `rand()` | Random float in [0, 1]. |
| `math.round` | `round(value: float)` | Nearest integer. |
| `math.sign` | `sign(x: float)` | Returns +1, 0, or –1. |
| `math.sin` | `sin(x: float)` | Sine. |
| `math.smoothstep` | `smoothstep(edge0: float, edge1: float, x: float)` | Smoothstep interpolation. |
| `math.sqrt` | `sqrt(x: float)` | Square root. |
| `math.tan` | `tan(x: float)` | Tangent. |

---

### shizonet

| Constant / Variable | Value | Description |
|---------------------|-------|-------------|

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `shizonet.client` | `client(node_name: string, port: int = SHZNET_CLIENT_PORT)` | Create a new network client. |
| `shizonet.server` | `server(node_name: string, port: int = SHZNET_SERVER_PORT)` | Create a new network server. |

---

### shzdocs

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `shzdocs.find_all` | `find_all(Keyword: string)` | Return all documentation entries that include `Keyword`. |
| `shzdocs.get_all` | `get_all()` | Return documentation for all functions, classes, etc. |
| `shzdocs.load_all_modules` | `load_all_modules()` | Load documentation from all modules. |

---

### shztests

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `shztests.check_object` | `check_object()` | Run internal checks on test objects. |
| `shztests.test_object` | `test_object() -> test_object` | Create a new test object. |

---

### std

> ! Note these are for windows only!

| Constant | Value | Description |
|----------|-------|-------------|
| `std.MB_ICONERROR` | `16` | MessageBox icon error. |
| `std.MB_ICONINFORMATION` | `64` | MessageBox icon information. |
| `std.MB_ICONWARNING` | `48` | MessageBox icon warning. |
| `std.MB_OK` | `0` | MessageBox button OK. |
| `std.MB_OKCANCEL` | `1` | MessageBox buttons OK/Cancel. |
| `std.MB_RETRYCANCEL` | `5` | MessageBox buttons Retry/Cancel. |
| `std.MB_YESNO` | `4` | MessageBox buttons Yes/No. |
| `std.MB_YESNOCANCEL` | `3` | MessageBox buttons Yes/No/Cancel. |

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `std.argc` | `argc()` | Return the number of command‑line arguments. |
| `std.argv` | `argv(index: int)` | Return the argument at `index`. |
| `std.buffer` | `buffer() -> std.buffer` | Create a new buffer object. |
| `std.cd` | `cd(path: string)` | Change current working directory. |
| `std.count` | `count(value: Container | string | object)` | Alias of `len()`. |
| `std.cout` | `cout(...: any)` | Print to terminal directly. |
| `std.error` | `error(...: any)` | Print an error message. |
| `std.float` | `float(value: any)` | Convert to float. |
| `std.free` | `free()` | Delete an object. |
| `std.has_admin_privilege` | `has_admin_privilege()` | Return `true` if running as administrator. |
| `std.hideconsole` | `hideconsole()` | Detach and hide the console window (Windows only). |
| `std.import` | `import(module: string)` | Import an external module. |
| `std.indentation` | `indentation(text: string)` | Calculate indentation level. |
| `std.input` | `input(prompt: string)` | Read a line from stdin. |
| `std.int` | `int(value: any)` | Convert to integer. |
| `std.is_function` | `is_function(value: any)` | Check if value is a function. |
| `std.is_json` | `is_json(value: any)` | Check if value is a JSON object. |
| `std.is_list` | `is_list(value: any)` | Check if value is a list. |
| `std.is_string` | `is_string(value: any)` | Check if value is a string. |
| `std.json` | `json(json: string = "") -> std.json` | Create a new JSON object. |
| `std.len` | `len(value: Container | string | object)` | Return size/length. |
| `std.local_executable` | `local_executable()` | Return path to the current executable. |
| `std.messagebox` | `messagebox(text: string, caption: string, buttons: btns)` | Display a message box. |
| `std.millis` | `millis()` | Current time in milliseconds since epoch. |
| `std.print` | `print(...: any)` | Print to console. |
| `std.runtime_error` | `runtime_error()` | Throw a runtime error. |
| `std.sleep` | `sleep(milliseconds: int)` | Pause execution asynchronously. |
| `std.string` | `string(value: string = "") -> std.string` | Create a new string object. |
| `std.system` | `system(command: string)` | Execute a shell command. |
| `std.system_path` | `system_path(path: string)` | Expand env vars and normalize path. |
| `std.thread` | `thread(callback: function)` | Create a new thread. |
| `std.timestamp` | `timestamp()` | Current date/time in `DD-MM-YYYY HH:MM:SS`. |
| `std.vaddress` | `vaddress(value: any)` | Inspect variable type. |
| `std.vtype` | `vtype(value: any)` | Inspect variable type. |
| `std.warn` | `warn(...: any)` | Print a warning. |
| `std.wd` | `wd()` | Current working directory. |
| `std.web_get` | `web_get(url: string)` | HTTP GET request. |

---

### telegram

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `telegram.bot` | `bot(bot_token: string) -> telegram.bot` | Create a new Telegram API instance. |

---

### testmodule

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `testmodule.testfn` | `testfn()` | Test function. |

---

### zip

#### Functions

| Name | Signature | Description |
|------|-----------|-------------|
| `zip.file` | `file() -> zip.file` | Instantiate a new zip object. |

---

## Object Types

### leveldb.iterator

| Method | Signature | Description |
|--------|-----------|-------------|
| `key` | `key()` | Return the current key. |
| `next` | `next()` | Advance to the next entry. |
| `reset` | `reset()` | Reset iterator to the beginning. |
| `seek` | `seek()` | Seek to a specific key. |
| `valid` | `valid()` | Return `true` if iterator is positioned on a valid entry. |
| `value` | `value()` | Return the current value. |

---

### leveldb.kvdb

| Method | Signature | Description |
|--------|-----------|-------------|
| `batch` | `batch([[op, key, value?], ...])` | Perform a batch of operations. |
| `delete` | `delete(key: string)` | Delete a key-value pair. |
| `exists` | `exists(key: string)` | Check if a key exists. |
| `get` | `get(key: string)` | Retrieve a value by key. |
| `iter` | `iter(mode: string, ...) -> leveldb.iterator` | Create an iterator. |
| `put` | `put(key: string, value: any)` | Insert or update a key-value pair. |

---

### shizonet.artnet_device

| Property | Type | Description |
|----------|------|-------------|
| `ip` | `string` | Device IP address. |
| `mac` | `string` | Device MAC address. |
| `name` | `string` | Device name. |
| `online` | `bool` | Online status. |
| `type` | `string` | Device type. |

---

### shizonet.client

| Property | Type | Description |
|----------|------|-------------|
| `artnet_sync` | `bool` | Art-Net sync flag. |
| `enabled` | `bool` | Client enabled flag. |
| `ip` | `string` | Client IP. |
| `mac` | `string` | Client MAC. |
| `name` | `string` | Client name. |

| Method | Signature | Description |
|--------|-----------|-------------|
| `get` | `get(command: string, value: object = null, timeout: int = 0)` | Send a GET command to a device. |
| `get_all` | `get_all(command: string, data: any = null, callback: function = null, timeout: int = 0)` | Broadcast GET to all devices. |
| `on_command` | `on_command(cmd: string, func: function)` | Register a command callback. |
| `on_connect` | `on_connect(func: function)` | Register a connection callback. |
| `on_disconnect` | `on_disconnect(callback: function)` | Register a disconnect callback. |
| `on_get` | `on_get(cmd: string, func: function)` | Register a GET handler. |
| `on_stream` | `on_stream(cmd: string, func: function)` | Register a stream handler. |
| `send_osc` | `send_osc(ip: string, config: object, port: int = 8000)` | Send OSC messages to an IP. |

---

### shizonet.device

| Property | Type | Description |
|----------|------|-------------|
| `ip` | `string` | Device IP. |
| `mac` | `string` | Device MAC. |
| `name` | `string` | Device name. |
| `online` | `bool` | Online status. |
| `type` | `string` | Device type. |

| Method | Signature | Description |
|--------|-----------|-------------|
| `fetch` | `fetch(command: string, value: object = null, timeout: int = 0)` | Send a FETCH command. |
| `get` | `get(command: string, value: object = null, timeout: int = 0)` | Send a GET command. |
| `get_static_buffer_count` | `get_static_buffer_count()` | Total static buffers. |
| `get_static_buffer_desc` | `get_static_buffer_desc(identifier: int | string)` | Get buffer description. |
| `get_static_buffer_names` | `get_static_buffer_names()` | List buffer names. |
| `send` | `send(command: string, data: object = null, timeout: int = 0, wait_finish: bool = false)` | Reliable send. |
| `send_fast` | `send_fast(command: string, data: object)` | Unreliable send. |
| `send_queue` | `send_queue(command: string, data: object = null, timeout: int = 0, wait_finish: bool = false)` | Queued reliable send. |

---

### shizonet.server

| Property | Type | Description |
|----------|------|-------------|
| `artnet_sync` | `bool` | Art-Net sync flag. |
| `enabled` | `bool` | Server enabled flag. |
| `ip` | `string` | Server IP. |
| `mac` | `string` | Server MAC. |
| `name` | `string` | Server name. |

| Method | Signature | Description |
|--------|-----------|-------------|
| `get` | `get(command: string, value: object = null, timeout: int = 0)` | Send a GET command. |
| `get_all` | `get_all(command: string, data: any = null, callback: function = null, timeout: int = 0)` | Broadcast GET. |
| `on_command` | `on_command(cmd: string, func: function)` | Register command callback. |
| `on_connect` | `on_connect(func: function)` | Register connect callback. |
| `on_disconnect` | `on_disconnect(callback: function)` | Register disconnect callback. |
| `on_get` | `on_get(cmd: string, func: function)` | Register GET handler. |
| `on_stream` | `on_stream(cmd: string, func: function)` | Register stream handler. |
| `send_osc` | `send_osc(ip: string, config: object, port: int = 8000)` | Send OSC messages. |

---

### std.json

| Method | Signature | Description |
|--------|-----------|-------------|
| `all` | `all(filter: function | string)` | True if all entries match. |
| `any` | `any(filter: function | string)` | True if any entry matches. |
| `combine_string` | `combine_string(separator: string)` | Concatenate string values with separator. |
| `compact_string` | `compact_string()` | Compact JSON string. |
| `copy` | `copy()` | Deep copy of JSON object. |
| `erase` | `erase(key: string)` | Remove key/index. |
| `filter` | `filter(filter: function | string)` | Filter entries. |
| `filter_key` | `filter_key(filter: string)` | Filter by key substring. |
| `filter_value` | `filter_value(filter: string)` | Filter by value substring. |
| `foreach` | `foreach(callback: function)` | Iterate over entries. |
| `from_string` | `from_string(json: string)` | Parse JSON string. |
| `has` | `has(key: string)` | Check key existence. |
| `key` | `key(index: int)` | Get key at index. |
| `map` | `map(callback: function)` | Map values. |
| `merge` | `merge(other: json, overwrite: bool = true)` | Merge another JSON. |
| `push` | `push(value: object)` | Append value. |
| `push_back` | `push_back(value: object)` | Alias for `push`. |
| `reduce` | `reduce(callback: function, initial: any)` | Reduce entries. |
| `remove` | `remove(key: string)` | Remove key/index. |
| `rsort` | `rsort()` | Sort descending. |
| `size` | `size()` | Number of elements. |
| `sort` | `sort()` | Sort ascending. |
| `sort_reverse` | `sort_reverse()` | Sort descending. |
| `string` | `string(compact: int = 0)` | Convert to string. |

---

### std.string

| Method | Signature | Description |
|--------|-----------|-------------|
| `center` | `center(width: int)` | Center string. |
| `contains` | `contains(sub: string)` | Check substring. |
| `empty` | `empty()` | True if empty. |
| `ends` | `ends(suffix: string)` | Ends with suffix. |
| `extract` | `extract(left: string)` | Extract between delimiters. |
| `find` | `find(substring: string)` | Find substring. |
| `find_first_not_of` | `find_first_not_of(chars: string)` | First char not in set. |
| `find_first_of` | `find_first_of(chars: string)` | First char in set. |
| `find_last_not_of` | `find_last_not_of(chars: string)` | Last char not in set. |
| `find_last_of` | `find_last_of(chars: string)` | Last char in set. |
| `length` | `length()` | Length of string. |
| `ljust` | `ljust(width: int)` | Left‑justify. |
| `lowercase` | `lowercase()` | To lowercase. |
| `lowercase_inplace` | `lowercase_inplace()` | In‑place lowercase. |
| `ltrim` | `ltrim()` | Trim left. |
| `ltrim_inplace` | `ltrim_inplace()` | In‑place trim left. |
| `regex_escape` | `regex_escape()` | Escape regex metacharacters. |
| `regex_findall` | `regex_findall(pattern: string)` | Find all regex matches. |
| `regex_match` | `regex_match(pattern: string)` | Regex match. |
| `regex_replace` | `regex_replace(pat: string)` | Replace regex matches. |
| `regex_replace_inplace` | `regex_replace_inplace(pattern: string)` | In‑place replace. |
| `regex_search` | `regex_search(pattern: string)` | Regex search. |
| `regex_split` | `regex_split(pattern: string)` | Split by regex. |
| `removechars` | `removechars(chars: string)` | Remove specified chars. |
| `removecharsexcept` | `removecharsexcept(chars: string)` | Keep only specified chars. |
| `removeprefix` | `removeprefix(prefix: string)` | Remove prefix. |
| `removesuffix` | `removesuffix(suffix: string)` | Remove suffix. |
| `replace` | `replace(search: string)` | Replace all occurrences. |
| `replace_first` | `replace_first(search: string)` | Replace first occurrence. |
| `replace_inplace` | `replace_inplace(search: string)` | In‑place replace. |
| `reverse` | `reverse()` | Reverse string. |
| `reverse_inplace` | `reverse_inplace()` | In‑place reverse. |
| `rfind` | `rfind(sub: string)` | Find last occurrence. |
| `rjust` | `rjust(width: int)` | Right‑justify. |
| `rtrim` | `rtrim()` | Trim right. |
| `rtrim_inplace` | `rtrim_inplace()` | In‑place trim right. |
| `size` | `size()` | Size of string. |
| `split` | `split(delim: string)` | Split string. |
| `starts` | `starts(prefix: string)` | Starts with prefix. |
| `substr` | `substr(start: int)` | Substring with Python‑style indices. |
| `substr_inplace` | `substr_inplace(start: int)` | In‑place substring. |
| `trim` | `trim()` | Trim both sides. |
| `trim_inplace` | `trim_inplace()` | In‑place trim. |
| `uppercase` | `uppercase()` | To uppercase. |
| `uppercase_inplace` | `uppercase_inplace()` | In‑place uppercase. |

---

### std.thread

| Method | Signature | Description |
|--------|-----------|-------------|
| `join` | `join()` | Wait for all active tasks. |
| `run` | `run(...: any)` | Execute callback asynchronously. |

---

### telegram.bot

| Property | Type | Description |
|----------|------|-------------|
| `on_any_message` | `function` | Callback for any incoming message. |

| Method | Signature | Description |
|--------|-----------|-------------|
| `send` | `send(chatdata: object, options: object = null)` | Send a message with optional buttons. |
| `send_choice` | `send_choice(chatdata: object, options: object = null)` | Send a message with inline keyboard. |

---

### test_object

| Property | Type | Description |
|----------|------|-------------|
| `test_member` | `any` | Test member variable. |
| `testint` | `int` | Test integer variable. |

| Method | Signature | Description |
|--------|-----------|-------------|
| `call_cb` | `call_cb()` | Test function. |
| `test_cb` | `test_cb()` | Test function. |
| `test_fn` | `test_fn()` | Test function. |
| `test_thread` | `test_thread()` | Test function. |

---

### zip.file

| Method | Signature | Description |
|--------|-----------|-------------|
| `add` | `add(path: string)` | Add a file to the archive with specified internal path. |
| `add_file` | `add_file(path: string)` | Add a file from disk into the archive. |
| `save` | `save(path: string)` | Write the archive to disk. |

--- 

> **Note**  
> All functions and methods are case‑sensitive.  
> When passing objects to functions that expect a JSON object, use `std.json` to construct or parse the data.  
> The `std.thread` API is cooperative; use `std.sleep` to yield control if needed.  

--- 

**Happy scripting!**