export const summary =
  "Generate the pages UI's lucide icon search index as page bodies staged for `akasha write`"

import {
  existsSync,
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

/** Every page this writes lives under here, one folder per page, named for its slug. */
const GENERATED_DIR_REL = "akasha/pages-system/pages-core/generated"

/** The slug of the page that reassembles the shards. Nothing outside imports a shard. */
const AGGREGATE_SLUG = "icon-search-index"

const OUTPUT_REL = join(
  GENERATED_DIR_REL,
  AGGREGATE_SLUG,
  `${AGGREGATE_SLUG}.module.code.ts`
)

const INDEX_SHARD_STEM = "entries"

const PASCAL_SHARD_STEM = "pascal-to-kebab"

/** akasha refuses a file at this many bytes, and it judges the body AFTER it has formatted
 *  it. Nothing here can see the formatted body, so this is a floor, not the real gate:
 *  a body under this may still land over it once formatted. */
const AKASHA_FILE_CEILING_BYTES = 15_000

/** A packing budget, measured against the body BEFORE akasha formats it.
 *
 *  This is the whole subtlety of the two numbers below. akasha formats every body as it
 *  lands, and formatting an entry written on one long line explodes it onto one line per
 *  keyword — up to about 1.5x. An 11.4 KB entries body landed as 16.0 KB and was refused.
 *  So the budget an entries shard is packed against has to leave room for that growth,
 *  while the pascal-to-kebab bodies are already one short pair per line and land
 *  byte-for-byte as written, so they need none.
 *
 *  `reserve` is charged against the budget before the first line, for whatever the shard
 *  wraps its lines in. */
interface Budget {
  readonly bytes: number
  readonly reserve: number
}

/** 8000 raw packs 1702 icons into 38 shards whose largest raw body is 8046 bytes, which
 *  formats to 12027 and lands. Nothing is reserved because a shard carries no header. */
const INDEX_BUDGET: Budget = { bytes: 8_000, reserve: 0 }

/** These land unchanged by formatting, so the budget is the one the 15000 refusal was
 *  always read against, with the same slack under it. */
const PASCAL_BUDGET: Budget = { bytes: 12_000, reserve: 512 }

const SCRATCH_PARENT = "/var/tmp"

const SCRATCH_PREFIX = "ops-page-icon-search-index-"

const STAGE_PREFIX = "ops-page-icon-search-index-stage-"

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
  description:
    "Builds every page of the icon search index and stages the bodies, then prints the `akasha write` call that lands them. It lands nothing itself: the generated pages live under `akasha/`, and only `akasha write` may put a body there.",
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout the staged bodies are built against — where the page ids already in use are read from. Defaults to $CODE_ROOT, else this repository.",
    },
    {
      name: "--stage",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The directory the bodies are staged in. Defaults to a fresh directory under /var/tmp, which is left standing for the `akasha write` call to read.",
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

/** The export name a page file carries, which is its slug in camel. */
function kebabToCamel(slug: string): string {
  const [head, ...rest] = slug.split("-")
  return (head ?? "") + rest.map((segment) => kebabToPascal(segment)).join("")
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
 *  would reach the budget. Every shard holds at least one line, however long it is. */
function packLines(lines: readonly string[], budget: Budget): readonly (readonly string[])[] {
  const shards: string[][] = []
  let current: string[] = []
  let bytes = budget.reserve
  for (const line of lines) {
    const cost = byteLength(line) + 1
    if (current.length > 0 && bytes + cost >= budget.bytes) {
      shards.push(current)
      current = []
      bytes = budget.reserve
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

function shardSlug(stem: string, index: number): string {
  return `${stem}-${ordinal(index)}`
}

function shardConst(name: string, index: number): string {
  return `${name}_${ordinal(index)}`
}

/** One page: its code body, and the page file declaring the page that body belongs to. */
interface GeneratedPage {
  readonly slug: string
  readonly definition: string
  /** The code body, relative to the checkout root. */
  readonly codeRel: string
  readonly code: string
  /** The page file, relative to the checkout root. */
  readonly pageRel: string
}

function folderOf(slug: string): string {
  return join(GENERATED_DIR_REL, slug)
}

function codeRelOf(slug: string): string {
  return join(folderOf(slug), `${slug}.module.code.ts`)
}

function pageRelOf(slug: string): string {
  return join(folderOf(slug), `${slug}.module.ts`)
}

/** Reuses the id already standing at a slug. A page's identity is a uuid v7 that does not
 *  change when anything else about the page does, so a shard that stood before keeps the
 *  id it had and only a shard that is new gets a fresh one. */
function pageIdFor(root: string, slug: string): string {
  const at = resolve(root, pageRelOf(slug))
  if (existsSync(at)) {
    const found = /^\s*id:\s*"([0-9a-f-]{36})",?\s*$/m.exec(readFileSync(at, "utf8"))
    if (found?.[1] !== undefined) return found[1]
  }
  return Bun.randomUUIDv7()
}

function renderPageFile(root: string, slug: string, definition: string): string {
  return (
    [
      'import type { Module } from "@akasha/code-system/module"',
      "",
      `export const ${kebabToCamel(slug)} = {`,
      `  id: ${JSON.stringify(pageIdFor(root, slug))},`,
      '  pageTypeSlug: "module",',
      `  slug: ${JSON.stringify(slug)},`,
      `  definition: ${JSON.stringify(definition)},`,
      '  code: "ts",',
      "} as const satisfies Module",
    ].join("\n") + "\n"
  )
}

function renderIndexShard(lines: readonly string[], index: number): GeneratedPage {
  const slug = shardSlug(INDEX_SHARD_STEM, index)
  return {
    slug,
    definition: `part ${ordinal(index)} of the icons the search index holds`,
    codeRel: codeRelOf(slug),
    code:
      [`export const ${shardConst("ICON_SEARCH_INDEX", index)} = [`, ...lines, "] as const"].join(
        "\n"
      ) + "\n",
    pageRel: pageRelOf(slug),
  }
}

function renderPascalShard(lines: readonly string[], index: number): GeneratedPage {
  const slug = shardSlug(PASCAL_SHARD_STEM, index)
  return {
    slug,
    definition: `part ${ordinal(index)} of the icon names in Pascal read as kebab`,
    codeRel: codeRelOf(slug),
    code:
      [`export const ${shardConst("PASCAL_TO_KEBAB", index)} = {`, ...lines, "} as const"].join(
        "\n"
      ) + "\n",
    pageRel: pageRelOf(slug),
  }
}

/** The one page anything outside this folder imports. It reaches its shards by the path
 *  each shard's code stands at, which is a sibling folder named for the shard's slug. */
function renderAggregate(indexShardCount: number, pascalShardCount: number): GeneratedPage {
  const indexEach = <T>(f: (i: number) => T): T[] =>
    Array.from({ length: indexShardCount }, (_unused, i) => f(i))
  const pascalEach = <T>(f: (i: number) => T): T[] =>
    Array.from({ length: pascalShardCount }, (_unused, i) => f(i))

  const importOf = (constName: string, slug: string): string =>
    `import { ${constName} } from "../${slug}/${slug}.module.code.ts"`

  const body = [
    ...indexEach((i) =>
      importOf(shardConst("ICON_SEARCH_INDEX", i), shardSlug(INDEX_SHARD_STEM, i))
    ),
    ...pascalEach((i) =>
      importOf(shardConst("PASCAL_TO_KEBAB", i), shardSlug(PASCAL_SHARD_STEM, i))
    ),
    "",
    "export const ICON_SEARCH_INDEX = [",
    ...indexEach((i) => `  ...${shardConst("ICON_SEARCH_INDEX", i)},`),
    "] as const",
    "",
    'export type IconName = (typeof ICON_SEARCH_INDEX)[number]["name"]',
    "",
    "export const ICON_NAMES: readonly IconName[] = ICON_SEARCH_INDEX.map((e) => e.name)",
    "",
    "export const PASCAL_TO_KEBAB: Readonly<Record<string, IconName>> = {",
    ...pascalEach((i) => `  ...${shardConst("PASCAL_TO_KEBAB", i)},`),
    "}",
  ].join("\n")

  return {
    slug: AGGREGATE_SLUG,
    definition: "the icons a search over them runs against",
    codeRel: OUTPUT_REL,
    code: `${body}\n`,
    pageRel: pageRelOf(AGGREGATE_SLUG),
  }
}

function overlongLine(lines: readonly string[], budget: Budget, what: string): undefined {
  for (const line of lines) {
    const size = byteLength(line)
    if (size + budget.reserve >= budget.bytes) {
      throw operationalError(
        `${what} rendered to ${size} bytes on one line, which no shard of ${budget.bytes} bytes can hold, so nothing was staged: ${line.trim().slice(0, 120)}`
      )
    }
  }
}

function render(entries: readonly IconEntry[]): readonly GeneratedPage[] {
  const indexLines = entries.map((e) => {
    const aliases = e.aliases.map((a) => JSON.stringify(a)).join(", ")
    const kw = e.keywords.map((k) => JSON.stringify(k)).join(", ")
    return `  { name: ${JSON.stringify(e.name)}, aliases: [${aliases}], keywords: [${kw}] },`
  })

  const pascalLines = entries.map(
    (e) => `  ${JSON.stringify(kebabToPascal(e.name))}: ${JSON.stringify(e.name)},`
  )

  // A shard holds at least one line however long it is, so a single line past the budget
  // is the one thing packing cannot absorb, and it is what a lucide release growing one
  // icon's keywords without bound would look like. Everything else the budget covers.
  overlongLine(indexLines, INDEX_BUDGET, "an ICON_SEARCH_INDEX entry")
  overlongLine(pascalLines, PASCAL_BUDGET, "a PASCAL_TO_KEBAB pair")

  const indexShards = packLines(indexLines, INDEX_BUDGET)
  const pascalShards = packLines(pascalLines, PASCAL_BUDGET)

  const pages: GeneratedPage[] = [
    ...indexShards.map((lines, i) => renderIndexShard(lines, i)),
    ...pascalShards.map((lines, i) => renderPascalShard(lines, i)),
    renderAggregate(indexShards.length, pascalShards.length),
  ]

  for (const page of pages) {
    const size = byteLength(page.code)
    if (size >= AKASHA_FILE_CEILING_BYTES) {
      throw operationalError(
        `${page.codeRel} rendered to ${size} bytes, at or past the ${AKASHA_FILE_CEILING_BYTES} byte refusal, so nothing was staged`
      )
    }
  }

  return pages
}

/** The slugs of the shards that stand in the checkout now, whether or not this run keeps
 *  them. A lucide release with fewer icons packs into fewer shards, and the ones that are
 *  no longer reached have to go rather than sit unimported. */
function shardSlugsStanding(root: string): readonly string[] {
  const at = resolve(root, GENERATED_DIR_REL)
  if (!existsSync(at)) return []
  return readdirSync(at, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
    .filter((name) => /^(entries|pascal-to-kebab)-\d\d$/.test(name))
    .sort()
}

function quoted(word: string): string {
  return `'${word.replaceAll("'", `'\\''`)}'`
}

/** Writes the bodies into the staging directory and the script that lands them. Nothing
 *  under `akasha/` is touched: a body only reaches there through `akasha write`, and a
 *  file written there any other way is put back by the hook that watches for it. */
function stagePages(
  stage: string,
  pages: readonly GeneratedPage[],
  root: string,
  goneSlugs: readonly string[]
): string {
  const argv: string[] = []
  for (const page of pages) {
    for (const [rel, body] of [
      [page.codeRel, page.code],
      [page.pageRel, renderPageFile(root, page.slug, page.definition)],
    ] as const) {
      const at = join(stage, rel)
      mkdirSync(dirname(at), { recursive: true })
      writeFileSync(at, body)
      argv.push("--file-path", rel, "--content-file", at)
    }
  }
  // A removed page carries the files standing beside it, so naming the page file takes
  // the code body with it and empties the folder.
  for (const slug of goneSlugs) argv.push("--remove", pageRelOf(slug))

  const messageAt = join(stage, "message.txt")
  writeFileSync(
    messageAt,
    `regenerate the icon search index from lucide ${LUCIDE_TAG}\n\nWritten by \`${REGENERATE}\`.\n`
  )
  argv.push("--message-file", messageAt)

  const landAt = join(stage, "land.sh")
  writeFileSync(landAt, `#!/usr/bin/env bash\nset -euo pipefail\nakasha write \\\n  ${argv.map(quoted).join(" \\\n  ")}\n`)
  return landAt
}

/** The staging directory is left standing after this returns, because the `akasha write`
 *  call that lands what is in it is made afterwards by whoever ran this. */
function stagingAt(named: string | undefined): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_PARENT), STAGE_PREFIX))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}

export default async function pageIconSearchIndexGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())

  const stage = stagingAt(parsed.string("--stage"))

  const scratch = mkdtempSync(join(realpathSync(SCRATCH_PARENT), SCRATCH_PREFIX))
  try {
    const iconsDir = await fetchRelease(scratch)
    const entries = readEntries(iconsDir)
    const pages = render(entries)

    const standing = shardSlugsStanding(root)
    const kept = new Set(pages.map((one) => one.slug))
    const gone = standing.filter((slug) => !kept.has(slug))
    const landAt = stagePages(stage, pages, root, gone)

    process.stdout.write(
      `Staged ${entries.length} icons across ${pages.length} pages (${pages.length * 2} files) under ${stage}\n`
    )
    for (const page of pages) {
      process.stdout.write(`  ${byteLength(page.code)}\t${page.codeRel}\n`)
    }
    for (const slug of gone) process.stdout.write(`  gone\t${folderOf(slug)}\n`)

    process.stdout.write(`\nNothing has landed. To land what was staged, run:\n  bash ${landAt}\n`)
    process.stdout.write(
      "\nakasha refuses a write over a body the read record does not show you read, so every\n" +
        "page above that already stands has to be read with `akasha read` first, or the call\n" +
        "has to break the glass — which also passes the checks that judge the sizes.\n"
    )

    // GAP: the pages-core workspace-package page lists every module slug beneath it in
    // `partSlugs`, and nothing here writes that list. A run that changes how many shards
    // there are leaves that page naming shards that went and not naming shards that came.
    const stood = new Set(standing)
    const arrived = [...kept].filter((slug) => slug !== AGGREGATE_SLUG && !stood.has(slug)).sort()
    if (arrived.length > 0 || gone.length > 0) {
      process.stdout.write(
        "\nThe shard count changed, so the pages-core workspace-package page's `partSlugs`\n" +
          "no longer matches what stands. Nothing here writes that list; edit it by hand:\n"
      )
      for (const slug of arrived) process.stdout.write(`  add     module/${slug}\n`)
      for (const slug of gone) process.stdout.write(`  remove  module/${slug}\n`)
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}
