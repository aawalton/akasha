export const tool = {
  summary: "List the quarantined documents nothing cites, one path per line",
  repos: ["instructions"],
} as const

import { readFileSync } from "node:fs"
import { git } from "../repo/git/git.ts"
import { stemOf as slugOf } from "../page/name/name"
import { extractLinks } from "./lib/links.ts"
import { type Roots } from "../page/page"
import { normalizeAbsolute } from "../repo/path/path"
import { isDirty, resolveRoots } from "../repo/roots/roots"

const HELP = `bun tools/unreached.ts — the quarantined documents nothing cites, one path per line

Prints nothing but paths: sorted, root-relative, one per line, on stdout. No header,
no count, no summary, no colour. It is meant to be the left-hand side of a pipe.

  bun ~/repos/instructions/tools/unreached.ts | wc -l
  bun ~/repos/instructions/tools/unreached.ts --reached | xargs -n1 echo ingest:

The split it found goes to stderr, where a pipe never sees it.

TWO REPOS ARE SEARCHED, because the readers live in two. The live documents cite a
quarantined document at the path it has now; the code repo cites it at the path it had
before quarantine moved it, nothing having rewritten those. Both count as reaching it:
an agent in the code repo follows what it finds there whether or not the file naming it
has ever been read.

WHICH code repo is \$CODE_ROOT, defaulting to ~/repos/code. That checkout is routinely parked
on some project's branch, so a citation that exists only on another branch is invisible
here — point it at the worktree whose branch you mean.

THREE WAYS A CITATION IS RECOGNIZED, and each is a thing someone wrote down:
a markdown link from a live document that resolves into \`dirty/\`; the literal text of a
path, in either repo; and the document's own slug used as a compound word — among the
live documents, never in the code repo, where a hyphenated word is far more often a verb, a
flag or a package than a citation of a document. A slug of one word
is not searched anywhere: a bare \`findings\` matches prose about findings, and a hit
nobody can act on costs more than the miss.

REACHED IS NOT THE SAME AS WANTED and unreached is not the same as unwanted. This
measures citations, so a document an agent reaches by searching for it reads as unreached
here. Retiring on this alone is retiring on evidence rather than on a conclusion, which
is a judgment this cannot make for you.

Usage:
  bun ~/repos/instructions/tools/unreached.ts [--reached]

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
      const slug = slugOf(relPath)
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
  const fromDir = `${roots.akasha}/${relPath.split("/").slice(0, -1).join("/")}`
  for (const link of extractLinks(body)) {
    const target = link.href.trim().split("#")[0]?.split("?")[0] ?? ""
    if (target === "" || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue
    const absolute = target.startsWith("/") ? normalizeAbsolute(target) : normalizeAbsolute(`${fromDir}/${target}`)
    const inside = absolute.startsWith(`${roots.akasha}/`) ? absolute.slice(roots.akasha.length + 1) : null
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
  const subjects = subjectsIn(roots.akasha)
  if (subjects.length === 0) refuse(`${roots.akasha} holds no quarantined markdown`)

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

  for (const relPath of tracked(roots.akasha, roots.akasha)) {
    if (!relPath.endsWith(".md") || isDirty(relPath)) continue
    const body = readable(`${roots.akasha}/${relPath}`)
    for (const subject of citedBy(body, relPath, roots, byPath, bySlug)) note(subject, relPath)
  }

  const codeFiles = tracked(roots.code, roots.code)
  for (const relPath of codeFiles) {
    const body = readable(`${roots.code}/${relPath}`)
    if (body === "") continue
    for (const match of body.matchAll(CITED_PATH)) {
      for (const key of suffixKeys(match[0])) {
        const hit = byPath.get(key)
        if (hit !== undefined) note(hit, `${roots.code}/${relPath}`)
      }
    }
  }

  const reached = subjects.filter((subject) => reachedBy.has(subject.relPath))
  const listed = (wantReached ? reached : subjects.filter((subject) => !reachedBy.has(subject.relPath))).map(
    (subject) => subject.relPath
  )

  process.stderr.write(
    `${subjects.length} quarantined, ${reached.length} cited, ${subjects.length - reached.length} cited by nothing ` +
      `(code repo searched: ${roots.code}, ${codeFiles.length} files)\n`
  )
  if (listed.length > 0) process.stdout.write(`${listed.join("\n")}\n`)
  process.exitCode = listed.length > 0 ? 1 : 0
}

if (import.meta.main) main()
