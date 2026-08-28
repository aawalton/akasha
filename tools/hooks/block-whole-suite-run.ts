import { segmentsOf, wordsOf } from "../lib/command-segments.ts"
import { toolInputText } from "../lib/hook-command.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const HOOK_NAME = "block-whole-suite-run"

const RUNNERS: readonly string[] = ["bun", "bunx"]

const HELP: readonly string[] = ["--help", "-h"]

function namesASuiteFile(word: string): boolean {
  return word.endsWith(".test.ts") || word.endsWith(".test.tsx")
}

function runsTheWholeSuite(segment: string): boolean {
  let seenRunner = false
  let seenTest = false
  let named = 0
  for (const word of wordsOf(segment)) {
    if (seenTest) {
      if (HELP.includes(word)) return false
      if (word.startsWith("-")) continue
      if (namesASuiteFile(word)) {
        named += 1
        continue
      }
      if (word.includes(">")) continue
      return true
    }
    if (seenRunner && word === "test") {
      seenTest = true
      continue
    }
    seenRunner = RUNNERS.includes(word.slice(word.lastIndexOf("/") + 1))
  }
  return seenTest && named === 0
}

async function main(): Promise<number> {
  const command = toolInputText(await Bun.stdin.text(), "command", HOOK_NAME)
  if (command === "") return 0
  for (const segment of segmentsOf(command)) {
    if (!runsTheWholeSuite(segment)) continue
    const said = refusalText(HOOK_NAME, {}, canonicalize(ownRepoRoot()))
    process.stderr.write(`${said}\n`)
    console.log(JSON.stringify({ decision: "block", reason: said }, null, 2))
    return 2
  }
  return 0
}

if (import.meta.main) process.exit(await main())
