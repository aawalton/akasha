export const summary = "Run the test suites you name and report the verdict `classifyRun` gives them — a green suite that exits non-zero on a leaked PGlite handle is a PASS, a genuinely failing one is still a FAIL"

import { statSync } from "node:fs"
import { join, resolve } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError, isInputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  decideNamedSuitesExit,
  isEnumerableTestPath,
  planSuiteRuns,
  type ResolvedSuiteArg,
  type SuiteRun,
  verdictForNamedSuites,
} from "../../lib/run-named-suites.ts"
import { runSelectedSuites } from "../../lib/run-selected-suites.ts"
import { emitVerdict } from "../../lib/verdict-channel.ts"

const PREFIX = "[tests run]"

export const help: CommandHelp = {
  verdict: "emits",
  positionals: [
    {
      name: "path",
      required: true,
      variadic: true,
      description:
        "Test path(s) to run, relative to the current directory — exactly what you would pass `bun test`. At least one is required.",
    },
  ],
  flags: [
    {
      name: "--timeout",
      argLabel: "<ms>",
      valueShape: "token",
      description:
        "Per-test timeout in milliseconds, passed through to `bun test`. Omitted, bun's 5s default applies.",
    },
  ],
  examples: [
    "ops tests run <path>",
    "ops tests run packages/agents/shared --timeout 30000",
  ],
}

const TEST_FILE_GLOBS = [
  "**/*.test.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
  "**/*.spec.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
  "**/*_test.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
  "**/*_spec.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
] as const

async function resolveSuiteArgs(
  root: string,
  args: readonly string[]
): Promise<readonly ResolvedSuiteArg[]> {
  const resolved: ResolvedSuiteArg[] = []
  for (const arg of args) {
    const full = resolve(root, arg)
    const stats = statSync(full, { throwIfNoEntry: false })
    if (stats === undefined) {
      resolved.push({ arg, files: null })
      continue
    }
    if (!stats.isDirectory()) {
      resolved.push({ arg, files: [arg] })
      continue
    }
    const files: string[] = []
    for (const glob of TEST_FILE_GLOBS) {
      for await (const rel of new Bun.Glob(glob).scan({ cwd: full, onlyFiles: true })) {
        if (!isEnumerableTestPath(rel)) continue
        files.push(join(arg, rel))
      }
    }
    resolved.push({ arg, files })
  }
  return resolved
}

export default async function testsRun(args: readonly string[]): Promise<void> {
  let parsed: ReturnType<typeof parseArgs>
  try {
    parsed = parseArgs(help, args)
  } catch (err) {
    if (isInputError(err)) throw dataError((err as Error).message)
    throw err
  }
  const suites = parsed.positionals
  if (suites.length === 0) {
    throw dataError(`${PREFIX} name at least one test path to run`)
  }
  const timeoutMs = parsed.nonNegativeInt("--timeout")

  const root = process.cwd()

  const groups = planSuiteRuns(await resolveSuiteArgs(root, suites))
  const runs: SuiteRun[] = []
  const transcript: string[] = []
  for (const group of groups) {
    const { output, exitCode } = await runSelectedSuites(root, group.paths, { timeoutMs })
    runs.push({ label: group.label, bunExitCode: exitCode, output })
    transcript.push(`${PREFIX} ${group.label} — ${group.paths.length} path(s)\n${output}`)
  }
  const verdict = verdictForNamedSuites({ runs, observedAtMs: Date.now() })
  const output = transcript.join("\n")

  if (output.length > 0) {
    process.stderr.write(output.endsWith("\n") ? output : `${output}\n`)
  }
  emitVerdict(verdict)
  const code = decideNamedSuitesExit(verdict)
  if (code !== 0) process.exit(code)
}
