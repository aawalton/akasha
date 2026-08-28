import { segmentsOf, wordsOf } from "../lib/command-segments.ts"
import { toolInputText } from "../lib/hook-command.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const HOOK_NAME = "block-destructive-git"

const SCOPE: readonly string[] = [
  "predicate-derivation: open-sample — git enumerates its verb vocabulary exactly, but authors no",
  "  classification that separates THIS hazard, so there is nothing here to derive the protected set",
  "  from. Measured against every group `git --list-cmds` exposes: all seven verbs above sit in",
  "  `list-mainporcelain` beside status, log, diff and grep; `list-worktree` is {add, mv, restore, rm},",
  "  two of the seven plus two non-hazards, missing five; five of the seven sit in no attribute group",
  "  at all. Blocking any whole group would refuse ordinary read-only calls. And the hazard is",
  "  SUB-VERB — `worktree list` reads while `worktree remove --force` destroys, `config --get` reads",
  "  while `config --unset` writes — so no verb-level enumeration of any kind can express it. The",
  "  reason is structural: the hazard is \"destroys another agent's uncommitted work in a worktree",
  '  several agents share", and git has no notion of several agents sharing a worktree, so it holds',
  "  no opinion to derive from. This list therefore samples an open world; it does not define one.",
  "  NOT REACHED. Each measured against this script, not supposed:",
  "    - git checkout-index -a -f      writes the working tree from the index",
  "    - git read-tree -u <tree>       writes the working tree from a tree",
  "    - git worktree remove --force   removes a worktree holding uncommitted work",
  "    - git update-ref, symbolic-ref, update-index, switch, revert, apply, reflog expire, gc",
  "    - a git invocation carrying no determinable subcommand (bare `git`, or global flags only)",
  "    - a destructive verb inside a quoted payload, which the dequoting step strips before",
  "      segmentation — and, in the opposite direction, one merely QUOTED in a heredoc body, which",
  "      that step does not strip, so data naming a verb is refused as though it were a command",
  "  The absence of a verb from this list is NOT a finding that it is safe; it is unexamined.",
  "  Do not close a gap here by adding the verb. A denylist over an open hazard family teaches its",
  "  own holes: the refusal is what sends a reader looking for the neighbouring verb it did not name,",
  "  and a longer list is a longer search prompt. A gap found here is evidence that this guard cannot",
  "  close its class, not an invitation to extend it.",
  "  Printed by `block-destructive-git.ts --scope`, which is the one place this stands: it is",
  "  what the program says about itself, held as the text it prints rather than as a comment.",
]

const BLOCKED_VERBS: readonly string[] = [
  "stash",
  "reset",
  "rebase",
  "checkout",
  "restore",
  "clean",
  "rm",
]

const TAKES_A_VALUE: readonly string[] = [
  "-c",
  "-C",
  "--git-dir",
  "--work-tree",
  "--namespace",
  "--super-prefix",
  "--exec-path",
]

const FORCED_PUSH: readonly string[] = [
  "--force",
  "-f",
  "--force-with-lease",
  "--force-if-includes",
]

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

const NOT_GIT: readonly string[] = ["kubectl", "ssh"]

export interface Refusal {
  readonly slug: string
  readonly invocation: string
}

interface Invocation {
  readonly subcmd: string
  readonly rest: readonly string[]
}

function invocationOf(segment: string): Invocation | null {
  let head = ""
  let subcmd = ""
  const rest: string[] = []
  let phase = "head"
  let skipNext = false
  for (const word of wordsOf(segment)) {
    if (phase === "head") {
      if (ASSIGNMENT.test(word)) continue
      if (word === "sudo" || word === "env") continue
      head = word
      phase = "flags"
      continue
    }
    if (phase === "flags") {
      if (skipNext) {
        skipNext = false
        continue
      }
      if (TAKES_A_VALUE.includes(word)) {
        skipNext = true
        continue
      }
      if (word.startsWith("-")) continue
      subcmd = word
      phase = "rest"
      continue
    }
    rest.push(word)
  }
  const base = head.slice(head.lastIndexOf("/") + 1)
  if (NOT_GIT.includes(base)) return null
  if (base !== "git") return null
  if (subcmd === "") return null
  return { subcmd, rest }
}

export function refusalFor(segment: string): Refusal | null {
  const held = invocationOf(segment)
  if (held === null) return null
  const { subcmd, rest } = held

  if (BLOCKED_VERBS.includes(subcmd)) return { slug: `${HOOK_NAME}-${subcmd}`, invocation: "" }

  if (subcmd === "commit") {
    for (const word of rest) {
      if (word === "--amend" || word.startsWith("--amend=")) {
        return { slug: `${HOOK_NAME}-amend`, invocation: "" }
      }
    }
  }

  if (subcmd === "push") {
    for (const word of rest) {
      if (FORCED_PUSH.includes(word) || word.startsWith("--force-with-lease=")) {
        return { slug: `${HOOK_NAME}-force-push`, invocation: "" }
      }
    }
  }

  if (subcmd === "branch") {
    let sawDelete = false
    let sawForce = false
    for (const word of rest) {
      if (word === "-D") return { slug: `${HOOK_NAME}-branch-delete`, invocation: "branch -D" }
      if (word === "--delete") sawDelete = true
      if (word === "--force" || word === "-f") sawForce = true
    }
    if (sawDelete && sawForce) {
      return { slug: `${HOOK_NAME}-branch-delete`, invocation: "branch --delete --force" }
    }
  }

  return null
}

function cleaned(command: string): string {
  return command
    .split("\n")
    .map((line) => line.replace(/^[ \t]*/, ""))
    .join("\n")
    .replaceAll(/ {2,}/g, " ")
}

async function main(): Promise<number> {
  if (Bun.argv[2] === "--scope") {
    console.log(SCOPE.join("\n"))
    return 0
  }
  const command = toolInputText(await Bun.stdin.text(), "command", HOOK_NAME)
  if (command === "") return 0
  for (const segment of segmentsOf(cleaned(command))) {
    const refusal = refusalFor(segment)
    if (refusal === null) continue
    const values: Record<string, string> =
      refusal.invocation === "" ? {} : { invocation: refusal.invocation }
    const said = refusalText(refusal.slug, values, canonicalize(ownRepoRoot()))
    process.stderr.write(`${said}\n`)
    console.log(JSON.stringify({ decision: "block", reason: said }, null, 2))
    return 2
  }
  return 0
}

if (import.meta.main) process.exit(await main())
