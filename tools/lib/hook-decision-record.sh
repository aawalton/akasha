PAGE_QUERY_ORIGIN="${PAGE_QUERY_ORIGIN:-http://127.0.0.1:8787}"
HOOK_NAME="${HOOK_NAME:-block-headless-halt}"
DECISION_PATIENCE=2

. "${BASH_SOURCE[0]%/*}/seat-page-read.sh"

seat_page() {
  if [ -z "${SEAT_PAGE_FILE+x}" ]; then
    SEAT_PAGE_FILE=$(seat_page_file "${AGENT_ID:-}")
  fi
  printf '%s' "$SEAT_PAGE_FILE"
}

seat_name() {
  local file
  file=$(seat_page)
  file="${file##*/}"
  file="${file%.md}"
  file="${file%.seat}"
  printf '%s' "${file//[^A-Za-z0-9._-]/}"
  return 0
}

seat_mode() {
  local stated
  stated=$(seat_page_value "$(seat_page)" "$SEAT_MODE_KEY")
  case "$stated" in
    interactive | headless) printf '%s' "$stated" ;;
    *) printf 'unknown' ;;
  esac
  return 0
}

record() {
  local name now secs frac at session verdict
  name=$(seat_name)
  if [ -z "$name" ]; then return 0; fi
  now="${EPOCHREALTIME:-0}"
  secs="${now%%.*}"
  frac="${now#*.}000"
  TZ=UTC printf -v at '%(%Y-%m-%dT%H:%M:%S)T' "$secs" 2>/dev/null || return 0
  session=""
  [[ "$STDIN" =~ \"session_id\"[[:space:]]*:[[:space:]]*\"([^\"]+)\" ]] &&
    session="${BASH_REMATCH[1]//[^A-Za-z0-9.-]/}"
  verdict=allow
  [[ "$1" == "block" ]] && verdict=refuse
  curl -s -m "$DECISION_PATIENCE" -o /dev/null \
    -X POST "${PAGE_QUERY_ORIGIN}/write-row/seat-turn-end-decision/${name}" \
    -H 'content-type: application/json' \
    -d "{\"writer\":\"${HOOK_NAME}\",\"values\":{\"at\":\"${at}.${frac:0:3}Z\",\"hook\":\"${HOOK_NAME}\",\"claude-code-session-uuid\":\"${session}\",\"verdict\":\"${verdict}\",\"reason\":\"${2//[^a-z0-9-]/}\",\"mode\":\"$(seat_mode)\"}}" \
    2>/dev/null
  return 0
}
