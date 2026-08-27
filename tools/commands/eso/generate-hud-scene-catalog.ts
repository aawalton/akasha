
export const summary =
  "Rebuild the HUD scene component catalog this repository carries from the ~/esoui clone"

import { realpathSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { buildCatalog } from "../../../temper/shared-interface-hud-scene-catalog/src/parse.ts"
import { HudSceneCatalogSchema } from "../../../temper/shared-interface-hud-scene-catalog/src/schema.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { esoPaths } from "../../lib/eso-clone-code.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-hud-scene-catalog"

const REGENERATE_WITH = "ops eso generate-hud-scene-catalog"

const REL_SOURCE = "esoui/ingame/scenes/hudscene.lua"

const REL_DOC = "ESOUIDocumentation.txt"

const CATALOG_DIR = "temper/shared-interface-hud-scene-catalog/src"

export const help: CommandHelp = {
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout the catalog is written into. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  exits: [{ code: 2, meaning: "the scene source names no component" }],
  examples: ["ops eso generate-hud-scene-catalog --code-root ~/repos/akasha"],
}

function render(json: string, apiVersion: number, headerLines: readonly [string, string]): string {
  const stamp = headerLines.map((line) => `// ${line}`).join("\n")
  return `// GENERATED — do not edit by hand. Regenerate with:
//   ${REGENERATE_WITH}
// Source: ${REL_SOURCE}
${stamp}
//
// One record per distinct UI component in ESO's main/gameplay scene, at the
// seam ESO exposes (one fragment / one top-level control = one component).
// The GuiRoot-parented + runtime-created blind-spot is documented, bounded, and
// out of this single-file source-walk by design — see ../../CLAUDE.md.

import type { HudComponentRecord } from "../schema"

export const HUD_SCENE_CATALOG = ${json} as const satisfies readonly HudComponentRecord[]
`
}

async function readClone(path: string, what: string): Promise<string> {
  try {
    return await readFile(path, "utf-8")
  } catch (cause) {
    throw inputError(
      `Cannot read ${what} at ${path}. It is part of the copyright-Zenimax ESO UI source and is vendored in no repository here. Restore the peer clone with \`git clone https://github.com/esoui/esoui.git ~/esoui\`, or point ESOUI_SRC_DIR at your checkout. ${String(cause)}`
    )
  }
}

export default async function esoGenerateHudSceneCatalog(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = realpathSync(parsed.string("--code-root") ?? codeRoot())


  const paths = await esoPaths()
  const cloneDir = paths.esouiDir()

  const source = await readClone(join(cloneDir, REL_SOURCE), "hudscene.lua")
  const doc = await readClone(join(cloneDir, REL_DOC), REL_DOC)
  const apiVersion = paths.parseEsoDocApiVersion(doc)


  const validated = HudSceneCatalogSchema.parse(buildCatalog(source, REL_SOURCE))
  if (validated.length === 0) {
    throw dataError(
      `${join(cloneDir, REL_SOURCE)} names no component — an empty catalog reads to every consumer as a clean answer, so nothing was written`
    )
  }

  const outDir = resolve(root, CATALOG_DIR, "generated")
  await mkdir(outDir, { recursive: true })
  const outPath = join(outDir, "hud-scene-catalog.generated.ts")
  await writeFile(
    outPath,
    render(
      JSON.stringify(validated, null, 2),
      apiVersion,
      paths.esoCloneHeaderLines(SELF, apiVersion)
    )
  )

  const fragments = validated.filter((one) => one.kind === "fragment").length
  const uncategorized = validated.filter((one) => one.category === "uncategorized").length
  process.stdout.write(
    `wrote ${validated.length} component(s) — ${fragments} fragment(s), ` +
      `${validated.length - fragments} non-fragment control(s), ` +
      `${uncategorized} uncategorized — from ${join(cloneDir, REL_SOURCE)} (API ${apiVersion}) → ${outPath}\n`
  )
}
