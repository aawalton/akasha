#!/usr/bin/env bash
set -euo pipefail

cat >/dev/null 2>&1 || true

[[ -z "${AGENT_ID:-}" ]] && exit 0

# shellcheck source=../lib/seat-page-read.sh
source "${BASH_SOURCE[0]%/*}/../lib/seat-page-read.sh"

page="$(seat_page_file "$AGENT_ID")"
[[ -z "$page" ]] && exit 0

name="${page##*/}"
name="${name%.md}"

[[ -z "$name" ]] && exit 0

jq -cn --arg t "$name" \
  '{hookSpecificOutput:{hookEventName:"UserPromptSubmit",sessionTitle:$t}}'
exit 0
