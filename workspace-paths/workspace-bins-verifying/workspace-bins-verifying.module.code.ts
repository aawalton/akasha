import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  expectedWorkspaceBinNames,
  findMissingBins,
} from "../workspace-bins/workspace-bins.module.code.ts"

const PREFIX = "verify-workspace-bins"

export type BinsVerdict = {
  readonly missing: readonly string[]
  readonly expected: number
  readonly said: string
}

export function binsVerdictAt(repoRoot: string): BinsVerdict {
  const expected = expectedWorkspaceBinNames(repoRoot)
  const binDir = join(repoRoot, "node_modules", ".bin")
  const present = new Set<string>(existsSync(binDir) ? readdirSync(binDir) : [])
  const missing = findMissingBins(expected, present)
  const counted = new Set(expected).size
  const said =
    missing.length > 0
      ? `${PREFIX}: ${missing.length}/${counted} workspace bin(s) missing from node_modules/.bin: ${missing.join(", ")}`
      : `${PREFIX}: all ${counted} workspace bins linked`
  return { missing, expected: counted, said }
}

function main(): never {
  const verdict = binsVerdictAt(codeRoot())
  console.error(verdict.said)
  process.exit(verdict.missing.length > 0 ? 1 : 0)
}

if (import.meta.main) main()
