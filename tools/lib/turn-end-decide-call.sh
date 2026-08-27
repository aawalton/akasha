if ! command -v ops >/dev/null 2>&1; then
  record allow verb-unavailable
  exit 0
fi

_said="/var/tmp/turn-end-decide-${AGENT_ID//[^A-Za-z0-9_-]/_}.$$"

_line=$(printf '%s' "$STDIN" |
  timeout 20 ops instructions turn-end-decide --agent "$AGENT_ID" 2>"$_said" | tail -1)

IFS=$'\t' read -r _decision _reason FIELD_ASSIGNMENTS FIELD_WAITING FIELD_PENDING _stopped <<<"$_line"

if [[ "$_decision" != "allow" && "$_decision" != "block" ]]; then
  rm -f "$_said"
  record allow verb-unavailable
  exit 0
fi

record "$_decision" "$_reason"

if [[ "$_decision" == "block" ]]; then
  grep -v '^error: "ops" exited with code ' "$_said" >&2
  rm -f "$_said"
  exit 2
fi

rm -f "$_said"
exit 0
