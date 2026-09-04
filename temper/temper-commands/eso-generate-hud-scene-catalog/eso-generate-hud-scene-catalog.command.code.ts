import { realpathSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages-system/code-root"
import { parseEsoDocApiVersion } from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiDir } from "@akasha/temper-eso-paths/eso-paths"
import type { HudComponentRecord } from "@akasha/temper-hud-components/hud-component-record"
import { HUD_SCENE_CATALOG_SCHEMA } from "@akasha/temper-hud-components/hud-component-record"
import { buildCatalog } from "@akasha/temper-hud-components/hud-scene-parse"
import { HUD_SCENE_SOURCE } from "@akasha/temper-hud-components/hud-scene-source"

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const DOC_REL = "ESOUIDocumentation.txt"

const CATALOG_DIR = "temper/temper-hud-components"

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

function valueOf(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
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

export async function esoGenerateHudSceneCatalog(argv: readonly string[] = []): Promise<Answer> {
  const named = valueOf(argv, CODE_ROOT_FLAG)

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const cloneDir = esouiDir()
  const scenePath = join(cloneDir, HUD_SCENE_SOURCE)
  const docPath = join(cloneDir, DOC_REL)

  let source: string
  let doc: string
  try {
    source = await readFile(scenePath, "utf8")
    doc = await readFile(docPath, "utf8")
  } catch (thrown) {
    return refused(
      `${scenePath} and ${docPath} are Zenimax's own UI source and are vendored in no repository here. ` +
        "Restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with ESOUI_SRC_DIR — " +
        saidShort(thrown),
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(doc)
  } catch (thrown) {
    return refused(`${docPath} states no API version — ${saidShort(thrown)}`, DATA)
  }

  const catalog = HUD_SCENE_CATALOG_SCHEMA.parse(buildCatalog(source, HUD_SCENE_SOURCE))
  if (catalog.length === 0) {
    return refused(
      `${scenePath} names no component. An empty catalog reads to every consumer as a clean answer, so nothing was written.`,
      DATA
    )
  }

  const rendered = CATALOG_MODULES.map((one) => {
    const held = catalog.filter(one.holds)
    return { slug: one.slug, body: renderModule(one.binding, held), count: held.length }
  })

  const tooLong = rendered.filter((one) => one.body.length > AKASHA_FILE_CEILING)
  if (tooLong.length > 0) {
    return refused(
      `${tooLong.map((one) => `${one.slug} would be ${String(one.body.length)} bytes`).join(", ")} — ` +
        `nothing under akasha/ may exceed ${String(AKASHA_FILE_CEILING)} bytes, so the catalog wants ` +
        "dividing into more modules before it is written again. Nothing was written.",
      DATA
    )
  }

  const written: string[] = []
  try {
    for (const one of rendered) {
      const outDir = resolve(root, CATALOG_DIR, one.slug)
      await mkdir(outDir, { recursive: true })
      const outPath = join(outDir, `${one.slug}.module.code.ts`)
      await writeFile(outPath, one.body)
      written.push(`${outPath} (${String(one.count)})`)
    }
  } catch (thrown) {
    return refused(`the catalog was not written whole — ${saidShort(thrown)}`, FAILED)
  }

  const fragments = catalog.filter((one) => one.kind === "fragment").length
  const uncategorized = catalog.filter((one) => one.category === "uncategorized").length
  return answering(
    [
      `wrote ${String(catalog.length)} component(s) — ${String(fragments)} fragment(s), ` +
        `${String(catalog.length - fragments)} non-fragment control(s), ` +
        `${String(uncategorized)} uncategorized`,
      `read from ${scenePath} at API version ${String(apiVersion)}`,
      ...written.map((one) => `wrote ${one}`),
    ],
    [],
    0
  )
}
