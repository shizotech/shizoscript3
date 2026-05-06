# ShizoScript API Reference

This file lists EVERY available function, class, and method. Do NOT use any function not listed here.

Format: `function(param, param?) -> return` where `?` means optional.

---

## PREPROCESSOR

    #include "path"           — Include another .shio source file (extension auto-appended)
    #define NAME value        — Preprocessor text substitution (can span lines with trailing \)
    __FILE__                  — Replaced with current file path string at compile time
    __LINE__                  — Replaced with current line number string at compile time
    __DIR__                   — Replaced with current file directory string at compile time

---

## NUMBER LITERALS

    42                        — Decimal integer
    3.14                      — Float
    3.14f                     — Float with suffix
    1.5e10                    — Scientific notation
    0xFF                      — Hexadecimal
    0b1010                    — Binary
    0o77                      — Octal

---

## NAMESPACE: std

### Constants

    std.MB_OK = 0
    std.MB_OKCANCEL = 1
    std.MB_YESNOCANCEL = 3
    std.MB_YESNO = 4
    std.MB_RETRYCANCEL = 5
    std.MB_ICONERROR = 16
    std.MB_ICONWARNING = 48
    std.MB_ICONINFORMATION = 64

### Functions

    std.print(values...) -> string
        Print values to console. Space-separated. Returns combined string.

    std.cout(values...) -> None
        Print to stdout directly, no newline appended.

    std.error(values...) -> string
        Print error message.

    std.warn(values...) -> string
        Print warning message.

    std.runtime_error(values...) -> None
        Raise a runtime error and halt execution.

    std.len(value) -> int
        Return size of container, string, or object.

    std.count(value) -> int
        Alias for len().

    std.sleep(milliseconds) -> None
        Pause execution (async-aware, does not block other tasks).

    std.millis() -> int
        Current time in milliseconds since epoch.

    std.timestamp() -> string
        Current date/time as "DD-MM-YYYY HH:MM:SS".

    std.int(value) -> int
        Convert value to integer.

    std.float(value) -> float
        Convert value to float.

    std.vtype(value) -> string
        Get type name: "int", "float", "string", "json", or object type name.

    std.vaddress(value) -> int
        Get internal memory address of a variable.

    std.is_function(value) -> int
        Returns 1 if value is a function, 0 otherwise.

    std.is_class(value, classtype?) -> int
        Check if value is a class instance. Optional classtype string to match specific class.

    std.is_json(value) -> int
        Returns 1 if value is a JSON object.

    std.is_list(value) -> int
        Returns 1 if value is a list (JSON array).

    std.is_string(value) -> int
        Returns 1 if value is a string.

    std.free(object) -> None
        Manually release/delete an object or class instance.

    std.import(module) -> int
        Import an external module by name or path. Returns 1 on success.

    std.input(prompt?) -> string
        Read a line from stdin. Optional prompt displayed first.

    std.system(command, capture?, print_output?) -> int|string
        Execute shell command. Returns exit code, or captured output if capture=1.

    std.system_path(path) -> string
        Expand environment variables and normalize a filesystem path.

    std.indentation(text) -> int
        Calculate indentation level. Spaces=1, tabs=4.

    std.argc() -> int
        Number of command-line arguments.

    std.argv(index) -> string
        Get command-line argument by zero-based index.

    std.wd() -> string
        Get current working directory.

    std.cd(path) -> None
        Change current working directory.

    std.os_platform() -> string
        Get OS name: "Windows", "Linux", etc.

    std.has_admin_privilege() -> int
        Returns 1 if running as admin/root.

    std.local_executable() -> string
        Path to the currently running executable.

    std.hideconsole() -> None
        Hide the console window (Windows only).

    std.messagebox(text, caption?, buttons?) -> int
        Show a native message box (Windows). Use MB_* constants for buttons.

    std.web_get(url) -> string
        Simple HTTP GET, returns response body.

### Class: std.json

Constructor:

    j = std.json()                          — Empty JSON object
    j = std.json(json_string)               — Parse JSON string
    j = std.json(json_string, suppress)     — Parse with error suppression

Methods:

    .size() -> int                          — Number of elements/keys
    .has(key) -> int                        — Check if key exists (1/0)
    .key(index) -> string                   — Get key name at index (negative from end)
    .push(value) -> None                    — Append value (alias: push_back)
    .push_back(value) -> None               — Append value
    .push_cyclic(value, max) -> None        — Append, remove oldest if size > max
    .erase(key) -> int                      — Remove by key or index (alias: remove)
    .remove(key) -> int                     — Remove by key or index
    .resize(size) -> None                   — Resize list
    .append(other, overwrite?) -> None      — Merge another JSON (overwrite default true)
    .merge(other, overwrite?) -> None       — Same as append
    .copy() -> json                         — Deep copy
    .string(compact?) -> string             — To JSON string (0=compact, else pretty)
    .compact_string() -> string             — Minified JSON string
    .from_string(json) -> None              — Parse JSON string into this object
    .combine_string(separator?) -> string   — Concatenate all values with separator
    .sort() -> None                         — Sort by key ascending
    .rsort() -> None                        — Sort by key descending (alias: sort_reverse)
    .sort_by(key, descending?) -> None      — Sort by child key
    .filter(filter) -> json                 — Filter by callback(key,val)->bool or key substring
    .filter_key(filter) -> json             — Filter by key substring(s)
    .filter_value(filter) -> json           — Filter by value substring
    .foreach(callback) -> json              — Iterate: callback(key, value) -> bool
    .map(callback) -> json                  — Transform: callback(key, value) -> new_value
    .reduce(callback, initial) -> any       — Reduce: callback(acc, key, value) -> new_acc
    .any(filter) -> int                     — True if any entry matches
    .all(filter) -> int                     — True if all entries match
    .unique() -> json                       — Remove duplicates
    .to_list() -> json                      — Convert to keyless list

### Class: std.string

Strings are native types. All string values have these methods:

    .length() -> int                        — Character count (alias: size)
    .size() -> int                          — Character count
    .contains(sub) -> int                   — 1 if substring found
    .empty() -> int                         — 1 if empty
    .find(sub) -> int                       — Position of sub, -1 if not found
    .rfind(sub) -> int                      — Last occurrence position
    .find_first_of(chars) -> int            — First position of any char in set
    .find_last_of(chars) -> int             — Last position of any char in set
    .find_first_not_of(chars) -> int        — First char not in set
    .find_last_not_of(chars) -> int         — Last char not in set
    .starts(prefix) -> int                  — 1 if starts with prefix
    .ends(suffix) -> int                    — 1 if ends with suffix
    .substr(start, length?) -> string       — Substring (negative start from end)
    .split(delim, max?, strip?) -> json     — Split into array
    .replace(search, replace) -> string     — Replace all occurrences
    .replace(map) -> string                 — Map-based replacement [old=new, ...]
    .replace_first(search, replace) -> string
    .replace_inplace(search, replace) -> None
    .uppercase() -> string
    .lowercase() -> string
    .uppercase_inplace() -> None
    .lowercase_inplace() -> None
    .trim() -> string                       — Remove leading/trailing whitespace
    .ltrim() -> string
    .rtrim() -> string
    .strip() -> string                      — Alias for trim
    .trim_inplace() -> None
    .ltrim_inplace() -> None
    .rtrim_inplace() -> None
    .strip_inplace() -> None
    .rstrip_lines() -> string               — Strip trailing whitespace per line
    .reverse() -> string
    .reverse_inplace() -> None
    .center(width) -> string
    .ljust(width) -> string
    .rjust(width) -> string
    .removechars(chars) -> string
    .removecharsexcept(chars) -> string
    .removeprefix(prefix) -> string
    .removesuffix(suffix) -> string
    .extract(left, right) -> string         — Extract between delimiters
    .regex_match(pattern) -> int
    .regex_search(pattern) -> int
    .regex_findall(pattern) -> json
    .regex_replace(pattern, repl) -> string
    .regex_replace_inplace(pattern, repl) -> None
    .regex_split(pattern) -> json
    .regex_escape() -> string
    .substr_inplace(start, length?) -> None

### Class: std.thread

Constructor:

    t = std.thread(callback?)

Methods:

    .run(args...) -> None                   — Execute callback async with args
    .join() -> None                         — Wait for all tasks to finish

### Class: std.module

Constructor:

    mod = std.module()

Methods:

    .load_file(path) -> None                — Load and execute a .shio file
    .load_code(code, source_path?) -> None  — Load from source string
    .has(name) -> int                       — Check if global name exists in module
    .get(name) -> any                       — Get global variable/function from module
    .call(name, args...) -> any             — Call a function in the module

---

## NAMESPACE: fileio

### Functions

    fileio.exists(path) -> int
    fileio.is_file(path) -> int
    fileio.is_directory(path) -> int
    fileio.is_within_dir(base_dir, path) -> int
    fileio.read_text(path) -> string            — Alias: read_string
    fileio.write_text(path, data) -> None       — Alias: write_string
    fileio.read_json(path) -> json
    fileio.write_json(path, data) -> None
    fileio.read_file(path) -> buffer            — Binary read
    fileio.write_file(path, data) -> int        — Binary write, returns 1 on success
    fileio.files(path, recursive?) -> json      — List files (recursive default true)
    fileio.dirs(path, recursive?) -> json       — List directories
    fileio.find_file(path) -> string            — Resolve absolute path
    fileio.copy(src, dest) -> None
    fileio.copy_if_changed(src, dest) -> None
    fileio.move(src, dest) -> None
    fileio.rename(src, dest) -> None
    fileio.remove(path) -> None                 — path can be string or list of strings
    fileio.mkdir(path) -> None
    fileio.file_name(path) -> string            — Extract filename from path
    fileio.file_dir(path) -> string             — Extract directory from path
    fileio.pure_name(path) -> string            — Filename without extension

### Class: fileio.container

Sandboxed filesystem. All paths relative to root. Prevents directory traversal.

Constructor:

    fs = fileio.container(root_path)

Methods: Same as fileio namespace functions (read_text, write_text, etc.) plus:

    .set(path) -> None                      — Change root directory
    .is_valid(path) -> int                  — Check if path stays within root
    .get_size() -> int                      — Total bytes tracked
    .get_limit() -> int                     — Get size limit (0=unlimited)
    .set_limit(bytes) -> None               — Set max total size

---

## NAMESPACE: math

### Constants

    math.PI = 3.141592653589793

### Functions

    math.sin(x) -> float
    math.cos(x) -> float
    math.tan(x) -> float
    math.asin(x) -> float
    math.acos(x) -> float
    math.atan(x) -> float
    math.atan2(y, x) -> float
    math.sqrt(x) -> float
    math.cbrt(x) -> float
    math.abs(x) -> float
    math.floor(x) -> float
    math.ceil(x) -> float
    math.round(x) -> float
    math.sign(x) -> float                  — Returns +1, 0, or -1
    math.clamp(x, min, max) -> float
    math.min(values...) -> float
    math.max(values...) -> float
    math.pow(base, exp) -> float
    math.exp(x) -> float                   — e^x
    math.log(x) -> float                   — Natural logarithm
    math.log2(x) -> float
    math.log10(x) -> float
    math.fract(x) -> float                 — Fractional part
    math.lerp(a, b, t) -> float            — Linear interpolation
    math.smoothstep(edge0, edge1, x) -> float
    math.rand() -> float                   — Random in [0,1]

---

## NAMESPACE: curl

### Class: curl.curl

Constructor:

    http = curl.curl()

Methods:

    .get(url, headers?, timeout_ms?) -> json
        Returns: [ok=int, http_code=int, body=string, content_type=string]

    .post(url, payload, headers?, timeout_ms?) -> json
        Same return format as get.

    .delete(url, headers?, timeout_ms?) -> json
        Same return format.

    .request(method, url, body?, headers?, timeout_ms?, binary?) -> json
        Generic request. method: "GET","POST","PUT","DELETE","PATCH", etc.

    .start_stream(method, url, body?, headers?, timeout_ms?) -> None
        Start streaming HTTP request.

    .poll_stream() -> string|None
        Drain pending stream data.

    .stop_stream() -> int
        Abort streaming. Returns 1 if stopped.

    .last_error() -> string
    .version() -> string

Headers format: [Header-Name="value", ...]

---

## NAMESPACE: webserver

### Class: webserver.http_server

Constructor:

    srv = webserver.http_server()

Properties: port, running

Methods:

    .init(port) -> None
    .route(method, path, callback) -> None
        method: "GET","POST","PUT","DELETE","*"
        callback receives request object, must return [status=int, body=string, content_type=string]
    .static(url_pattern, file_or_dir) -> None
    .start() -> None
    .stop() -> None

### Class: webserver.https_server

Same as http_server but:

    .init(port, cert_file, key_file) -> None

---

## NAMESPACE: subprocess

### Class: subprocess.process

Constructor:

    proc = subprocess.process()

Methods:

    .start(args, cwd?, shell?, env?) -> None
        args: list of strings. If shell=true, single string in args[0].
        env: ["KEY=VALUE", ...]
    .pid() -> int
    .poll() -> int|None                     — Return code if exited, None if running
    .wait() -> int                          — Block until exit, return code
    .exited() -> int                        — 1 if exited
    .returncode() -> int|None
    .stop() -> None                         — Send Ctrl+C / SIGINT
    .terminate() -> None                    — SIGTERM / TerminateProcess
    .kill() -> None                         — SIGKILL / force kill

---

## NAMESPACE: mqtt

### Class: mqtt.mqtt

Constructor:

    client = mqtt.mqtt()

Methods:

    .configure(server_uri, client_id) -> None
    .connect(username?, password?, clean_session?, keep_alive?) -> None
    .disconnect() -> None
    .is_connected() -> int
    .subscribe(topic, qos?) -> None
    .publish(topic, payload, qos?, retained?) -> None
    .set_callbacks(on_message?, on_connect?, on_disconnect?, on_error?) -> None
        on_message: callback(topic, payload, qos, retained)
        on_connect: callback()
        on_disconnect: callback()
        on_error: callback(error_string)
    .poll() -> int                          — Drain queued messages, returns count

---

## NAMESPACE: telegram

### Class: telegram.bot

Constructor:

    bot = telegram.bot(bot_token)

Properties: on_any_message (callback)

Sending methods (chatdata = message object from callback):

    .send(chatdata, text, options?) -> None
    .send_choice(chatdata, options) -> None
        options: [text="prompt", buttons=[[text="A", callback_data="a"], ...]]
    .send_photo(chatdata, photo, options?) -> None
    .send_document(chatdata, document, options?) -> None
    .send_audio(chatdata, audio, options?) -> None
    .send_voice(chatdata, voice, options?) -> None
    .send_video(chatdata, video, options?) -> None
    .send_video_note(chatdata, video_note, options?) -> None
    .send_animation(chatdata, animation, options?) -> None
    .send_sticker(chatdata, sticker, options?) -> None
    .send_location(chatdata, latitude, longitude, options?) -> None
    .send_chat_action(chatid, action, threadid?) -> None

Message management:

    .edit_message(chatdata, text) -> None
    .edit_caption(chatdata, caption) -> None
    .edit_reply_markup(chatdata, buttons?) -> None
    .delete_message(chatid, msgid) -> None
    .forward_message(to_chatid, from_chatid, msgid) -> None
    .copy_message(to_chatid, from_chatid, msgid) -> None

Chat admin:

    .get_chat(chatid) -> json
    .get_chat_member(chatid, userid) -> json
    .get_chat_member_count(chatid) -> int
    .get_chat_administrators(chatid) -> json
    .ban_chat_member(chatid, userid, until_date?, revoke?) -> None
    .unban_chat_member(chatid, userid, only_if_banned?) -> None
    .restrict_chat_member(chatid, userid, permissions, until_date?) -> None
    .promote_chat_member(chatid, userid, rights?) -> None
    .set_chat_administrator_custom_title(chatid, userid, title) -> None
    .leave_chat(chatid) -> None

---

## NAMESPACE: shizonet

### Class: shizonet.server

Constructor:

    srv = shizonet.server(node_name, port?)

Properties: enabled, ip, mac, name, artnet_sync

Methods:

    .on_connect(callback) -> None               — callback(device)
    .on_disconnect(callback) -> None            — callback(device)
    .on_command(cmd, callback) -> None           — callback(device, data)
    .on_get(cmd, callback) -> None               — callback(device, data) -> return_value
    .on_stream(cmd, callback) -> None            — callback(device, data)
    .get(command, value?, timeout?) -> any
    .get_all(command, data?, callback?, timeout?) -> int
    .send_osc(ip, config, port?) -> None

### Class: shizonet.client

Same interface as shizonet.server.

### Class: shizonet.device

Properties: name, ip, mac, online, type

Methods:

    .send(command, data?, timeout?, wait_finish?) -> None
    .send_fast(command, data) -> None
    .send_queue(command, data?, timeout?, wait_finish?) -> None
    .get(command, value?, timeout?) -> any
    .fetch(command, value?, timeout?) -> any

---

## NAMESPACE: eigen

### Vector Types

    eigen.vec2i()  eigen.vec2f()  eigen.vec2d()    — 2D (x,y)
    eigen.vec3i()  eigen.vec3f()  eigen.vec3d()    — 3D (x,y,z)
    eigen.vec4i()  eigen.vec4f()  eigen.vec4d()    — 4D (x,y,z,w)

Properties: x, y, z (3D+), w (4D)

Methods (all types):

    .set(x, y, ...) -> None
    .length() -> float
    .length_sq() -> float
    .normalize() -> None                    — In-place
    .normalized() -> vec                    — Returns copy
    .dot(other) -> float
    .distance(other) -> float
    .distance_sq(other) -> float
    .angle(other) -> float                  — Radians
    .lerp(other, t) -> vec
    .clamp(min, max) -> vec
    .min(other) -> vec
    .max(other) -> vec
    .abs() -> vec
    .is_zero(epsilon?) -> int
    .equals(other, epsilon?) -> int
    .to_string(epsilon?) -> string

---

## NAMESPACE: nanogui

### Class: nanogui.context

Constructor:

    gui = nanogui.context()

Methods:

    .screen(width?, height?, caption?, resizable?, maximized?, fullscreen?,
            depth_buffer?, stencil_buffer?, float_buffer?, gl_major?, gl_minor?) -> screen
    .fps() -> float

NanoVG drawing: nvgBeginPath, nvgRect, nvgCircle, nvgEllipse, nvgRoundedRect,
nvgMoveTo, nvgLineTo, nvgBezierTo, nvgQuadTo, nvgArcTo, nvgArc,
nvgFill, nvgStroke, nvgFillColor, nvgStrokeColor,
nvgScissor, nvgIntersectScissor, nvgTranslate, nvgScale

### Widget (base class for all GUI elements)

Properties: visible, enabled, focused, font_size, tooltip, cursor, child_count, parent

Geometry:

    .position() / .set_position(vec2i)
    .size() / .set_size(vec2i)
    .width() / .set_width(w) / .height() / .set_height(h)
    .fixed_size() / .set_fixed_size(vec2i)
    .absolute_position() -> vec2i
    .contains(point) -> int

Layout:

    .box_layout(orientation, alignment, margin, spacing)
    .group_layout(margin?, spacing?, group_spacing?, group_indent?)
    .grid_layout(orientation, resolution, alignment, margin, spacing)
    .perform_layout()

Widget factories (create children):

    .button(caption, icon?) -> widget
    .toolbutton(icon, caption?) -> widget
    .checkbox(caption) -> widget
    .label(caption, font?, font_size?) -> label
    .textbox(value?) -> widget
    .textarea() -> widget
    .slider(value, range?, highlight_range?, color?) -> slider
    .progressbar() -> widget
    .combobox() -> widget
    .colorpicker(color?) -> widget
    .colorwheel(color?) -> widget
    .graph(caption?) -> widget
    .imagepanel() -> widget
    .imageview() -> widget
    .canvas(samples?, depth?, stencil?, clear?) -> widget
    .tabwidget(font?) -> widget
    .popupbutton(caption, icon?) -> widget
    .popup() -> window
    .new_window(title?) -> window
    .vscrollpanel() -> vscroll
    .widget() -> widget
    .messagedialog(type, title, msg, btn?, alt_btn?, alt?) -> window

Events:

    .on_draw(callback)
    .on_mouse_button(callback(pos, button, down, modifiers) -> bool)
    .on_mouse_motion(callback(pos, rel, button, modifiers))
    .on_mouse_drag(callback(pos, rel, button, modifiers))
    .on_mouse_enter(callback(pos, enter))
    .on_scroll(callback(pos, rel))
    .on_keyboard(callback(key, scancode, action, modifiers))
    .on_keyboard_character(callback(codepoint))
    .on_focus(callback(focused))

### Screen (extends widget)

Properties: caption, background, pixel_ratio, frame_index, frame_time

Methods:

    .draw_all() / .draw_setup() / .draw_contents() / .draw_teardown()
    .clear() / .redraw() / .nvg_flush()
    .framebuffer_size() -> vec2i
    .set_size(size) / .size() -> vec2i
    .move_window(delta)
    .on_render(callback)

### Window (extends widget)

Properties: title, modal, movable, resizable

Methods: .center(), .dispose(), .button_panel()

### Slider

Properties: value, highlight_color

Methods:

    .range() / .set_range(vec2f)
    .highlighted_range() / .set_highlighted_range(vec2f)
    .on_change(callback(value))
    .on_final(callback(value))

### Label

Properties: caption, font, color

---

## NAMESPACE: zip

### Class: zip.file

Constructor:

    archive = zip.file()

Methods:

    .add(path, content) -> None             — Alias: add_file
    .save(path) -> None

---

## NAMESPACE: python

### Functions

    python.version() -> string
    python.last_error() -> string
    python.exec(code) -> int|None           — Returns 1 on success, None on error
    python.eval(expression) -> any          — Evaluate Python expression, return result
    python.call(module, function, args?) -> any
        args: JSON array of positional arguments
    python.import(module) -> string         — Returns short module name
    python.exec_file(path) -> int|None      — Returns 1 on success
    python.set_global(name, value) -> int   — Set var in Python __main__
    python.get_global(name) -> any          — Get var from Python __main__

Type mapping: int<->int, float<->float, string<->str, None<->None,
json_object<->dict, json_array<->list, buffer<->bytes

---

## NAMESPACE: shzdocs

### Functions

    shzdocs.get_all() -> json               — All registered documentation
    shzdocs.find_all(keyword) -> json       — Search docs by keyword
    shzdocs.load_all_modules() -> None      — Load all modules for doc search