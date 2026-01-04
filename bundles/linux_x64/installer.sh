#!/bin/sh
set -eu

APP_NAME="shz"
DATA_DIR="data"
INSTALL_BASE="$HOME/.local"
INSTALL_DIR="$INSTALL_BASE/$APP_NAME"

SOURCE_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
SOURCE_DATA="$SOURCE_DIR/$DATA_DIR"

SOURCE_BIN="$SOURCE_DATA/$APP_NAME"
SOURCE_SUPPORT_DIR="$SOURCE_DATA/shizotech"

TARGET_BIN="$INSTALL_DIR/$APP_NAME"
TARGET_SUPPORT_DIR="$INSTALL_DIR/shizotech"

echo "Installing $APP_NAME for user: $USER"

# --- Validation --------------------------------------------------------------

if [ ! -f "$SOURCE_BIN" ]; then
    echo "Error: $SOURCE_BIN not found."
    exit 1
fi

if [ ! -d "$SOURCE_SUPPORT_DIR" ]; then
    echo "Error: $SOURCE_SUPPORT_DIR not found."
    exit 1
fi

# --- Create install directory ------------------------------------------------

mkdir -p "$INSTALL_DIR"

# --- Install binary ----------------------------------------------------------

chmod +x "$SOURCE_BIN"
cp "$SOURCE_BIN" "$TARGET_BIN"

# --- Install support directory ----------------------------------------------

rm -rf "$TARGET_SUPPORT_DIR"
cp -R "$SOURCE_SUPPORT_DIR" "$TARGET_SUPPORT_DIR"

# --- Create PATH-accessible launcher ----------------------------------------

BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR"

LAUNCHER="$BIN_DIR/$APP_NAME"

cat > "$LAUNCHER" <<EOF
#!/bin/sh
exec "$TARGET_BIN" "\$@"
EOF

chmod +x "$LAUNCHER"

# --- PATH check --------------------------------------------------------------

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