import type { AliasEntry } from "./alias-snapshot.ts"
import { claudeNewAccountFn, supervisorFn } from "./bash-launchers.ts"
import { terminalEndedFnLines, terminalEndedTrapLines } from "./bash-terminal-ended.ts"
import { seatLiveFnLines, seatNewFn, seatResumeFn, tmuxLaunchFnLines } from "./bash-tmux.ts"
import { ROOT_LOCAL } from "./entry-points.ts"
import { implName, launcher, reloadFnLines } from "./reload.ts"

function claudeUsageFn(): string {
  return [
    `${implName("cu")}() {`,
    `  ${ROOT_LOCAL}`,
    '  local _dir="$_root/pages/claude-account" _f _a _p _row _5h _7d _5r _7r _k _sel _dis',
    "  local -a _lines=()",
    '  if ! compgen -G "$_dir/*.uncommitted.yaml" > /dev/null; then',
    '    echo "no account pages under $_dir" >&2',
    "    return 1",
    "  fi",
    '  for _f in "$_dir"/*.uncommitted.yaml; do',
    `    _a=$(basename "$_f" .uncommitted.yaml)`,
    `    _a=$(basename "$_a" .claude-account)`,
    `    _row=$(tr ',' '\\n' < "$_f" | tr -d '{}' | awk -F': ' '{ v[$1] = $2 } END { print v["five-hour-percent-used"]+0, v["seven-day-percent-used"]+0, v["five-hour-resets-at"], v["seven-day-resets-at"] }')`,
    '    read -r _5h _7d _5r _7r <<< "$_row"',
    `    _p="$_dir/$_a.claude-account.md"; [ -f "$_p" ] || _p="$_dir/$_a.md"`,
    `    _dis=$(sed -n 's/^subscription-disabled-reason: *//p' "$_p" 2>/dev/null | head -1)`,
    '    if [ -n "$_dis" ]; then',
    "      _5h=100",
    "      _7d=100",
    "    else",
    `      _5h=$(awk -v a="$_5h" -v b="$_7d" 'BEGIN { print (b >= 100 ? 100 : a) }')`,
    "    fi",
    `    _k=$(date -d "$_7r" +%s 2>/dev/null) || _k=9999999999`,
    '    [ -z "$_k" ] && _k=9999999999',
    `    _lines+=("$_k|$_a|$_5h|$_7d|$(date -d "$_5r" +'%a %H:%M' 2>/dev/null)|$(date -d "$_7r" +'%a %H:%M' 2>/dev/null)")`,
    "  done",
    "  _sel=$(printf '%s\\n' \"${_lines[@]}\" | awk -F'|' '$3 < 100 && $4 < 100 { print $1, $4, $3, $2 }' | sort -k1,1n -k2,2n -k3,3n -k4,4 | head -1 | awk '{ print $4 }')",
    "  printf '%s\\n' \"${_lines[@]}\" | sort -t'|' -k1,1n -k2,2 | while IFS='|' read -r _k _a _5h _7d _5r _7r; do",
    `    if [ "$_a" = "$_sel" ]; then printf '> '; else printf '  '; fi`,
    `    printf '%-11s %3s%% %-9s  %3s%% %-9s\\n' "$_a" "$_5h" "$_5r" "$_7d" "$_7r"`,
    "  done",
    "}",
  ].join("\n")
}

function aliases(): string {
  const lines = [
    "# aliases - shell",
    "alias s.='source ~/.bashrc'",
    "",
    "# aliases - git",
    "alias gs='git status'",
    "alias gc='git commit -m'",
    `alias gca='git add . && git commit -m'`,
    `alias gcc='git add . && git commit -m "checkpoint"'`,
    "alias gp='git push'",
    "alias gl='git pull'",
    "alias gg='git log'",
    "alias gcb='git checkout -b'",
  ]
  return lines.join("\n")
}

function functions(accounts: readonly AliasEntry[]): string {
  const blocks: string[] = []

  blocks.push(
    "# the bounded reload every launcher runs before dispatching (see init/reload.ts)",
    reloadFnLines().join("\n")
  )

  blocks.push(
    "",
    "# cu - claude usage, read straight off the account pages",
    launcher("cu", claudeUsageFn())
  )

  const sorted = [...accounts].sort((a, b) => a.aliasIndex - b.aliasIndex)
  blocks.push("", "# c<N> - reauth: claude on one account, in this terminal, seating nothing")
  for (const { account, aliasIndex } of sorted) {
    const name = `c${aliasIndex}`
    blocks.push("", launcher(name, supervisorFn(name, ` -a ${account}`)))
  }

  blocks.push(
    "",
    "# cna - claude new account (prompt + create row + bootstrap /login)",
    launcher("cna", claudeNewAccountFn("cna"))
  )

  blocks.push(
    "",
    "# whether a seat's tmux session holds a pane that is still alive",
    seatLiveFnLines().join("\n"),
    "",
    "# the shared tmux launch step every seat comes up under (see init/bash-tmux.ts)",
    tmuxLaunchFnLines().join("\n"),
    "",
    "# sn - seat new: a fresh seat under tmux and this repo's supervisor, attached",
    launcher("sn", seatNewFn("sn")),
    "",
    "# sr - seat resume: reattach, or resume a seat under tmux, attached",
    launcher("sr", seatResumeFn("sr"))
  )

  blocks.push(
    "",
    "# how an editor terminal's shell ended, left beside that terminal's own page",
    "# (see init/bash-terminal-ended.ts)",
    terminalEndedFnLines().join("\n"),
    "",
    terminalEndedTrapLines().join("\n")
  )

  return blocks.join("\n")
}

function functionNames(accounts: readonly AliasEntry[]): readonly string[] {
  const sorted = [...accounts].sort((a, b) => a.aliasIndex - b.aliasIndex)
  return ["cu", ...sorted.map((a) => `c${a.aliasIndex}`), "cna", "sn", "sr"]
}

function preamble(accounts: readonly AliasEntry[]): string {
  return `# clear stale aliases that are now functions\nunalias ${functionNames(accounts).join(" ")} 2>/dev/null`
}

export function generateBashInit(accounts: readonly AliasEntry[]): string {
  return `${preamble(accounts)}\n\n${aliases()}\n\n${functions(accounts)}`
}
