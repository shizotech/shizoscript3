# Bundles - how a shizoscript build is published and installed

Audience: whoever runs `git_commit.shio` / `create_bundles_*.shio` and ships a release.
This file is the contract between the archives, the release assets and the installers.

## The three bundles

| Bundle | Archive in the tree | Installer | Installed to |
|---|---|---|---|
| Windows x64 | `bundles/windows_x64.zip` | `bundles/windows_x64/installer/__init__.shio` (Installer.exe) → `shzupdate.exe` + `shizotech/` | `%LOCALAPPDATA%\Shizoscript` |
| Linux x86_64 | `bundles/linux_x64.tar.gz` (+ `.sha256`) | `bundles/linux_x64/installer.sh` | `~/.local/shz` + `~/.local/bin/{shz,shzupdate}` |
| Linux aarch64 | `bundles/linux_arm64.tar.gz` (+ `.sha256`) | `bundles/linux_arm64/installer.sh` | same |

The linux tarballs are built with `tar -czf ... -C bundles/linux_<arch>/ .`, so they contain
`data/`, `examples/` **and `installer.sh`** - the installer inside an archive is the installer of
the build it was cut from. `shzupdate` on linux *is* that script (installed as
`~/.local/bin/shzupdate`), so shipping an archive ships its updater.

## Two hard walls on GitHub

| Wall | Limit | Consequence |
|---|---|---|
| push (pre-receive hook, `GH001`) | blob > **104 857 600 B** is rejected | a > 100 MiB archive can never be pushed in a commit |
| `raw.githubusercontent.com` | file > **100 000 000 B** is refused | the README links and `shzupdate` cannot install from the tree |

The linux archives are above both. So **the install source is a GitHub Releases asset, never the
file in the tree.** Assets cost nothing, have no 100 MiB wall, and are fetched with plain HTTPS:

```
https://github.com/shizotech/shizoscript3/releases/download/<tag>/<asset>
```

Asset names are exactly `linux_x64.tar.gz`, `linux_x64.tar.gz.sha256`, `linux_arm64.tar.gz`,
`linux_arm64.tar.gz.sha256`, `windows_x64.zip`, `windows_x64.zip.sha256`. The archives stay
gzip-tar / zip: the installers use `tar -xzf` and `Expand-Archive`, and an already installed
updater keeps doing exactly that, so a format change (xz, zstd) silently stops every existing
client from updating.

Consumers that carry the tag (4 places, keep them in sync):

| File | Line | What it points at |
|---|---|---|
| `bundles/linux_x64/installer.sh` | 11 | `BUNDLE_URL` (env override `SHZ_BUNDLE_URL`), sidecar = `$BUNDLE_URL.sha256` (line 168) |
| `bundles/linux_arm64/installer.sh` | 11 | same |
| `bundles/windows_x64/installer/shzupdate/__init__.shio` | 16 | `bundle_url` |
| `README.md` (UTF-16LE!) | install + update section | the download links |

`README.md` is UTF-16LE with a BOM: an ASCII grep finds nothing and a UTF-8 write corrupts it.
Edit it by decoding/writing UTF-16 (`[Text.Encoding]::Unicode`), not with a normal text editor pass.

## `shizotech/version.json` is coupled to the windows zip

`shzupdate` (windows) compares the **published** `shizotech/version.json` at the top level of this
repo with the local one, and it installs the zip at `bundle_url`:

- `__init__.shio:4` local version, `:5` published version (`raw.githubusercontent.com/.../refs/heads/main/shizotech/version.json`),
  `:24` `if (ver.version < remote_ver.version)` - the entry gate into the update.
- `:45` writes the downloaded zip, `:46` extracts it, `:67/:72/:77` delete `shz.exe`, `shizotech`,
  `shzupdate`, `:82/:87` copy `installer/shzupdate` and `data/` in, `:96` re-reads
  `shizotech/version.json`, `:98` compares it with the published version and prints
  `Update was NOT successful! (invalid ver)` on a mismatch.

Rules, in order of importance:

1. **The published top-level `shizotech/version.json` must equal the `version.json` inside every
   archive a client can fetch from `bundle_url`.** A published number *above* the number of the
   fetchable zip puts clients into a destructive update: `:67-:77` deletes the runtime, installs a
   build with the wrong number and lands in `(invalid ver)`.
2. A published number *below* the number of the installed build is inert: `:24` is false, the
   updater prints `Up-to-date.` and touches nothing.
3. `version.json` on the linux side is used by `installer.sh` only as a downgrade guard: an archive
   whose `data/shizotech/version.json` is lower than the installed `shizotech/version.json` is
   refused (nothing installed, nothing removed).

4. **The updater carries the tag, and it is copied from the archive.** On linux `installer.sh`
   installs itself as `~/.local/bin/shzupdate` (`:104-118`) and an update keeps the updater that
   started it (`SHZ_KEEP_UPDATER`, `:218-222`), so the bundle URL of a client never moves back to
   the tag baked into an older archive. On windows the updater is replaced by
   `installer/shzupdate` **inside the zip** (`__init__.shio:82`), so the tag the *next* update uses
   is the tag of the build the zip was cut from: publish assets built from a tree that already
   carries the new tag, otherwise clients on that build stay on the tag of the archive (harmless -
   rule 2 keeps them at `Up-to-date.` - but they stop receiving updates).

Never publish a bumped top-level `version.json` before the archive that carries the same number is
uploadable at the URL the clients fetch. Bump order: **assets first, then `version.json`, then the
tag in the four consumer sites.**

## Failing safe

A missing release, a deleted tag, a dead network or a truncated download must never delete an
install. Both consumers stop before the destructive step:

- linux: `installer.sh:160-163` - a failed download exits 1, `:178-183` a checksum mismatch exits 1,
  `:191-194` an archive without an `installer.sh` exits 1, `:196-216` an older bundle is refused
  with exit 0 - all of them before `install_app` is ever called, so the install, the user files in
  `shizotech/` and `~/.local/bin/shzupdate` stay exactly as they were.
- windows: `std.web_get` raises a runtime error on any non-2xx answer, so a 404 asset ends the
  script at the download; the added pre-checks (extracted `installer/shzupdate/__init__.shio` +
  `data/shizotech/version.json` present, and its version equal to the published one) stop the
  update before the deletes.
- There is deliberately no fallback from the release asset to the tree archive: they are different
  builds, and rule 1 exists exactly to keep a client from mixing them.
