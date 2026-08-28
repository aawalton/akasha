export const tool = {
  summary: "Print who is answerable for what, composed from the files now",
  path: "domain champions",
} as const

import { PERSONA_CHAMPION_KEY } from "./lib/domain.ts"
import { answersForPath, pathRecord } from "./lib/champions-path.ts"
import { type Filed, type Held, readRoster, type Roster } from "./lib/champions-roster.ts"
import { type DomainRow, championTree, treeLines, treeRecord } from "./lib/champions-tree.ts"
import { outOfBounds } from "../repo/path/path.ts"
import { AKASHA, resolveRoots, rootFor } from "../repo/roots/roots.ts"

const SUBJECT_KEY = "slug"

const HELP = `bun tools/champions.ts — print who is answerable for what, composed from the files now

A persona champions the domain whose document names her in \`${PERSONA_CHAMPION_KEY}:\`, and with it every
domain beneath that one, down to where the next persona is named. Championing a domain is answering
for it rather than holding it: any agent may change it without asking her. The findings and
initiatives whose own \`${SUBJECT_KEY}:\` key names those domains are hers along with them. Nothing
is stored: this is the file tree read at the moment of asking, so it cannot disagree with the graph it
describes.

Every finding here is one nobody has decided about. A finding is deleted at the moment a decision is
made about it rather than kept against the work landing, so the store holds no other kind and the
count is the whole of what it says. Initiatives are counted apart from findings and never into the
same number, one key naming the domain on both.

Usage:
  bun ~/repos/akasha/tools/champions.ts --persona <name>
  bun ~/repos/akasha/tools/champions.ts --all
  bun ~/repos/akasha/tools/champions.ts --domain <slug>
  bun ~/repos/akasha/tools/champions.ts --tree [--json]
  bun ~/repos/akasha/tools/champions.ts --path <relPath> [--json]

Flags:
  --persona <name>  Every domain she champions, with what is filed against each,
                    each beside the document declaring it. Repeatable.
  --all             Every persona championing a domain, ranked by the findings filed against
                    it, with the per-domain breakdown under each.
  --domain <slug>   The reverse: who answers for this domain, and the document naming her.
                    Repeatable.
  --tree            Every domain laid out beneath the one parent championing descends, with the
                    persona answering for each beside it. This is a TREE and each domain stands
                    in exactly one place, where \`dag.ts\` draws the parent DAG and prints a
                    domain once per parent. A domain no root reaches is named at the end rather
                    than left out.
  --path <relPath>  Who answers for a document: every domain required for it, and the persona the
                    descent reaches from each. Repeatable. A path this repo does not hold is
                    still answered, what is required for a path being a question about globs rather
                    than about disk; a quarantined one requires nothing and says so.
  --json            One JSON object, for a caller outside this repository that needs a contract
                    rather than a rendering. Renders the path mode or the tree mode, one at a
                    time, and is refused beside any other — the rest being prose with no object
                    form. The tree object carries this repository's absolute path, every domain
                    inside it being named relatively.
  --help            This.

Exit codes:
  0  printed
  1  input error, a named persona or slug is nobody in this repo, or a path names none
`

interface Split {
  readonly findings: number
  readonly initiatives: number
}

function split(held: readonly Held[]): Split {
  const filed = held.flatMap((one) => one.filed)
  const findings = filed.filter((one) => one.finding).length
  return { findings, initiatives: filed.length - findings }
}

function championed(persona: string, at: string, roster: Roster): readonly string[] {
  const held = [...(roster.championedBy.get(persona) ?? [])].sort((a, b) => a.slug.localeCompare(b.slug))
  if (held.length === 0) {
    return [`${persona}  ${at} — champions nothing: no document names her \`${PERSONA_CHAMPION_KEY}:\``]
  }
  const { findings, initiatives } = split(held)
  const lines = [`${persona}  ${at} — ${held.length} domain(s), ${findings} finding(s), ${initiatives} initiative(s)`]
  for (const one of held) {
    lines.push(`  ${one.slug}  ${one.relPath}`)
    for (const doc of one.filed) lines.push(`    ${doc.relPath}`)
  }
  return lines
}

function ranked(roster: Roster): readonly string[] {
  const rows = [...roster.championedBy].map(([persona, held]) => ({ persona, held, ...split(held) }))
  rows.sort((a, b) => b.findings - a.findings || a.persona.localeCompare(b.persona))
  const lines = [
    `${rows.length} persona(s) champion a domain across ${roster.domains} domain(s); ${roster.findings} finding(s) ` +
      `and ${roster.initiatives} initiative(s) filed, of which ${roster.unreachedFilings} reach no persona; ` +
      `${roster.unchampionedDomains} domain(s) reach none`,
    "",
  ]
  for (const row of rows) {
    lines.push(
      `${row.persona}  — ${row.findings} finding(s), ${row.initiatives} initiative(s), ` +
        `across ${row.held.length} domain(s)`
    )
    const carrying = row.held
      .map((one) => ({ slug: one.slug, ...split([one]) }))
      .filter((one) => one.findings > 0)
      .sort((a, b) => b.findings - a.findings || a.slug.localeCompare(b.slug))
    for (const one of carrying) lines.push(`  ${one.slug}  ${one.findings} finding(s)`)
  }
  return lines
}

function treeRows(roster: Roster): readonly DomainRow[] {
  const rows: DomainRow[] = []
  for (const [relPath, slug] of roster.slugAt) {
    rows.push({
      slug,
      relPath,
      persona: roster.championOfSlug.get(slug)?.persona ?? null,
      parent: roster.championParent.get(slug) ?? null,
      sequence: roster.sequenceOf.get(slug) ?? [],
    })
  }
  return rows
}

function answersFor(slug: string, roster: Roster): string {
  const champion = roster.championOfSlug.get(slug)
  return champion === undefined
    ? `${slug}  — the descent reaches no persona`
    : `${slug}  — ${champion.persona}, named by ${champion.at}`
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
  const named = argsFor(argv, "--persona")
  const asked = argsFor(argv, "--domain")
  const paths = argsFor(argv, "--path")
  const all = argv.includes("--all")
  const tree = argv.includes("--tree")
  const json = argv.includes("--json")
  if ([...named, ...asked, ...paths].some((one) => one === "" || one.startsWith("-"))) {
    process.stderr.write("error: --persona needs a name, --domain a slug, --path a relative path\n")
    process.exit(1)
  }
  if (named.length === 0 && asked.length === 0 && paths.length === 0 && !all && !tree) {
    process.stderr.write(
      "error: name a persona with --persona, a domain with --domain, a path with --path, or ask for --all or --tree\n"
    )
    process.exit(1)
  }
  if (json && (named.length > 0 || asked.length > 0 || all)) {
    process.stderr.write("error: --json renders --path or --tree\n")
    process.exit(1)
  }
  if (json && paths.length > 0 && tree) {
    process.stderr.write("error: --json renders one of --path or --tree, not both\n")
    process.exit(1)
  }

  const roots = resolveRoots()
  const roster = readRoster(roots)
  const missing = [
    ...named.filter((one) => !roster.personas.has(one)).map((one) => `no persona document declares ${one}`),
    ...asked.filter((one) => !roster.declared.has(one)).map((one) => `no document declares ${one}`),
    ...paths.filter((one) => outOfBounds(one) !== null).map((one) => `${one} names no path inside this repo`),
  ]
  if (missing.length > 0) {
    process.stderr.write(missing.map((one) => `error: ${one}\n`).join(""))
    process.exit(1)
  }

  if (json) {
    const record = tree
      ? treeRecord(championTree(treeRows(roster)), rootFor(roots, AKASHA))
      : pathRecord(paths, roster, roots)
    process.stdout.write(`${JSON.stringify(record)}\n`)
    return
  }

  const blocks = [
    ...named.map((one) => championed(one, roster.personas.get(one) as string, roster).join("\n")),
    ...(all ? [ranked(roster).join("\n")] : []),
    ...(asked.length > 0 ? [asked.map((one) => answersFor(one, roster)).join("\n")] : []),
    ...(paths.length > 0 ? [paths.map((one) => answersForPath(one, roster, roots)).join("\n")] : []),
    ...(tree ? [treeLines(championTree(treeRows(roster))).join("\n")] : []),
  ]
  process.stdout.write(`${blocks.join("\n\n")}\n`)
}

if (import.meta.main) main()
