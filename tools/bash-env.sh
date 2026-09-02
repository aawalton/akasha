
set -o pipefail

[ -f "$HOME/.secrets.env" ] && . "$HOME/.secrets.env"

# A session started without remote control inherits no CLAUDE_CODE_HOST_CREDS_FILE,
# and anything asking a model (akasha's model checks) then refuses. The supervisor
# points it at the signed-in account's own credentials file; derive the same path.

if [ -z "${CLAUDE_CODE_HOST_CREDS_FILE:-}" ] &&
  [ -n "${CLAUDE_CONFIG_DIR:-}" ] &&
  [ -f "$CLAUDE_CONFIG_DIR/.credentials.json" ]; then
  export CLAUDE_CODE_HOST_CREDS_FILE="$CLAUDE_CONFIG_DIR/.credentials.json"
fi

true
