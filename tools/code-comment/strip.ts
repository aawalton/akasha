import { readFileSync, statSync, writeFileSync } from "node:fs"
import { agentId } from "../lib/read-record.ts"
import { type Roots } from "../../page/page"
import { AKASHA, CODE, resolveRoots, rootFor } from "../../repo/roots/roots"
import { toolArgv } from "../lib/tool-argv.ts"
import { recordOwnRead } from "../lib/command.ts"
import { type Comment, commentsIn, UnscannableFile } from "./comments.ts"
import { classify, DOMAIN_DOC, FORMS_DOC, type Form, formsFrom } from "./forms.ts"
import { isTree, packagesIn, reachedIn, reasonSaid, SET_ASIDE, type SetAside, setAside, tracked, type Tree } from "./tree.ts"

const HELP = `bun tools/code-comment/strip.ts — take out every comment standing outside the forms

Reads what \`scan.ts\` counts and writes the files without it. Nothing lands unless the
result is proved to be the same code: a TypeScript file must transpile byte-identical
to what it did with its comments in, and a shell file must still parse under \`bash -n\`.
A file that cannot be proved is left alone and named.

IT READS EACH FILE WHOLE, because the new body is the old one with spans taken out, and
records that read the way \`replace.ts\` does: what \`read-before-write\` asks is whether this
destroys work somebody else did, and no provenance answers that. A file that moves between
the read and the write is left alone and named rather than landed over.

IT LANDS IN ONE COMMIT. A sweep arriving in batches leaves the tree in a state nobody chose
if any batch refuses, and a run stopped halfway reads exactly like one that finished.

WHERE IT LANDS DEPENDS ON THE TREE. In the instructions repo it commits through
\`ops write --mechanical\`, which is the only way anything becomes durable there. In the
code repo it writes the files and stops: that tree lands through a branch and CI, and the
same run has to mend whatever the deletion made false before any of it is worth committing.

TWO KINDS OF FILE ARE LEFT ALONE IN THE CODE REPO and counted, the same two every check
there filters its own files on. A MACHINE-WRITTEN file, because stripping one is undone by
the next run of whatever wrote it, so the comment belongs to that generator's template. And
a file UNDER TEST, under a \`__fixtures__\` directory, because a comment in a fixture is a
specimen the check is proved against rather than commentary — and gutting one need turn
nothing red, since a check reading a carrier that is gone reports no violations either.

Usage:
  bun ~/repos/akasha/tools/code-comment/strip.ts [--repo instructions|code] [--under <path>] [--write]

Flags:
  --repo <name>       Which tree to strip: \`instructions\` (default) or \`code\`.
  --under <path>      Everything beneath this directory, a package or a whole area of
                      the tree. What a project is scoped to, and what a run should cover.
  --file-path <path>  One file, relative to the repo root, instead of every file the domain is required reading for.
  --diff              Print the result rather than counting it. Use with --file-path.
  --write             Land it: a commit in the instructions repo, files on disk in the code repo.
  --help              This.

Exit codes:
  0  every file this reached was stripped, or proved to need nothing
  1  a file could not be proved, or the run could not be made
`

interface Edit {
  readonly start: number
  readonly end: number
}

const BLANK_ABOVE = /\n[ \t]*\n$/
const BLANK_BELOW = /^[ \t]*\n/

export function strip(relPath: string, body: string, forms: readonly Form[]): string {
  const cut = commentsIn(relPath, body).filter((comment) => classify(comment, relPath, forms) !== "form")
  const spans = cut.map((comment) => widen(body, comment)).sort((one, other) => one.start - other.start)
  const merged: Edit[] = []
  for (const span of spans) {
    const last = merged[merged.length - 1]
    if (last !== undefined && span.start <= last.end) {
      merged[merged.length - 1] = { start: last.start, end: Math.max(last.end, span.end) }
    } else merged.push({ start: span.start, end: span.end })
  }
  if (merged.length === 0) return body
  let out = ""
  let at = 0
  for (const edit of merged) {
    out += body.slice(at, edit.start)
    at = edit.end
    const below = BLANK_BELOW.exec(body.slice(at))
    if (below !== null && BLANK_ABOVE.test(out)) at += (below[0] as string).length
  }
  out += body.slice(at)
  const kept = out.replace(/^\n+/, "").replace(/\n*$/, "")
  return kept === "" ? "" : `${kept}\n`
}

function widen(body: string, comment: Comment): Comment {
  const lineStart = body.lastIndexOf("\n", comment.start - 1) + 1
  const before = body.slice(lineStart, comment.start)
  const lineEnd = body.indexOf("\n", comment.end)
  const after = body.slice(comment.end, lineEnd === -1 ? body.length : lineEnd)
  if (before.trim() !== "") {
    const trailing = before.length - before.trimEnd().length
    return { ...comment, start: comment.start - trailing }
  }
  if (after.trim() !== "") {
    const leading = after.length - after.trimStart().length
    return { ...comment, end: comment.end + leading }
  }
  return { ...comment, start: lineStart, end: lineEnd === -1 ? body.length : lineEnd + 1 }
}

export function proves(relPath: string, was: string, now: string): string | null {
  if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(relPath)) {
    const transpiler = new Bun.Transpiler({ loader: relPath.endsWith("x") ? "tsx" : "ts" })
    let before: string
    try {
      before = transpiler.transformSync(was)
    } catch {
      return "it did not parse before this touched it"
    }
    try {
      return transpiler.transformSync(now) === before ? null : "the code came out different"
    } catch (error) {
      return `it stopped parsing: ${(error as Error).message.split("\n")[0]}`
    }
  }
  const parser = PARSERS.find((one) => relPath.endsWith(one.ext))
  if (parser === undefined) return null
  const written = `/var/tmp/code-comment-strip-${process.pid}${parser.ext}`
  writeFileSync(written, now)
  const parsed = Bun.spawnSync([...parser.argv, written])
  return parsed.success ? null : `it stopped parsing: ${parsed.stderr.toString().split("\n").filter((line) => line !== "")[0] ?? ""}`
}

const PARSERS: readonly { readonly ext: string; readonly argv: readonly string[] }[] = [
  { ext: ".sh", argv: ["bash", "-n"] },
  { ext: ".lua", argv: ["luac", "-p"] },
  { ext: ".py", argv: ["python3", "-m", "py_compile"] },
]

interface Stripped {
  readonly file_path: string
  readonly content: string
  readonly at: number
}

function landOnDisk(root: string, stripped: readonly Stripped[]): void {
  const moved = stripped.filter((one) => statSync(`${root}/${one.file_path}`).mtimeMs !== one.at)
  for (const one of moved) process.stdout.write(`moved after this read it, so left alone: ${one.file_path}\n`)
  const written = stripped.filter((one) => !moved.includes(one))
  for (const one of written) writeFileSync(`${root}/${one.file_path}`, one.content)
  process.stdout.write(`${written.length} file(s) written; nothing committed, this tree lands through its branch\n`)
  process.stdout.write("run the formatter over them before the suite: a comment holding a literal apart is gone\n")
}

function land(roots: Roots, stripped: readonly Stripped[]): void {
  const root = rootFor(roots, AKASHA)
  const moved = stripped.filter((one) => statSync(`${root}/${one.file_path}`).mtimeMs !== one.at)
  const written = stripped.filter((one) => !moved.includes(one)).map(({ file_path, content }) => ({ file_path, content }))
  for (const one of moved) process.stdout.write(`moved after this read it, so left alone: ${one.file_path}\n`)
  if (written.length === 0) return
  const agent = agentId()
  for (const one of written) recordOwnRead(agent, one.file_path, roots)
  const payload = `/var/tmp/code-comment-strip-${process.pid}.json`
  writeFileSync(payload, JSON.stringify(written))
  const message = `instructions: take the comments out of ${written.length} file(s)`
  const run = Bun.spawnSync(
    ["bun", ...toolArgv("write.ts", ["--input-file", payload, "--mechanical", "--message", message], root)],
    { stdout: "pipe", stderr: "pipe" }
  )
  const said = run.stdout.toString()
  process.stdout.write(said.split("\n").filter((line) => /^(write|commit|push|refused|error)/.test(line)).join("\n"))
  process.stdout.write("\n")
  if (!run.success) {
    process.stdout.write(run.stderr.toString())
    throw new Error("the write refused, so nothing further was tried")
  }
}

function flag(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  return at === -1 ? null : (argv[at + 1] ?? null)
}

function run(argv: readonly string[]): void {
  const asked = flag(argv, "--repo") ?? "instructions"
  if (!isTree(asked)) {
    process.stderr.write("error: --repo takes `instructions` or `code`\n")
    process.exitCode = 1
    return
  }
  const tree: Tree = asked
  const roots = resolveRoots()
  const root = tree === "code" ? rootFor(roots, CODE) : rootFor(roots, AKASHA)
  const forms = formsFrom(readFileSync(`${rootFor(roots, AKASHA)}/${FORMS_DOC}`, "utf8"))
  const named = flag(argv, "--file-path")
  const scope = flag(argv, "--under")
  const reached = named === null ? reachedIn(rootFor(roots, AKASHA), root, tree) : [named]
  const scoped = scope === null ? reached : reached.filter((relPath) => relPath.startsWith(`${scope}/`))
  if (scope !== null && scoped.length === 0) {
    process.stderr.write(`error: nothing required to be read against ${DOMAIN_DOC} stands under ${scope} in ${root}\n`)
    process.exitCode = 1
    return
  }
  const asideBy = new Map<string, SetAside>()
  if (tree === "code") {
    for (const relPath of scoped) {
      const reason = setAside(relPath, () => readFileSync(`${root}/${relPath}`, "utf8"))
      if (reason !== null) asideBy.set(relPath, reason)
    }
  }
  const aside = [...asideBy.keys()]
  const held = new Set(aside)
  const files = scoped.filter((relPath) => !held.has(relPath))
  const unproved: string[] = []
  const pending: Stripped[] = []
  let changed = 0
  let taken = 0
  for (const relPath of files) {
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    let now: string
    try {
      now = strip(relPath, body, forms)
    } catch (error) {
      if (error instanceof UnscannableFile) continue
      throw error
    }
    if (now === body) continue
    const wrong = proves(relPath, body, now)
    if (wrong !== null) {
      unproved.push(`  ${relPath} — ${wrong}`)
      continue
    }
    changed++
    taken += body.length - now.length
    if (argv.includes("--diff")) process.stdout.write(now)
    if (!argv.includes("--write")) continue
    pending.push({ file_path: relPath, content: now, at: statSync(`${root}/${relPath}`).mtimeMs })
  }
  if (argv.includes("--write") && pending.length > 0) {
    if (tree === "code") landOnDisk(root, pending)
    else land(roots, pending)
  }
  if (!argv.includes("--diff")) {
    process.stdout.write(`${changed} of ${files.length} files lose ${taken} bytes of comment\n`)
    for (const reason of SET_ASIDE) {
      const these = aside.filter((relPath) => asideBy.get(relPath) === reason)
      if (these.length === 0) continue
      process.stdout.write(`${these.length} ${reason} file(s) left alone; ${reasonSaid(reason)}\n`)
    }
  }
  if (unproved.length > 0) {
    process.stdout.write(`\nleft alone, because the result could not be proved the same code:\n${unproved.join("\n")}\n`)
    process.exitCode = 1
  }
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) process.stdout.write(HELP)
  else run(argv)
}
