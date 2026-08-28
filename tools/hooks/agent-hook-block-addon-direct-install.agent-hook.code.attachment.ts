import { joinedContinuations, segmentsOf, wordsOf } from "../lib/command-segments.ts"
import { toolInputText } from "../lib/hook-command.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { canonicalize } from "../../repo/path/path"
import { ownRepoRoot } from "../../repo/roots/roots"

const HOOK_NAME = "block-addon-direct-install"

const OPS_SPELLINGS: readonly string[] = ["ops", "ops/cli.ts"]

const PASSED_OVER: readonly string[] = ["env", "bun", "run"]

const INSTALL_RELEASES: readonly string[] = [" --help ", " -h "]

const BUILD_RELEASES: readonly string[] = [" --build-only ", " --watch ", " --help ", " -h "]

function namesOps(word: string): boolean {
  if (OPS_SPELLINGS.includes(word)) return true
  return OPS_SPELLINGS.some((spelling) => word.endsWith(`/${spelling}`))
}

function invokesOpsVerb(segment: string, verb: string): boolean {
  let seenOps = false
  const rest: string[] = []
  for (const word of wordsOf(segment)) {
    if (!seenOps) {
      if (word.includes("=") || PASSED_OVER.includes(word)) continue
      if (!namesOps(word)) return false
      seenOps = true
      continue
    }
    rest.push(word)
  }
  if (!seenOps) return false
  return ` ${rest.join(" ")} `.startsWith(` temper addon ${verb} `)
}

function released(segment: string, releases: readonly string[]): boolean {
  return releases.some((flag) => ` ${segment} `.includes(flag))
}

async function main(): Promise<number> {
  const command = toolInputText(await Bun.stdin.text(), "command", HOOK_NAME)
  if (command === "") return 0
  for (const segment of segmentsOf(joinedContinuations(command))) {
    const blocked =
      (invokesOpsVerb(segment, "install") && !released(segment, INSTALL_RELEASES)) ||
      (invokesOpsVerb(segment, "build") && !released(segment, BUILD_RELEASES))
    if (!blocked) continue
    const said = refusalText(HOOK_NAME, {}, canonicalize(ownRepoRoot()))
    process.stderr.write(`${said}\n`)
    console.log(JSON.stringify({ decision: "block", reason: said }, null, 2))
    return 2
  }
  return 0
}

if (import.meta.main) process.exit(await main())
