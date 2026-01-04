#!/bin/sh
set -eu

APP_NAME="shz"
DATA_DIR="data"
BUNDLE_URL="https://raw.githubusercontent.com/shizotech/shizoscript3/main/bundles/linux_x64.tar.gz"

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

install_app() {
    echo "Installing $APP_NAME for user: $USER"

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

    # --- Install binary ------------------------------------------------------

    chmod +x "$SOURCE_BIN"
    cp "$SOURCE_BIN" "$TARGET_BIN"

    # --- Install support directory ------------------------------------------

    rm -rf "$TARGET_SUPPORT_DIR"
    cp -R "$SOURCE_SUPPORT_DIR" "$TARGET_SUPPORT_DIR"

    # --- Create launcher -----------------------------------------------------

    cat > "$BIN_DIR/$APP_NAME" <<EOF
#!/bin/sh
exec "$TARGET_BIN" "\$@"
EOF
    chmod +x "$BIN_DIR/$APP_NAME"

    # --- Install updater (copy this script) ----------------------------------

    cp "$SOURCE_DIR/installer.sh" "$BIN_DIR/shzupdate"
    chmod +x "$BIN_DIR/shzupdate"

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
    EXTRACT_DIR="$TMP_DIR/shz"

    if command -v curl >/dev/null 2>&1; then
        curl -L -o "$ARCHIVE" "$BUNDLE_URL"
    elif command -v wget >/dev/null 2>&1; then
        wget "$BUNDLE_URL" -O "$ARCHIVE"
    else
        echo "Error: curl or wget is required for updates."
        exit 1
    fi

    mkdir -p "$EXTRACT_DIR"
    tar -xzf "$ARCHIVE" -C "$EXTRACT_DIR"

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
