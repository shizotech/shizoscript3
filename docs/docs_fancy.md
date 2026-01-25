# ShizoScript Documentation  

## Overview  

ShizoScript is a lightweight scripting language used to automate tasks and interact with various services.  

**Core features**  

- No explicit typing required – variables can hold any type.  
- Source files use the `.shio` extension; they compile to binary `.shx` files.  
- The `using` keyword imports an entire namespace, making its members globally accessible (e.g., `using std;` makes `std.print()` available as `print()`).  
- Simple, C‑like syntax with classes, functions, objects, and structured code blocks.  

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
- [Object: nanogui.context](#object-nanogui-context)  
- [Object: shizonet.artnet_device](#object-shizonet-artnet_device)  
- [Object: shizonet.client](#object-shizonet-client)  
- [Object: shizonet.device](#object-shizonet-device)  
- [Object: shizonet.server](#object-shizonet-server)  
- [Object: std.json](#object-ststdjson)  
- [Object: std.string](#object-ststdstring)  
- [Object: std.thread](#object-ststdthread)  
- [Object: subprocess.process](#object-subprocessprocess)  
- [Object: telegram.bot](#object-telegrambot)  
- [Object: test_object](#object-test_object)  
- [Object: webserver.http_server](#object-webserverhttp_server)  
- [Object: webserver.https_server](#object-webserverhttps_server)  
- [Object: zip.file](#object-zipfile)  

---  

## Namespace: curl  

### curl.curl  

**Signature**: `curl.curl() -> curl.curl`  

No description provided.  

---  

## Namespace: fileio  

### copy  

**Signature**: `fileio.copy(src: string, dest: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `src`     | string | Source path |
| `dest`    | string | Destination path (folders will be created if required) |  

**Description**: Copy file or directory.  

---  

### copy_if_changed  

**Signature**: `fileio.copy_if_changed(src: string, dest: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `src`     | string | Source path |
| `dest`    | string | Destination path |  

**Description**: Copy file or directory if source is newer than destination.  

---  

### dirs  

**Signature**: `fileio.dirs(path: string, recursive: bool = true)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Directory to list |
| `recursive` | bool | `true` = include subfolders; `false` = top-level only |  

**Description**: List directories inside a directory.  

---  

### exists  

**Signature**: `fileio.exists(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to test |  

**Description**: Check if path is a directory.  

---  

### file_dir  

**Signature**: `fileio.file_dir(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | The file path to extract directory from |  

**Description**: Extracts the directory from a given file path.  

---  

### file_name  

**Signature**: `fileio.file_name(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path to extract filename from |  

**Description**: Extracts the filename from a given path string.  

---  

### files  

**Signature**: `fileio.files(path: string, recursive: bool = true)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Directory to list |
| `recursive` | bool | `true` = include subfolders; `false` = top-level only |  

**Description**: List files in directory.  

---  

### is_directory  

**Signature**: `fileio.is_directory(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to test |  

**Description**: Check if path is a directory.  

---  

### is_file  

**Signature**: `fileio.is_file(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to test |  

**Description**: Check if path is a file.  

---  

### mkdir  

**Signature**: `fileio.mkdir()`  

**Description**: placeholderdesc  

---  

### move  

**Signature**: `fileio.move(src: string, dest: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `src`     | string | Path to file or directory |
| `dest`    | string | New location or name |  

**Description**: Move file or directory (uses rename or copy/delete fallback).  

---  

### pure_name  

**Signature**: `fileio.pure_name(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path to extract filename from |  

**Description**: Extracts the filename from a given path string (without extension).  

---  

### read_file  

**Signature**: `fileio.read_file(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to the file |  

**Description**: Read file into binary buffer.  

---  

### read_json  

**Signature**: `fileio.read_json(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to the JSON file |  

**Description**: Read JSON file and return parsed object.  

---  

### read_string  

**Signature**: `fileio.read_string(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path to read as text |  

**Description**: Read text file into string.  

---  

### read_text  

**Signature**: `fileio.read_text(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path to read as text |  

**Description**: Read text file into string.  

---  

### remove  

**Signature**: `fileio.remove(path: string|list)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `path`    | string|list | Files or directories to delete |  

**Description**: Remove files or directories (recursive).  

---  

### rename  

**Signature**: `fileio.rename(src: string, dest: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `src`     | string | Path of the existing file |
| `dest`    | string | New name or destination path |  

**Description**: Rename file or directory.  

---  

### write_file  

**Signature**: `fileio.write_file(path: string, data: object)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path to write to |
| `data`    | object | Object to serialize and write as binary |  

**Description**: Write binary data from a serializable object to a file, returning true if the write succeeds.  

---  

### write_json  

**Signature**: `fileio.write_json(path: string, data: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path to the destination file |
| `data`    | string | JSON string to write |  

**Description**: Writes a JSON string to a file. IMPORTANT: Do NOT MODIFY the json that is passed, in another thread! Always pass unique non‑mutable jsons (copy before if needed).  

---  

### write_string  

**Signature**: `fileio.write_string(path: string, data: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Destination file path |
| `data`    | string | Text string to be written |  

**Description**: Write string to file.  

---  

### write_text  

**Signature**: `fileio.write_text(path: string, data: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Destination file path |
| `data`    | string | Text string to be written |  

**Description**: Write string to file.  

---  

## Namespace: leveldb  

### kvdb  

**Signature**: `leveldb.kvdb(path: string) -> leveldb.kvdb`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | File path where the LevelDB database is located |  

**Description**: Creates a new LevelDB database object that can optionally open a database at a specified path.  

---  

## Namespace: math  

| Constant | Value |
|----------|-------|
| `PI` | `3.141593` |

### abs  

**Signature**: `math.abs(value: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | float  | Input number (integer or floating?point) |  

**Description**: Return the absolute value of a numeric input.  

---  

### acos  

**Signature**: `math.acos(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value in range `[-1,1]` |  

**Description**: Inverse cosine (arccos).  

---  

### asin  

**Signature**: `math.asin(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value in range `[-1,1]` |  

**Description**: Inverse sine (arcsin).  

---  

### atan  

**Signature**: `math.atan(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Ratio y/x |  

**Description**: Inverse tangent (arctan).  

---  

### atan2  

**Signature**: `math.atan2(y: float, x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `y`       | float  | – |
| `x`       | float  | – |  

**Description**: Arctangent from y and x.  

---  

### cbrt  

**Signature**: `math.cbrt(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value |  

**Description**: Cube root.  

---  

### ceil  

**Signature**: `math.ceil(value: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | float  | Input number |  

**Description**: Return the smallest integer greater than or equal to the given number.  

---  

### clamp  

**Signature**: `math.clamp(x: float, min: float, max: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value |
| `min`     | float  | Minimum value |
| `max`     | float  | Maximum value |  

**Description**: Clamp value between min and max.  

---  

### cos  

**Signature**: `math.cos(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Angle in radians |  

**Description**: Cosine of angle (radians).  

---  

### exp  

**Signature**: `math.exp(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Exponent |  

**Description**: Exponential function (`e^x`).  

---  

### floor  

**Signature**: `math.floor(value: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | float  | Floating?point number to floor |  

**Description**: Return the largest integer less than or equal to the given number.  

---  

### fract  

**Signature**: `math.fract(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value |  

**Description**: Fractional part of value.  

---  

### lerp  

**Signature**: `math.lerp(a: float, b: float, t: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `a`       | float  | Start value |
| `b`       | float  | End value |
| `t`       | float  | Interpolation factor (`0..1`) |  

**Description**: Linear interpolation.  

---  

### log  

**Signature**: `math.log(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value > 0 |  

**Description**: Natural logarithm (base e).  

---  

### log10  

**Signature**: `math.log10(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value > 0 |  

**Description**: Base‑10 logarithm.  

---  

### log2  

**Signature**: `math.log2(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value > 0 |  

**Description**: Base‑2 logarithm.  

---  

### max  

**Signature**: `math.max(values: float...)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `values`  | float… | One or more numbers |  

**Description**: Maximum of values.  

---  

### min  

**Signature**: `math.min(values: float...)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `values`  | float… | One or more numbers |  

**Description**: Minimum of values.  

---  

### pow  

**Signature**: `math.pow(base: float, exp: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `base`    | float  | – |
| `exp`     | float  | – |  

**Description**: Power function.  

---  

### rand  

**Signature**: `math.rand()`  

**Description**: Random float in range `[0,1]`.  

---  

### round  

**Signature**: `math.round(value: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | float  | Floating point number to round |  

**Description**: Return the nearest integer value to the given number.  

---  

### sign  

**Signature**: `math.sign(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Returns `+1`, `0`, or `-1` |  

**Description**: Sign of number.  

---  

### sin  

**Signature**: `math.sin(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Angle in radians |  

**Description**: Sine of angle (radians).  

---  

### smoothstep  

**Signature**: `math.smoothstep(edge0: float, edge1: float, x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `edge0`   | float  | Lower boundary |
| `edge1`   | float  | Upper boundary |
| `x`       | float  | Value to evaluate |  

**Description**: Smoothstep interpolation.  

---  

### sqrt  

**Signature**: `math.sqrt(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Value to square‑root |  

**Description**: Square root.  

---  

### tan  

**Signature**: `math.tan(x: float)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `x`       | float  | Angle in radians |  

**Description**: Tangent of angle (radians).  

---  

## Namespace: mqtt  

### mqtt  

**Signature**: `mqtt.mqtt() -> mqtt.mqtt`  

**Description**: Create a new MQTT client.  

---  

## Namespace: nanogui  

### context  

**Signature**: `nanogui.context() -> nanogui.context`  

-- No further description provided.  

---  

## Namespace: shizonet  

### client  

**Signature**: `shizonet.client(node_name: string, port: int = SHZNET_CLIENT_PORT) -> shizonet.client`  

| Parameter   | Type   | Description                                                |
|-------------|--------|------------------------------------------------------------|
| `node_name` | string | Node name                                                   |
| `port`      | int    | Client listening port (default: `SHZNET_CLIENT_PORT`)      |

**Description**: Create a new network client with the specified node name and optional port.  

### server  

**Signature**: `shizonet.server(node_name: string, port: int = SHZNET_SERVER_PORT) -> shizonet.server`  

| Parameter   | Type   | Description                                                |
|-------------|--------|------------------------------------------------------------|
| `node_name` | string | Node name                                                   |
| `port`      | int    | Server listening port (default: `SHZNET_SERVER_PORT`)      |

**Description**: Create a new network server with the specified node name and optional port.  

---  

## Namespace: shzdocs  

### find_all  

**Signature**: `shzdocs.find_all(Keyword: string)`  

| Parameter   | Type   | Description                                          |
|-------------|--------|------------------------------------------------------|
| `Keyword`   | string | Returns all matches that include the keyword           |

**Description**: Get documentation about all function, classes, etc.  

---  

### get_all  

**Signature**: `shzdocs.get_all()`  

**Description**: Get documentation about all function, classes, etc.  

---  

### load_all_modules  

**Signature**: `shzdocs.load_all_modules()`  

-- No description provided.  

---  

## Namespace: shztests  

### check_object  

**Signature**: `shztests.check_object()`  

-- No description provided.  

---  

### test_object  

**Signature**: `shztests.test_object() -> test_object`  

**Description**: Return a `test_object` instance.  

---  

## Namespace: std  

### Constants  

| Constant                | Value |
|-------------------------|-------|
| `MB_ICONERROR`          | 16 |
| `MB_ICONINFORMATION`   | 64 |
| `MB_ICONWARNING`       | 48 |
| `MB_OK`                 | 0 |
| `MB_OKCANCEL`           | 1 |
| `MB_RETRYCANCEL`        | 5 |
| `MB_YESNO`              | 4 |
| `MB_YESNOCANCEL`        | 3 |

### argc  

**Signature**: `std.argc()`  

**Description**: Return argc  

---  

### argv  

**Signature**: `std.argv(index: int)`  

| Parameter | Type    | Description |
|-----------|---------|-------------|
| `index`   | int     | – |

**Description**: Return argv  

---  

### buffer  

**Signature**: `std.buffer() -> std.buffer`  

**Description**: Instantiate a new `shz_std_buffer` object  

---  

### cd  

**Signature**: `std.cd(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | New working directory path |  

**Description**: Change current working directory  

---  

### count  

**Signature**: `std.count(value: Container | string | object)`  

**Description**: Alias of `len()` – returns number of elements  

---  

### cout  

**Signature**: `std.cout()`  

**Description**: Print to terminal directly  

---  

### error  

**Signature**: `std.error()`  

**Description**: Print to console output  

---  

### float  

**Signature**: `std.float(value: any)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | any     | Value to convert to float |  

**Description**: Convert input value to float  

---  

### free  

**Signature**: `std.free()`  

**Description**: Delete an object  

---  

### has_admin_privilege  

**Signature**: `std.has_admin_privilege()`  

**Description**: Returns true if run as administrator.  

---  

### hideconsole  

**Signature**: `std.hideconsole()`  

**Description**: Detach and hide the console window (Windows only)  

---  

### import  

**Signature**: `std.import(module: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `module`  | string | Name or path of the module to import |  

**Description**: Import an external module by name or path  

---  

### indentation  

**Signature**: `std.indentation(text: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `text`    | string | Text to analyze for indentation |  

**Description**: Calculate indentation level of text, counting spaces and tabs (1 space = 1 unit, 1 tab = 4 units)  

---  

### input  

**Signature**: `std.input(prompt: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `prompt`  | string | Optional message displayed before reading input |  

**Description**: Reads a line of text from standard input, optionally displaying a prompt message.  

---  

### int  

**Signature**: `std.int(value: any)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `value`   | any     | Value to convert to integer |  

**Description**: Convert value to integer  

---  

### is_function  

**Signature**: `std.is_function(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Value to check if it is a function |  

**Description**: Check if the provided value is a function  

---  

### is_json  

**Signature**: `std.is_json(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Value to check if it's a JSON object |  

**Description**: Check if the value is a JSON object  

---  

### is_list  

**Signature**: `std.is_list(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Value to check if it is a list |  

**Description**: Check if value is a list  

---  

### is_string  

**Signature**: `std.is_string(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Value to check if it's a string |  

**Description**: Check if the value is a string type  

---  

### json  

**Signature**: `std.json(...) -> std.json`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `json`    | string | Optional JSON string to parse into the new object (repeated) |  

**Description**: Create a new JSON object, optionally initialized from a JSON string.  

---  

### len  

**Signature**: `std.len(value: Container | string | object)`  

**Description**: Return size/length of a list, map, array, string, or object container  

---  

### local_executable  

**Signature**: `std.local_executable()`  

**Description**: placeholder  

---  

### messagebox  

**Signature**: `std.messagebox(text: string, caption: string, buttons: btns)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `text`    | string | Message text |
| `caption` | string | Message box caption |
| `buttons` | btns   | – |  

**Description**: Display a message box with specified text and optional caption  

---  

### millis  

**Signature**: `std.millis()`  

**Description**: Get current time in milliseconds since epoch  

---  

### print  

**Signature**: `std.print()`  

**Description**: Print to console output  

**Examples**  

```text
print("Hello World");
```

```text
print("test_var = ", test_var, ".");
```

```text
combined_str = print(var1, var2, var3);
```

---  

### runtime_error  

**Signature**: `std.runtime_error()`  

**Description**: Print to console output  

---  

### sleep  

**Signature**: `std.sleep(milliseconds: Duration)`  

| Parameter   | Type        | Description |
|-------------|-------------|-------------|
| `milliseconds` | Duration | Duration to pause execution (async) |  

**Description**: Suspend script execution for a duration (async)  

---  

### string  

**Signature**: `std.string(...) -> std.string`  

| Parameter   | Type   | Description |
|-------------|--------|-------------|
| `value`     | string | Initial string value (repeated) |

**Description**: Create a new string, optionally initialized with a given value  

---  

### system  

**Signature**: `std.system(command: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `command`  | string | Command string to be passed to the system shell |  

**Description**: Execute a shell command and return its exit code.  

---  

### system_path  

**Signature**: `std.system_path(path: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `path`    | string | Path with environment variables |  

**Description**: Expand environment variables and normalize a filesystem path  

---  

### thread  

**Signature**: `std.thread(...) -> std.thread`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `Create a new thread object with optional callback function` | — | – |
| `callback` | function | The function to be executed in the new thread (repeated) |

**Description**: threading  

---  

### timestamp  

**Signature**: `std.timestamp()`  

**Description**: Get current date and time in `DD-MM-YYYY HH:MM:SS` format  

---  

### vaddress  

**Signature**: `std.vaddress(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Variable to inspect |  

**Description**: Get the type of a variable  

---  

### vtype  

**Signature**: `std.vtype(value: any)`  

| Parameter | Type | Description |
|-----------|------|-------------|
| `value`   | any  | Variable to inspect |  

**Description**: Get the type of a variable  

---  

### warn  

**Signature**: `std.warn()`  

**Description**: Print to console output  

---  

### wd  

**Signature**: `std.wd()`  

**Description**: Get current working directory path  

---  

### web_get  

**Signature**: `std.web_get(url: string)`  

| Parameter | Type   | Description |
|-----------|--------|-------------|
| `url`     | string | HTTP or HTTPS URL |  

**Description**: Perform a simple HTTP GET request and return the response body  

---  

## Namespace: subprocess  

### process  

**Signature**: `subprocess.process() -> subprocess.process`  

**Description**: Instantiate a new `subprocess.process` object.  

---  

## Namespace: telegram  

### bot  

**Signature**: `telegram.bot(bot_token: string)`  

| Parameter    | Type   | Description                                                  |
|--------------|--------|--------------------------------------------------------------|
| `bot_token`  | string | Bot authentication token for Telegram API                     |

**Description**: Create a new Telegram API instance with a bot token  

---  

## Namespace: testmodule  

### testfn  

**Signature**: `testmodule.testfn()`  

**Description**: (No description provided)  

---  

## Namespace: webserver  

### http_server  

**Signature**: `webserver.http_server() -> webserver.http_server`  

**Description**: Class representing an HTTP server  

---  

### https_server  

**Signature**: `webserver.https_server() -> webserver.https_server`  

**Description**: Class representing an HTTPS server  

---  

## Namespace: zip  

### file  

**Signature**: `zip.file() -> zip.file`  

**Description**: Instantiate a new zip object  

---  

# Object: curl.curl  

| Method        | Signature | Description |
|---------------|-----------|-------------|
| `get` | `get(url: string)` | HTTP GET. Returns json `{ ok, http_code, body, content_type }` |
| `last_error` | `last_error()` | Get last error text set by the wrapper |
| `poll_stream` | `poll_stream()` | Drain pending stream chunks. |
| `post` | `post(url: string, payload: string)` | HTTP POST with raw string payload. Returns json `{ ok, http_code, body, content_type }` |
| `request` | `request(method: string, url: string, body: string, headers: json, timeout_ms: int, binary: bool)` | Generic HTTP request. request(method,url,body?,headers_json?,timeout_ms?,binary?). Returns json `{ ok, http_code, body, content_type }` |
| `reset` | `reset()` | Reset the CURL easy handle and clear last_error |
| `start_stream` | `start_stream(method: string, url: string, body: string, headers: json, timeout_ms: int)` | Start streaming request. Use poll_stream(cb) to receive chunks, stop_stream() to abort. |
| `stop_stream` | `stop_stream()` | Abort the active streaming request (if any). Returns 1 if stop was signaled. |
| `version` | `version()` | Get the version of the libcurl library |

---  

# Object: leveldb.iterator  

| Method |
|--------|
| `key()` |
| `next()` |
| `reset()` |
| `seek()` |
| `valid()` |
| `value()` |

---  

# Object: leveldb.kvdb  

| Method | Significance |
|--------|--------------|
| `batch` | `batch([[op, key, value?], ...])` |
| `delete` | `delete(key: string)` – Delete a key‑value pair from the database |
| `exists` | `exists(key: string)` – Check if a key exists in the database |
| `get` | `get(key: string)` – Get value from LevelDB by key with optional default return |
| `iter` | `iter(size?) -> leveldb.iterator` – Returns an iterator |
| `put` | `put(key, value)` – Insert or replace a key‑value pair |

---  

# Object: mqtt.mqtt  

| Method | Signature | Description |
|--------|-----------|-------------|
| `configure` | `configure(server_uri: string, client_id: string)` | Create/replace the internal MQTT async client |
| `connect` | `connect(username: string, password: string, clean_session: bool, keep_alive: int)` | Connect to broker (blocking; runs on worker thread) |
| `disconnect` | `disconnect()` | Disconnect from broker (blocking; runs on worker thread) |
| `is_connected` | `is_connected()` | Returns true if currently connected |
| `poll` | `poll(cb)` | Drain queued MQTT messages and invoke `on_message` callback. Returns number of delivered messages. |
| `publish` | `publish(topic: string, payload: string, qos: int, retained: bool)` | Publish a message (blocking; runs on worker thread) |
| `set_callbacks` | `set_callbacks(on_message: function, on_connect: function, on_disconnect: function, on_error: function)` | Set script callbacks (invoked by `poll()`) |
| `subscribe` | `subscribe(topic: string, qos: int)` | Subscribe to a topic (blocking; runs on worker thread) |

---  

# Object: nanogui.context  

| Method |
|--------|
| `screen` |

---  

# Object: shizonet.artnet_device  

| Variable | Description |
|----------|-------------|
| `ip` | – |
| `mac` | – |
| `name` | – |
| `online` | – |
| `type` | – |

---  

# Object: shizonet.client  

| Variable | Description |
|----------|-------------|
| `artnet_sync` | – |
| `enabled` | – |
| `ip` | – |
| `mac` | – |
| `name` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `get` | `command: string, value: object, timeout: int` | Send a GET command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get_all` | `command: string, data: any, callback: function, timeout: int` | Send a GET command to all connected devices, optionally with payload, callback, and timeout. Returns the number of devices that accepted the command. |
| `on_command` | `cmd: string, func: function` | Register a callback for the specified command. The callback is invoked with the sending device and the command data each time the command is received. |
| `on_connect` | `function: function` | Register a function to be invoked for each new client connection. |
| `on_disconnect` | `callback: function` | Register a callback to be called when disconnect occurs. |
| `on_get` | `cmd: string, func: function` | Register a handler for a request command; the callback receives the device and request data and returns a value to send as a reply. |
| `on_stream` | `cmd: string, func: function` | Register a stream handler for a command; the callback is invoked with the sending device and the packet data whenever the command arrives. |
| `send_osc` | `ip: string, config: object, port: int = 8000` | Send OSC message(s) described by a JSON object to the specified IP address and port. |

---  

# Object: shizonet.device  

| Variable | Description |
|----------|-------------|
| `ip` | – |
| `mac` | – |
| `name` | – |
| `online` | – |
| `type` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `fetch` | `command: string, value: object, timeout: int` | Send a FETCH command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get` | `command: string, value: object, timeout: int` | Send a GET command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get_static_buffer_count` | – | Get the total number of static buffers in the device |
| `get_static_buffer_desc` | `identifier: int|string` | Retrieve description and setup of a static buffer by index or name |
| `get_static_buffer_names` | – | Retrieve names and details of static buffers in the device |
| `send` | `command: string, data: object, timeout: int = 0, wait_finish: bool = false` | Send a command with optional payload and timeout over a reliable connection, optionally waiting for the operation to finish before resuming the script task. |
| `send_fast` | `command: string, data: object` | Send a command with accompanying data over an unreliable network connection. |
| `send_queue` | `command: string, data: object, timeout: int = 0, wait_finish: bool = false` | Send a command with optional data via a queued reliable connection, optionally waiting for the send to finish. |

---  

# Object: shizonet.server  

| Variable | Description |
|----------|-------------|
| `artnet_sync` | – |
| `enabled` | – |
| `ip` | – |
| `mac` | – |
| `name` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `get` | `command: string, value: object, timeout: int` | Send a GET command to a device, optionally with a payload and a timeout, and return the device's response. |
| `get_all` | `command: string, data: any, callback: function, timeout: int` | Send a GET command to all connected devices, optionally with payload, callback, and timeout. Returns the number of devices that accepted the command. |
| `on_command` | `cmd: string, func: function` | Register a callback for the specified command. |
| `on_connect` | `function: function` | Register a function to be invoked for each new client connection. |
| `on_disconnect` | `callback: function` | Register a callback to be called when the server disconnects. |
| `on_get` | `cmd: string, func: function` | Register a handler for a request command. |
| `on_stream` | `cmd: string, func: function` | Register a stream handler for a command. |
| `send_osc` | `ip: string, config: object, port: int = 8000` | Send OSC message(s) described by a JSON object to the specified IP address and port. |

---  

# Object: std.json  

| Method | Parameters | Description |
|--------|------------|-------------|
| `all` | `filter: function|string` | Returns true if all entries match substring or callback. |
| `any` | `filter: function|string` | Returns true if any entry matches substring or callback. |
| `append` | `other: json, overwrite: bool = true` | Appends another JSON object into this one. |
| `combine_string` | `separator: string` | Combine string values of the JSON object with an optional separator. |
| `compact_string` | – | Convert JSON object to its compact string representation. |
| `copy` | – | Creates a deep copy of the JSON object. |
| `erase` | `key: string` | Removes a key or index from a JSON object and returns whether the removal succeeded. |
| `filter` | `filter: function|string` | Filter JSON object entries by callback or key substring. |
| `filter_key` | `filter: string` | Filter JSON object's keys by matching substrings and return the filtered JSON. |
| `filter_value` | `filter: string` | Return a new JSON object containing only string members whose values include a specific substring. |
| `foreach` | `callback: function` | Iterates over each key/value pair in a JSON object and runs a callback for each entry. |
| `from_string` | `json: string` | Parse JSON from string and populate object. |
| `has` | `key: string` | Checks if the JSON object contains a given key. |
| `key` | `index: int` | Return the key at a specified index from a JSON object. |
| `map` | `callback: function` | Return a new JSON where each value is replaced by the result of the callback. |
| `merge` | `other: json, overwrite: bool = true` | Merge another JSON object into this one. |
| `push` | `value: object` | Adds the supplied value to the given JSON container and returns the modified object. |
| `push_back` | `value: object` | Adds the supplied value to the given JSON container and returns the modified object. |
| `reduce` | `callback: function, initial: any` | Reduce object entries into a single value. |
| `remove` | `key: string` | Removes a key or index from a JSON object and returns whether the removal succeeded. |
| `rsort` | – | Sorts a JSON object’s entries by key in descending order, keeping keyless entries at the end. |
| `size` | – | Returns the number of elements in a JSON array or the number of keys in a JSON object. |
| `sort` | – | Sorts JSON entries by their keys in a case-insensitive manner. |
| `sort_reverse` | – | Sorts a JSON object’s entries by key in descending order, keeping keyless entries at the end. |
| `string` | `compact: int = 0` | Convert JSON object to its string representation, optionally using compact output. |

---  

# Object: std.string  

| Method | Parameters | Description |
|--------|------------|-------------|
| `center` | `width: int` | Center the string within specified width using padding characters |
| `contains` | `sub: string` | Check if string contains substring |
| `empty` | – | Check if string is empty and return 1 if true, 0 otherwise |
| `ends` | `suffix: string` | Check if string ends with specified suffix |
| `extract` | `left: string` | Extract substring between specified left and right delimiters |
| `find` | `substring: string` | Find the position of a substring within the string |
| `find_first_not_of` | `chars: string` | Find first character not in specified set |
| `find_first_of` | `chars: string` | Find first occurrence of any character from the given set within the string |
| `find_last_not_of` | `chars: string` | Find the last character in the string that is not in the specified set of characters |
| `find_last_of` | `chars: string` | Finds the last occurrence of any character from the given set in the string |
| `length` | – | Retrieve the length of the string |
| `ljust` | `width: int` | Left-justify the string by padding it with the specified fill character to reach the given width |
| `lowercase` | – | Convert string to lowercase |
| `lowercase_inplace` | – | Convert string to lowercase |
| `ltrim` | – | Remove leading whitespace |
| `ltrim_inplace` | – | Remove leading whitespace |
| `regex_escape` | – | Escape regex metacharacters in string |
| `regex_findall` | `pattern: string` | Find all matches of a regex pattern in the string |
| `regex_match` | `pattern: string` | Check if the string matches a regular expression pattern |
| `regex_replace` | `pat: string` | Replace all occurrences of a regex pattern in the string |
| `regex_replace_inplace` | `pattern: string` | Replace all occurrences of a regex pattern in the string with a replacement text |
| `regex_search` | `pattern: string` | Search for a regular expression pattern in the string and return the starting position of the match |
| `regex_split` | `pattern: string` | Split string using regular expression pattern and return results as JSON array |
| `removechars` | `chars: string` | Remove all occurrences of specified characters from the string |
| `removecharsexcept` | `chars: string` | Remove all characters from the string except those specified in the parameter |
| `removeprefix` | `prefix: string` | Remove a prefix from the string if it starts with that prefix |
| `removessuffix` | `suffix: string` | Remove specified suffix from string if it exists at the end |
| `replace` | `search: string` | Replace all occurrences of a substring with another substring |
| `replace_first` | `search: string` | Replaces the first occurrence of a substring with another substring |
| `replace_inplace` | `search: string` | Replace all occurrences of a substring within the string in-place |
| `reverse` | – | Return a reversed copy of the string |
| `reverse_inplace` | – | Reverse the string in-place |
| `rfind` | `sub: string` | Find last occurrence of substring in string, searching backwards |
| `rjust` | `width: int` | Right-justify string by padding with specified character |
| `rtrim` | – | Remove trailing whitespace |
| `rtrim_inplace` | – | Remove trailing whitespace |
| `size` | – | Retrieve the size of the string |
| `split` | `delim: string` | Split string into parts using specified delimiter |
| `starts` | `prefix: string` | Check if string starts with specified prefix |
| `strip` | – | Remove leading and trailing whitespace |
| `strip_inplace` | – | Remove leading and trailing whitespace |
| `substr` | `start: int` | Extracts a substring from the original string with support for Python‑style negative indices |
| `substr_inplace` | `start: int` | Extracts a substring from the string and modifies the original string in-place |
| `trim` | – | Remove leading and trailing whitespace |
| `trim_inplace` | – | Remove leading and trailing whitespace |
| `uppercase` | – | Convert string to uppercase |
| `uppercase_inplace` | – | Convert string to uppercase |

---  

# Object: std.thread  

| Method | Description |
|--------|-------------|
| `join` | Join active tasks and wait for their completion |
| `run` | Execute callback function asynchronously as a task |

---  

# Object: subprocess.process  

| Method | Description |
|--------|-------------|
| `exited` | Returns true if the process exited. |
| `kill` | Force kill the process (SIGKILL / TerminateProcess). |
| `pid` | Get process id. |
| `poll` | Check process status. Returns return code or none if still running. |
| `returncode` | Get cached return code (or none if not finished). |
| `start` | `run(args: list, cwd: string, shell: bool, env: list)` – Start a subprocess (similar to Python subprocess.Popen). |
| `stop` | Send Ctrl+C / SIGINT to request graceful shutdown. |
| `terminate` | Request process termination (SIGTERM / TerminateProcess). |
| `wait` | Wait until process exits and return its exit code. |

---  

# Object: telegram.bot  

| Variable | Description |
|----------|-------------|
| `on_any_message` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `ban_chat_member` | `chatid: int, userid: int, until_date: int?, revoke_messages: int?` | Ban a user from a chat |
| `copy_message` | `to_chatid: int, from_chatid: int, msgid: int` | Copy a message without forwarding tag |
| `delete_message` | `chatid: int, msgid: int` | Delete a message |
| `edit_caption` | `chatdata: object, caption: string` | Edit a message caption |
| `edit_message` | `chatdata: object, text: string` | Edit an existing message text |
| `edit_reply_markup` | `chatdata: object, buttons: object?` | Edit message reply markup (buttons) |
| `forward_message` | `to_chatid: int, from_chatid: int, msgid: int` | Forward a message from one chat to another |
| `get_chat` | `chatid: int` | Get information about a chat |
| `get_chat_administrators` | `chatid: int` | Get a list of chat administrators |
| `get_chat_member` | `chatid: int, userid: int` | Get information about a chat member |
| `get_chat_member_count` | `chatid: int` | Get the number of members in a chat |
| `leave_chat` | `chatid: int` | Leave a chat |
| `promote_chat_member` | `chatid: int, userid: int, rights: object?` | Promote a user to admin in a chat |
| `restrict_chat_member` | `chatid: int, userid: int, permissions: object, until_date: int?` | Restrict a chat member's permissions |
| `send` | `chatdata: object, options: object?` | Send a message through Telegram with optional buttons and options |
| `send_animation` | `chatdata: object, animation: string, options: object?` | Send an animation (GIF) to a chat |
| `send_audio` | `chatdata: object, audio: string, options: object?` | Send an audio file |
| `send_chat_action` | `chatid: int, action: string, threadid: int?` | Send a chat action (typing, uploading, etc.) |
| `send_choice` | `chatdata: object, options: object?` | Send a message with inline keyboard buttons |
| `send_document` | `chatdata: object, document: string, options: object?` | Send a document to a chat |
| `send_location` | `chatdata: object, latitude: float, longitude: float, options: object?` | Send a location to a chat |
| `send_photo` | `chatdata: object, photo: string, options: object?` | Send a photo to a chat |
| `send_sticker` | `chatdata: object, sticker: string, options: object?` | Send a sticker to a chat |
| `send_video` | `chatdata: object, video: string, options: object?` | Send a video to a chat |
| `send_video_note` | `chatdata: object, video_note: string, options: object?` | Send a video note (circular video) |
| `send_voice` | `chatdata: object, voice: string, options: object?` | Send a voice message to a chat |
| `set_chat_administrator_custom_title` | `chatid: int, userid: int, title: string` | Set a custom title for an admin |
| `unban_chat_member` | `chatid: int, userid: int, only_if_banned: int?` | Unban a user from a chat |

---  

# Object: test_object  

| Variable | Description |
|----------|-------------|
| `test_member` | – |
| `testint` | – |

### Methods  

| Method | Description |
|--------|-------------|
| `call_cb` | test fn |
| `test_auto_fn` | A test function registered via automatic binding. |
| `test_cb` | test fn |
| `test_fn` | test fn |
| `test_thread` | test fn |

---  

# Object: webserver.http_server  

| Variable | Description |
|----------|-------------|
| `port` | – |
| `running` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `init` | `port: int` | Initialize HTTP server with port |
| `route` | `method: string, path: string, callback: function` | Register a route handler for HTTP requests |
| `static` | `url_pattern: string, file_or_directory: string` | Register a static file route |
| `start` | – | Start the HTTP server |
| `stop` | – | Stop the HTTP server |

---  

# Object: webserver.https_server  

| Variable | Description |
|----------|-------------|
| `port` | – |
| `running` | – |

### Methods  

| Method | Parameters | Description |
|--------|------------|-------------|
| `init` | `port: int, cert_file: string, key_file: string` | Initialize HTTPS server with port and certificate files |
| `route` | `method: string, path: string, callback: function` | Register a route handler for HTTPS requests |
| `static` | `url_pattern: string, file_or_directory: string` | Register a static file route |
| `start` | – | Start the HTTPS server |
| `stop` | – | Stop the HTTPS server |

---  

# Object: zip.file  

| Method | Description |
|--------|-------------|
| `add` | `path: string` – Add a file to the zip archive with specified path and content |
| `add_file` | `path: string` – Adds a file to the zip archive with specified content |
| `save` | `path: string` – Save zip file to specified path |  

---  
  