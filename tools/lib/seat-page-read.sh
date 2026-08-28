
SEAT_MODE_KEY="start-mode"
SEAT_INITIATIVE_KEY="initiative-slug"

seat_pages_dir() {
  local here akasha
  here=$(cd "${BASH_SOURCE[0]%/*}/../.." 2>/dev/null && pwd -P) || return 0
  akasha="${AKASHA_ROOT:-${here%/*}/akasha}"
  printf '%s' "$akasha/agent/seat"
}

seat_page_named() {
  local key="${1:-}" value="${2:-}" dir
  if [ -z "$value" ]; then return 0; fi
  dir=$(seat_pages_dir)
  if [ ! -d "$dir" ]; then return 0; fi
  grep -lFx "${key}: ${value}" "$dir"/*.md 2>/dev/null | head -1 || true
  return 0
}

seat_page_file() {
  local agent="${1:-}" found
  found=$(seat_page_named id "$agent")
  if [ -z "$found" ]; then
    case "$agent" in *--*) found=$(seat_page_named id "${agent%%--*}") ;; esac
  fi
  if [ -z "$found" ]; then
    found=$(seat_page_named claude-code-session-uuid "$agent")
  fi
  printf '%s' "$found"
  return 0
}

seat_page_value() {
  local file="${1:-}" key="${2:-}"
  if [ -z "$file" ] || [ -z "$key" ] || [ ! -f "$file" ]; then return 0; fi
  awk -v key="$key" '
    NR == 1 { if ($0 != "---") exit; next }
    $0 == "---" { exit }
    index($0, key ": ") == 1 {
      held = substr($0, length(key) + 3)
      gsub(/^"|"$/, "", held)
      print held
      exit
    }
  ' "$file" || true
  return 0
}
