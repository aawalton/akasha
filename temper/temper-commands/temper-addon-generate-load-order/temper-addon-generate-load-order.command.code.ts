import { resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"
import { writeLoadOrder } from "@akasha/temper-addon-build/addon-load-order"
import { listAllAddons, resolveAddon } from "@akasha/temper-addons-resolve/addon-roster"

const SAID_WRONG = 1
const DATA = 2

const ADDON = "--addon"
const CODE_ROOT = "--code-root"

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

export async function temperAddonGenerateLoadOrder(argv: readonly string[] = []): Promise<Answer> {
  const asked = valuesOf(argv, ADDON)
  if (asked.length === 0) {
    return refused(
      `name the addon a load order is written for with ${ADDON}, since writing one for an addon nobody named would overwrite build output nobody asked about`,
      SAID_WRONG
    )
  }
  if (asked.length > 1) {
    return refused(
      `one load order is written at a time, and ${asked.join(", ")} names several`,
      SAID_WRONG
    )
  }

  const root = resolve(valuesOf(argv, CODE_ROOT)[0] ?? codeRoot())
  const roster = listAllAddons({ repoRoot: root })
  const name = asked[0] as string
  const found = resolveAddon(name, { repoRoot: root })
  if (!roster.some((one) => one.dir === found.dir)) {
    return refused(
      `${name} names no addon under ${root}, whose roster holds ${String(roster.length)} of them`,
      DATA
    )
  }

  try {
    const written = await writeLoadOrder(root, found.dir, found.canonicalName)
    return {
      report: [
        `wrote ${found.canonicalName} over ${String(written.luaCount)} Lua file(s) from ${found.dir}`,
        `${String(written.bytes)} byte(s) at ${written.manifestPath}, beside ${written.buildIdPath}`,
      ],
      refusals: [],
      code: 0,
    }
  } catch (thrown) {
    return refused(`${found.canonicalName}: ${messageOf(thrown)}`, DATA)
  }
}
