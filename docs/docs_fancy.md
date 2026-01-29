# ShizoScript Documentation

## Overview

ShizoScript is an imperative scripting language aimed at providing rapid development of server‑side applications.  

**Core features**

| Feature | Description |
|---------|-------------|
| **Type System** | No explicit typing required – the interpreter infers variable types at runtime. |
| **File extensions** | `.shio` – source files; `.shx` – compiled binaries. |
| **Namespaces** | Code is organized into logical namespaces (e.g. `std`, `curl`). |
| **`using` keyword** | `using <namespace>` imports all names from a namespace into the global scope, allowing you to call `std.print()` simply as `print()`. |
| **Object‑oriented style** | Classes are defined with the `class` keyword, and objects can be created and accessed via the dot (`.`) operator. |
| **Extensible** | New modules can be added by writing C++ builds or other scripted modules. |
| **Threading & Subprocesses** | Built‑in thread and subprocess support. |
| **I/O libraries** | Easy access to files, JSON, system commands, and more. |

---

## Table of Contents

1. [Namespaces](#namespaces)
   - [curl](#namespace-curl)
   - [eigen](#namespace-eigen)
   - [fileio](#namespace-fileio)
   - [leveldb](#namespace-leveldb)
   - [math](#namespace-math)
   - [mqtt](#namespace-mqtt)
   - [nanogui](#namespace-nanogui)
   - [shizonet](#namespace-shizonet)
   - [shzdocs](#namespace-shzdocs)
   - [shztests](#namespace-shztests)
   - [std](#namespace-std)
   - [subprocess](#namespace-subprocess)
   - [telegram](#namespace-telegram)
   - [testmodule](#namespace-testmodule)
   - [webserver](#namespace-webserver)
   - [zip](#namespace-zip)
2. [Objects](#objects)
   - [curl.curl](#object-curl-curl)
   - [eigen.vec2d](#object-eigen-vec2d)  
   - [eigen.vec2f](#object-eigen-vec2f)  
   - [eigen.vec2i](#object-eigen-vec2i)  
   - [eigen.vec3d](#object-eigen-vec3d)  
   - [eigen.vec3f](#object-eigen-vec3f)  
   - [eigen.vec3i](#object-eigen-vec3i)  
   - [eigen.vec4d](#object-eigen-vec4d)  
   - [eigen.vec4f](#object-eigen-vec4f)  
   - [eigen.vec4i](#object-eigen-vec4i)  
   - [leveldb.iterator](#object-leveldb-iterator)
   - [leveldb.kvdb](#object-leveldb-kvdb)
   - [mqtt.mqtt](#object-mqtt-mqtt)
   - [nanogui.context](#object-nanogui-context)
   - [nanogui.screen](#object-nanogui-screen)
   - [nanogui.theme](#object-nanogui-theme)
   - [nanogui.widget](#object-nanogui-widget)
   - [shizonet.artnet_device](#object-shizonet-artnet_device)
   - [shizonet.client](#object-shizonet-client)
   - [shizonet.device](#object-shizonet-device)
   - [shizonet.server](#object-shizonet-server)
   - [std.json](#object-std-json)
   - [std.string](#object-std-string)
   - [std.thread](#object-std-thread)
   - [subprocess.process](#object-subprocess-process)
   - [telegram.bot](#object-telegram-bot)
   - [test_module.testobject](#object-testmodule-testobject)
   - [webserver.http_server](#object-webserver-http_server)
   - [webserver.https_server](#object-webserver-https_server)
   - [zip.file](#object-zip-file)

---

## Namespaces

### Namespace: `curl`

| Function | Syntax | Description |
|----------|--------|-------------|
| `curl()` | `curl.curl()` | Create a new Curl client object |

---

### Namespace: `eigen`

| Function | Syntax | Description |
|----------|--------|-------------|
| `vec2d()` | `eigen.vec2d()` | Create a 2‑component double vector |
| `vec2f()` | `eigen.vec2f()` | Create a 2‑component float vector |
| `vec2i()` | `eigen.vec2i()` | Create a 2‑component integer vector |
| `vec3d()` | `eigen.vec3d()` | Create a 3‑component double vector |
| `vec3f()` | `eigen.vec3f()` | Create a 3‑component float vector |
| `vec3i()` | `eigen.vec3i()` | Create a 3‑component integer vector |
| `vec4d()` | `eigen.vec4d()` | Create a 4‑component double vector |
| `vec4f()` | `eigen.vec4f()` | Create a 4‑component float vector |
| `vec4i()` | `eigen.vec4i()` | Create a 4‑component integer vector |

---

### Namespace: `fileio`

| Function | Syntax | Description |
|----------|--------|-------------|
| **`copy`** | `fileio.copy(src: string, dest: string)` | Copy file or directory (folders will be created if required) |
| **`copy_if_changed`** | `fileio.copy_if_changed(src: string, dest: string)` | Copy file or directory if source is newer than destination |
| **`dirs`** | `fileio.dirs(path: string, recursive: bool = true)` | List directories inside a directory |
| **`exists`** | `fileio.exists(path: string)` | Check if path is a directory |
| **`file_dir`** | `fileio.file_dir(path: string)` | Extract the directory from a file path |
| **`file_name`** | `fileio.file_name(path: string)` | Extract the filename from a given path string |
| **`files`** | `fileio.files(path: string, recursive: bool = true)` | List files in a directory |
| **`is_directory`** | `fileio.is_directory(path: string)` | Check if path is a directory |
| **`is_file`** | `fileio.is_file(path: string)` | Check if path is a file |
| **`mkdir`** | `fileio.mkdir()` | *placeholderdesc* |
| **`move`** | `fileio.move(src: string, dest: string)` | Move file or directory (uses rename or copy/delete fallback) |
| **`pure_name`** | `fileio.pure_name(path: string)` | Extract the filename from a given path string (without extension) |
| **`read_file`** | `fileio.read_file(path: string)` | Read file into binary buffer |
| **`read_json`** | `fileio.read_json(path: string)` | Read JSON file and return parsed object |
| **`read_string`** | `fileio.read_string(path: string)` | Read text file into string |
| **`read_text`** | `fileio.read_text(path: string)` | Read text file into string |
| **`remove`** | `fileio.remove(path: string|list)` | Remove files or directories (recursive) |
| **`rename`** | `fileio.rename(src: string, dest: string)` | Rename file or directory |
| **`write_file`** | `fileio.write_file(path: string, data: object)` | Write binary data from a serializable object to a file, returning true on success |
| **`write_json`** | `fileio.write_json(path: string, data: string)` | Write a JSON string to a file (do **not** modify the JSON object concurrently) |
| **`write_string`** | `fileio.write_string(path: string, data: string)` | Write a string to a file |
| **`write_text`** | `fileio.write_text(path: string, data: string)` | Write a string to a file |

---

### Namespace: `leveldb`

| Function | Syntax | Description |
|----------|--------|-------------|
| `kvdb` | `leveldb.kvdb(path: string)` | Creates a new LevelDB database object that can optionally open a database at a specified path |

---

### Namespace: `math`

| Constant / Function | Value / Syntax | Description |
|----------------------|----------------|-------------|
| **Constants** |
| `PI` | `3.141593` | - |
| **Functions** |
| `abs(value)` | `math.abs(value: float)` | Return the absolute value of a numeric input |
| `acos(x)` | `math.acos(x: float)` | Inverse cosine (arccos) |
| `asin(x)` | `math.asin(x: float)` | Inverse sine (arcsin) |
| `atan(y)` | `math.atan(y: float)` | Inverse tangent (arctan) |
| `atan2(y, x)` | `math.atan2(y: float, x: float)` | Arctangent from y and x |
| `cbrt(x)` | `math.cbrt(x: float)` | Cube root |
| `ceil(value)` | `math.ceil(value: float)` | Return the smallest integer greater than or equal to the given number |
| `clamp(x, min, max)` | `math.clamp(x: float, min: float, max: float)` | Clamp value between min and max |
| `cos(x)` | `math.cos(x: float)` | Cosine of angle (radians) |
| `exp(x)` | `math.exp(x: float)` | Exponential function (e^x) |
| `floor(value)` | `math.floor(value: float)` | Return the largest integer less than or equal to the given number |
| `fract(x)` | `math.fract(x: float)` | Fractional part of value |
| `lerp(a, b, t)` | `math.lerp(a: float, b: float, t: float)` | Linear interpolation |
| `log(x)` | `math.log(x: float)` | Natural logarithm (base e) |
| `log10(x)` | `math.log10(x: float)` | Base‑10 logarithm |
| `log2(x)` | `math.log2(x: float)` | Base‑2 logarithm |
| `max(values)` | `math.max(values: float...)` | Maximum of values |
| `min(values)` | `math.min(values: float...)` | Minimum of values |
| `pow(base, exp)` | `math.pow(base: float, exp: float)` | Power function |
| `rand()` | `math.rand()` | Random float in range [0,1] |
| `round(value)` | `math.round(value: float)` | Return the nearest integer value |
| `sign(x)` | `math.sign(x: float)` | Sign of number (returns +1, 0, or -1) |
| `sin(x)` | `math.sin(x: float)` | Sine of angle (radians) |
| `smoothstep(edge0, edge1, x)` | `math.smoothstep(edge0: float, edge1: float, x: float)` | Smoothstep interpolation |
| `sqrt(x)` | `math.sqrt(x: float)` | Square root |
| `tan(x)` | `math.tan(x: float)` | Tangent of angle (radians) |

---

### Namespace: `mqtt`

| Function | Syntax | Description |
|----------|--------|-------------|
| `mqtt()` | `mqtt.mqtt()` | Create a new MQTT client |

---

### Namespace: `nanogui`

| Class / Object | Description |
|----------------|-------------|
| `context()` | – |
| `screen()` | – |

*Only the class declarations are listed; function details are provided under the corresponding objects below.*

---

### Namespace: `shizonet`

| Function | Syntax | Description |
|----------|--------|-------------|
| `client(node_name, port: int = SHZNET_CLIENT_PORT)` | `shizonet.client(node_name, port)` | Create a new network client with the specified node name and optional port |
| `server(node_name, port: int = SHZNET_SERVER_PORT)` | `shizonet.server(node_name, port)` | Create a new network server with the specified node name and optional port |

---

### Namespace: `shzdocs`

| Function | Syntax | Description |
|----------|--------|-------------|
| `find_all(Keyword)` | `shzdocs.find_all(Keyword: string)` | Get documentation about all function, classes, etc. that include the keyword |
| `get_all()` | `shzdocs.get_all()` | Get documentation about all function, classes, etc. |
| `load_all_modules()` | `shzdocs.load_all_modules()` | – |

---

### Namespace: `shztests`

| Function | Syntax | Description |
|----------|--------|-------------|
| `check_object()` | `shztests.check_object()` | – |
| `test_object()` | `shztests.test_object()` | – |

---

### Namespace: `std`

| Constant | Value | Description |
|----------|-------|-------------|
| `MB_ICONERROR` | `16` | – |
| `MB_ICONINFORMATION` | `64` | – |
| `MB_ICONWARNING` | `48` | – |
| `MB_OK` | `0` | – |
| `MB_OKCANCEL` | `1` | – |
| `MB_RETRYCANCEL` | `5` | – |
| `MB_YESNO` | `4` | – |
| `MB_YESNOCANCEL` | `3` | – |

| Function | Syntax | Description |
|----------|--------|-------------|
| `argc()` | `std.argc()` | Return `argc` |
| `argv(index)` | `std.argv(index: int)` | Return `argv` |
| `buffer()` | `std.buffer()` | Instantiate a new `shz_std_buffer` object |
| `cd(path)` | `std.cd(path: string)` | Change current working directory |
| `count(value)` | `std.count(value: Container, string, or object)` | Alias of `len()` – returns number of elements |
| `cout()` | `std.cout()` | Print to terminal directly |
| `error()` | `std.error()` | Print to console output |
| `float(value)` | `std.float(value: any)` | Convert input value to float |
| `free()` | `std.free()` | Delete an object |
| `has_admin_privilege()` | `std.has_admin_privilege()` | Returns true if run as administrator |
| `hideconsole()` | `std.hideconsole()` | Detach and hide the console window (Windows only) |
| `import(module)` | `std.import(module: string)` | Import an external module by name or path |
| `indentation(text)` | `std.indentation(text: string)` | Calculate indentation level of text, counting spaces (1) and tabs (4) |
| `input(prompt)` | `std.input(prompt: string)` | Reads a line of text from standard input, optionally displaying a prompt |
| `int(value)` | `std.int(value: any)` | Convert value to integer |
| `is_function(value)` | `std.is_function(value: any)` | Check if the provided value is a function |
| `is_json(value)` | `std.is_json(value: any)` | Check if the value is a JSON object |
| `is_list(value)` | `std.is_list(value: any)` | Check if value is a list |
| `is_string(value)` | `std.is_string(value: any)` | Check if it's a string type |
| `json(... )` | `std.json(json: string, suppress_errors: bool, ...)` | Create a new JSON object, optionally initialized from a JSON string |
| `len(value)` | `std.len(value: Container, string, or object)` | Return size/length of a list, map, array, string, or object container |
| `local_executable()` | `std.local_executable()` | *placeholder* |
| `messagebox(text, caption, buttons)` | `std.messagebox(text: string, caption: string, buttons: btns)` | Display a message box with specified text and optional caption |
| `millis()` | `std.millis()` | Get current time in milliseconds since epoch |
| `os_platform()` | `std.os_platform()` | Get current operating system/platform name |
| `print(... )` | `std.print( … )` | Print to console output (multiple examples omitted) |
| `runtime_error()` | `std.runtime_error()` | Print to console output |
| `sleep(milliseconds)` | `std.sleep(milliseconds: Duration)` | Suspend script execution for a duration (async) |
| `string(... )` | `std.string(value: string)` | Create a new string, optionally initialized with a given value |
| `system(command, capture, print_output)` | `std.system(command: string, capture: int/bool, print_output: int/bool)` | Execute a shell command. If `capture` is enabled, returns the command output; otherwise returns the exit code. |
| `system_path(path)` | `std.system_path(path: string)` | Expand environment variables and normalize a filesystem path |
| `thread(callback)` | `std.thread(callback: function)` | Threading |
| `timestamp()` | `std.timestamp()` | Get current date and time in “DD‑MM‑YYYY HH:MM:SS” format |
| `vaddress(value)` | `std.vaddress(value)` | Get the type of a variable |
| `vtype(value)` | `std.vtype(value)` | Get the type of a variable |
| `warn()` | `std.warn()` | Print to console output |
| `wd()` | `std.wd()` | Get current working directory path |
| `web_get(url)` | `std.web_get(url: string)` | Perform a simple HTTP GET request and return the response body |

---

### Namespace: `subprocess`

| Function | Syntax | Description |
|----------|--------|-------------|
| `process()` | `subprocess.process()` | Instantiate a new `subprocess.process` object |

---

### Namespace: `telegram`

| Function | Syntax | Description |
|----------|--------|-------------|
| `bot(token)` | `telegram.bot(bot_token: string)` | Create a new Telegram API instance with a bot token |

---

### Namespace: `testmodule`

| Function | Syntax | Description |
|----------|--------|-------------|
| `testfn()` | `testmodule.testfn()` | – |

---

### Namespace: `webserver`

| Class | Syntax | Description |
|-------|--------|-------------|
| `http_server()` | `webserver.http_server()` | Class representing an HTTP server |
| `https_server()` | `webserver.https_server()` | Class representing an HTTPS server |

--- 

### Namespace: `zip`

| Function | Syntax | Description |
|----------|--------|-------------|
| `file()` | `zip.file()` | Instantiate a new zip object |

---

## Objects

> Objects are the concrete implementation of classes and provide methods and attributes.

### Object: `curl.curl`

| Attribute / Method | Type | Description |
|--------------------|------|-------------|
| **Attributes** |  | |
| N/A |  |  |
| **Methods** |  | |
| `get(url)` | `string` → JSON (`ok`, `http_code`, `body`, `content_type`) | HTTP GET |
| `last_error()` | `string` | Get last error text set by the wrapper |
| `poll_stream()` | `any` | Drain pending stream chunks |
| `post(url, payload)` | `string` → JSON | HTTP POST with raw string payload |
| `request(method, url, body, headers, timeout_ms, binary)` | `json` → JSON | Generic HTTP request |
| `reset()` | `void` | Reset the CURL easy handle and clear last_error |
| `start_stream(method, url, body, headers, timeout_ms)` | `void` | Start streaming request |
| `stop_stream()` | `int` (1 if stopped) | Abort the active streaming request |
| `version()` | `string` | Get the version of the libcurl library |

---

### Objects: `eigen.vec2d` – `eigen.vec4i`

All **vector** objects share the same public interface.  
Below is a generic description; treat each class (`vec2d`, `vec3f`, etc.) similarly.

| Attribute | Type |
|-----------|------|
| `x`, `y`, `z`, `w` | component (type varies: `d`, `f`, `i`) |

| Method | Description |
|--------|-------------|
| `abs()` | Component‑wise absolute value |
| `angle(other)` | Angle between vectors in radians |
| `clamp(min, max)` | Component‑wise clamp |
| `distance(other)` | Distance to other vector |
| `distance_sq(other)` | Squared distance to other vector |
| `dot(other)` | Dot product |
| `equals(other, epsilon)` | Compare with optional epsilon |
| `is_zero()` | Check if vector is near zero |
| `length()` | Vector length |
| `length_sq()` | Squared vector length |
| `lerp(other, t)` | Linear interpolation |
| `max(other)` | Component‑wise max |
| `min(other)` | Component‑wise min |
| `normalize()` | Normalize in place |
| `normalized()` | Return a normalized copy |
| `set(x, y[, z[, w]])` | Set components |
| `to_string(epsilon)` | String representation |

---

### Object: `leveldb.iterator`

| Method | Description |
|--------|-------------|
| `key()` | – |
| `next()` | – |
| `reset()` | – |
| `seek()` | – |
| `valid()` | – |
| `value()` | – |

*(Method bodies not provided in source documentation.)*

---

### Object: `leveldb.kvdb`

| Attribute | Type |
|-----------|------|
| N/A |  |
| **Methods** |
| `batch()` | `list` (structure `[[op, key, value?], ...]`) – batch operation |
| `delete(key)` | – Delete a key‑value pair |
| `exists(key)` | – Check if a key exists |
| `get(key)` | – Get value by key (optional default return) |
| `iter()` | `leveldb.iterator` – iterator |
| `put(key, value)` | – Store a key‑value pair |

---

### Object: `mqtt.mqtt`

| Method | Description |
|--------|-------------|
| `configure(server_uri, client_id)` | Create/replace the internal MQTT async client |
| `connect(username, password, clean_session, keep_alive)` | Connect to broker (blocking; runs on worker thread) |
| `disconnect()` | Disconnect from broker (blocking) |
| `is_connected()` | Returns true if currently connected |
| `poll()` | Drain queued MQTT messages and invoke `on_message`; returns number of delivered messages |
| `publish(topic, payload, qos, retained)` | Publish a message (blocking; runs on worker thread) |
| `set_callbacks(on_message, on_connect, on_disconnect, on_error)` | Set script callbacks (invoked by `poll()`) |
| `subscribe(topic, qos)` | Subscribe to a topic (blocking; runs on worker thread) |

---

### Object: `nanogui.context`

| Attribute | Type |
|-----------|------|
| N/A |  |
| **Methods** |
| `fps()` | Get/set FPS for non‑fullscreen windows |
| `nvgArc(center, radius, a0, a1, dir)` | Add an arc to the current path |
| `nvgArcTo(p1, p2, radius)` | Add an arc to the current path |
| `nvgBeginPath()` | Begin a new NanoVG path on the current screen |
| `nvgBezierTo(c1, c2, p)` | Add a cubic Bezier curve |
| `nvgCircle(center, radius)` | Add a circle |
| `nvgEllipse(center, radius)` | Add an ellipse |
| `nvgFill()` | Fill the current NanoVG path |
| `nvgFillColor(color)` | Set the fill color |
| `nvgIntersectScissor(pos, size)` | Intersect the current scissor rectangle |
| `nvgLineTo(p)` | Add a line |
| `nvgMoveTo(x)` | Move the current NanoVG path |
| `nvgQuadTo(c, p)` | Add a quadratic Bezier curve |
| `nvgRect(pos, size)` | Add a rectangle |
| `nvgRoundedRect(pos, size, radius)` | Add a rounded rectangle |
| `nvgRoundedRectVarying(pos, size, r0, r1, r2, r3)` | Add a rounded rectangle with varying radii |
| `nvgScale(scale)` | Scale the current transform |
| `nvgScissor(pos, size)` | Set the scissor rectangle |
| `nvgStroke()` | Stroke the current NanoVG path |
| `nvgStrokeColor(color)` | Set the stroke color |
| `nvgTranslate(delta)` | Translate the current transform |
| `screen(width, height, caption, resizable, maximized, fullscreen, depth_buffer, stencil_buffer, float_buffer, gl_major, gl_minor)` | Create a screen with optional parameters |

---

### Object: `nanogui.theme`

| Attribute | Type |
|-----------|------|
| All attributes are variables (e.g., `border_dark`, `color_icons`, …) |  |

| Method | Description |
|--------|-------------|
| `from_json(json)` | Apply a JSON theme definition to this theme |
| `to_json()` | Serialize the theme into a JSON object |

---

### Object: `nanogui.widget`

| Attribute | Type |
|-----------|------|
| `child_count`, `cursor`, `enabled`, `focused`, `font_size`, `has_font_size`, `icon_extra_scale`, `parent`, `tooltip`, `visible` | variables |

| Method | Description |
|--------|-------------|
| **Creation** |
| `button(caption, icon)` | Create a child Button |
| `canvas(samples, has_depth_buffer, has_stencil_buffer, clear)` | Create a child Canvas |
| `checkbox(caption)` | Create a child CheckBox |
| `colorpicker(color)` | Create a child ColorPicker |
| `colorwheel(color)` | Create a child ColorWheel |
| `combobox()` | Create a child ComboBox |
| `graph(caption)` | Create a child Graph |
| `imagepanel()` | Create a child ImagePanel |
| `imageview()` | Create a child ImageView |
| `label(caption, font, font_size)` | Create a child Label |
| `messagedialog(type, title, message, button_text, alt_button_text, alt_button)` | Create a child MessageDialog |
| `slider()` | Create a child Slider |
| `tabwidget(font)` | Create a child TabWidget |
| `textarea()` | Create a child TextArea |
| `textbox(value)` | Create a child TextBox |
| `toolbar()` | *Not listed in source (placeholder)* |
| `tooltip(text, tooltip_style)` | *Not listed in source (placeholder)* |
| **Layout** |
| `` | `layout()` – Get layout |
| `perform_layout()` | Recompute widget layout |
| **Positioning / Size** |
| `absolute_position()` | Get absolute widget position |
| `position()` | Get the widget position |
| `size()` | Get window size in pixels |
| `width()` | Get widget width |
| `height()` | Get widget height |
| `pos_set(pos)` | *Not listed* |
| `size_set(size)` | *Not listed* |
| `fixed_set(size)` | *Not listed* |
| `fixed_get()` | *Not listed* |
| `anchor_set(dir)` | *Not listed* |
| `add_child(child)` | Add a child widget |
| `add_child_at(index, child)` | Add a child widget at index |
| `child_at(index)` | Get child at index |
| `child_index(child)` | Get index of child widget |
| `remove_child(child)` | Remove a child widget |
| `remove_child_at(index)` | Remove child at index |
| `preferred_size()` | Get preferred size using the current screen |
| `fixed_size()` | Get the fixed size |
| **Visibility** |
| `visible_recursive()` | Check visibility including parents |
| **Hierarchy** |
| `parent()` | Get parent screen |
| `screen()` | Get parent screen |
| **Appearance** |
| `on_draw(callback)` | Set or clear the draw callback |
| `on_focus(callback)` | Set or clear the focus callback |
| `on_keyboard(callback)` | Set or clear the keyboard callback |
| `on_keyboard_character(callback)` | Set or clear the keyboard character callback |
| `on_mouse_button(callback)` | Set or clear mouse button callback |
| `on_mouse_drag(callback)` | Set or clear mouse drag callback |
| `on_mouse_enter(callback)` | Set or clear mouse enter/leave callback |
| `on_mouse_motion(callback)` | Set or clear mouse motion callback |
| `on_scroll(callback)` | Set or clear scroll callback |
| **Screen Interaction** |
| `draw_all()` | Render the screen and all widgets |
| `redraw()` | Request a redraw |
| `perform_layout()` | Perform layout using the current screen |
| **Utility** |
| `clear()` | Clear the framebuffer |
| `draw_setup()` | Prepare rendering state |
| `draw_teardown()` | Finalize rendering |
| `find_widget(p)` | Find widget at position |
| `nvg_begin_path()` | *Method name not in source (placeholder)* |
| `nvg_fill()` | *Method name not in source (placeholder)* |

*(Only methods explicitly documented in the source were included.)*

---

### Object: `shizonet.artnet_device`

| Attribute | Type |
|-----------|------|
| `ip`, `mac`, `name`, `online`, `type` | variables |

*No methods documented.*

---

### Object: `shizonet.client`

| Attribute | Type |
|-----------|------|
| `artnet_sync`, `enabled`, `ip`, `mac`, `name` | variables |

| Method | Parameters | Description |
|--------|------------|-------------|
| `get` | `command: string`, `value: object`, `timeout: int` | Send a GET command to a device, optionally with payload and timeout, and return the device's response |
| `get_all` | `command: string`, `data: int/float/string/json/none`, `callback: function`, `timeout: int` | Send a GET command to all connected devices, optionally with payload, callback, and timeout. Returns the number of devices that accepted the command |
| `on_command` | `cmd: string`, `func: function` | Register a callback for the specified command |
| `on_connect` | `function: function` | Register a function to be invoked for each new client connection |
| `on_disconnect` | `callback: function` | Register a callback to be invoked when the server disconnects |
| `on_get` | `cmd: string`, `func: function` | Register a handler for a request command |
| `on_stream` | `cmd: string`, `func: function` | Register a stream handler for a command |
| `send_osc` | `ip: string`, `config: object`, `port: int` (default 8000) | Send OSC message(s) described by a JSON object to the specified IP address and port |

---

### Object: `shizonet.device`

| Attribute | Type |
|-----------|------|
| `ip`, `mac`, `name`, `online`, `type` | variables |

| Method | Parameters | Description |
|--------|------------|-------------|
| `fetch` | `command: string`, `value: object`, `timeout: int` | Send a FETCH command to a device, optionally with payload and timeout, and return the device's response |
| `get` | `command: string`, `value: object`, `timeout: int` | Send a GET command to a device, optionally with payload and timeout, and return the device's response |
| `get_static_buffer_count` | – | Get the total number of static buffers in the device |
| `get_static_buffer_desc` | `identifier: int|string` | Retrieve description and setup of a static buffer by index or name |
| `get_static_buffer_names` | – | Retrieve names and details of static buffers in the device |
| `send` | `command: string`, `data: object`, `timeout: int`, `wait_finish: bool` | Send a command with optional payload and timeout over a reliable connection, optionally waiting for the operation to finish before resuming the script task |
| `send_fast` | `command: string`, `data: object` | Send a command with accompanying data over an unreliable network connection |
| `send_queue` | `command: string`, `data: object`, `timeout: int`, `wait_finish: bool` | Send a command with optional data via a queued reliable connection |

---

### Object: `shizonet.server`

| Attribute | Type |
|-----------|------|
| `artnet_sync`, `enabled`, `ip`, `mac`, `name` | variables |

| Method | Parameters | Description |
|--------|------------|-------------|
| `get` | `command: string`, `value: object`, `timeout: int` | *Same description as client get* |
| `get_all` | `command: string`, `data: int/float/string/json/none`, `callback: function`, `timeout: int` | *Same as client get_all* |
| `on_command` | `cmd: string`, `func: function` | *Same as client on_command* |
| `on_connect` | `function: function` | *Same as client on_connect* |
| `on_disconnect` | `callback: function` | *Same as client on_disconnect* |
| `on_get` | `cmd: string`, `func: function` | *Same as client on_get* |
| `on_stream` | `cmd: string`, `func: function` | *Same as client on_stream* |
| `send_osc` | `ip: string`, `config: object`, `port: int` (default 8000) | *Same as client send_osc* |

---

### Object: `std.json`

| Method | Parameters | Description |
|--------|------------|-------------|
| `all` | `filter: function|string` | Returns true if all entries match substring or callback |
| `any` | `filter: function|string` | Returns true if any entry matches substring or callback |
| `append` | `other: json`, `overwrite: bool` | Append another JSON object into this one (optional overwrite) |
| `combine_string` | `separator: string` | Combine string values with optional separator |
| `compact_string` | – | Convert JSON object to compact string representation |
| `copy` | – | Deep copy of the JSON object |
| `erase` | `key: string` | Removes a key or index from a JSON object |
| `filter` | `filter: function|string` | Filter entries by callback or key substring |
| `filter_key` | `filter: string` | Filter keys by substrings |
| `filter_value` | `filter: string` | Return new JSON containing only strings whose values include the substring |
| `foreach` | `callback: function` | Iterate over each key/value, returning true to include entry in a new JSON |
| `from_string` | `json: string` | Parse JSON from string |
| `has` | `key: string` | Checks if a key exists |
| `key` | `index: int` | Return key at specified index from a JSON object |
| `map` | `callback: function` | Return new JSON where each value is replaced by callback result |
| `merge` | `other: json`, `overwrite: bool` | Merge another JSON object (optional overwrite) |
| `push` | `value: object` | Add value to JSON container |
| `push_back` | `value: object` | Add value to JSON container (same as push) |
| `reduce` | `callback: function`, `initial: any` | Reduce entries into a single value |
| `remove` | `key: string` | Removes a key or index from a JSON object |
| `rsort` | – | Sort entries by key descending, keeping keyless entries at the end |
| `size` | – | Returns number of elements in an array or keys in an object |
| `sort` | – | Sort JSON entries by key (case‑insensitive) |
| `sort_reverse` | – | Sort entries by key descending, keyless at end |
| `string` | `compact: int` | Convert JSON object to its string representation (compact or pretty‑printed) |

---

### Object: `std.string`

| Method | Description |
|--------|-------------|
| `center(width)` | Center the string within specified width using padding characters |
| `contains(sub)` | Check if string contains substring |
| `empty()` | Check if string is empty (returns 1 if true, 0 otherwise) |
| `ends(suffix)` | Check if string ends with specified suffix |
| `extract(left)` | Extract substring between specified left and right delimiters |
| `find(substring)` | Find the position of a substring |
| `find_first_not_of(chars)` | Find first character not in specified set |
| `find_first_of(chars)` | Find first occurrence of any character from the set |
| `find_last_not_of(chars)` | Find last character not in specified set |
| `find_last_of(chars)` | Find last occurrence of any character from the set |
| `length()` | Retrieve the length of the string |
| `ljust(width)` | Left‑justify the string with padding |
| `lowercase()` | Convert string to lowercase |
| `lowercase_inplace()` | Convert string to lowercase in‑place |
| `ltrim()` | Remove leading whitespace |
| `ltrim_inplace()` | Remove leading whitespace in‑place |
| `regex_escape()` | Escape regex metacharacters |
| `regex_findall(pattern)` | Find all matches of a regex pattern |
| `regex_match(pattern)` | Check if the string matches a regex pattern |
| `regex_replace(pat, replacement)` | Replace all occurrences of a regex pattern |
| `regex_replace_inplace(pattern, replacement)` | Replace in‑place |
| `regex_search(pattern)` | Search for a regex pattern and return start position |
| `regex_split(pattern)` | Split string using regex and return JSON array |
| `removechars(chars)` | Remove all occurrences of specified characters |
| `removecharsexcept(chars)` | Remove all characters except those specified |
| `removeprefix(prefix)` | Remove a prefix if present |
| `removesuffix(suffix)` | Remove a suffix if present |
| `replace(search)` | Replace all occurrences of a substring |
| `replace_first(search)` | Replace first occurrence of a substring |
| `replace_inplace(search)` | Replace all occurrences in‑place |
| `reverse()` | Return a reversed copy |
| `reverse_inplace()` | Reverse string in‑place |
| `rfind(sub)` | Find last occurrence of substring (searches backwards) |
| `rjust(width)` | Right‑justify string with padding |
| `rtrim()` | Remove trailing whitespace |
| `rtrim_inplace()` | Remove trailing whitespace in‑place |
| `size()` | Retrieve the size of the string |
| `split(delim)` | Split string into parts using delimiter |
| `starts(prefix)` | Check if string starts with specified prefix |
| `strip()` | Remove leading and trailing whitespace |
| `strip_inplace()` | Remove leading and trailing whitespace in‑place |
| `substr(start)` | Extract substring (supports Python‑style negative indices) |
| `substr_inplace(start)` | Extract substring and modify original string in‑place |
| `trim()` | Remove leading and trailing whitespace |
| `trim_inplace()` | Remove leading and trailing whitespace in‑place |
| `uppercase()` | Convert string to uppercase |
| `uppercase_inplace()` | Convert string to uppercase in‑place |

---

### Object: `std.thread`

| Method | Description |
|--------|-------------|
| `join()` | Join active tasks and wait for their completion |
| `run(... )` | Execute callback function asynchronously as a task |

---

### Object: `subprocess.process`

| Method | Description |
|--------|-------------|
| `exited()` | Returns true if the process exited |
| `kill()` | Force kill the process (SIGKILL / TerminateProcess) |
| `pid()` | Get process id |
| `poll()` | Check process status; returns return code or none if running |
| `returncode()` | Get cached return code (or none if not finished) |
| `start(args, cwd, shell, env)` | Start a subprocess (similar to Python subprocess.Popen) |
| `stop()` | Send Ctrl‑C / SIGINT to request graceful shutdown |
| `terminate()` | Request process termination (SIGTERM) |
| `wait()` | Wait until process exits and return its exit code |

---

### Object: `telegram.bot`

| Attribute | Type |
|-----------|------|
| `on_any_message` | variable |

| Method | Parameters | Description |
|--------|------------|-------------|
| `ban_chat_member` | `chatid: int`, `userid: int`, `until_date: int`, `revoke_messages: int` | Ban a user from a chat |
| `copy_message` | `to_chatid: int`, `from_chatid: int`, `msgid: int` | Copy a message without forwarding tag |
| `delete_message` | `chatid: int`, `msgid: int` | Delete a message |
| `edit_caption` | `chatdata: object`, `caption: string` | Edit a message caption |
| `edit_message` | `chatdata: object`, `text: string` | Edit an existing message text |
| `edit_reply_markup` | `chatdata: object`, `buttons: object` | Edit message reply markup |
| `forward_message` | `to_chatid: int`, `from_chatid: int`, `msgid: int` | Forward a message |
| `get_chat` | `chatid: int` | Get information about a chat |
| `get_chat_administrators` | `chatid: int` | Get a list of chat administrators |
| `get_chat_member` | `chatid: int`, `userid: int` | Get information about a chat member |
| `get_chat_member_count` | `chatid: int` | Get the number of members in a chat |
| `leave_chat` | `chatid: int` | Leave a chat |
| `promote_chat_member` | `chatid: int`, `userid: int`, `rights: object` | Promote a user to admin in a chat |
| `restrict_chat_member` | `chatid: int`, `userid: int`, `permissions: object`, `until_date: int` | Restrict a chat member's permissions |
| `send` | `chatdata: object`, `options: object` | Send a message through Telegram (optional buttons/options) |
| `send_animation` | `chatdata: object`, `animation: string`, `options: object` | Send an animation (GIF) |
| `send_audio` | `chatdata: object`, `audio: string`, `options: object` | Send an audio file |
| `send_chat_action` | `chatid: int`, `action: string`, `threadid: int` | Send a chat action (typing, uploading, etc.) |
| `send_choice` | `chatdata: object`, `options: object` | Send a message with inline keyboard buttons |
| `send_document` | `chatdata: object`, `document: string`, `options: object` | Send a document |
| `send_location` | `chatdata: object`, `latitude: float`, `longitude: float`, `options: object` | Send a location */
| `send_photo` | `chatdata: object`, `photo: string`, `options: object` | Send a photo |
| `send_sticker` | `chatdata: object`, `sticker: string`, `options: object` | Send a sticker |
| `send_video` | `chatdata: object`, `video: string`, `options: object` | Send a video |
| `send_video_note` | `chatdata: object`, `video_note: string`, `options: object` | Send a video note (circular video) |
| `send_voice` | `chatdata: object`, `voice: string`, `options: object` | Send a voice message |
| `set_chat_administrator_custom_title` | `chatid: int`, `userid: int`, `title: string` | Set a custom title for an admin |
| `unban_chat_member` | `chatid: int`, `userid: int`, `only_if_banned: int` | Unban a user from a chat |

---

### Object: `testmodule.test_object`

| Attribute | Type |
|-----------|------|
| `test_member` | variable |
| `testint` | variable |

| Method | Description |
|--------|-------------|
| `call_cb()` | test fn |
| `test_auto_fn()` | A test function registered via automatic binding |
| `test_cb()` | test fn |
| `test_fn()` | test fn |
| `test_thread()` | test fn |

---

### Object: `webserver.http_server`

| Attribute | Type |
|-----------|------|
| `port` | variable |
| `running` | variable |

| Method | Parameters | Description |
|--------|------------|-------------|
| `init` | `port: int` | Initialize HTTP server with port |
| `route` | `method: string`, `path: string`, `callback: function` | Register a route handler |
| `start` | – | Start the HTTP server |
| `static` | `url_pattern: string`, `file_or_directory: string` | Register a static file route |
| `stop` | – | Stop the HTTP server |

---

### Object: `webserver.https_server`

| Attribute | Type |
|-----------|------|
| `port` | variable |
| `running` | variable |

| Method | Parameters | Description |
|--------|------------|-------------|
| `init` | `port: int`, `cert_file: string`, `key_file: string` | Initialize HTTPS server with port and certificate files |
| `route` | `method: string`, `path: string`, `callback: function` | Register a route handler |
| `start` | – | Start the HTTPS server |
| `static` | `url_pattern: string`, `file_or_directory: string` | Register a static file route |
| `stop` | – | Stop the HTTPS server |

---

### Object: `zip.file`

| Method | Parameters | Description |
|--------|------------|-------------|
| `add` | `path: string` | Add a file to the zip archive with specified path and content |
| `add_file` | `path: string` | Adds a file to the zip archive with specified content |
| `save` | `path: string` | Save zip file to specified path |