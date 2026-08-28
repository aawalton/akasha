import { segmentsOf, wordsOf } from "../lib/command-segments.ts"
import { toolInputText } from "../lib/hook-command.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const HOOK_NAME = "block-root-filesystem-scan"

const GREP_FAMILY: readonly string[] = ["grep", "ugrep", "egrep", "fgrep", "rg", "ripgrep"]

const FIND_FAMILY: readonly string[] = ["find", "fd", "fdfind"]

const RECURSES_BY_DEFAULT: readonly string[] = ["rg", "ripgrep"]

const DANGEROUS_ROOTS: readonly string[] = [
  "/",
  "/.",
  "~",
  "~/",
  "$HOME",
  "$HOME/",
  "${HOME}",
  "${HOME}/",
  "/proc",
  "/proc/",
  "/sys",
  "/sys/",
  "/dev",
  "/dev/",
]

const NAMED_RECURSIVE: readonly string[] = [
  "--recursive",
  "--dereference-recursive",
  "-R",
  "--include-dir",
  "--recurse",
]

const ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/

function isDangerousRoot(candidate: string): boolean {
  const home = process.env.HOME ?? ""
  return [...DANGEROUS_ROOTS, home, `${home}/`].includes(candidate)
}

function headOf(segment: string): string {
  for (const word of wordsOf(segment)) {
    if (ASSIGNMENT.test(word)) continue
    if (word === "sudo" || word === "env") continue
    return word.slice(word.lastIndexOf("/") + 1)
  }
  return ""
}

function argsOf(segment: string): readonly string[] {
  const words = wordsOf(segment)
  let found = false
  const rest: string[] = []
  for (const word of words) {
    if (!found) {
      if (ASSIGNMENT.test(word)) continue
      if (word === "sudo" || word === "env") continue
      found = true
      continue
    }
    rest.push(word)
  }
  return rest
}

function hasRecursiveFlag(args: readonly string[]): boolean {
  for (const word of args) {
    if (NAMED_RECURSIVE.includes(word)) return true
    if (word.startsWith("--")) continue
    if (word === "-r") return true
    if (word.startsWith("-") && /[rR]/.test(word.slice(1))) return true
  }
  return false
}

function scansDangerously(segment: string): boolean {
  const head = headOf(segment)
  if (head === "") return false
  const args = argsOf(segment)
  const bare = args.filter((word) => !word.startsWith("-"))
  if (GREP_FAMILY.includes(head)) {
    if (!RECURSES_BY_DEFAULT.includes(head) && !hasRecursiveFlag(args)) return false
    return bare.some(isDangerousRoot)
  }
  if (FIND_FAMILY.includes(head)) return bare.some(isDangerousRoot)
  return false
}

async function main(): Promise<number> {
  const command = toolInputText(await Bun.stdin.text(), "command", HOOK_NAME)
  if (command === "") return 0
  for (const segment of segmentsOf(command)) {
    const first = wordsOf(segment)[0] ?? ""
    if (first === "ssh" || first === "kubectl") continue
    if (!scansDangerously(segment)) continue
    const said = refusalText(HOOK_NAME, {}, canonicalize(ownRepoRoot()))
    process.stderr.write(`${said}\n`)
    console.log(JSON.stringify({ decision: "block", reason: said }, null, 2))
    return 2
  }
  return 0
}

if (import.meta.main) process.exit(await main())
