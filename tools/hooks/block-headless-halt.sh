#!/usr/bin/env bash

set -u

if [ "${1:-}" = "--scope" ]; then
  sed -n '/^# predicate-deriv/,/^$/p' "$0" | sed 's/^#[[:space:]]\{0,1\}//'
  exit 0
fi

STDIN=$(cat 2>/dev/null || true)

. "${BASH_SOURCE[0]%/*}/../lib/hook-decision-record.sh"

[[ -z "${AGENT_ID:-}" ]] && { record allow no-agent-id; exit 0; }

[[ "$(seat_mode)" == "interactive" ]] && { record allow interactive-recorded; exit 0; }

. "${BASH_SOURCE[0]%/*}/../lib/turn-end-decide-call.sh"
