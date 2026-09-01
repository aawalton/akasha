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
REPO=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)

exec bash "$REPO/akasha/code-system/shell-script/shell-scripts/statusline.shell-script.shell.sh" "$@"
