#!/bin/sh
set -eu

APP_NAME="shz"
DATA_DIR="data"
BUNDLE_URL="${SHZ_BUNDLE_URL:-https://raw.githubusercontent.com/shizotech/shizoscript3/main/bundles/linux_x64.tar.gz}"

INSTALL_BASE="$HOME/.local"
INSTALL_DIR="$INSTALL_BASE/$APP_NAME"
BIN_DIR="$HOME/.local/bin"

SCRIPT_NAME="$(basename "$0")"

SOURCE_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
SOURCE_DATA="$SOURCE_DIR/$DATA_DIR"

SOURCE_BIN="$SOURCE_DATA/$APP_NAME"
SOURCE_SUPPORT_DIR="$SOURCE_DATA/shizotech"

TARGET_BIN="$INSTALL_DIR/$APP_NAME"
TARGET_SUPPORT_DIR="$INSTALL_DIR/shizotech"

# Determine system architecture
ARCH="$(uname -m)"

# Supported architectures
SUPPORTED_ARCH="x86_64"

if [ "$ARCH" != "$SUPPORTED_ARCH" ]; then
    echo "Error: Unsupported architecture '$ARCH'."
    echo "This installer only supports $SUPPORTED_ARCH."
    exit 1
fi

install_app() {
    echo "Installing $APP_NAME for user: ${USER:-$(id -un)}"

    # --- Validation ----------------------------------------------------------

    if [ ! -f "$SOURCE_BIN" ]; then
        echo "Error: $SOURCE_BIN not found."
        exit 1
    fi

    if [ ! -d "$SOURCE_SUPPORT_DIR" ]; then
        echo "Error: $SOURCE_SUPPORT_DIR not found."
        exit 1
    fi

    # --- Create install directories -----------------------------------------

    mkdir -p "$INSTALL_DIR" "$BIN_DIR"

    # --- Install support directory ------------------------------------------
    # Issue #92: the old directory used to be deleted before the copy, so every
    # update lost the user's own files and an interrupted update left nothing.
    # The new version is prepared next to the old one, files the user added to
    # includes/, packages/ and configs/ are carried over, then the directories
    # are swapped. The previous version stays in shizotech.old for a rollback.

    NEW_SUPPORT_DIR="$TARGET_SUPPORT_DIR.new"
    OLD_SUPPORT_DIR="$TARGET_SUPPORT_DIR.old"

    rm -rf "$NEW_SUPPORT_DIR"
    cp -R "$SOURCE_SUPPORT_DIR" "$NEW_SUPPORT_DIR"

    if [ -d "$TARGET_SUPPORT_DIR" ]; then
        for USER_DIR in includes packages configs; do
            [ -d "$TARGET_SUPPORT_DIR/$USER_DIR" ] || continue
            (cd "$TARGET_SUPPORT_DIR" && find "$USER_DIR" -type f) | while IFS= read -r FILE; do
                if [ ! -e "$NEW_SUPPORT_DIR/$FILE" ]; then
                    mkdir -p "$NEW_SUPPORT_DIR/$(dirname -- "$FILE")"
                    cp -p "$TARGET_SUPPORT_DIR/$FILE" "$NEW_SUPPORT_DIR/$FILE"
                fi
            done
        done

        rm -rf "$OLD_SUPPORT_DIR"
        mv "$TARGET_SUPPORT_DIR" "$OLD_SUPPORT_DIR"
    fi
    mv "$NEW_SUPPORT_DIR" "$TARGET_SUPPORT_DIR"

    # --- Install binary ------------------------------------------------------
    # Copy next to the target and rename, so a running shz is not overwritten
    # in place and the binary is never half written.

    cp "$SOURCE_BIN" "$TARGET_BIN.new"
    chmod +x "$TARGET_BIN.new"
    mv -f "$TARGET_BIN.new" "$TARGET_BIN"

    # --- Create launcher -----------------------------------------------------

    cat > "$BIN_DIR/$APP_NAME" <<EOF
#!/bin/sh
exec "$TARGET_BIN" "\$@"
EOF
    chmod +x "$BIN_DIR/$APP_NAME"

    # --- Install updater (copy this script) ----------------------------------

    cp "$SOURCE_DIR/installer.sh" "$BIN_DIR/shzupdate.new"
    chmod +x "$BIN_DIR/shzupdate.new"
    mv -f "$BIN_DIR/shzupdate.new" "$BIN_DIR/shzupdate"

    # --- PATH check ----------------------------------------------------------

    case ":$PATH:" in
        *":$BIN_DIR:"*)
            ;;
        *)
            echo ""
            echo "WARNING: $BIN_DIR is not in your PATH."
            echo "Add the following line to your shell profile:"
            echo ""
            echo "    export PATH=\"\$PATH:$BIN_DIR\""
            echo ""
            ;;
    esac

    echo "Installation complete."
    echo "Run '$APP_NAME' from the command line."
}

update_app() {
    echo "Updating $APP_NAME..."

    TMP_DIR="$(mktemp -d)"
    trap 'rm -rf "$TMP_DIR"' EXIT INT TERM

    ARCHIVE="$TMP_DIR/shz.tar.gz"
    CHECKSUM="$TMP_DIR/shz.tar.gz.sha256"
    EXTRACT_DIR="$TMP_DIR/shz"

    # Issue #92: -f / plain wget fail on HTTP errors instead of saving the
    # error page as the archive.
    if command -v curl >/dev/null 2>&1; then
        download() { curl -fsSL -o "$2" "$1"; }
    elif command -v wget >/dev/null 2>&1; then
        download() { wget -q -O "$2" "$1"; }
    else
        echo "Error: curl or wget is required for updates."
        exit 1
    fi

    if ! download "$BUNDLE_URL" "$ARCHIVE"; then
        echo "Error: download of $BUNDLE_URL failed."
        exit 1
    fi

    # The bundle is published with a SHA-256 checksum next to it. It is
    # served from the same place as the bundle, so it detects corrupted or
    # truncated downloads and mismatched uploads, not a compromised server.
    if download "$BUNDLE_URL.sha256" "$CHECKSUM" 2>/dev/null; then
        EXPECTED="$(cut -d ' ' -f 1 < "$CHECKSUM")"
        if command -v sha256sum >/dev/null 2>&1; then
            ACTUAL="$(sha256sum "$ARCHIVE" | cut -d ' ' -f 1)"
        elif command -v shasum >/dev/null 2>&1; then
            ACTUAL="$(shasum -a 256 "$ARCHIVE" | cut -d ' ' -f 1)"
        else
            ACTUAL=""
            echo "WARNING: sha256sum/shasum not found, the download is not verified."
        fi
        if [ -n "$ACTUAL" ] && [ "$ACTUAL" != "$EXPECTED" ]; then
            echo "Error: checksum mismatch for the downloaded bundle, nothing was installed."
            echo "  expected: $EXPECTED"
            echo "  got:      $ACTUAL"
            exit 1
        fi
    else
        echo "WARNING: no checksum published for $BUNDLE_URL, the download is not verified."
    fi

    mkdir -p "$EXTRACT_DIR"
    tar -xzf "$ARCHIVE" -C "$EXTRACT_DIR"

    if [ ! -f "$EXTRACT_DIR/installer.sh" ]; then
        echo "Error: the downloaded bundle contains no installer.sh, nothing was installed."
        exit 1
    fi

    chmod +x "$EXTRACT_DIR/installer.sh"
    "$EXTRACT_DIR/installer.sh"

    echo "$APP_NAME update complete."
}

case "$SCRIPT_NAME" in
    shzupdate)
        update_app
        ;;
    *)
        install_app
        ;;
esac
