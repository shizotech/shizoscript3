# shizoscript Documentation  

_Compiled Reference for **.shio** source files and **.shx** compiled binaries_

---

## 📚 Quick Overview  

| Feature | Description |
|---|---|
| **Typeless language** | Shizoscript does not require explicit type declarations – variables acquire a type based on assignment. |
| **Compiles to .shx** | Source files have the **`.shio`** extension. After compilation a binary **`.shx`** file is produced. |
| **`using` statement** | Borrow functions and constants from a namespace by writing `using std;`. This makes `std.print()` available as just `print()`. |
| **Modules (namespaces)** | Logical grouping of functionality under `namespace std;`, `namespace curl;`, … |
| **Classes & Objects** | `class` statements define boxed types. Method calls are instance method calls (`c.print()`). |
| **Running scripts** | Execute a compiled **`.shx`** directly (Windows `shx.exe`, Linux/macOS `sh.*`). |
| **Scripting style** | Emphasis on readability and Python‑like indentation (4 spaces).  |

---

## 📇 Table of Contents  

| Section | Link |
|---|---|
| **Namespaces** | |
| [curl](#curl) | ↳ |
| [fileio](#fileio) | ↳ |
| [leveldb](#leveldb) | ↳ |
| [math](#math) | ↳ |
| [mqtt](#mqtt) | ↳ |
| [nanogui](#nanogui) | ↳ |
| [shizionet](#shizionet) | ↳ |
| [shzdocs](#shzdocs) | ↳ |
| [shztests](#shztests) | ↳ |
| [std](#std) | ↳ |
| [subprocess](#subprocess) | ↳ |
| [telegram](#telegram) | ↳ |
| [testmodule](#testmodule) | ↳ |
| [webserver](#webserver) | ↳ |
| [zip](#zip) | ↳ |
| **Objects** | |
| [curl.curl](#curlcurl) | ↳ |
| [leveldb.kvdb](#leveldbkvdb) | ↳ |
| [leveldb.iterator](#leveldbiterator) | ↳ |
| [mqtt.mqtt](#mqttmqtt) | ↳ |
| [nanogui.context](#nanogui-context) | ↳ |
| [shizionet.artnet_device](#shizionet-artnet-device) | ↳ |
| [shizionet.client](#shizionet-client) | ↳ |
| [shizionet.device](#shizionet-device) | ↳ |
| [shizionet.server](#shizionet-server) | ↳ |
| [std.json](#stdjson) | ↳ |
| [std.string](#stdstring) | ↳ |
| [std.thread](#stdthread) | ↳ |
| [subprocess.process](#subprocessprocess) | ↳ |
| [telegram.bot](#telegrambot) | ↳ |
| [std.json](#stdjson) | ↳ |
| [std.string](#stdstring) | ↳ |
| [stdthread](#stdthread) | ↳ |
| [testobject](#testobject) | ↳ |
| [webserver.http_server](#webserverhttp_server) | ↳ |
| [webserver.https_server](#webserverhttps_server) | ↳ |
| [zip.file](#zipfile) | ↳ |

---  

# 📦 Namespaces  

<a name="curl"></a>  
## `curl`  

| Category | Details |
|---|---|
| **Functions** | `curl()` – creates a` curl.jar` instance. |
| **Constants/Vars** | *(none)* |

---

<a name="fileio"></a>  
## `fileio`  

### Functions  

| Signature | Description |
|---|---|
| `copy(src: string, dest: string)` | Copies a file or directory from `src` to `dest`. Intermediate directories are created automatically. |
| `copy_if_changed(src: string, dest: string)` | Same as `copy` but only copies if the source file is newer than the destination (or if the destination does not exist). |
| `dirs(path: string, recursive: bool = true)` | Returns an array of sub‑directory paths inside `path`. Set `recursive` to `false` for only top‑level files. |
| `exists(path: string)` | Returns `true` if the given path exists (file **or** directory). |
| `file_dir(path: string)` | Extracts the directory component from a full file path (equivalent to `dirname`). |
| `file_name(path: string)` | Returns the file name (including extension) from a full path. |
| `files(path: string, recursive: bool = true)` | Lists regular files under `path`. |
| `is_directory(path: string)` | Alias of `exists` that asserts the path is a directory. |
| `is_file(path: string)` | Returns `true` if `path` points to a regular file. |
| `mkdir()` | *(placeholder)* Creates the current working directory if it does not exist. |
| `move(src: string, dest: string)` | Moves/renames a file or directory. Uses `rename` under the hood, falls back to copy + delete on failure. |
| `pure_name(path: string)` | Returns the file name **without** its extension. |
| `read_file(path: string)` | Returns raw binary data (`bytes`) from `path`. |
| `read_json(path: string)` | Parses a JSON file and returns the loaded object (`std::json`‑like). |
| `read_string(path: string)` | Reads a text file into an immutable `std::string`. |
| `read_text(path: string)` | Alias of `read_string`. |
| `remove(path: string | list)` | Removes a file or, recursively, a directory. Accepts a list of paths. |
| `rename(src: string, dest: string)` | Renames a file or folder. |
| `write_file(path: string, data: object)` | Serializes `data` (any serializable object) and writes it as binary data. Returns `true` on success. |
| `write_json(path: string, data: string)` | **Important:** The `data` string must not be mutated elsewhere. Writes the JSON as‑is to disk. |
| `write_string(path: string, data: string)` | Writes a UTF‑8 encoded string to file. |
| `write_text(path: string, data: string)` | Alias of `write_string`. |

---

<a name="leveldb"></a>  
## `leveldb`  

### Objects  

| Object | Description |
|---|---|
| `kvdb(path: string)` | Opens (or creates) a LevelDB database located at `path`. Returns a `leveldb.kvdb` instance. |

### `leveldb.kvdb` methods  

| Method | Description |
|---|---|
| `batch()` | Prepend a batch of operations (`put`, `delete`) and commit with a single call. Expected signature: `batch([["put", key, value], ["del", key], …])`. |
| `delete(key: string)` | Deletes the value for `key`. |
| `exists(key: string)` | Returns `true` if `key` exists in the database. |
| `get(key: string, default: any = null)` | Retrieves the value for `key`. If missing, returns `default`. |
| `iter([mode: string]...)` | Returns an iterator (`leveldb.iterator`). Mode options include `"key"` and `"value"` flags. |
| `put(key: string, value: any)` | Inserts or updates `key` with `value`. |

---

<a name="math"></a>  
## `math`  

| Constant | Value |
|---|---|
| `PI` | `3.141593` |

### Functions  

| Signature | Description |
|---|---|
| `abs(value: float)` | Absolute value of `value`. |
| `acos(x: float)` | Inverse cosine (range `[-1,1]`) – result in radians. |
| `asin(x: float)` | Inverse sine – result in radians. |
| `atan(x: float)` | Inverse tangent – result in radians. |
| `atan2(y: float, x: float)` | Arc tangent of `y/x` considering the quadrant. |
| `cbrt(x: float)` | Cube root. |
| `ceil(value: float)` | Smallest integer ≥ `value`. |
| `clamp(x: float, min: float, max: float)` | Returns `x` truncated to the range `[min, max]`. |
| `cos(x: float)` | Cosine (radians). |
| `exp(x: float)` | Exponential eⁿ. |
| `floor(value: float)` | Largest integer ≤ `value`. |
| `fract(x: float)` | Fractional part (`x - floor(x)`). |
| `lerp(a: float, b: float, t: float)` | Linear interpolation: `(1‑t)·a + t·b`. |
| `log(x: float)` | Natural logarithm. |
| `log10(x: float)` | Base‑10 logarithm. |
| `log2(x: float)` | Base‑2 logarithm. |
| `max(values: float…)` | Maximum of given numbers. |
| `min(values: float…)` | Minimum of given numbers. |
| `pow(base: float, exp: float)` | `base` to the power `exp`. |
| `rand()` | Random floating‑point number in `[0,1)`. |
| `round(value: float)` | Nearest integer to `value`. |
| `sign(x: float)` | Returns `-1`, `0`, or `1`. |
| `sin(x: float)` | Sine (radians). |
| `smoothstep(edge0: float, edge1: float, x: float)` | Hermite interpolation capped to `[0,1]`. |
| `sqrt(x: float)` | Square root. |
| `tan(x: float)` | Tangent (radians). |

---

<a name="mqtt"></a>  
## `mqtt`  

| Object | Description |
|---|---|
| `mqtt()` | Creates a new asynchronous MQTT client instance. |

### `mqtt.mqtt` methods  

| Method | Description |
|---|---|
| `configure(server_uri: string, client_id: string)` | Initialise or replace the internal client. |
| `connect(username: string, password: string, clean_session: bool, keep_alive: int)` | Block until the broker is connected. |
| `disconnect()` | Disconnect from the broker (blocking). |
| `is_connected()` | Returns `true` if a connection is active. |
| `poll()` | Drains pending messages and calls the registered `on_message` callback for each. Returns the number of messages delivered. |
| `publish(topic: string, payload: string, qos: int, retained: bool)` | Publish a message to a topic. |
| `set_callbacks(`<br>`on_message: function`, `on_connect: function`, `on_disconnect: function`, `on_error: function`<br>`)` | Register or replace the callbacks used by `poll`. |
| `subscribe(topic: string, qos: int)` | Subscribe to a topic. |

---

<a name="nanogui"></a>  
## `nanogui`  

| Object | Description |
|---|---|
| `context()` | Creates a new `nanogui.context` instance (connected to the Nanogui UI framework). |

---

<a name="shizionet"></a>  
## `shizionet`  

| Object | Description |
|---|---|
| `aiartnet_device()` | (details not provided) |
| `client(node_name: string, port: int = SHZNET_CLIENT_PORT)` | Initialise a client that connects to a `shizonet.server`. |
| `device(node_name: string, port: int = SHZNET_CLIENT_PORT)` | (details not provided) |
| `server(node_name: string, port: int = SHZNET_SERVER_PORT)` | Initialise a server that multiple clients can connect to. |

*(For full method signatures, see the *Object* sections later in this document.)*

---

<a name="shzdocs"></a>  
## `shzdocs`  

| Function | Description |
|---|---|
| `find_all(Keyword: string)` | Returns all documentation entries that contain the supplied keyword (case‑insensitive). |
| `get_all()` | Returns the full documentation library. |
| `load_all_modules()` | Loads documentation for all modules in the project / current environment. |

---

<a name="shztests"></a>  
## `shztests`  

| Function/Object | Description |
|---|---|
| `check_object()` | (implementation unclear). |
| `test_object()` → `test_object` | Returns a new pre‑defined `test_object` instance. |

---

<a name="std"></a>  
## `std`  

### Constants (constants can be imported with `using std;`)  

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

### Functions  

| Function | Parameters | Description |
|---|---|---|
| `argc()` | – | Returns the number of command‑line arguments passed to the script. |
| `argv(index: int)` | – | Returns the argument string at `index`. |
| `buffer()` → `std::buffer` | – | Creates a new, initially empty, `std::buffer` object (for binary streams). |
| `cd(path: string)` | – | Changes the current working directory to `path`. |
| `count(value)` | `value: Container | string | object` | Alias of `len()` – returns the number of elements or characters. |
| `cout()` | – | Prints its arguments to the console without a trailing newline. |
| `error()` | – | Alias of `print()` for error messages (future deprecation notice). |
| `float(value)` | `value: any` | Coerces `value` to a floating‑point number. |
| `free(obj)` | – | Deletes an object that was created with `new`. |
| `has_admin_privilege()` | – | Returns `true` if the script is running with admin rights (Windows). |
| `hideconsole()` | – | Hides the console window (Windows only). |
| `import(module: string)` | – | Dynamically imports an external module (e.g., compiled `.shx`). |
| `indentation(text: string)` | – | Returns the smallest indentation level (in spaces) found at the start of any line. Tabs count as 4 spaces. |
| `input(prompt: string = null)` | – | Reads a line from stdin; optionally displays `prompt` first. |
| `int(value: any)` | – | Coerces `value` to an integer. |
| `is_function(value: any)` | – | Returns `true` if `value` is a function object. |
| `is_json(value: any)` | – | Checks whether `value` contains a valid JSON string. |
| `is_list(value: any)` | – | Checks whether `value` is a collection (list, array, map, etc.). |
| `is_string(value: any)` | – | Returns `true` if `value` is a string. |
| `json(json: string = null)` → `std::json` | – | Creates a new JSON object; optionally parses a JSON string. |
| `len(value)` | – | Returns size/length of a container, string, or object. |
| `local_executable()` | – | (placeholder) Returns path to a local script runner or similar. |
| `messagebox(text: string, caption: string = null, buttons: btns = null)` | – | Pop‑up based a Windows‑style messagebox (blocking). |
| `millis()` | – | Current epoch time in milliseconds. |
| `print(*args)` | – | Print all arguments concatenated to stdout, followed by newline. <br>```output = print("Hello", ", " , 123);``` |
| `runtime_error(msg: string = null)` | – | Prints a runtime error message and optionally raises an exception. |
| `sleep(milliseconds: int = 0)` | – | Asynchronously pause execution for the given number of milliseconds (the script continues executing in the background). |
| `string(val: string = "")` → `std::string` | – | Instantiates a mutable, UTF‑8 string. |
| `system(command: string)` | – | Executes a shell command and returns its exit status (integer). |
| `system_path(path: string)` | – | Expands environment variables and normalises a filesystem path. |
| `thread(callback: function, *args)` → `std::thread` | – | Starts a new thread that runs `callback` with the supplied `args`. |
| `timestamp()` | – | Current date & time formatted as `DD‑MM‑YYYY HH:MM:SS`. |
| `vaddress(value: any)` | – | Returns the memory address (or identifier) of `value`. |
| `vtype(value: any)` | – | Returns the type name of `value`. |
| `warn()` | – | Prints a warning message to stdout. |
| `wd()` | – | Returns the present working directory. |
| `web_get(url: string)` | – | Performs a simple HTTP GET request (no redirects, no headers) and returns the body as a string. |

---

<a name="subprocess"></a>  
## `subprocess`  

| Object | Description |
|---|---|
| `process()` → `subprocess.process` | Class for spawning and controlling child processes, analogous to Python's `subprocess.Popen`. |

### `subprocess.process` methods  

| Method | Description |
|---|---|
| `started(arglist: list, cwd: string = null, shell: bool = false)` | Equivalent to Python `subprocess.Popen`. `arglist[0]` should contain the command line itself if `shell` is true. |
| `poll()` | Returns the return code if the process has finished, otherwise `null`. |
| `wait()` | Blocks until the process exits, then returns its exit code. |
| `kill()` | Sends `SIGKILL` / `TerminateProcess` to forcibly terminate. |
| `terminate()` | Sends `SIGTERM` / `TerminateProcess`, giving the process a chance to clean up. |
| `pid()` | PID of the launched child. |
| `exited()` | Returns `true` if the child process has terminated. |
| `stop()` | Sends SIGINT / Ctrl‑C as a graceful shutdown signal. |

---

<a name="telegram"></a>  
## `telegram`  

| Object | Description |
|---|---|
| `bot(api_token: string)` → `telegram.bot` | Creates a new Telegram Bot API client. Most commands are proxied through this object. |

### `telegram.bot` methods  

| Method | Description |
|---|---|
| `ban_chat_member(chatid, userid, [until_date], [revoke_messages])` | Ban a user from a chat. |
| `copy_message(to_chatid, from_chatid, msgid)` | Duplicate a message without forwarding (do not clone the source content). |
| `delete_message(chatid, msgid)` | Delete a message from a chat. |
| `edit_caption(chatdata, caption)` | Change the caption on a media message. |
| `edit_message(chatdata, text)` | Edit text of a message. |
| `edit_reply_markup(chatdata, [buttons])` | Update the inline keyboard attached to a message. |
| `forward_message(to_chatid, from_chatid, msgid)` | Forward a message to another chat. |
| `get_chat(chatid)` | Retrieve chat meta‑information. |
| `get_chat_administrators(chatid)` | List all administrators of a chat. |
| `get_chat_member(chatid, userid)` | Get a specific user’s chat membership details. |
| `get_chat_member_count(chatid)` | Number of current members. |
| `leave_chat(chatid)` | Have the bot leave a chat. |
| `promote_chat_member(chatdata, [rights])` | Upgrade a user to admin status. |
| `restrict_chat_member(chatid, userid, permissions, [until_date])` | Remove or limit a user’s permissions. |
| `send(chatdata, options = null)` | Send a message (text, document, etc.). |
| `send_animation(chatdata, animation, [options])` | Send a GIF or animation. |
| `send_audio(chatdata, audio, [options])` | Send an audio file. |
| `send_chat_action(chatid, action, [threadid])` | Send a transient event (typing, upload_photo…). |
| `send_choice(chatdata, [options])` | Send a message that includes a single inline‑keyboard button. |
| `send_document(chatdata, document, [options])` | Send documents (PDF, text, MP4…). |
| `send_location(chatdata, latitude, longitude, [options])` | Send a location marker. |
| `send_photo(chatdata, photo, [options])` | Send a photo from a file, URL, or file‑id. |
| `send_sticker(chatdata, sticker, [options])` | Send a sticker. |
| `send_video(chatdata, video, [options])` | Send a video file. |
| `send_video_note(chatdata, video_note, [options])` | Send a quick, circular video (note). |
| `send_voice(chatdata, voice, [options])` | Send a voice message. |
| `set_chat_administrator_custom_title(chatid, userid, title)` | Set a custom admin title. |
| `unban_chat_member(chatid, userid, [only_if_banned])` | Revoke a ban. |
| `on_any_message(callback)` | Callback that receives every incoming message (including forwards). |

---

<a name="testmodule"></a>  
## `testmodule`  

| Function | Description |
|---|---|
| `testfn()` | Example test function (no implementation details provided). |

---

<a name="webserver"></a>  
## `webserver`  

| Object | Description |
|---|---|
| `http_server()` → `webserver.http_server` | Simple HTTP server for static files & custom routes. |
| `https_server()` → `webserver.https_server` | HTTPS server using TLS/SSL certificates. |

### `webserver.http_server` / `webserver.https_server` methods  

| Method | Description |
|---|---|
| `init(port: int, [cert_file: string], [key_file: string])` | Starts the server on the given `port` (HTTPS also requires a certificate & key). |
| `route(method: string, path: regex, callback: function)` | Register a handler for a specific HTTP method and path pattern. |
| `route_static(url_pattern: string, file_or_directory: string)` | Register a handler that returns static files, with built‑in directory‑traversal protection. |
| `start()` | Begin listening for connections. |
| `stop()` | Gracefully stop the server. |

---

<a name="zip"></a>  
## `zip`  

| Object | Description |
|---|---|
| `file()` → `zip.file` | Represents a ZIP archive. |

### `zip.file` methods  

| Method | Description |
|---|---|
| `add(path: string)` | Write a file (via the current working file pointer) under `path` inside the archive. |
| `add_file(path: string, data: bytes)` | Add a file from memory with the given byte contents. |
| `save(path: string)` | Write the archive to `path`. |

---

# 📚 Objects  

<a name="curlcurl"></a>  
## `curl.curl`  

### Methods  

| Method | Description |
|---|---|
| `get(url: string)` | Perform an HTTP **GET** request. Returns a JSON‑like object with properties: `ok` (bool), `http_code` (int), `body` (bytes/string), `content_type` (string). |
| `post(url: string, payload: string)` | Perform an HTTP **POST** request with a raw string payload. Same return shape as `get`. |
| `request(method: string, url: string, body: string = "", headers: json = {}, timeout_ms: int = 0, binary: bool = false)` | Generic HTTP request. `method` can be `"GET"`, `"POST"`, etc. Returns a JSON‑like object. |
| `add(path: string)` | Alias for `get` (legacy). |
| `reset()` | Reset the underlying libcurl handle and clear any error state. |
| `start_stream(…args…)` | Begin a streaming request. Parameters match `request`. Use `poll_stream(cb)` to receive chunks. |
| `poll_stream(cb: function)` | Callback each time a new chunk arrives. Returns a boolean indicating if more data is available. |
| `stop_stream()` | Abort the active streaming request. Returns `1` if the stop was successful. |
| `reset()` | Reset request/error flags. |
| `version()` | Returns a string with the installed `libcurl` version. |
| `last_error()` | Retrieves the error message from the most recent failed request. |

---

<a name="leveldbkvdb"></a>  
## `leveldb.kvdb`  

See “LevelDB → Objects → kvdb” above for a summary of the available methods.

---

<a name="leveldbiterator"></a>  
## `leveldb.iterator`  

| Method | Description |
|---|---|
| `key()` | Returns the current key as a string. |
| `value()` | Returns the current value. |
| `valid()` | Checks if the iterator points to a valid entry. |
| `next()` | Advance to next key‑value pair. |
| `reset()` | Reset iterator to the first entry. |
| `seek(key: string)` | Position iterator at the first entry **≥** `key`. |

---

<a name="mqttmqtt"></a>  
## `mqtt.mqtt`  

See “MQTT → Objects → mqtt” for a list of methods.

---

<a name="nanogui-context"></a>  
## `nanogui.context`  

| Method | Description |
|---|---|
| `screen()` | Returns the current screen (canvas) or UI context. Details pending. |

---

<a name="shizionet-artnet-device"></a>  
## `shizionet.artnet_device`  

:warning: No public methods are documented at this time.

Attributes (auto‑exposed):  

- `ip`  
- `mac`  
- `name`  
- `online`  
- `type`

---

<a name="shizionet-client"></a>  
## `shizionet.client`  

### Auto‑exposed attributes  

| Variable | Description |
|---|---|
| `arent_sync` | Synchronization state with ArtNet (implementation specific). |
| `enabled` | Command sender enabled (`bool`). |
| `ip` | Client IP address (read‑only). |
| `mac` | MAC address (read‑only). |
| `name` | Client name (configurable). |

### Methods  

| Method | Parameters | Description |
|---|---|---|
| `get[command, value?, timeout?]` | `command: string`<br>`value: object`<br>`timeout: int` | Send a GET (query) command to the node. Returns the device’s response as a map. |
| `get_all[command, data?, callback?, timeout?]` | `command: string`<br>`data: any`<br>`callback: function(device, data)`<br>`timeout: int` | Issue a command to *all* connected devices. The optional `callback` runs for each response. |
| `on_command[cmd, func]` | `cmd: string`<br>`func: function(device, data)` | Register a handler called whenever a device sends a command named `cmd`. |
| `on_connect[func]` | `func: function()` | Called when a device connects to the server. |
| `on_disconnect[func]` | `func: function()` | Called when a device disconnects. |
| `on_get[cmd, func]` | `cmd: string`<br>`func: function(data)` | Register a handler for GET‑type requests. |
| `on_stream[cmd, func]` | `cmd: string`<br>`func: function(command, size, data)` | Callback for streaming commands (large payloads). |
| `send_osc[ip, config, [port=8000]]` | `ip: string`<br>`config: object`<br>`port: int` | Send Open Sound Control messages to an ArtNet device. *(implementation specific)* |

---

<a name="shizionet-device"></a>  
## `shizionet.device`  

### Auto‑exposed attributes  

| Variable | Description |
|---|---|
| `ip` | Device IP address (read‑only). |
| `mac` | MAC address (read‑only). |
| `name` | Human‑readable device name. |
| `online` | Connection status (`bool`). |
| `type` | Device type string. |

### Methods  

| Method | Parameters | Description |
|---|---|---|
| `fetch[command, value?, timeout?]` | `command: string`<br>`value: object`<br>`timeout: int` | Retrieve a value from the device via a `FETCH` command. |
| `get[command, value?, timeout?]` | `command: string`<br>`value: object`<br>`timeout: int` | Send a GET‑type command. |
| `get_static_buffer_count()` | – | Number of static buffers the device manages. |
| `get_static_buffer_desc[identifier]` | `identifier: int|str` | Get full description of a static buffer by name or index. |
| `get_static_buffer_names()` | – | Names and details of all static buffers. |
| `send[command, data?, [timeout=0], [wait_finish=false]]` | `command: string`<br>`data: object`<br>`timeout: int`<br>`wait_finish: bool` | Reliable send with optional timeout and wait for completion. |
| `send_fast[command, data]` | `command: string`<br>`data: object` | Unreliable (fire‑and‑forget) transmission. |
| `send_queue[command, data?, [timeout=0], [wait_finish=false]]` | `command: string`<br>`data: object`<br>`timeout: int`<br>`wait_finish: bool` | Use a queued reliable connection; optionally wait for finish. |

---

<a name="shizionet-server"></a>  
## `shizionet.server`  

### Auto‑exposed attributes  

| Variable | Description |
|---|---|
| `arent_sync` | Synchronisation flag (same as client). |
| `enabled` | Current command‑sending state. |
| `ip` | Server IP (listen address). |
| `mac` | MAC of server (read‑only). |
| `name` | Human readable name of the server. |

### Methods  

| Method | Parameters | Description |
|---|---|---|
| `get[command, value?, timeout?]` | `command: string`<br>`value: object`<br>`timeout: int` | GET‑type request to a connected device. |
| `get_all[command, data?, callback?, timeout?]` | `command: string`<br>`data: any`<br>`callback: function(device, data)`<br>`timeout: int` | Send command to *all* clients. |
| `on_command[cmd, func]` | `cmd: string`<br>`func: function(device, data)` | Register a handler for an incoming command from a client. |
| `on_connect[func]` | `func: function()` | Called when a client connects. |
| `on_disconnect[func]` | `func: function()` | Called when a client disconnects. |
| `on_get[cmd, func]` | `cmd: string`<br>`func: function(data)` | Server‑side handling of GET‑type commands from clients. |
| `on_stream[cmd, func]` | `cmd: string`<br>`func: function(command, size, data)` | Streaming command payload handler. |
| `send_osc[ip, config, [port=8000]]` | `ip: string`<br>`config: object`<br>`port: int` | Transmit Open Sound Control to a device. |

---

<a name="stdjson"></a>  
## `std.json`  

### Methods  

| Method | Parameters | Description |
|---|---|---|
| `all([filter])` | `filter: string|function` | Return an array of elements that match the filter (predicate or substring). |
| `any([filter])` | `filter: string|function` | Return `true` if at least one element matches. |
| `combine_string([separator])` | `separator: string` | Concatenates all string values in the JSON object, inserting the separator between them. |
| `compact_string()` | – | Returns a minified (no whitespace) JSON string. |
| `copy()` | – | Deep copy of the JSON object. |
| `erase([key])` | `key: string|int` | Delete a top‑level key (or array index). Returns `true` on success. |
| `filter([filter])` | `filter: string|function` | Return a new JSON object consisting only of entries that satisfy the filter. |
| `filter_key([substr])` | `substr: string|list` | Remove entries whose keys match the given substring or list of substrings. |
| `filter_value([substr])` | `substr: string` | Keep only entries whose **string** value contains `substr`. |
| `foreach([callback])` | `callback: function(key, value)` | Iterate over entries, returning a new JSON object based on the callback’s result (`true` to keep). |
| `from_string([json])` | `json: string` | Parse a JSON string into the object. |
| `has([key])` | `key: string` | Check if the key exists. |
| `key([index])` | `index: int` | Retrieve the key at a particular index (negative values count from end). |
| `map([callback])` | `callback: function(key, value)` | Return a new JSON where each value is replaced by the callback’s result. |
| `merge([other], [overwrite])` | `other: json`<br>`overwrite: bool` (default `true`) | Merge another JSON object into this one. If `overwrite` is `false`, existing keys are preserved. |
| `push([value])` | `value: object` | Alias for `array_len = array_len + 1` for JSON arrays (adds at end). |
| `push_back([value])` | `value: object` | Alias for `push`. |
| `reduce([callback], [initial])` | `callback: function(acc, key, value)`<br>`initial: any` | Reduce entries to a single value. |
| `remove([key])` | `key: string|int` | Alias for `erase`. |
| `rsort()` | – | Sort entries by key descending (array indices kept at end). |
| `size()` | – | Number of elements (array length or object key count). |
| `sort()` | – | Sort keys case‑insensitively, array entries placed after object keys. |
| `sort_reverse()` | – | Sort keys descending (case‑insensitive). |
| `string([compact])` | `compact: bool` (default `0`) | Serialize to JSON; if `compact` is non‑zero, output will be minified. |

---

<a name="stdstring"></a>  
## `std.string`  

### Methods  

| Method | Parameters | Description |
|---|---|---|
| `center([width])` | `width: int` | Returns a new string centered in a field of `width` characters (space‑padded). |
| `contains([sub])` | `sub: string` | Returns `true` if `sub` is a substring. |
| `empty()` | – | Returns `1` (true) if the string has length 0; otherwise `0`. |
| `ends([suffix])` | `suffix: string` | Returns `true` if the string ends with `suffix`. |
| `extract([left])` | `left: string` | Return the substring between the first occurrence of `left` and the next occurrence of the same delimiter (right delimiter same as left). |
| `find([substring])` | `substring: string` | Returns the zero‑based index of the first occurrence, or `-1` if not found. |
| `find_first_not_of([chars])` | `chars: string` | Returns the first index that **is not** a member of `chars`. |
| `find_first_of([chars])` | `chars: string` | Returns the first index that **is** a member of `chars`. |
| `find_last_not_of([chars])` | `chars: string` | Same as `find_first_not_of`, but scanning from the end. |
| `find_last_of([chars])` | `chars: string` | Same as `find_last_of`, scanning from the end. |
| `length()` | – | Number of Unicode code points (UTF‑8). |
| `ljust([width])` | `width: int` | Left‑justify, padding on the right with spaces. |
| `lowercase()` | – | Returns a new string in lowercase. |
| `lowercase_inplace()` | – | Converts the current string to lowercase. |
| `ltrim()` | – | Returns a copy with leading whitespace removed. |
| `ltrim_inplace()` | – | Removes leading whitespace from the current string. |
| `regex_escape()` | – | Escapes special regex characters (`.+?^$…`). |
| `regex_findall([pattern])` | `pattern: string` | Returns a list of all non‑overlapping matches for the regex pattern. |
| `regex_match([pattern])` | `pattern: string` | Returns `true` if the whole string matches the regex. |
| `regex_replace([pat], [rep])` | `pat: string`<br>`rep: string` | Returns a new string where all matches of `pat` are replaced by `rep`. |
| `regex_replace_inplace([pattern], [replacement])` | `pattern: string`<br>`replacement: string` | Same as `regex_replace` but modifies the object itself. |
| `regex_search([pattern])` | `pattern: string` | Returns the starting index of the first match, or `-1` if not found. |
| `regex_split([pattern])` | `pattern: string` | Splits the string on occurrences of the regex pattern, returning a JSON array. |
| `removechars([chars])` | `chars: string` | Returns a copy with all characters in `chars` removed. |
| `removecharsexcept([chars])` | `chars: string` | Returns a copy with **only** characters in `chars` kept. |
| `removeprefix([prefix])` | `prefix: string` | Removes `prefix` if present, returns the new string. |
| `removesuffix([suffix])` | `suffix: string` | Removes the final occurrence of `suffix` if present. |
| `replace([search], [replace])` | `search: string`<br>`replace: string` | Returns a new string where **all** occurrences of `search` are replaced. |
| `replace_first([search], [replace])` | `search: string`<br>`replace: string` | Replaces only the first occurrence. |
| `replace_inplace([search], [replace])` | Same as `replace_inplace`. | Performs replacement in‑place. |
| `reverse()` | – | Returns a new string whose characters are in reverse order. |
| `reverse_inplace()` | – | Reverses the string in place. |
| `rfind([sub])` | `sub: string` | Returns the index of the **last** occurrence, or `-1` if not found. |
| `rjust([width])` | `width: int` | Right‑justify, padding on the left with spaces. |
| `rtrim()` | – | Returns a copy with trailing whitespace removed. |
| `rtrim_inplace()` | – | Removes trailing whitespace in place. |
| `size()` | – | Alias of `length()`. |
| `split([delim])` | `delim: string` | Returns a JSON array of substrings separated by `delim`. |
| `starts([prefix])` | `prefix: string` | Returns `true` if the string begins with `prefix`. |
| `substr([start], [len])` | `start: int`<br>`len: int` (optional) | Returns a slice (also supports negative `start`). |
| `substr_inplace([start], [len])` | Same as `substr` | Modifies the string in place. |
| `trim()` | – | Removes leading and trailing whitespace. |
| `trim_inplace()` | – | Removes leading and trailing whitespace in place. |
| `uppercase()` | – | Returns a new uppercase string. |
| `uppercase_inplace()` | – | Converts the current string to uppercase. |

---

<a name="stdthread"></a>  
## `std.thread`  

| Method | Description |
|---|---|
| `run(...args)` | Spawn an asynchronous task that executes the provided callback with the supplied arguments. The method returns immediately, the task runs independently. |
| `join()` | Wait for the currently associated task to finish (blocks until completion). |

---

<a name="subprocessprocess"></a>  
## `subprocess.process`  

See the description under **subprocess namespace** for a full API reference.

---

<a name="telegrambot"></a>  
## `telegram.bot`  

All Telegram bot methods are documented in the **telegram namespace** table above.

---

<a name="testobject"></a>  
## `test_object`  

### Attributes  

| Attribute | Value |
|---|---|
| `test_member` | (variable) |
| `testint` | (variable) |

### Methods  

| Method | Description |
|---|---|
| `call_cb()` | Test call‑back function (passed to `testing` utilities). |
| `test_auto_fn()` | A test function registered via automatic binding (e.g., when static method's name matches a pattern). |
| `test_cb()` | Another test call‑back. |
| `test_fn()` | Simple test function. |
| `test_thread()` | Test function executed in a separate thread. |

---

<a name="webserverhttp_server"></a>  
## `webserver.http_server`  

See `webserver` namespace for `init`, `route`, `route_static`, `start`, `stop` methods.

---

<a name="webserverhttps_server"></a>  
## `webserver.https_server`  

See `webserver` namespace for `init`, `route`, `route_static`, `start`, `stop` methods.

---

<a name="zipfile"></a>  
## `zip.file`  

See the **zip.file** description for `add`, `add_file`, `save` methods.

---  

# 🛠️ How to Use  

Below is a tiny sample that demonstrates importing, file I/O, and multithreading.

```shio
using std
using_file = fileio
mkdir("demo")

// Write & read a JSON file
data = std.json();
data["name"] = "Alice";
data["age"] = 30;
write_json("demo/person.json", data.stringify())

read = read_json("demo/person.json")
write_string("demo/greeting.txt", f"Hello, {read.name}!")

// Spawn a worker that prints a message after 2 seconds
std.thread(() -> {
    std.sleep(2000)
    print("\C[32mWorker finished!\C[0m\n");
});

// Main thread continues
print("Main thread continues ...\n");

// Join the worker so the script exits after printing
std.thread.join()
```

> **Tip:** Use `using <name>;` once at the top of a file to bring the namespace’s identifiers into the global scope.

---  

# 📖 License  

This documentation is released under the **MIT License**. Feel free to redistribute, modify, or build on it.  

---  

*Generated on 2026‑01‑20.*  