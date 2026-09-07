import { resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages/code-root"
import { type AddonInfo, listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { valuesOf } from "../argument-word-reading/argument-word-reading.module.code.ts"

const DATA = 2

const ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const SPACES = 2

function widthOf(all: readonly AddonInfo[], of: (one: AddonInfo) => string): number {
  return all.reduce((widest, one) => Math.max(widest, of(one).length), 0)
}

function rowsOf(all: readonly AddonInfo[]): readonly string[] {
  const nameWidth = widthOf(all, (one) => one.canonicalName)
  const dirWidth = widthOf(all, (one) => one.repoRelDir)
  return all.map(
    (one) =>
      `${one.canonicalName.padEnd(nameWidth)}  ${one.repoRelDir.padEnd(dirWidth)}  closure=${String(one.workspaceClosure.length)}`
  )
}

export function temperAddonList(argv: readonly string[] = []): Answer {
  const root = resolve(valuesOf(argv, ROOT_FLAG)[0] ?? codeRoot())

  const all = listAllAddons({ repoRoot: root })
  if (all.length === 0) {
    return refused(
      `${root} holds no addon folder carrying an addon manifest, so a clean run here would name no addon`,
      DATA
    )
  }

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify(all, null, SPACES).split("\n"), refusals: [], code: 0 }
  }

  return {
    report: [...rowsOf(all), `${String(all.length)} addon(s) under ${root}`],
    refusals: [],
    code: 0,
  }
}
