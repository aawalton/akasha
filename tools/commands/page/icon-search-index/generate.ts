
export const summary = "Generate the pages UI's lucide icon search index into a named code checkout"

import { mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { $ } from "bun"
import * as z from "zod"
import { codeRoot } from "../../../lib/code-root.ts"
import { operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const LUCIDE_TAG = "0.576.0"

const LUCIDE_REPO = "https://github.com/lucide-icons/lucide"

const OUTPUT_REL = "shared/pages-core/src/generated/icon-search-index.generated.ts"

const SCRATCH_PARENT = "/var/tmp"

const SCRATCH_PREFIX = "ops-page-icon-search-index-"

const FETCH_CEILING_MS = 180_000

const REGENERATE = "ops page icon-search-index generate"

const iconMetaSchema = z.object({
  tags: z.unknown().optional(),
  aliases: z.unknown().optional(),
  categories: z.unknown().optional(),
})

type IconMeta = z.infer<typeof iconMetaSchema>

interface IconEntry {
  readonly name: string
  readonly aliases: readonly string[]
  readonly keywords: readonly string[]
}

export const help: CommandHelp = {
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout to write the generated file into. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  exits: [
    {
      code: 3,
      meaning: "the lucide release was not fetched within the ceiling, or did not unpack",
    },
  ],
  examples: ["ops page icon-search-index generate --code-root ~/repos/akasha"],
}

function addStrings(set: Set<string>, value: unknown): undefined {
  if (!Array.isArray(value)) return
  for (const v of value) {
    if (typeof v === "string") set.add(v.toLowerCase())
  }
}

function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((segment) => {
      const [first] = segment
      return first === undefined ? "" : first.toUpperCase() + segment.slice(1)
    })
    .join("")
}

function extractAliasNames(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  const out: string[] = []
  for (const v of value) {
    if (typeof v === "string") out.push(v.toLowerCase())
    else if (v && typeof v === "object" && "name" in v && typeof v.name === "string") {
      out.push(v.name.toLowerCase())
    }
  }
  return out.sort()
}

async function fetchRelease(into: string): Promise<string> {
  const url = `${LUCIDE_REPO}/archive/refs/tags/${LUCIDE_TAG}.tar.gz`
  const tarball = join(into, "lucide.tar.gz")
  process.stdout.write(`Fetching ${url}\n`)
  let bytes: ArrayBuffer
  try {
    const answer = await fetch(url, { signal: AbortSignal.timeout(FETCH_CEILING_MS) })
    if (!answer.ok) {
      throw operationalError(`${url} answered ${answer.status} ${answer.statusText}`)
    }
    bytes = await answer.arrayBuffer()
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw operationalError(
        `${url} did not arrive within ${FETCH_CEILING_MS / 1000}s, so the lucide ${LUCIDE_TAG} release was never fetched and no index was built`
      )
    }
    throw err
  }
  await Bun.write(tarball, bytes)
  await $`tar xzf ${tarball} -C ${into}`.quiet()
  const icons = join(into, `lucide-${LUCIDE_TAG}`, "icons")
  try {
    readdirSync(icons)
  } catch {
    throw operationalError(
      `the lucide ${LUCIDE_TAG} release unpacked without an \`icons\` directory at ${icons}`
    )
  }
  return icons
}

function readEntries(iconsDir: string): readonly IconEntry[] {
  const files = readdirSync(iconsDir)
    .filter((f) => f.endsWith(".json"))
    .sort()

  const entries: IconEntry[] = []
  for (const f of files) {
    const name = f.replace(/\.json$/, "")
    const meta: IconMeta = iconMetaSchema.parse(JSON.parse(readFileSync(join(iconsDir, f), "utf8")))
    const aliasNames = extractAliasNames(meta.aliases)
    const aliases = new Set(aliasNames)
    const keywords = new Set<string>()
    for (const token of name.split("-")) keywords.add(token.toLowerCase())
    addStrings(keywords, meta.tags)
    for (const a of aliasNames) keywords.add(a)
    addStrings(keywords, meta.categories)
    entries.push({
      name,
      aliases: [...aliases].sort(),
      keywords: [...keywords].sort(),
    })
  }
  return entries
}

function render(entries: readonly IconEntry[]): string {
  const header = [
    `// DO NOT EDIT — regenerate with: ${REGENERATE}`,
    `// Source: ${LUCIDE_REPO} (tag ${LUCIDE_TAG})`,
    "",
    "",
  ].join("\n")

  const indexLines = entries.map((e) => {
    const aliases = e.aliases.map((a) => JSON.stringify(a)).join(", ")
    const kw = e.keywords.map((k) => JSON.stringify(k)).join(", ")
    return `  { name: ${JSON.stringify(e.name)}, aliases: [${aliases}], keywords: [${kw}] },`
  })

  const pascalLines = entries.map(
    (e) => `  ${JSON.stringify(kebabToPascal(e.name))}: ${JSON.stringify(e.name)},`
  )

  const body = [
    "export const ICON_SEARCH_INDEX = [",
    ...indexLines,
    "] as const",
    "",
    'export type IconName = (typeof ICON_SEARCH_INDEX)[number]["name"]',
    "",
    "export const ICON_NAMES: readonly IconName[] = ICON_SEARCH_INDEX.map((e) => e.name)",
    "",
    "/** Maps lucide-react PascalCase export names (`FileText`, `Trash2`, `ArrowDown01`) to",
    " *  their canonical kebab-case name (`file-text`, `trash-2`, `arrow-down-0-1`).",
    " *  Needed because kebab→PascalCase is ambiguous for multi-digit names (e.g. `Clock10`",
    " *  vs `ArrowDown01`). */",
    "export const PASCAL_TO_KEBAB: Readonly<Record<string, IconName>> = {",
    ...pascalLines,
    "}",
    "",
  ].join("\n")

  return header + body
}

export default async function pageIconSearchIndexGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())


  const output = resolve(root, OUTPUT_REL)
  const scratch = mkdtempSync(join(realpathSync(SCRATCH_PARENT), SCRATCH_PREFIX))
  try {
    const iconsDir = await fetchRelease(scratch)
    const entries = readEntries(iconsDir)
    writeFileSync(output, render(entries))
    process.stdout.write(`Wrote ${entries.length} icons to ${output}\n`)
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
