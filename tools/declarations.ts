export const tool = {
  summary: "Print what this repository declares about its personas, persons and domains",
  path: "domain declarations",
} as const

import { DeadRead, isSubject, readCorpora, type Subject, SUBJECTS } from "./lib/subjects.ts"
import { resolveRoots, targetRoot } from "../repo/roots/roots"

function fail(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(1)
}

const HELP = [
  "bun ~/repos/akasha/tools/declarations.ts — what this repository declares about itself",
  "",
  "Prints JSON on stdout:",
  "  { root, subjects: { <subject>: { records: [ { slug, path, frontmatter } ], unnamed } } }",
  "",
  "Every record carries its frontmatter WHOLE, so a key the pages grow needs no new flag",
  "and no change at any caller. A `personas` record also carries `championedDomain` and",
  "`defaultRole` named, those two having live readers.",
  "",
  "NAME SEVERAL SUBJECTS AND THEY ARE READ IN ONE ACT. The tree moves several times a day,",
  "so four calls are four moments and the lists can describe different commits. Anything",
  "writing more than one of these somewhere they will be compared must ask for them together.",
  "",
  "Usage:",
  "  bun ~/repos/akasha/tools/declarations.ts <subject>... [--body]",
  "  bun ~/repos/akasha/tools/declarations.ts all [--body]",
  "",
  `  <subject>   one or more of ${SUBJECTS.join(", ")}`,
  "  all         every subject above, in one reading",
  "  --body      also carry each document's prose below its frontmatter, as `body`. Off by",
  "              default: `domains` is over four hundred documents, and a caller after their",
  "              slugs would be handed every word of every one. Ask for it where you want what",
  "              a document SAYS rather than what it declares.",
  "  --help      this.",
  "",
  "A subject that resolves to nothing EXITS 1 and names the directory it read: an empty",
  "tree is a dead read, never a fleet with no personas. One dead subject fails the whole",
  "call rather than handing back a partial answer.",
  "",
  "Environment:",
  "  AKASHA_ROOT  the tree to read (default: the repo this file lives in)",
  "",
  "Exit codes:",
  "  0  every subject asked for was read and printed",
  "  1  no subject, an unknown subject or flag, an unreadable tree, or a subject that held nothing",
  "",
].join("\n")

const FLAGS = ["--body", "--help"]

function main(): undefined {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.length === 0) {
    process.stdout.write(HELP)
    return
  }
  const strayFlags = argv.filter((word) => word.startsWith("--") && !FLAGS.includes(word))
  if (strayFlags.length > 0) {
    fail(
      `\`${strayFlags.join(", ")}\` is not a flag here; this takes ${FLAGS.join(", ")}. A flag read past ` +
        `rather than refused answers a different question than the one asked, and reads as the one asked.`
    )
  }
  const named = argv.filter((word) => !word.startsWith("--"))
  if (named.length === 0) fail(`name at least one subject of ${SUBJECTS.join(", ")}, or \`all\``)
  const wanted: readonly Subject[] =
    named.length === 1 && named[0] === "all" ? SUBJECTS : named.filter(isSubject)
  const unknown = named.filter((word) => word !== "all" && !isSubject(word))
  if (unknown.length > 0) {
    fail(`\`${unknown.join(", ")}\` is not a subject; name one of ${SUBJECTS.join(", ")}, or \`all\``)
  }
  if (named.includes("all") && named.length > 1) {
    fail("`all` already names every subject, so it takes no others beside it")
  }
  const root = targetRoot(resolveRoots())

  try {
    const readings = readCorpora(root, wanted, argv.includes("--body"))
    const subjects: Record<string, unknown> = {}
    for (const [subject, reading] of readings) {
      if (reading.unnamed.length > 0) {
        process.stderr.write(
          `warning: ${reading.unnamed.length} ${subject} document(s) under \`${root}\` declare no ` +
            `\`slug:\` and answer to no slug: ${reading.unnamed.join(", ")}\n`
        )
      }
      subjects[subject] = { records: reading.records, unnamed: reading.unnamed }
    }
    process.stdout.write(`${JSON.stringify({ root, subjects }, null, 2)}\n`)
  } catch (err) {
    if (err instanceof DeadRead) fail(err.message)
    throw err
  }
}

if (import.meta.main) main()
