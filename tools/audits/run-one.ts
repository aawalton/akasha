import { writeFileSync } from "node:fs"
import { AUDITS, judgeOne, viewsOf } from "./audits.ts"

/**
 * Runs one audit and writes what it judged, as JSON, to the file named by
 * `--out`.
 *
 * The verdict goes to a file rather than to stdout because an audit is free to
 * write to stdout itself, and a verdict a stray line has broken reads as an
 * audit that died. Whatever this process says on stdout and stderr is the
 * audit's own, kept for the parent to quote when no verdict arrives.
 *
 * This exits 0 whatever the audit judged. The verdict is in the file; the exit
 * code here says only whether the audit got as far as answering. `services/
 * audits-watchdog.ts` is what turns a refusal into a red unit.
 */
async function main(argv: readonly string[]): Promise<number> {
  const name = argv[0]
  const at = argv.indexOf("--out")
  const out = at === -1 ? undefined : argv[at + 1]
  const deadline = argv.indexOf("--deadline-ms")
  const budgetMs = deadline === -1 ? 600_000 : Number(argv[deadline + 1])
  if (name === undefined || out === undefined || !Number.isFinite(budgetMs)) {
    process.stderr.write(
      "usage: bun tools/audits/run-one.ts <audit> --out <path> [--deadline-ms <n>]\n"
    )
    return 2
  }
  const levied = AUDITS[name]
  if (levied === undefined) {
    process.stderr.write(`\`${name}\` is not one of: ${Object.keys(AUDITS).join(", ")}\n`)
    return 2
  }
  const outcomes = await judgeOne(name, levied, viewsOf(), Date.now() + budgetMs)
  writeFileSync(out, JSON.stringify(outcomes), "utf8")
  return 0
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
