# ShizoScript Documentation  

---

## Introduction  

ShizoScript is a lightweight scripting language that blends the simplicity of **sh** with script‑style magic.  

* **No explicit typing** – variables are dynamically assigned.  
* **File extensions** – source files end with **`.shio`**, compiled binaries with **`.shx`**.  
* **Namespaces** – functions and variables are grouped under a namespace (`std.print`).  
* **Importing** – `using std;` brings all names from a namespace into the global scope (e.g. `using std;   print(...);`).  

The language follows a straightforward syntax, making it easy to read and maintain. Below is a comprehensive reference for the standard namespaces, objects and their members.

---

## Table of Contents  

- [Namespace: curl](#namespace-curl)  
- [Namespace: fileio](#namespace-fileio)  
- [Namespace: leveldb](#namespace-leveldb)  
- [Namespace: math](#namespace-math)  
- [Namespace: mqtt](#namespace-mqtt)  
- [Namespace: nanogui](#namespace-nanogui)  
- [Namespace: shizonet](#namespace-shizonet)  
- [Namespace: shzdocs](#namespace-shzdocs)  
- [Namespace: shztests](#namespace-shztests)  
- [Namespace: std](#namespace-std)  
- [Namespace: subprocess](#namespace-subprocess)  
- [Namespace: telegram](#namespace-telegram)  
- [Namespace: testmodule](#namespace-testmodule)  
- [Namespace: webserver](#namespace-webserver)  
- [Namespace: zip](#namespace-zip)  
- [Object: curl.curl](#object-curlcurl)  
- [Object: leveldb.iterator](#object-leveldbiterator)  
- [Object: leveldb.kvdb](#object-leveldbkvdb)  
- [Object: mqtt.mqtt](#object-mqttmqtt)  
- [Object: nanogui.context](#object-nanoguicontext)  
- [Object: shizonet.artnet_device](#object-shizonetartnet_device)  
- [Object: shizonet.client](#object-shizonetclient)  
- [Object: shizonet.device](#object-shizonetdevice)  
- [Object: shizonet.server](#object-shizonetserver)  
- [Object: std.json](#object-stjson)  
- [Object: std.string](#object-ststdjson)  
- [Object: std.thread](#object-ststdthread)  
- [Object: subprocess.process](#object-subprocessprocess)  
- [Object: telegram.bot](#object-telegrambot)  
- [Object: test_object](#object-testobject)  
- [Object: webserver.http_server](#object-webserverhttp_server)  
- [Object: webserver.https_server](#object-webserverhttps_server)  
- [Object: zip.file](#object-zipfile)  

---

## Namespace: curl  

No utility functions listed for this namespace.  
### Object: curl.curl  

| Method | Parameters | Description |
|---|---|---|
| `get(url: string)` | - | HTTP GET. Returns JSON `{ ok, http_code, body, content_type }`. |
| `last_error()` | - | Get last error text set by the wrapper. |
| `poll_stream()` | - | Drain pending stream chunks. |
| `post(url: string, payload: string)` | - | HTTP POST with raw string payload. Returns JSON `{ ok, http_code, body, content_type }`. |
| `request(method: string, url: string, body: string, headers: json, timeout_ms: int, binary: bool)` | - | Generic HTTP request. Returns JSON `{ ok, http_code, body, content_type }`. |
| `reset()` | - | Reset the CURL easy handle and clear last error. |
| `start_stream(method: string, url: string, body: string, headers: json, timeout_ms: int)` | - | Start streaming request. Use `poll_stream(cb)` to receive chunks, `stop_stream()` to abort. |
| `stop_stream()` | - | Abort the active streaming request (if any). Returns 1 if stop was signaled. |
| `version()` | - | Get the version of the libcurl library. |


---

## Namespace: fileio  

| Function | Parameters | Description |
|---|---|---|
| `copy(src: string, dest: string)` | source path, destination path (folders created if required) | Copy file or directory |
| `copy_if_changed(src: string, dest: string)` | source path, destination path | Copy file or directory if source is newer |
| `dirs(path: string, recursive: bool = true)` | directory to list, include subfolders? | List directories inside a directory |
| `exists(path: string)` | path to test | Check if path is a directory |
| `file_dir(path: string)` | file path to extract directory from | Extracts the directory from a given file path |
| `file_name(path: string)` | file path to extract filename from | Extracts the filename from a given path string |
| `files(path: string, recursive: bool = true)` | directory to list, include subfolders? | List files in directory |
| `is_directory(path: string)` | path to test | Check if path is a directory |
| `is_file(path: string)` | path to test | Check if path is a file |
| `mkdir()` | - | placeholderdesc |
| `move(src: string, dest: string)` | source path, new location or name | Move file or directory (rename or copy/delete fallback) |
| `pure_name(path: string)` | file path to extract filename from | Extracts the filename without extension |
| `read_file(path: string)` | path to the file | Read file into binary buffer |
| `read_json(path: string)` | path to the JSON file | Read JSON file and return parsed object |
| `read_string(path: string)` | file path to read as text | Read text file into string |
| `read_text(path: string)` | file path to read as text | Read text file into string |
| `remove(path: string|list)` | file(s) or directory to delete | Remove files or directories (recursive) |
| `rename(src: string, dest: string)` | path of existing file, new name or destination | Rename file or directory |
| `write_file(path: string, data: object)` | file path, object to serialize & write as binary | Write binary data, returns true on success |
| `write_json(path: string, data: string)` | destination path, JSON string to write | Writes a JSON string to a file (thread‑safe note in description) |
| `write_string(path: string, data: string)` | destination file path, text string to be written | Write string to file |
| `write_text(path: string, data: string)` | destination file path, text string to be written | Write string to file |


---

## Namespace: leveldb  

| Function | Parameters | Description |
|---|---|---|
| `kvdb(path: string)` | File path where the LevelDB database is located | Creates a new LevelDB database object that can optionally open a database at a specified path |


### Object: leveldb.iterator  

| Method | Parameters | Description |
|---|---|---|
| `key()` | - | - |
| `next()` | - | - |
| `reset()` | - | - |
| `seek()` | - | - |
| `valid()` | - | - |
| `value()` | - | - |


### Object: leveldb.kvdb  

| Method | Parameters | Description |
|---|---|---|
| `batch()` | - | batch([[op, key, value?], ...]) |
| `delete(key: string)` | key to delete from the database | Delete a key‑value pair from the database |
| `exists(key: string)` | key to check for existence | Check if a key exists in the database |
| `get(key: string)` | key to retrieve | Get value from LevelDB by key with optional default return |
| `iter()` | - | Returns /** leveldb.iterator **/ |
| `put()` | - | put(key, value) |


---

## Namespace: math  

Constants:  

| Constant | Value |
|---|---|
| `PI` | `3.141593` |


| Function | Parameters | Description |
|---|---|---|
| `abs(value: float)` | Input number (integer or floating‑point) | Return the absolute value of a numeric input |
| `acos(x: float)` | Value in range `[-1,1]` | Inverse cosine (arccos) |
| `asin(x: float)` | Value in range `[-1,1]` | Inverse sine (arcsin) |
| `atan(x: float)` | Ratio y/x | Inverse tangent (arctan) |
| `atan2(y: float, x: float)` | y, x | Arctangent from y and x |
| `cbrt(x: float)` | Value | Cube root |
| `ceil(value: float)` | Input number | Return the smallest integer greater than or equal to the given number |
| `clamp(x: float, min: float, max: float)` | Value, minimum, maximum | Clamp value between min and max |
| `cos(x: float)` | Angle in radians | Cosine of angle |
| `exp(x: float)` | Exponent | Exponential function (e^x) |
| `floor(value: float)` | Floating‑point number | Return the largest integer less than or equal to the given number |
| `fract(x: float)` | Value | Fractional part of value |
| `lerp(a: float, b: float, t: float)` | Start value, end value, interpolation factor (0..1) | Linear interpolation |
| `log(x: float)` | Value > 0 | Natural logarithm (base e) |
| `log10(x: float)` | Value > 0 | Base‑10 logarithm |
| `log2(x: float)` | Value > 0 | Base‑2 logarithm |
| `max(values: float...)` | One or more numbers | Maximum of values |
| `min(values: float...)` | One or more numbers | Minimum of values |
| `pow(base: float, exp: float)` | Base, exponent | Power function |
| `rand()` | - | Random float in range `[0,1]` |
| `round(value: float)` | Floating point number to round | Return the nearest integer value to the given number |
| `sign(x: float)` | Returns +1, 0, or -1 | Sign of number |
| `sin(x: float)` | Angle in radians | Sine of angle |
| `smoothstep(edge0: float, edge1: float, x: float)` | Lower boundary, upper boundary, value to evaluate | Smoothstep interpolation |
| `sqrt(x: float)` | Value to square‑root | Square root |
| `tan(x: float)` | Angle in radians | Tangent of angle |


---

## Namespace: mqtt  

| Function | Parameters | Description |
|---|---|---|
| `mqtt()` | - | Create a new MQTT client |


### Object: mqtt.mqtt  

| Method | Parameters | Description |
|---|---|---|
| `configure(server_uri: string, client_id: string)` | Server URI, client ID | Create/replace the internal MQTT async client |
| `connect(username: string, password: string, clean_session: bool, keep_alive: int)` | … | Connect to broker (blocking; runs on worker thread) |
| `disconnect()` | - | Disconnect from broker (blocking; runs on worker thread) |
| `is_connected()` | - | Returns true if currently connected |
| `poll()` | - | Drain queued MQTT messages and invoke on_message callback. Returns number of delivered messages. |
| `publish(topic: string, payload: string, qos: int, retained: bool)` | … | Publish a message (blocking; runs on worker thread) |
| `set_callbacks(on_message: function, on_connect: function, on_disconnect: function, on_error: function)` | ... | Set script callbacks (invoked by poll()) |
| `subscribe(topic: string, qos: int)` | … | Subscribe to a topic (blocking; runs on worker thread) |


---

## Namespace: nanogui  

| Function | Parameters | Description |
|---|---|---|
| `context()` | - | - |


### Object: nanogui.context  

| Method | Parameters | Description |
|---|---|---|
| `screen()` | - | - |


---

## Namespace: shizonet  

| Function | Parameters | Description |
|---|---|---|
| `client(node_name: string, port: int)` | Node name, client listening port (default: `SHZNET_CLIENT_PORT`) | Create a new network client with the specified node name and optional port |
| `server(node_name: string, port: int)` | Node name, server listening port (default: `SHZNET_SERVER_PORT`) | Create a new network server with the specified node name and optional port |


### Object: shizonet.artnet_device  

| Attribute | Description |
|---|---|
| `ip` | variable |
| `mac` | variable |
| `name` | variable |
| `online` | variable |
| `type` | variable |


### Object: shizonet.client  

| Attribute / Method | Description |
|---|---|
| `artnet_sync` | variable |
| `enabled` | variable |
| `ip` | variable |
| `mac` | variable |
| `name` | variable |
| `get(command: string, value: object, timeout: int)` | Send a GET command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get_all(command: string, data: int/float/string/json/none, callback: function, timeout: int)` | Send a GET command to all connected devices, optionally with payload, callback, and timeout. Returns the number of devices that accepted the command. |
| `on_command(cmd: string, func: function)` | Register a callback for the specified command. |
| `on_connect(function: function)` | Register a function to be invoked for each new client connection. |
| `on_disconnect(callback: function)` | Register a callback to be invoked when the server disconnects. |
| `on_get(cmd: string, func: function)` | Register a handler for a request command; callback receives device and request data, returns a reply. |
| `on_stream(cmd: string, func: function)` | Register a stream handler for a command; callback invoked with device and packet data on each arrival. |
| `send_osc(ip: string, config: object, port: int = 8000)` | Send OSC message(s) described by a JSON object to the specified IP address and port. |


### Object: shizonet.device  

| Attribute / Method | Description |
|---|---|
| `ip` | variable |
| `mac` | variable |
| `name` | variable |
| `online` | variable |
| `type` | variable |
| `fetch(command: string, value: object, timeout: int)` | Send a FETCH command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get(command: string, value: object, timeout: int)` | Send a GET command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get_static_buffer_count()` | Get the total number of static buffers in the device |
| `get_static_buffer_desc(identifier: int|string)` | Retrieve description and setup of the static buffer by index or name |
| `get_static_buffer_names()` | Retrieve names and details of static buffers in the device |
| `send(command: string, data: object, timeout: int = 0, wait_finish: bool)` | Send a command with optional payload and timeout, optionally waiting for completion. |
| `send_fast(command: string, data: object)` | Send a command with accompanying data over an unreliable connection. |
| `send_queue(command: string, data: object, timeout: int = 0, wait_finish: bool = false)` | Send a command via a queued reliable connection, optionally waiting for completion. |


### Object: shizonet.server  

| Attribute / Method | Description |
|---|---|
| `artnet_sync` | variable |
| `enabled` | variable |
| `ip` | variable |
| `mac` | variable |
| `name` | variable |
| `get(command: string, value: object, timeout: int)` | Send a GET command... (same description as client) |
| `get_all(command: string, data: int/float/string/json/none, callback: function, timeout: int)` | Send a GET command to all connected devices... |
| `on_command(cmd: string, func: function)` | Register a callback for the specified command. |
| `on_connect(function: function)` | Register a function to be invoked for each new client connection. |
| `on_disconnect(callback: function)` | Register a callback to be invoked when the server disconnects. |
| `on_get(cmd: string, func: function)` | Register a handler for a request command... |
| `on_stream(cmd: string, func: function)` | Register a stream handler for a command... |
| `send_osc(ip: string, config: object, port: int = 8000)` | Send OSC message(s)... |


---

## Namespace: shzdocs  

| Function | Parameters | Description |
|---|---|---|
| `find_all(Keyword: string)` | Returns all matches that include the keyword | Get documentation about all function, classes, etc. |
| `get_all()` | - | Get documentation about all function, classes, etc. |
| `load_all_modules()` | - | - |


---

## Namespace: shztests  

| Function | Parameters | Description |
|---|---|---|
| `check_object()` | - | - |
| `test_object()` | - | (returns `test_object`) |


---

## Namespace: std  

Constants:  

| Constant | Value |
|---|---|
| `MB_ICONERROR` | `16` |
| `MB_ICONINFORMATION` | `64` |
| `MB_ICONWARNING` | `48` |
| `MB_OK` | `0` |
| `MB_OKCANCEL` | `1` |
| `MB_RETRYCANCEL` | `5` |
| `MB_YESNO` | `4` |
| `MB_YESNOCANCEL` | `3` |


| Function | Parameters | Description |
|---|---|---|
| `argc()` | - | Return argc |
| `argv(index: int)` | - | Return argv |
| `buffer()` | - | Instantiate a new shz_std_buffer object |
| `cd(path: string)` | - | Change current working directory |
| `count(value: Container, string, or object)` | - | Alias of `len()` – returns number of elements |
| `cout()` | - | Print to terminal directly |
| `error()` | - | Print to console output |
| `float(value: any)` | - | Convert input value to float |
| `free()` | - | Delete an object |
| `has_admin_privilege()` | - | Returns true if run as administrator. |
| `hideconsole()` | - | Detach and hide the console window (Windows only) |
| `import(module: string)` | - | Import an external module by name or path |
| `indentation(text: string)` | - | Calculate indentation level of text, counting spaces and tabs (1 space = 1 unit, 1 tab = 4 units) |
| `input(prompt: string)` | - | Read a line of text from standard input |
| `int(value: any)` | - | Convert value to integer |
| `is_function(value: any)` | - | Check if the provided value is a function |
| `is_json(value: any)` | - | Check if the value is a JSON object |
| `is_list(value: any)` | - | Check if value is a list |
| `is_string(value: any)` | - | Check if it’s a string |
| `json(json: string)` | - | Create a new JSON object, optionally initialized from a JSON string |
| `len(value: Container, string, or object)` | - | Return size/length of a list, map, array, string, or object container |
| `local_executable()` | - | - |
| `messagebox(text: string, caption: string, buttons: btns)` | - | Display a message box |
| `millis()` | - | Get current time in milliseconds since epoch |
| `print()` | - | Print to console output (examples shown in description) |
| `runtime_error()` | - | Print to console output |
| `sleep(milliseconds: Duration)` | - | Suspend script execution for a duration (async) |
| `string(value: string)` | - | Create a new string, optionally initialized with a given value |
| `system(command: string)` | - | Execute a shell command and return its exit code |
| `system_path(path: string)` | - | Expand environment variables and normalize a filesystem path |
| `thread(callback: function)` | - | Threading |
| `timestamp()` | - | Get current date and time in `DD‑MM‑YYYY HH:MM:SS` format |
| `vaddress(value: any)` | - | Get the type of a variable |
| `vtype(value: any)` | - | Get the type of a variable |
| `warn()` | - | Print to console output |
| `wd()` | - | Get current working directory path |
| `web_get(url: string)` | - | Perform a simple HTTP GET request and return the response body |


### Object: std.json  

| Method | Parameters | Description |
|---|---|---|
| `all(filter: function|string)` | Returns true if all entries match substring or callback. |
| `any(filter: function|string)` | Returns true if any entry matches substring or callback. |
| `combine_string(separator: string)` | Combine string values of the JSON object with an optional separator. |
| `compact_string()` | Convert JSON object to its compact string representation. |
| `copy()` | Creates a deep copy of the JSON object. |
| `erase(key: string)` | Removes a key or index from a JSON object; returns success. |
| `filter(filter: function|string)` | Filter JSON object entries by callback or key substring. |
| `filter_key(filter: string)` | Filter JSON object's keys by matching substrings; returns filtered JSON. |
| `filter_value(filter: string)` | Return a new JSON object containing only string members whose values include a specific substring. |
| `foreach(callback: function)` | Iterates over each key/value pair; callback returns bool to include entry. |
| `from_string(json: string)` | Parse JSON from string and populate object. |
| `has(key: string)` | Checks if the JSON object contains a given key. |
| `key(index: int)` | Return the key at a specified index (negative counts from end). |
| `map(callback: function)` | Return a new JSON where each value is replaced by the result of the callback. |
| `merge(other: json, overwrite?: bool)` | Merge another JSON object into this one. |
| `push(value: object)` | Adds the supplied value to the given JSON container. |
| `push_back(value: object)` | Adds the supplied value to the given JSON container. |
| `reduce(callback: function, initial: any)` | Reduce object entries into a single value. |
| `remove(key: string)` | Removes a key or index; returns success. |
| `rsort()` | Sorts a JSON object’s entries by key in descending order. |
| `size()` | Returns the number of elements in a JSON array or the number of keys in a JSON object. |
| `sort()` | Sorts JSON entries by their keys in case‑insensitive order. |
| `sort_reverse()` | Sorts a JSON object’s entries by key in descending order. |
| `string(compact?: int)` | Convert JSON object to its string representation, optionally compact. |


### Object: std.string  

| Method | Parameters | Description |
|---|---|---|
| `center(width: int)` | - | Center the string within specified width using padding characters |
| `contains(sub: string)` | - | Check if string contains substring |
| `empty()` | - | Check if string is empty (returns 1 if true, 0 otherwise) |
| `ends(suffix: string)` | - | Check if the string ends with specified suffix |
| `extract(left: string)` | - | Extract substring between specified left and right delimiters |
| `find(substring: string)` | - | Find the position of a substring within the string |
| `find_first_not_of(chars: string)` | - | Find first character not in specified set |
| `find_first_of(chars: string)` | - | Find first occurrence of any character from the given set |
| `find_last_not_of(chars: string)` | - | Find last character in the string that is not in the specified set |
| `find_last_of(chars: string)` | - | Finds the last occurrence of any character from the given set |
| `length()` | - | Retrieve the length of the string |
| `ljust(width: int)` | - | Left‑justify the string by padding |
| `lowercase()` | - | Convert string to lowercase |
| `lowercase_inplace()` | - | Convert string to lowercase in place |
| `ltrim()` | - | Remove leading whitespace |
| `ltrim_inplace()` | - | Remove leading whitespace in place |
| `regex_escape()` | - | Escape regex metacharacters in string |
| `regex_findall(pattern: string)` | - | Find all matches of a regex pattern in the string |
| `regex_match(pattern: string)` | - | Check if the string matches a regex pattern |
| `regex_replace(pat: string)` | - | Replace all occurrences of a regex pattern |
| `regex_replace_inplace(pattern: string)` | - | Replace all occurrences of a regex pattern in place |
| `regex_search(pattern: string)` | - | Search for a pattern and return the start position |
| `regex_split(pattern: string)` | - | Split string using regex and return results as JSON array |
| `removechars(chars: string)` | - | Remove all occurrences of specified characters |
| `removecharsexcept(chars: string)` | - | Remove all characters except those specified |
| `removeprefix(prefix: string)` | - | Remove a prefix from the string if it starts with that prefix |
| `removesuffix(suffix: string)` | - | Remove specified suffix from string if it exists at the end |
| `replace(search: string)` | - | Replace all occurrences of a substring with another substring |
| `replace_first(search: string)` | - | Replace the first occurrence of a substring |
| `replace_inplace(search: string)` | - | Replace all occurrences of a substring in-place |
| `reverse()` | - | Return a reversed copy of the string |
| `reverse_inplace()` | - | Reverse the string in-place |
| `rfind(sub: string)` | - | Find last occurrence of substring, searching backwards |
| `rjust(width: int)` | - | Right‑justify string by padding |
| `rtrim()` | - | Remove trailing whitespace |
| `rtrim_inplace()` | - | Remove trailing whitespace in-place |
| `size()` | - | Retrieve the size of the string |
| `split(delim: string)` | - | Split string into parts using delimiter |
| `starts(prefix: string)` | - | Check if the string starts with specified prefix |
| `substr(start: int)` | - | Extracts a substring (supports Python‑style negative indices) |
| `substr_inplace(start: int)` | - | Extracts a substring and modifies the original string in-place |
| `trim()` | - | Remove leading and trailing whitespace |
| `trim_inplace()` | - | Remove leading and trailing whitespace in-place |
| `uppercase()` | - | Convert string to uppercase |
| `uppercase_inplace()` | - | Convert string to uppercase in place |


### Object: std.thread  

| Method | Parameters | Description |
|---|---|---|
| `join()` | - | Join active tasks and wait for their completion |
| `run(...: any)` | – | Execute callback function asynchronously as a task |


---

## Namespace: subprocess  

| Function | Parameters | Description |
|---|---|---|
| `process()` | - | Instantiate a new subprocess.process object |


### Object: subprocess.process  

| Method | Parameters | Description |
|---|---|---|
| `exited()` | - | Returns true if the process exited. |
| `kill()` | - | Force kill the process (SIGKILL / TerminateProcess). |
| `pid()` | - | Get process id. |
| `poll()` | - | Check process status. Returns return code or none if still running. |
| `returncode()` | - | Get cached return code (or none if not finished). |
| `start(args: list, cwd: string = null, shell: bool = false)` | - | Start a subprocess (similar to Python `subprocess.Popen`). |
| `stop()` | - | Send Ctrl+C / SIGINT to request graceful shutdown. |
| `terminate()` | - | Request process termination (SIGTERM / TerminateProcess). |
| `wait()` | - | Wait until process exits and return its exit code. |


---


## Namespace: telegram  

| Function | Parameters | Description |
|---|---|---|
| `bot(bot_token: string)` | Bot authentication token for Telegram API | Create a new Telegram API instance with a bot token |


### Object: telegram.bot  

| Attribute | Description |
|---|---|
| `on_any_message` | variable |


| Method | Parameters | Description |
|---|---|---|
| `ban_chat_member(chatid: int, userid: int, until_date: int = null, revoke_messages: int = null)` | - | Ban a user from a chat |
| `copy_message(to_chatid: int, from_chatid: int, msgid: int)` | - | Copy a message without forwarding tag |
| `delete_message(chatid: int, msgid: int)` | - | Delete a message |
| `edit_caption(chatdata: object, caption: string)` | - | Edit a message caption |
| `edit_message(chatdata: object, text: string)` | - | Edit an existing message text |
| `edit_reply_markup(chatdata: object, buttons: object = null)` | - | Edit message reply markup (buttons) |
| `forward_message(to_chatid: int, from_chatid: int, msgid: int)` | - | Forward a message from one chat to another |
| `get_chat(chatid: int)` | - | Get information about a chat |
| `get_chat_administrators(chatid: int)` | - | Get a list of chat administrators |
| `get_chat_member(chatid: int, userid: int)` | - | Get information about a chat member |
| `get_chat_member_count(chatid: int)` | - | Get the number of members in a chat |
| `leave_chat(chatid: int)` | - | Leave a chat |
| `promote_chat_member(chatid: int, userid: int, rights: object = null)` | - | Promote a user to admin in a chat |
| `restrict_chat_member(chatid: int, userid: int, permissions: object, until_date: int = null)` | - | Restrict a chat member's permissions |
| `send(chatdata: object, options: object = null)` | - | Send a message through Telegram with optional buttons and options |
| `send_animation(chatdata: object, animation: string, options: object = null)` | - | Send an animation (GIF) to a chat |
| `send_audio(chatdata: object, audio: string, options: object = null)` | - | Send an audio file |
| `send_chat_action(chatid: int, action: string, threadid: int = null)` | - | Send a chat action (typing, uploading, etc.) |
| `send_choice(chatdata: object, options: object = null)` | - | Send a message with inline keyboard buttons |
| `send_document(chatdata: object, document: string, options: object = null)` | - | Send a document |
| `send_location(chatdata: object, latitude: float, longitude: float, options: object = null)` | - | Send a location |
| `send_photo(chatdata: object, photo: string, options: object = null)` | - | Send a photo |
| `send_sticker(chatdata: object, sticker: string, options: object = null)` | - | Send a sticker |
| `send_video(chatdata: object, video: string, options: object = null)` | - | Send a video |
| `send_video_note(chatdata: object, video_note: string, options: object = null)` | - | Send a video note (circular video) |
| `send_voice(chatdata: object, voice: string, options: object = null)` | - | Send a voice message |
| `set_chat_administrator_custom_title(chatid: int, userid: int, title: string)` | - | Set a custom title for an admin |
| `unban_chat_member(chatid: int, userid: int, only_if_banned: int = null)` | - | Unban a user from a chat |


---


## Namespace: testmodule  

| Function | Parameters | Description |
|---|---|---|
| `testfn()` | - | - |


---


## Namespace: webserver  

| Function | Parameters | Description |
|---|---|---|
| `http_server()` | - | Class representing an HTTP server |
| `https_server()` | - | Class representing an HTTPS server |


---


## Namespace: zip  

| Function | Parameters | Description |
|---|---|---|
| `file()` | - | Instantiate a new zip object |


---


## Object: zip.file  

| Method | Parameters | Description |
|---|---|---|
| `add(path: string)` | - | Add a file to the zip archive with specified path and content |
| `add_file(path: string)` | - | Adds a file to the zip archive with specified content |
| `save(path: string)` | - | Save zip file to specified path |


---


# End of Documentation  

*(All information is reproduced verbatim from the supplied source.)*  