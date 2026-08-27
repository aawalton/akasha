#!/usr/bin/env bash

set -u

STDIN=$(cat 2>/dev/null || true)

HOOK_NAME="block-interactive-stall"
. "${BASH_SOURCE[0]%/*}/../lib/hook-decision-record.sh"

[[ -z "${AGENT_ID:-}" ]] && { record allow no-agent-id; exit 0; }

[[ "$(seat_mode)" != "interactive" ]] && { record allow not-interactive; exit 0; }

. "${BASH_SOURCE[0]%/*}/../lib/turn-end-decide-call.sh"
