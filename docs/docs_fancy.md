
Shizoscript is a lightweight, dynamically‑typed scripting language designed for rapid development of system‑level utilities, network services, and automation scripts.  
Key features:

| Feature | Description |
|---------|-------------|
| **No explicit typing** | Variables are inferred at runtime; type hints are optional. |
| **File extensions** | `.shio` – source files, `.shx` – compiled binaries. |
| **Namespace imports** | `using std;` brings all identifiers from `std` into the global scope. |
| **Rich standard library** | Built‑in support for file I/O, networking, math, JSON, threading, and more. |
| **Extensible modules** | Third‑party modules can be imported via `std.import`. |
| **Cross‑platform** | Works on Windows, Linux; some Windows‑only APIs are guarded by runtime checks. |

> **Tip** – Use `std.print` (or just `print` after `using std;`) for console output.  
> Use `std.cout` for raw terminal output that bypasses buffering.

---

## Quick Start

```shio
# hello.shio

std.print("Hello, Shizoscript!");
```

---

## Table of Contents

1. [Namespace: fileio](#namespace-fileio)
2. [Namespace: leveldb](#namespace-leveldb)
3. [Namespace: math](#namespace-math)
4. [Namespace: shizonet](#namespace-shizonet)
5. [Namespace: shzdocs](#namespace-shzdocs)
6. [Namespace: shztests](#namespace-shztests)
7. [Namespace: std](#namespace-std)
8. [Namespace: telegram](#namespace-telegram)
9. [Namespace: testmodule](#namespace-testmodule)
10. [Namespace: webserver](#namespace-webserver)
11. [Namespace: zip](#namespace-zip)
12. [Object: leveldb.iterator](#object-leveldbiterator)
13. [Object: leveldb.kvdb](#object-leveldbkvdb)
14. [Object: shizonet.artnet_device](#object-shizonetartnet_device)
15. [Object: shizonet.client](#object-shizonetclient)
16. [Object: shizonet.device](#object-shizonetdevice)
17. [Object: shizonet.server](#object-shizonetserver)
18. [Object: std.json](#object-stdjson)
19. [Object: std.string](#object-stdstring)
20. [Object: std.thread](#object-stdthread)
21. [Object: telegram.bot](#object-telegrambot)
22. [Object: test_object](#object-test_object)
23. [Object: webserver.http_server](#object-webserverhttp_server)
24. [Object: webserver.https_server](#object-webserverhttps_server)
25. [Object: zip.file](#object-zipfile)

---

## Namespace: fileio

| Function | Parameters | Description |
|----------|------------|-------------|
| **copy(src, dest)** | `src: string`, `dest: string` | Copies a file or directory. Creates destination folders if missing. |
| **copy_if_changed(src, dest)** | `src: string`, `dest: string` | Copies only if `src` is newer than `dest`. |
| **dirs(path, recursive = true)** | `path: string`, `recursive: bool` | Returns a list of sub‑directories. |
| **exists(path)** | `path: string` | Checks whether a path exists. |
| **file_dir(path)** | `path: string` | Extracts the directory component of a file path. |
| **file_name(path)** | `path: string` | Extracts the file name with extension. |
| **files(path, recursive = true)** | `path: string`, `recursive: bool` | Returns a list of files. |
| **is_directory(path)** | `path: string` | Alias for `exists(path)` + type check. |
| **is_file(path)** | `path: string` | Alias for `exists(path)` + type check. |
| **mkdir()** | – | *Placeholder – create directory (not yet implemented).* |
| **move(src, dest)** | `src: string`, `dest: string` | Moves a file or directory, using rename or copy/delete fallback. |
| **pure_name(path)** | `path: string` | File name without extension. |
| **read_file(path)** | `path: string` | Reads binary data into a buffer. |
| **read_json(path)** | `path: string` | Parses JSON file into a `std.json` object. |
| **read_string(path)** | `path: string` | Reads text file into a string. |
| **read_text(path)** | `path: string` | Alias for `read_string`. |
| **remove(path|list)** | `path: string | list` | Recursively deletes files or directories. |
| **rename(src, dest)** | `src: string`, `dest: string` | Renames a file or directory. |
| **write_file(path, data)** | `path: string`, `data: object` | Serialises an object to binary and writes it. |
| **write_json(path, data)** | `path: string`, `data: string` | Writes a JSON string to a file (must be immutable). |
| **write_string(path, data)** | `path: string`, `data: string` | Writes a text string to a file. |
| **write_text(path, data)** | `path: string`, `data: string` | Alias for `write_string`. |

---

## Namespace: leveldb

### Class: `leveldb.kvdb`

| Method | Parameters | Description |
|--------|------------|-------------|
| **batch(ops)** | `ops: list of [op, key, value?]` | Performs a batch of `put`/`delete` operations atomically. |
| **delete(key)** | `key: string` | Removes a key‑value pair. |
| **exists(key)** | `key: string` | Returns `true` if the key exists. |
| **get(key)** | `key: string` | Retrieves the value for a key. |
| **iter(mode, ...)** | `mode: string`, `...` | Returns a `leveldb.iterator`. |
| **put(key, value)** | `key: string`, `value: object` | Stores a key‑value pair. |

---

## Namespace: math

| Constant | Value | Description |
|----------|-------|-------------|
| PI | 3.141593 | Value of π |

| Function | Parameters | Description |
|----------|------------|-------------|
| **abs(value)** | `value: float` | Absolute value. |
| **acos(x)** | `x: float` | Inverse cosine. |
| **asin(x)** | `x: float` | Inverse sine. |
| **atan(x)** | `x: float` | Inverse tangent. |
| **atan2(y, x)** | `y: float`, `x: float` | Arctangent with quadrant. |
| **cbrt(x)** | `x: float` | Cube root. |
| **ceil(value)** | `value: float` | Smallest integer ≥ value. |
| **clamp(x, min, max)** | `x: float`, `min: float`, `max: float` | Clamp between bounds. |
| **cos(x)** | `x: float` | Cosine. |
| **exp(x)** | `x: float` | e^x. |
| **floor(value)** | `value: float` | Largest integer ≤ value. |
| **fract(x)** | `x: float` | Fractional part. |
| **lerp(a, b, t)** | `a: float`, `b: float`, `t: float` | Linear interpolation. |
| **log(x)** | `x: float` | Natural log. |
| **log10(x)** | `x: float` | Base‑10 log. |
| **log2(x)** | `x: float` | Base‑2 log. |
| **max(values...)** | `values: float...` | Maximum of arguments. |
| **min(values...)** | `values: float...` | Minimum of arguments. |
| **pow(base, exp)** | `base: float`, `exp: float` | Power function. |
| **rand()** | – | Random float in [0, 1]. |
| **round(value)** | `value: float` | Nearest integer. |
| **sign(x)** | `x: float` | +1, 0, or –1. |
| **sin(x)** | `x: float` | Sine. |
| **smoothstep(edge0, edge1, x)** | `edge0: float`, `edge1: float`, `x: float` | Smooth interpolation. |
| **sqrt(x)** | `x: float` | Square root. |
| **tan(x)** | `x: float` | Tangent. |

---

## Namespace: shizonet

| Class | Description |
|-------|-------------|
| **client(node_name, port = SHZNET_CLIENT_PORT)** | Network client. |
| **server(node_name, port = SHZNET_SERVER_PORT)** | Network server. |

Both classes expose a rich set of networking callbacks and command helpers (see object sections below).

---

## Namespace: shzdocs

| Function | Parameters | Description |
|----------|------------|-------------|
| **find_all(Keyword)** | `Keyword: string` | Returns all documentation entries containing the keyword. |
| **get_all()** | – | Returns full documentation for all symbols. |
| **load_all_modules()** | – | Loads documentation from all installed modules. |

---

## Namespace: shztests

| Function | Parameters | Description |
|----------|------------|-------------|
| **check_object()** | – | Runs internal consistency checks. |
| **test_object()** | – | Returns a `test_object` instance for unit‑testing. |

---

## Namespace: std

### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| MB_ICONERROR | 16 | Message‑box icon. |
| MB_ICONINFORMATION | 64 | Message‑box icon. |
| MB_ICONWARNING | 48 | Message‑box icon. |
| MB_OK | 0 | Button set. |
| MB_OKCANCEL | 1 | Button set. |
| MB_RETRYCANCEL | 5 | Button set. |
| MB_YESNO | 4 | Button set. |
| MB_YESNOCANCEL | 3 | Button set. |

### Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| **argc()** | – | Number of command‑line arguments. |
| **argv(index)** | `index: int` | Returns the argument at `index`. |
| **buffer()** | – | Creates a `std.buffer` object (binary buffer). |
| **cd(path)** | `path: string` | Change working directory. |
| **count(value)** | `value: Container|string|object` | Alias for `len`. |
| **cout(...args)** | – | Raw terminal output (no buffering). |
| **error(...args)** | – | Prints to stderr. |
| **float(value)** | `value: any` | Converts to float. |
| **free(obj)** | `obj: object` | Deletes an object. |
| **has_admin_privilege()** | – | `true` if running as administrator. |
| **hideconsole()** | – | Detaches console on Windows. |
| **import(module)** | `module: string` | Loads a module by name or path. |
| **indentation(text)** | `text: string` | Calculates indentation level. |
| **input(prompt)** | `prompt: string` | Reads a line from stdin. |
| **int(value)** | `value: any` | Converts to integer. |
| **is_function(value)** | `value: any` | Checks if value is a function. |
| **is_json(value)** | `value: any` | Checks if value is a JSON object. |
| **is_list(value)** | `value: any` | Checks if value is a list. |
| **is_string(value)** | `value: any` | Checks if value is a string. |
| **json(json)** | `json: string?` | Creates a `std.json` object. |
| **len(value)** | `value: Container|string|object` | Returns size. |
| **local_executable()** | – | *Placeholder – returns path of current executable.* |
| **messagebox(text, caption, buttons)** | `text: string`, `caption: string`, `buttons: btns` | Shows a Windows message box. |
| **millis()** | – | Milliseconds since epoch. |
| **print(...args)** | – | Console output; returns concatenated string. |
| **runtime_error()** | – | Prints an error message. |
| **sleep(milliseconds)** | `milliseconds: int` | Asynchronous pause. |
| **string(value)** | `value: string` | Creates a `std.string` object. |
| **system(command)** | `command: string` | Executes shell command; returns exit code. |
| **system_path(path)** | `path: string` | Expands env vars and normalises path. |
| **thread(callback)** | `callback: function` | Creates a `std.thread` object. |
| **timestamp()** | – | Current date/time `DD‑MM‑YYYY HH:MM:SS`. |
| **vaddress(value)** | `value: Variable` | Inspect variable address. |
| **vtype(value)** | `value: Variable` | Inspect variable type. |
| **warn(...args)** | – | Prints a warning. |
| **wd()** | – | Current working directory. |
| **web_get(url)** | `url: string` | HTTP GET; returns response body. |

---

## Namespace: telegram

### Class: `telegram.bot`

| Method | Parameters | Description |
|--------|------------|-------------|
| **ban_chat_member(chatid, userid, until_date?, revoke_messages?)** | `chatid: int`, `userid: int`, `until_date: int?`, `revoke_messages: int?` | Bans a user. |
| **copy_message(to_chatid, from_chatid, msgid)** | – | Copies a message without forwarding. |
| **delete_message(chatid, msgid)** | – | Deletes a message. |
| **edit_caption(chatdata, caption)** | – | Edits a message caption. |
| **edit_message(chatdata, text)** | – | Edits message text. |
| **edit_reply_markup(chatdata, buttons?)** | – | Edits inline keyboard. |
| **forward_message(to_chatid, from_chatid, msgid)** | – | Forwards a message. |
| **get_chat(chatid)** | – | Retrieves chat info. |
| **get_chat_administrators(chatid)** | – | List of admins. |
| **get_chat_member(chatid, userid)** | – | Member info. |
| **get_chat_member_count(chatid)** | – | Number of members. |
| **leave_chat(chatid)** | – | Bot leaves chat. |
| **promote_chat_member(chatid, userid, rights?)** | – | Grants admin rights. |
| **restrict_chat_member(chatid, userid, permissions, until_date?)** | – | Restricts a member. |
| **send(chatdata, options?)** | – | Sends a plain text message. |
| **send_animation(chatdata, animation, options?)** | – | Sends an animation. |
| **send_audio(chatdata, audio, options?)** | – | Sends an audio file. |
| **send_chat_action(chatid, action, threadid?)** | – | Sends a chat action. |
| **send_choice(chatdata, options?)** | – | Sends a message with inline keyboard. |
| **send_document(chatdata, document, options?)** | – | Sends a document. |
| **send_location(chatdata, latitude, longitude, options?)** | – | Sends a location. |
| **send_photo(chatdata, photo, options?)** | – | Sends a photo. |
| **send_sticker(chatdata, sticker, options?)** | – | Sends a sticker. |
| **send_video(chatdata, video, options?)** | – | Sends a video. |
| **send_video_note(chatdata, video_note, options?)** | – | Sends a video note. |
| **send_voice(chatdata, voice, options?)** | – | Sends a voice message. |
| **set_chat_administrator_custom_title(chatid, userid, title)** | – | Sets custom admin title. |
| **unban_chat_member(chatid, userid, only_if_banned?)** | – | Unbans a user. |

---

## Namespace: testmodule

| Function | Parameters | Description |
|----------|------------|-------------|
| **testfn()** | – | Example test function. |

---

## Namespace: webserver

### Class: `webserver.http_server`

| Method | Parameters | Description |
|--------|------------|-------------|
| **init(port)** | `port: int` | Initialise HTTP server. |
| **route(method, path, callback)** | `method: string`, `path: string`, `callback: function` | Register a route. |
| **route_static(url_pattern, file_or_directory)** | – | Serve static files. |
| **start()** | – | Start listening. |
| **stop()** | – | Stop server. |

### Class: `webserver.https_server`

| Method | Parameters | Description |
|--------|------------|-------------|
| **init(port, cert_file, key_file)** | `port: int`, `cert_file: string`, `key_file: string` | Initialise HTTPS server. |
| **route(method, path, callback)** | – | Register a route. |
| **route_static(url_pattern, file_or_directory)** | – | Serve static files. |
| **start()** | – | Start listening. |
| **stop()** | – | Stop server. |

---

## Namespace: zip

### Class: `zip.file`

| Method | Parameters | Description |
|--------|------------|-------------|
| **add(path)** | `path: string` | Adds a file to the archive. |
| **add_file(path)** | `path: string` | Adds a file with content. |
| **save(path)** | `path: string` | Writes the ZIP to disk. |

---

## Object: `leveldb.iterator`

| Method | Parameters | Description |
|--------|------------|-------------|
| **key()** | – | Current key. |
| **next()** | – | Advance to next entry. |
| **reset()** | – | Reset iterator to start. |
| **seek(key)** | `key: string` | Seek to a specific key. |
| **valid()** | – | `true` if iterator is positioned on a valid entry. |
| **value()** | – | Current value. |

---

## Object: `leveldb.kvdb`

(see **Namespace: leveldb** above)

---

## Object: `shizonet.artnet_device`

| Property | Type | Description |
|----------|------|-------------|
| **ip** | string | Device IP address. |
| **mac** | string | MAC address. |
| **name** | string | Device name. |
| **online** | bool | Online status. |
| **type** | string | Device type. |

---

## Object: `shizonet.client`

| Property | Type | Description |
|----------|------|-------------|
| **artnet_sync** | bool | Whether Art-Net sync is enabled. |
| **enabled** | bool | Client enabled flag. |
| **ip** | string | Client IP. |
| **mac** | string | Client MAC. |
| **name** | string | Client name. |

| Method | Parameters | Description |
|--------|------------|-------------|
| **get(command, value?, timeout?)** | `command: string`, `value: object?`, `timeout: int?` | Sends a GET command. |
| **get_all(command, data?, callback?, timeout?)** | – | Broadcast GET to all devices. |
| **on_command(cmd, func)** | – | Register command listener. |
| **on_connect(func)** | – | Register connect callback. |
| **on_disconnect(callback)** | – | Register disconnect callback. |
| **on_get(cmd, func)** | – | Register GET handler. |
| **on_stream(cmd, func)** | – | Register stream handler. |
| **send_osc(ip, config, port?)** | – | Send OSC messages. |

---

## Object: `shizonet.device`

| Property | Type | Description |
|----------|------|-------------|
| **ip** | string | Device IP. |
| **mac** | string | MAC address. |
| **name** | string | Device name. |
| **online** | bool | Online status. |
| **type** | string | Device type. |

| Method | Parameters | Description |
|--------|------------|-------------|
| **fetch(command, value?, timeout?)** | – | Sends a FETCH command. |
| **get(command, value?, timeout?)** | – | Sends a GET command. |
| **get_static_buffer_count()** | – | Number of static buffers. |
| **get_static_buffer_desc(identifier)** | – | Description of a static buffer. |
| **get_static_buffer_names()** | – | Names of static buffers. |
| **send(command, data?, timeout?, wait_finish?)** | – | Reliable send. |
| **send_fast(command, data)** | – | Unreliable send. |
| **send_queue(command, data?, timeout?, wait_finish?)** | – | Queued reliable send. |

---

## Object: `shizonet.server`

(identical API to `shizonet.client` – see above)

---

## Object: `std.json`

| Method | Parameters | Description |
|--------|------------|-------------|
| **all(filter)** | `filter: function|string` | True if all entries match. |
| **any(filter)** | – | True if any entry matches. |
| **combine_string(separator)** | `separator: string` | Concatenate string values. |
| **compact_string()** | – | Compact JSON string. |
| **copy()** | – | Deep copy. |
| **erase(key)** | `key: string` | Delete key. |
| **filter(filter)** | – | Filter entries. |
| **filter_key(filter)** | – | Filter by key substring. |
| **filter_value(filter)** | – | Filter string values. |
| **foreach(callback)** | – | Iterate with callback. |
| **from_string(json)** | – | Parse JSON. |
| **has(key)** | – | Check key existence. |
| **key(index)** | – | Get key by index. |
| **map(callback)** | – | Transform values. |
| **merge(other, overwrite?)** | – | Merge another JSON. |
| **push(value)** | – | Append value. |
| **push_back(value)** | – | Alias for `push`. |
| **reduce(callback, initial)** | – | Reduce entries. |
| **remove(key)** | – | Alias for `erase`. |
| **rsort()** | – | Reverse sort by key. |
| **size()** | – | Number of elements. |
| **sort()** | – | Sort by key. |
| **sort_reverse()** | – | Descending sort. |
| **string(compact?)** | – | JSON string representation. |

---

## Object: `std.string`

| Method | Parameters | Description |
|--------|------------|-------------|
| **center(width)** | – | Centered string. |
| **contains(sub)** | – | Substring check. |
| **empty()** | – | Is empty? |
| **ends(suffix)** | – | Suffix check. |
| **extract(left)** | – | Substring between delimiters. |
| **find(substring)** | – | Position of substring. |
| **find_first_not_of(chars)** | – | First char not in set. |
| **find_first_of(chars)** | – | First char in set. |
| **find_last_not_of(chars)** | – | Last char not in set. |
| **find_last_of(chars)** | – | Last char in set. |
| **length()** | – | Length. |
| **ljust(width)** | – | Left‑justify. |
| **lowercase()** | – | To lower. |
| **lowercase_inplace()** | – | In‑place lower. |
| **ltrim()** | – | Trim left. |
| **ltrim_inplace()** | – | In‑place left trim. |
| **regex_escape()** | – | Escape regex metacharacters. |
| **regex_findall(pattern)** | – | All regex matches. |
| **regex_match(pattern)** | – | Regex match. |
| **regex_replace(pat, replace)** | – | Replace regex. |
| **regex_replace_inplace(pattern, replace)** | – | In‑place replace. |
| **regex_search(pattern)** | – | Regex search. |
| **regex_split(pattern)** | – | Split by regex. |
| **removechars(chars)** | – | Remove characters. |
| **removecharsexcept(chars)** | – | Keep only specified chars. |
| **removeprefix(prefix)** | – | Remove prefix. |
| **removesuffix(suffix)** | – | Remove suffix. |
| **replace(search, replace)** | – | Replace all. |
| **replace_first(search, replace)** | – | Replace first. |
| **replace_inplace(search, replace)** | – | In‑place replace. |
| **reverse()** | – | Reverse copy. |
| **reverse_inplace()** | – | In‑place reverse. |
| **rfind(sub)** | – | Last occurrence. |
| **rjust(width)** | – | Right‑justify. |
| **rtrim()** | – | Trim right. |
| **rtrim_inplace()** | – | In‑place right trim. |
| **size()** | – | Size. |
| **split(delim)** | – | Split by delimiter. |
| **starts(prefix)** | – | Prefix check. |
| **substr(start)** | – | Substring. |
| **substr_inplace(start)** | – | In‑place substring. |
| **trim()** | – | Trim both sides. |
| **trim_inplace()** | – | In‑place trim. |
| **uppercase()** | – | To upper. |
| **uppercase_inplace()** | – | In‑place upper. |

---

## Object: `std.thread`

| Method | Parameters | Description |
|--------|------------|-------------|
| **join()** | – | Wait for all tasks to finish. |
| **run(...args)** | – | Execute callback asynchronously. |

---

## Object: `telegram.bot`

(see **Namespace: telegram** above)

---

## Object: `test_object`

| Property | Type | Description |
|----------|------|-------------|
| **test_member** | variable | Example member. |
| **testint** | variable | Example integer. |

| Method | Parameters | Description |
|--------|------------|-------------|
| **call_cb()** | – | Test callback. |
| **test_cb()** | – | Test callback. |
| **test_fn()** | – | Test function. |
| **test_thread()** | – | Test thread. |

---

## Object: `webserver.http_server`

(see **Namespace: webserver** above)

---

## Object: `webserver.https_server`

(see **Namespace: webserver** above)

---

## Object: `zip.file`

(see **Namespace: zip** above)

---

### End of Reference

For further examples and advanced usage, refer to the official Shizoscript documentation website or the bundled `docs/` directory. Happy scripting!