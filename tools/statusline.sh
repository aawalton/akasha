#!/usr/bin/env bash

set -euo pipefail

# THIS IS A BRIDGE FOR SESSIONS ALREADY RUNNING, and it goes when they have all cycled.
#
# The statusline moved to `akasha/code-system/shell-scripts/pages/` and `settings/agents.json`
# moved with it. But a session's settings are a frozen snapshot under `/tmp`, written once when the
# session launches and named for a digest of its contents. A session launched before the move holds
# a snapshot naming this path forever, and Claude Code reads the command out of it at startup. So
# deleting this file stopped the statusline for every session already running, with nothing said.
#
# The lesson is the ordering rather than this file: a path a running process was handed cannot be
# deleted in the commit that moves it. It goes one cycle later.
#
# It moved a second time, to `shell-scripts/pages/`, and this line was not carried along, so the
# bridge exec'd a path that was not there and every bridged session lost its statusline without a
# word. A bridge is only a bridge while both ends are real, and nothing here checks that.
REPO=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)
HELD="$REPO/akasha/code-system/shell-scripts/pages/statusline/statusline.shell-script.shell.sh"

if [ ! -f "$HELD" ]; then
  printf 'statusline: %s is not there\n' "$HELD" >&2
  exit 1
fi

exec bash "$HELD" "$@"
