export const tool = {
  summary: "List the quarantined documents nothing cites, one path per line",
  path: "domain unreached",
} as const

import { readFileSync } from "node:fs"
import { git } from "../repo/git/git.ts"
import { fileStemOf } from "../page/name/name.ts"
import { extractLinks } from "./lib/links.ts"
import { type Roots } from "../page/page.ts"
import { normalizeAbsolute } from "../repo/path/path.ts"
import { AKASHA, isDirty, resolveRoots, rootFor } from "../repo/roots/roots.ts"

const HELP = `bun tools/unreached.ts — the quarantined documents nothing cites, one path per line

Prints nothing but paths: sorted, root-relative, one per line, on stdout. No header,
no count, no summary, no colour. It is meant to be the left-hand side of a pipe.

  bun ~/repos/akasha/tools/unreached.ts | wc -l
  bun ~/repos/akasha/tools/unreached.ts --reached | xargs -n1 echo ingest:

The split it found goes to stderr, where a pipe never sees it.

ONE TREE IS SEARCHED TWICE, because the readers are of two kinds. The live documents cite a
quarantined document at the path it has now; the source files cite it at the path it had
before quarantine moved it, nothing having rewritten those. Both count as reaching it: an
agent following a path it finds in a source file follows it whether or not the file naming
it has ever been read.

THE CODE REPO WAS ABSORBED INTO AKASHA, so both passes run over this one repository — the
markdown first, then every tracked file whatever its extension. A quarantined file is never
a citer in either pass: counting one would let two quarantined documents reach each other
and drop both off this list.

THREE WAYS A CITATION IS RECOGNIZED, and each is a thing someone wrote down:
a markdown link from a live document that resolves into \`dirty/\`; the literal text of a
path, in any tracked file; and the document's own slug used as a compound word — among the
live documents, never in the source files, where a hyphenated word is far more often a verb, a
flag or a package than a citation of a document. A slug of one word
is not searched anywhere: a bare \`findings\` matches prose about findings, and a hit
nobody can act on costs more than the miss.

REACHED IS NOT THE SAME AS WANTED and unreached is not the same as unwanted. This
measures citations, so a document an agent reaches by searching for it reads as unreached
here. Retiring on this alone is retiring on evidence rather than on a conclusion, which
is a judgment this cannot make for you.

Usage:
  bun ~/repos/akasha/tools/unreached.ts [--reached]

Flags:
  --reached  List the complement instead: the quarantined documents something cites.
  --help     This.

Exit codes:
  0  nothing listed
  1  at least one document listed
  2  the call could not be read, or a root git could not enumerate. Nothing was listed.
`

const CITED_PATH = /[A-Za-z0-9_.~$/-]*\.md/g
const COMPOUND_SLUG = /[a-z0-9]+(?:-[a-z0-9]+)+/g
const IS_COMPOUND_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)+$/

function refuse(message: string): never {
  process.stderr.write(`error: ${message}\n`)
  process.exit(2)
}

function tracked(root: string, what: string): readonly string[] {
  const listed = git(root, ["ls-files", "-z"])
  if (listed.code !== 0) refuse(`git could not list what ${what} tracks: ${listed.stderr}`)
  return listed.stdout.split("\0").filter((relPath) => relPath !== "")
}

function readable(absolutePath: string): string {
  try {
    return readFileSync(absolutePath, "utf8")
  } catch {
    return ""
  }
}

function suffixKeys(cited: string): readonly string[] {
  const segments = cited.replace(/^[.~$]*\//, "").split("/").filter((one) => one !== "" && one !== ".")
  const keys: string[] = []
  for (let from = 0; from < segments.length - 1; from += 1) keys.push(segments.slice(from).join("/"))
  return keys
}

interface Subject {
  readonly relPath: string
  readonly here: string
  readonly former: string
  readonly slug: string | null
}

function subjectsIn(root: string): readonly Subject[] {
  return tracked(root, root)
    .filter((relPath) => relPath.endsWith(".md") && isDirty(relPath))
    .sort()
    .map((relPath) => {
      const slug = fileStemOf(relPath)
      return {
        relPath,
        here: relPath,
        former: relPath.split("/").slice(1).join("/"),
        slug: IS_COMPOUND_SLUG.test(slug) ? slug : null,
      }
    })
}

function citedBy(
  body: string,
  relPath: string,
  roots: Roots,
  byPath: ReadonlyMap<string, string>,
  bySlug: ReadonlyMap<string, string>
): ReadonlySet<string> {
  const found = new Set<string>()
  const fromDir = `${rootFor(roots, AKASHA)}/${relPath.split("/").slice(0, -1).join("/")}`
  for (const link of extractLinks(body)) {
    const target = link.href.trim().split("#")[0]?.split("?")[0] ?? ""
    if (target === "" || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue
    const absolute = target.startsWith("/") ? normalizeAbsolute(target) : normalizeAbsolute(`${fromDir}/${target}`)
    const inside = absolute.startsWith(`${rootFor(roots, AKASHA)}/`) ? absolute.slice(rootFor(roots, AKASHA).length + 1) : null
    const hit = inside === null ? undefined : byPath.get(inside)
    if (hit !== undefined) found.add(hit)
  }
  for (const match of body.matchAll(CITED_PATH)) {
    for (const key of suffixKeys(match[0])) {
      const hit = byPath.get(key)
      if (hit !== undefined) found.add(hit)
    }
  }
  for (const match of body.matchAll(COMPOUND_SLUG)) {
    const hit = bySlug.get(match[0])
    if (hit !== undefined) found.add(hit)
  }
  return found
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  const wantReached = argv.includes("--reached")
  for (const arg of argv) {
    if (arg !== "--reached") refuse(`\`${arg}\` is not an argument this takes — run it with --help`)
  }

  const roots = resolveRoots()
  const subjects = subjectsIn(rootFor(roots, AKASHA))
  if (subjects.length === 0) refuse(`${rootFor(roots, AKASHA)} holds no quarantined markdown`)

  const byPath = new Map<string, string>()
  const bySlug = new Map<string, string>()
  for (const subject of subjects) {
    byPath.set(subject.here, subject.relPath)
    byPath.set(subject.former, subject.relPath)
    if (subject.slug !== null) bySlug.set(subject.slug, subject.relPath)
  }

  const reachedBy = new Map<string, string[]>()
  const note = (subject: string, citer: string): void => {
    const citers = reachedBy.get(subject)
    if (citers === undefined) reachedBy.set(subject, [citer])
    else citers.push(citer)
  }

  for (const relPath of tracked(rootFor(roots, AKASHA), rootFor(roots, AKASHA))) {
    if (!relPath.endsWith(".md") || isDirty(relPath)) continue
    const body = readable(`${rootFor(roots, AKASHA)}/${relPath}`)
    for (const subject of citedBy(body, relPath, roots, byPath, bySlug)) note(subject, relPath)
  }

  const sourceRoot = rootFor(roots, AKASHA)
  const sourceFiles = tracked(sourceRoot, sourceRoot)
  for (const relPath of sourceFiles) {
    if (isDirty(relPath)) continue
    const body = readable(`${sourceRoot}/${relPath}`)
    if (body === "") continue
    for (const match of body.matchAll(CITED_PATH)) {
      for (const key of suffixKeys(match[0])) {
        const hit = byPath.get(key)
        if (hit !== undefined) note(hit, `${sourceRoot}/${relPath}`)
      }
    }
  }

  const reached = subjects.filter((subject) => reachedBy.has(subject.relPath))
  const listed = (wantReached ? reached : subjects.filter((subject) => !reachedBy.has(subject.relPath))).map(
    (subject) => subject.relPath
  )

  process.stderr.write(
    `${subjects.length} quarantined, ${reached.length} cited, ${subjects.length - reached.length} cited by nothing ` +
      `(tracked files searched: ${sourceRoot}, ${sourceFiles.length} files)\n`
  )
  if (listed.length > 0) process.stdout.write(`${listed.join("\n")}\n`)
  process.exitCode = listed.length > 0 ? 1 : 0
}

if (import.meta.main) main()
