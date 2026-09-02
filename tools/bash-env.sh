
set -o pipefail

[ -f "$HOME/.secrets.env" ] && . "$HOME/.secrets.env"

# A session started without remote control inherits no CLAUDE_CODE_HOST_CREDS_FILE,
# and anything asking a model (akasha's model checks) then refuses. The supervisor
# points it at the signed-in account's own credentials file; derive the same path.
# The health-sample writer refuses unless something names the checkout whose writes last,
# because a rows file is tracked and a checkout restored by `git reset --hard origin/main`
# throws away what was written into it. This is named literally rather than as $AKASHA_ROOT:
# a variable that says "wherever I am" would authorize every checkout, which is the whole
# thing the writer refuses on. Only this path keeps what is written here.
export HEALTH_SAMPLE_ROWS_KEPT_IN="$HOME/repos/akasha"

if [ -z "${CLAUDE_CODE_HOST_CREDS_FILE:-}" ] &&
  [ -n "${CLAUDE_CONFIG_DIR:-}" ] &&
  [ -f "$CLAUDE_CONFIG_DIR/.credentials.json" ]; then
  export CLAUDE_CODE_HOST_CREDS_FILE="$CLAUDE_CONFIG_DIR/.credentials.json"
fi

true
