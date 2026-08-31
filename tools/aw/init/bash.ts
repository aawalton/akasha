import type { AliasEntry } from "./alias-snapshot.ts"
import { claudeNewAccountFn, supervisorFn } from "./bash-launchers.ts"
import { terminalEndedFnLines, terminalEndedTrapLines } from "./bash-terminal-ended.ts"
import { seatLiveFnLines, seatNewFn, seatResumeFn, tmuxLaunchFnLines } from "./bash-tmux.ts"
import { AKASHA } from "./entry-points.ts"
import { implName, launcher, reloadFnLines } from "./reload.ts"

function claudeUsageFn(): string {
  return [
    `${implName("cu")}() {`,
    `  ${AKASHA} measure claude-accounts "$@"`,
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
