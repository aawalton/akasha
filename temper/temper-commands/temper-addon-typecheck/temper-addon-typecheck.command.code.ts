import { resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { tstlConfigPathFor } from "@akasha/temper-addon-build/addon-tstl-config"
import { type AddonInfo, listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { ran } from "@akasha/utils-run/running"

const DATA = 2

const FAILED = 3

const ROOT_FLAG = "--code-root"

const COMPILER = ["bunx", "@typescript/native-preview", "--noEmit", "--listFiles", "-p"]

const CEILING_MS = 30 * 60 * 1000

const A_MINUTE = 60000

const SAYS_ERROR = "error TS"

type Judged = {
  readonly name: string
  readonly readFiles: number
  readonly ownFiles: number
  readonly errors: readonly string[]
  readonly code: number
}

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function inNameOrder(all: readonly AddonInfo[]): readonly AddonInfo[] {
  return [...all].sort((a, b) => a.canonicalName.localeCompare(b.canonicalName))
}

function judged(root: string, one: AddonInfo, config: string, left: number): Judged {
  const said = ran([...COMPILER, config], { cwd: root, timeout: left })
  const lines = `${said.out}\n${said.err}`.split("\n").map((line) => line.trim())
  const errors = lines.filter((line) => line.includes(SAYS_ERROR))
  const files = lines.filter((line) => line.startsWith("/") && !line.includes(SAYS_ERROR))
  return {
    name: one.canonicalName,
    readFiles: files.length,
    ownFiles: files.filter((line) => line.startsWith(`${one.dir}/`)).length,
    errors,
    code: said.code,
  }
}

function saidOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function rowOf(one: Judged): string {
  return `${one.name}: ${String(one.errors.length)} error(s), ${String(one.ownFiles)} own file(s) of ${String(one.readFiles)} read, exit ${String(one.code)}`
}

export async function temperAddonTypecheck(argv: readonly string[] = []): Promise<Answer> {
  const root = resolve(valuesOf(argv, ROOT_FLAG)[0] ?? codeRoot())

  const every = inNameOrder(listAllAddons({ repoRoot: root }))
  if (every.length === 0) {
    return refused(
      `${root} holds no addon folder carrying an addon manifest, so a clean run here would typecheck nothing`,
      DATA
    )
  }

  const deadline = Date.now() + CEILING_MS
  const done: Judged[] = []
  const unbuilt: string[] = []

  for (const one of every) {
    const left = deadline - Date.now()
    if (left <= 0) {
      return refused(
        `the run passed its ceiling of ${String(CEILING_MS / A_MINUTE)} minutes before ${one.canonicalName} was typechecked, so what it would have found is unknown`,
        FAILED
      )
    }

    let config: string | null
    try {
      config = await tstlConfigPathFor(root, one.dir, one.canonicalName)
    } catch (thrown) {
      return refused(
        `${one.canonicalName} names no settings the compiler could be run with — ${saidOf(thrown)}`,
        FAILED
      )
    }
    if (config === null) {
      unbuilt.push(one.canonicalName)
      continue
    }

    const said = judged(root, one, config, left)
    done.push(said)
    if (said.code !== 0) {
      return {
        report: [...said.errors, ...done.map(rowOf)],
        refusals: [
          `${said.name} does not typecheck against its own compiler settings (exit ${String(said.code)}, ${String(said.errors.length)} error(s)), so the addons after it were left unread`,
        ],
        code: FAILED,
      }
    }
    if (said.ownFiles === 0) {
      return {
        report: done.map(rowOf),
        refusals: [
          `${said.name} compiled none of its own ${String(said.readFiles)} read file(s), so a clean result here is a result over nothing`,
        ],
        code: FAILED,
      }
    }
  }

  const readFiles = done.reduce((sum, one) => sum + one.readFiles, 0)
  const ownFiles = done.reduce((sum, one) => sum + one.ownFiles, 0)
  const report = [...done.map(rowOf)]
  for (const name of unbuilt) {
    report.push(`${name}: no bundle entry is named, so nothing of it was compiled`)
  }
  report.push(
    `typechecked ${String(done.length)} addon(s) of the ${String(every.length)} under ${root}: read ${String(readFiles)} file(s), ${String(ownFiles)} of them the addons' own`
  )
  return { report, refusals: [], code: 0 }
}
