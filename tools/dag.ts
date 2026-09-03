export const tool = {
  summary: "Print the domain DAG, composed from the pages now",
  path: "domain dag",
} as const

import { readFileSync } from "node:fs"
import { AKASHA, isDirty, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { listField, parseFrontmatter, textField } from "../page/frontmatter.ts"
import { listDocuments } from "./lib/check.ts"
import { DOMAIN_PARENTS_KEY, DOMAIN_SLUG_KEY } from "./lib/domain.ts"

const HELP = `bun tools/dag.ts — print the domain DAG, composed from the pages now

Every domain declared on any live document, indented beneath the domains it names in
\`${DOMAIN_PARENTS_KEY}:\`. Nothing is stored: this is the tree read at the moment of asking,
so it cannot disagree with the graph it describes.

A domain naming several parents is printed beneath each of them, that being what the edge
says; the repeats are the DAG rather than a defect in the rendering. A slug already open
further up its own branch is printed once and marked, so a cycle terminates rather than
running away.

Usage:
  bun ~/repos/akasha/tools/dag.ts
  bun ~/repos/akasha/tools/dag.ts --domain <slug>
  bun ~/repos/akasha/tools/dag.ts --up <slug>

Flags:
  --domain <slug>  Root the print at this domain instead of at the graph's roots. Repeatable.
  --up <slug>      Print what stands ABOVE this domain instead of below it, to the root.
  --paths          Print the document declaring each domain beside its slug.
  --help           This.

Exit codes:
  0  printed
  1  input error, or a named slug is no domain in this repo
`

interface Domain {
  readonly relPath: string
  readonly slug: string
  readonly parents: readonly string[]
}

function domainsIn(root: string): ReadonlyMap<string, Domain> {
  const found = new Map<string, Domain>()
  for (const relPath of listDocuments(root)) {
    if (isDirty(relPath)) continue
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    const frontmatter = parseFrontmatter(body)
    const slug = textField(frontmatter, DOMAIN_SLUG_KEY)
    if (slug === null || found.has(slug)) continue
    found.set(slug, {
      relPath,
      slug,
      parents: listField(frontmatter, DOMAIN_PARENTS_KEY).filter((one) => one !== slug),
    })
  }
  return found
}

function childrenOf(domains: ReadonlyMap<string, Domain>): ReadonlyMap<string, readonly string[]> {
  const children = new Map<string, string[]>()
  for (const one of [...domains.values()].sort((a, b) => a.slug.localeCompare(b.slug))) {
    for (const parent of one.parents)
      (children.get(parent) ?? children.set(parent, []).get(parent)!).push(one.slug)
  }
  return children
}

function label(slug: string, domains: ReadonlyMap<string, Domain>, paths: boolean): string {
  const at = domains.get(slug)
  if (at === undefined) return `${slug}  — declared by no document`
  return paths ? `${slug}  ${at.relPath}` : slug
}

function descend(
  slug: string,
  depth: number,
  open: ReadonlySet<string>,
  domains: ReadonlyMap<string, Domain>,
  children: ReadonlyMap<string, readonly string[]>,
  paths: boolean,
  into: string[]
): void {
  const indent = "  ".repeat(depth)
  if (open.has(slug)) {
    into.push(`${indent}${slug}  — already open above here`)
    return
  }
  into.push(`${indent}${label(slug, domains, paths)}`)
  const next = new Set([...open, slug])
  for (const child of children.get(slug) ?? [])
    descend(child, depth + 1, next, domains, children, paths, into)
}

function ascend(
  slug: string,
  domains: ReadonlyMap<string, Domain>,
  paths: boolean
): readonly string[] {
  const lines: string[] = [label(slug, domains, paths)]
  const seen = new Set([slug])
  let frontier = domains.get(slug)?.parents ?? []
  let depth = 1
  while (frontier.length > 0) {
    const next: string[] = []
    for (const one of frontier) {
      if (seen.has(one)) continue
      seen.add(one)
      lines.push(`${"  ".repeat(depth)}${label(one, domains, paths)}`)
      next.push(...(domains.get(one)?.parents ?? []))
    }
    frontier = next
    depth += 1
  }
  return lines
}

function argsFor(argv: readonly string[], flag: string): readonly string[] {
  return argv.flatMap((arg, at) => (arg === flag ? [argv[at + 1] ?? ""] : []))
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  const rooted = argsFor(argv, "--domain")
  const above = argsFor(argv, "--up")
  if ([...rooted, ...above].some((one) => one === "" || one.startsWith("-"))) {
    process.stderr.write("error: --domain and --up each need a slug\n")
    process.exit(1)
  }

  const domains = domainsIn(rootFor(resolveRoots(), AKASHA))
  const unknown = [...rooted, ...above].filter((slug) => !domains.has(slug))
  if (unknown.length > 0) {
    process.stderr.write(`error: no document declares ${unknown.join(", ")}\n`)
    process.exit(1)
  }

  const paths = argv.includes("--paths")
  if (above.length > 0) {
    process.stdout.write(
      `${above.map((slug) => ascend(slug, domains, paths).join("\n")).join("\n\n")}\n`
    )
    return
  }

  const children = childrenOf(domains)
  const from =
    rooted.length > 0
      ? rooted
      : [...domains.values()]
          .filter((one) => one.parents.length === 0)
          .map((one) => one.slug)
          .sort((a, b) => a.localeCompare(b))
  const lines: string[] = []
  for (const slug of from) descend(slug, 0, new Set(), domains, children, paths, lines)
  process.stdout.write(`${lines.join("\n")}\n`)
}

if (import.meta.main) main()
