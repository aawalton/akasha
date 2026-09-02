
export const summary =
  "Rebuild the HUD scene component catalog this repository carries from the ~/esoui clone"

import { realpathSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import type { HudComponentRecord } from "@akasha/temper-hud-components/hud-component-record"
import { HUD_SCENE_CATALOG_SCHEMA } from "@akasha/temper-hud-components/hud-component-record"
import { buildCatalog } from "@akasha/temper-hud-components/hud-scene-parse"
import { HUD_SCENE_SOURCE } from "@akasha/temper-hud-components/hud-scene-source"
import { codeRoot } from "../../lib/code-root.ts"
import { esoPaths } from "../../lib/eso-clone-code.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-hud-scene-catalog"

const REL_DOC = "ESOUIDocumentation.txt"

const CATALOG_DIR = "akasha/temper/temper-hud-components"

// Nothing under akasha/ may exceed this, and no kind of file is exempt.
const AKASHA_FILE_CEILING = 15000

interface CatalogModule {
  readonly slug: string
  readonly binding: string
  readonly holds: (record: HudComponentRecord) => boolean
}

const CATALOG_MODULES: readonly CatalogModule[] = [
  {
    slug: "hud-fragment-group",
    binding: "HUD_FRAGMENT_GROUP",
    holds: (record) => record.hideMechanism === "fragment-group",
  },
  {
    slug: "hud-scene-fragments",
    binding: "HUD_SCENE_FRAGMENTS",
    holds: (record) => record.hideMechanism === "scene-fragment",
  },
  {
    slug: "hud-controls",
    binding: "HUD_CONTROLS",
    holds: (record) => record.kind === "non-fragment-control",
  },
]

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
  exits: [
    { code: 2, meaning: "the scene source names no component" },
    { code: 2, meaning: "a rendered module would exceed the 15,000 byte akasha ceiling" },
  ],
  examples: ["ops eso generate-hud-scene-catalog --code-root ~/repos/akasha"],
}

function renderRecord(record: HudComponentRecord): string {
  const lines = [
    "  {",
    `    id: ${JSON.stringify(record.id)},`,
    `    name: ${JSON.stringify(record.name)},`,
    `    esoGlobal: ${JSON.stringify(record.esoGlobal)},`,
    `    kind: ${JSON.stringify(record.kind)},`,
    `    hideMechanism: ${JSON.stringify(record.hideMechanism)},`,
    `    scenes: [${record.scenes.map((scene) => JSON.stringify(scene)).join(", ")}],`,
    `    category: ${JSON.stringify(record.category)},`,
    `    source: { file: HUD_SCENE_SOURCE, line: ${String(record.source.line)} },`,
    `    conditional: ${String(record.conditional)},`,
    `    wrapsMultiple: ${String(record.wrapsMultiple)},`,
  ]
  if (record.grainNotes !== undefined) {
    lines.push(`    grainNotes: ${JSON.stringify(record.grainNotes)},`)
  }
  lines.push("  },")
  return lines.join("\n")
}

function renderModule(binding: string, records: readonly HudComponentRecord[]): string {
  return `import type { HudComponentRecord } from "../hud-component-record/hud-component-record.module.code.ts"
import { HUD_SCENE_SOURCE } from "../hud-scene-source/hud-scene-source.module.code.ts"

export const ${binding} = [
${records.map(renderRecord).join("\n")}
] as const satisfies readonly HudComponentRecord[]
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

  const source = await readClone(join(cloneDir, HUD_SCENE_SOURCE), "hudscene.lua")
  const doc = await readClone(join(cloneDir, REL_DOC), REL_DOC)
  const apiVersion = paths.parseEsoDocApiVersion(doc)

  const validated = HUD_SCENE_CATALOG_SCHEMA.parse(buildCatalog(source, HUD_SCENE_SOURCE))
  if (validated.length === 0) {
    throw dataError(
      `${join(cloneDir, HUD_SCENE_SOURCE)} names no component — an empty catalog reads to every consumer as a clean answer, so nothing was written`
    )
  }

  const rendered = CATALOG_MODULES.map((one) => ({
    slug: one.slug,
    body: renderModule(one.binding, validated.filter(one.holds)),
    count: validated.filter(one.holds).length,
  }))

  const tooLong = rendered.filter((one) => one.body.length > AKASHA_FILE_CEILING)
  if (tooLong.length > 0) {
    throw dataError(
      `${tooLong
        .map((one) => `${one.slug} would be ${String(one.body.length)} bytes`)
        .join(", ")} — nothing under akasha/ may exceed ${String(AKASHA_FILE_CEILING)} bytes, so the catalog wants splitting into more modules before it is regenerated. Nothing was written.`
    )
  }

  const written: string[] = []
  for (const one of rendered) {
    const outDir = resolve(root, CATALOG_DIR, one.slug)
    await mkdir(outDir, { recursive: true })
    const outPath = join(outDir, `${one.slug}.module.code.ts`)
    await writeFile(outPath, one.body)
    written.push(`${outPath} (${String(one.count)})`)
  }

  const fragments = validated.filter((one) => one.kind === "fragment").length
  const uncategorized = validated.filter((one) => one.category === "uncategorized").length
  process.stdout.write(
    `${SELF} wrote ${String(validated.length)} component(s) — ${String(fragments)} fragment(s), ` +
      `${String(validated.length - fragments)} non-fragment control(s), ` +
      `${String(uncategorized)} uncategorized — from ${join(cloneDir, HUD_SCENE_SOURCE)} ` +
      `(API ${String(apiVersion)}) → ${written.join(", ")}\n`
  )
}
