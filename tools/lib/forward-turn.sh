#!/usr/bin/env bash
set -uo pipefail
[[ -z "${AGENT_ID:-}" ]] && exit 0

PAGE_QUERY_ORIGIN="${PAGE_QUERY_ORIGIN:-http://127.0.0.1:8787}"
PAGE_PATIENCE=10
SEND_PATIENCE=30
WRITER="forward-turn"

. "${BASH_SOURCE[0]%/*}/seat-page-read.sh"

TRANSCRIPT="${1:-}"
[[ -r "$TRANSCRIPT" ]] || exit 0

SEAT_FILE=$(seat_page_file "$AGENT_ID")
[[ -z "$SEAT_FILE" ]] && exit 0
SEAT="${SEAT_FILE##*/}"
SEAT="${SEAT%.md}"
SEAT="${SEAT//[^A-Za-z0-9._-]/}"
[[ -z "$SEAT" ]] && exit 0

RECIPIENT=$(seat_page_value "$SEAT_FILE" "$SEAT_FORWARDS_TO_KEY" | tr -d '[:space:]')
[[ -z "$RECIPIENT" ]] && exit 0

FOLD='
  reduce inputs as $entry ({prompt: null, reply: []};
    if $entry.type == "user"
      and ($entry.origin | type) == "object"
      and $entry.origin.kind == "human"
      and ($entry.message.content | type) == "string"
    then {prompt: $entry, reply: []}
    elif $entry.type == "assistant"
      and ($entry.isSidechain // false) == false
      and ($entry.message.content | type) == "array"
    then .reply += [$entry.message.content[] | select(.type == "text") | .text]
    else . end)
  | select(.prompt != null)
  | {uuid: .prompt.uuid, said: .prompt.message.content, replied: (.reply | join("\n"))}
'
for attempt in 1 2 3 4 5; do
  TURN=$(jq -n -c "$FOLD" "$TRANSCRIPT" 2>/dev/null) || exit 0
  [[ -z "$TURN" ]] && exit 0
  [[ -n "$(printf '%s' "$TURN" | jq -r '.replied // ""' 2>/dev/null)" ]] && break
  [[ "$attempt" == 5 ]] || sleep 1
done

UUID=$(printf '%s' "$TURN" | jq -r '.uuid // ""' 2>/dev/null)
[[ -z "$UUID" ]] && exit 0

SENT=$(curl -s -m "$PAGE_PATIENCE" "${PAGE_QUERY_ORIGIN}/page/seat/${SEAT}" 2>/dev/null |
  jq -r --arg key "$SEAT_FORWARDED_UUID_KEY" '.values[$key] // ""' 2>/dev/null || echo "")
[[ "$SENT" == "$UUID" ]] && exit 0

BODY=$(mktemp -p /var/tmp forward-turn-body-XXXXXX) || exit 0
trap 'rm -f "$BODY"' EXIT
printf '%s' "$TURN" | jq -r '
  "The principal said:\n\n\(.said)\n\nThe interviewer replied:\n\n\(.replied)\n"
' > "$BODY" 2>/dev/null || exit 0

CODE_ROOT="${CODE_ROOT:-${HOME:-}/repos/code}"
[[ -d "$CODE_ROOT" ]] || exit 0
RECEIPT=$(cd "$CODE_ROOT" && timeout "$SEND_PATIENCE" bun ops seat send "$RECIPIENT" --content-file "$BODY" 2>&1)
STATUS=$?
printf '%s\t%s\t%s\n' "$(date -Is)" "$UUID" "$RECEIPT"
[[ $STATUS -eq 0 ]] || exit 0

curl -s -m "$PAGE_PATIENCE" -o /dev/null \
  -X POST "${PAGE_QUERY_ORIGIN}/patch-state/seat/${SEAT}" \
  -H 'content-type: application/json' \
  -d "{\"writer\":\"${WRITER}\",\"values\":{\"${SEAT_FORWARDED_UUID_KEY}\":\"${UUID}\"}}" \
  2>/dev/null || true
