export const summary = "Generate the pages UI's lucide icon search index into a named code checkout"

import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { dirname, join, resolve } from "node:path"
import { $ } from "bun"
import * as z from "zod"
import { codeRoot } from "../../../lib/code-root.ts"
import { operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const LUCIDE_TAG = "0.576.0"

const LUCIDE_REPO = "https://github.com/lucide-icons/lucide"

const OUTPUT_REL = "shared/pages-core/src/generated/icon-search-index.generated.ts"

/** The directory the shards live in, beside the barrel, named for it. */
const SHARD_DIR_NAME = "icon-search-index"

const SHARD_DIR_REL = join(dirname(OUTPUT_REL), SHARD_DIR_NAME)

/** No emitted file may reach this many bytes. akasha refuses a file at 15000, and the
 *  slack between the two is what keeps a lucide release that grows its metadata from
 *  pushing a shard over without anybody noticing. */
const SHARD_CEILING_BYTES = 12_000

/** What a shard's header costs, over-estimated, so packing leaves room for it. */
const HEADER_ALLOWANCE_BYTES = 512

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
  envVars: [
    { name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." },
  ],
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

function byteLength(text: string): number {
  return new TextEncoder().encode(text).length
}

/** Greedily fills shards with whole lines, opening a new one before the running total
 *  would reach the ceiling. Every shard holds at least one line, however long it is. */
function packLines(lines: readonly string[]): readonly (readonly string[])[] {
  const shards: string[][] = []
  let current: string[] = []
  let bytes = HEADER_ALLOWANCE_BYTES
  for (const line of lines) {
    const cost = byteLength(line) + 1
    if (current.length > 0 && bytes + cost >= SHARD_CEILING_BYTES) {
      shards.push(current)
      current = []
      bytes = HEADER_ALLOWANCE_BYTES
    }
    current.push(line)
    bytes += cost
  }
  if (current.length > 0) shards.push(current)
  return shards
}

function ordinal(index: number): string {
  return String(index).padStart(2, "0")
}

const INDEX_SHARD_STEM = "entries"

const PASCAL_SHARD_STEM = "pascal-to-kebab"

function shardModule(stem: string, index: number): string {
  return `${stem}-${ordinal(index)}.generated`
}

function shardConst(name: string, index: number): string {
  return `${name}_${ordinal(index)}`
}

function shardHeader(what: string, index: number, total: number): string {
  return [
    `// DO NOT EDIT — regenerate with: ${REGENERATE}`,
    `// Source: ${LUCIDE_REPO} (tag ${LUCIDE_TAG})`,
    `// ${what} shard ${index + 1} of ${total}. Nothing imports a shard but the barrel`,
    `// beside this directory, which reassembles them.`,
    "",
    "",
  ].join("\n")
}

interface GeneratedFile {
  /** Path relative to the checkout root. */
  readonly rel: string
  readonly contents: string
}

function renderIndexShard(lines: readonly string[], index: number, total: number): GeneratedFile {
  return {
    rel: join(SHARD_DIR_REL, `${shardModule(INDEX_SHARD_STEM, index)}.ts`),
    contents:
      shardHeader("ICON_SEARCH_INDEX", index, total) +
      [
        `export const ${shardConst("ICON_SEARCH_INDEX", index)} = [`,
        ...lines,
        "] as const",
        "",
      ].join("\n"),
  }
}

function renderPascalShard(lines: readonly string[], index: number, total: number): GeneratedFile {
  return {
    rel: join(SHARD_DIR_REL, `${shardModule(PASCAL_SHARD_STEM, index)}.ts`),
    contents:
      shardHeader("PASCAL_TO_KEBAB", index, total) +
      [`export const ${shardConst("PASCAL_TO_KEBAB", index)} = {`, ...lines, "} as const", ""].join(
        "\n"
      ),
  }
}

function renderBarrel(indexShardCount: number, pascalShardCount: number): GeneratedFile {
  const header = [
    `// DO NOT EDIT — regenerate with: ${REGENERATE}`,
    `// Source: ${LUCIDE_REPO} (tag ${LUCIDE_TAG})`,
    "//",
    `// The index itself is emitted in shards under ./${SHARD_DIR_NAME}/, because whole it is`,
    "// far past the length akasha will hold a file at. This barrel puts it back together and",
    "// is the only module anything imports.",
    "",
    "",
  ].join("\n")

  const indexEach = <T>(f: (i: number) => T): T[] =>
    Array.from({ length: indexShardCount }, (_unused, i) => f(i))
  const pascalEach = <T>(f: (i: number) => T): T[] =>
    Array.from({ length: pascalShardCount }, (_unused, i) => f(i))

  const imports = [
    ...indexEach(
      (i) =>
        `import { ${shardConst("ICON_SEARCH_INDEX", i)} } from "./${SHARD_DIR_NAME}/${shardModule(INDEX_SHARD_STEM, i)}"`
    ),
    ...pascalEach(
      (i) =>
        `import { ${shardConst("PASCAL_TO_KEBAB", i)} } from "./${SHARD_DIR_NAME}/${shardModule(PASCAL_SHARD_STEM, i)}"`
    ),
  ]

  const body = [
    ...imports,
    "",
    "export const ICON_SEARCH_INDEX = [",
    ...indexEach((i) => `  ...${shardConst("ICON_SEARCH_INDEX", i)},`),
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
    ...pascalEach((i) => `  ...${shardConst("PASCAL_TO_KEBAB", i)},`),
    "}",
    "",
  ].join("\n")

  return { rel: OUTPUT_REL, contents: header + body }
}

function render(entries: readonly IconEntry[]): readonly GeneratedFile[] {
  const indexLines = entries.map((e) => {
    const aliases = e.aliases.map((a) => JSON.stringify(a)).join(", ")
    const kw = e.keywords.map((k) => JSON.stringify(k)).join(", ")
    return `  { name: ${JSON.stringify(e.name)}, aliases: [${aliases}], keywords: [${kw}] },`
  })

  const pascalLines = entries.map(
    (e) => `  ${JSON.stringify(kebabToPascal(e.name))}: ${JSON.stringify(e.name)},`
  )

  const indexShards = packLines(indexLines)
  const pascalShards = packLines(pascalLines)

  const files: GeneratedFile[] = [
    ...indexShards.map((lines, i) => renderIndexShard(lines, i, indexShards.length)),
    ...pascalShards.map((lines, i) => renderPascalShard(lines, i, pascalShards.length)),
    renderBarrel(indexShards.length, pascalShards.length),
  ]

  for (const file of files) {
    const size = byteLength(file.contents)
    if (size >= SHARD_CEILING_BYTES) {
      throw operationalError(
        `${file.rel} rendered to ${size} bytes, at or past the ${SHARD_CEILING_BYTES} byte ceiling, so nothing was written`
      )
    }
  }

  return files
}

export default async function pageIconSearchIndexGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())

  const shardDir = resolve(root, SHARD_DIR_REL)
  const scratch = mkdtempSync(join(realpathSync(SCRATCH_PARENT), SCRATCH_PREFIX))
  try {
    const iconsDir = await fetchRelease(scratch)
    const entries = readEntries(iconsDir)
    const files = render(entries)

    // The shard directory belongs to this command alone, so it is emptied first: a
    // release with fewer icons than the last one must not leave stale shards behind
    // for the barrel to have stopped importing.
    rmSync(shardDir, { recursive: true, force: true })
    mkdirSync(shardDir, { recursive: true })

    for (const file of files) writeFileSync(resolve(root, file.rel), file.contents)
    process.stdout.write(
      `Wrote ${entries.length} icons across ${files.length} files under ${root}\n`
    )
    for (const file of files) {
      process.stdout.write(`  ${byteLength(file.contents)}\t${file.rel}\n`)
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
