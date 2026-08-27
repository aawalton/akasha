import { readFileSync } from "node:fs"
import { AKASHA, CODE, resolveRoots, rootFor } from "../../repo/roots/roots"
import { type Comment, commentsIn, UnscannableFile, without } from "./comments.ts"
import { classify, DOMAIN_DOC, FORMS_DOC, type Form, formsFrom, type Klass } from "./forms.ts"
import {
  isTree,
  packageOf,
  packagesIn,
  reachedIn,
  reasonSaid,
  SET_ASIDE,
  type SetAside,
  setAside,
  tracked,
  type Tree,
} from "./tree.ts"

const HELP = `bun tools/code-comment/scan.ts — count the comments standing outside the code comment forms

Reaches every file \`${DOMAIN_DOC}\` is required reading for, reads the forms off
${FORMS_DOC}, and reports what is left. A form approved onto that list needs no edit
here beyond a recogniser for its shape; one named there with no recogniser stops the run.

Rolls the count up per package as well as per file, a package being the nearest
directory above a file holding a \`package.json\`, and the unit a project is scoped to.

TWO KINDS OF FILE ARE SET ASIDE IN THE CODE REPO, each counted on its own line and held
out of the exit code, because \`strip.ts\` leaves both alone. A MACHINE-WRITTEN file, whose
strip is undone by the next run of whatever wrote it. And a file UNDER TEST, under a
\`__fixtures__\` directory, whose comments are specimens a check is proved against. The two
tools read one scope, so what this reports outstanding is what a strip can take out.

Usage:
  bun ~/repos/akasha/tools/code-comment/scan.ts [--repo instructions|code] [--class <klass>] [--under <path>]

Flags:
  --repo <name>       Which tree to read: \`instructions\` (default) or \`code\`.
  --class <klass>     Print every comment of one class with its path and line:
                      \`candidate\`, \`instruction\`, \`prose\` or \`form\`.
  --under <path>      Everything beneath this directory, a package or a whole area of
                      the tree. Lists its files, a scoped run being what a project is
                      dispatched on.
  --file-path <path>  One file, relative to that root, instead of the whole tree.
  --per-file          List every file, not the twenty carrying the most.
  --json              The same reading as a machine shape: every file reached, every
                      comment outside the forms with its site and class, and every
                      file that could not be scanned. What a gate reads, so that
                      rewording the report above cannot break one.
  --help              This.

Exit codes:
  0  nothing stands outside the forms in what a strip reaches
  1  something does, or the run could not be made
`

interface Standing {
  readonly relPath: string
  readonly comment: Comment
  readonly klass: Klass
}

const CLASSES: readonly Klass[] = ["candidate", "instruction", "prose", "form"]

function standingIn(root: string, relPath: string, forms: readonly Form[]): readonly Standing[] {
  let body: string
  try {
    body = readFileSync(`${root}/${relPath}`, "utf8")
  } catch {
    return []
  }
  return commentsIn(relPath, body).map((comment) => ({ relPath, comment, klass: classify(comment, relPath, forms) }))
}

function oneLine(raw: string): string {
  const flat = raw.replace(/\s+/g, " ").trim()
  return flat.length > 110 ? `${flat.slice(0, 107)}...` : flat
}

const SHOWN = 20

function tally(outside: readonly Standing[], keyed: (one: Standing) => string): readonly (readonly [string, number])[] {
  const counts = new Map<string, number>()
  for (const one of outside) counts.set(keyed(one), (counts.get(keyed(one)) ?? 0) + 1)
  return [...counts].sort((one, other) => other[1] - one[1] || one[0].localeCompare(other[0]))
}

interface Shape {
  readonly reached: number
  readonly wanted: Klass | null
  readonly packages: readonly string[]
  readonly perFile: boolean
}

function report(standing: readonly Standing[], shape: Shape): string {
  const { reached, wanted, packages, perFile } = shape
  const outside = standing.filter((one) => one.klass !== "form")
  const lines: string[] = []
  const files = new Set(outside.map((one) => one.relPath))
  lines.push(
    `${outside.length} comments outside the forms, in ${files.size} of ${reached} files the domain is required reading for`
  )
  for (const klass of CLASSES) {
    lines.push(`  ${klass.padEnd(12)}${standing.filter((one) => one.klass === klass).length}`)
  }
  if (wanted !== null) {
    lines.push("", `every ${wanted}:`)
    for (const one of standing.filter((each) => each.klass === wanted)) {
      lines.push(`  ${one.relPath}:${one.comment.line}  ${oneLine(one.comment.raw)}`)
    }
    return lines.join("\n")
  }
  const byPackage = tally(outside, (one) => packageOf(one.relPath, packages))
  if (byPackage.length > 1) {
    lines.push("", `per package, ${byPackage.length} of them carrying one:`)
    for (const [dir, count] of byPackage) lines.push(`  ${String(count).padStart(6)}  ${dir === "" ? "(no package)" : dir}`)
  }
  const byFile = tally(outside, (one) => one.relPath)
  const shown = perFile ? byFile : byFile.slice(0, SHOWN)
  lines.push("", `per file${shown.length < byFile.length ? `, the ${shown.length} carrying the most of ${byFile.length}` : ""}:`)
  for (const [relPath, count] of shown) lines.push(`  ${String(count).padStart(6)}  ${relPath}`)
  if (shown.length < byFile.length) lines.push("  --per-file lists the rest")
  return lines.join("\n")
}

export function misreadIn(relPath: string, body: string): string | null {
  if (!/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(relPath)) return null
  const transpiler = new Bun.Transpiler({ loader: relPath.endsWith("x") ? "tsx" : "ts" })
  let asWritten: string
  try {
    asWritten = transpiler.transformSync(body)
  } catch {
    return null
  }
  const stripped = without(body, commentsIn(relPath, body))
  try {
    return transpiler.transformSync(stripped) === asWritten ? null : "the code changed when the comments came out"
  } catch (error) {
    return `it stopped parsing when the comments came out: ${(error as Error).message.split("\n")[0]}`
  }
}

function verify(root: string, files: readonly string[]): string[] {
  const misread: string[] = []
  for (const relPath of files) {
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    try {
      const wrong = misreadIn(relPath, body)
      if (wrong !== null) misread.push(`  ${relPath} — ${wrong}`)
    } catch (error) {
      if (!(error instanceof UnscannableFile)) throw error
    }
  }
  return misread
}

function flag(argv: readonly string[], name: string): string | null {
  const at = argv.indexOf(name)
  return at === -1 ? null : (argv[at + 1] ?? null)
}

function run(argv: readonly string[]): void {
  const named0 = flag(argv, "--repo") ?? "instructions"
  if (!isTree(named0)) {
    process.stderr.write(`error: --repo takes \`instructions\` or \`code\`\n`)
    process.exitCode = 1
    return
  }
  const repo: Tree = named0
  const roots = resolveRoots()
  const root = repo === "code" ? rootFor(roots, CODE) : rootFor(roots, AKASHA)
  const wanted = flag(argv, "--class") as Klass | null
  if (wanted !== null && !CLASSES.includes(wanted)) {
    process.stderr.write(`error: --class takes one of ${CLASSES.join(", ")}\n`)
    process.exitCode = 1
    return
  }
  const forms = formsFrom(readFileSync(`${rootFor(roots, AKASHA)}/${FORMS_DOC}`, "utf8"))
  const named = flag(argv, "--file-path")
  const scope = flag(argv, "--under")
  const packages = packagesIn(tracked(root))
  const reached = named === null ? reachedIn(rootFor(roots, AKASHA), root, repo) : [named]
  const scoped = scope === null ? reached : reached.filter((relPath) => relPath.startsWith(`${scope}/`))
  if (scope !== null && scoped.length === 0) {
    process.stderr.write(`error: nothing required to be read against ${DOMAIN_DOC} stands under ${scope} in ${root}\n`)
    process.exitCode = 1
    return
  }
  const asideBy = new Map<string, SetAside>()
  if (repo === "code") {
    for (const relPath of scoped) {
      const reason = setAside(relPath, () => readFileSync(`${root}/${relPath}`, "utf8"))
      if (reason !== null) asideBy.set(relPath, reason)
    }
  }
  const aside = [...asideBy.keys()]
  const held = new Set(aside)
  const files = scoped.filter((relPath) => !held.has(relPath))
  if (argv.includes("--verify")) {
    const misread = verify(root, files)
    const verdict =
      misread.length === 0
        ? `every one of ${files.length} files transpiles the same with its comments taken out`
        : `${misread.length} of ${files.length} files are misread:\n${misread.join("\n")}`
    process.stdout.write(`${verdict}\n`)
    if (misread.length > 0) process.exitCode = 1
    return
  }
  const standing: Standing[] = []
  const unscannable: string[] = []
  for (const relPath of files) {
    try {
      standing.push(...standingIn(root, relPath, forms))
    } catch (error) {
      if (error instanceof UnscannableFile) unscannable.push(relPath)
      else throw error
    }
  }
  if (argv.includes("--json")) {
    const outside = standing.filter((one) => one.klass !== "form")
    const shaped = {
      reached: files,
      outside: outside.map((one) => ({ path: one.relPath, line: one.comment.line, klass: one.klass })),
      unscannable,
    }
    process.stdout.write(`${JSON.stringify(shaped)}\n`)
    if (outside.length > 0 || unscannable.length > 0) process.exitCode = 1
    return
  }
  const shape = { reached: files.length, wanted, packages, perFile: argv.includes("--per-file") || scope !== null }
  process.stdout.write(`${report(standing, shape)}\n`)
  for (const reason of SET_ASIDE) {
    const these = aside.filter((relPath) => asideBy.get(relPath) === reason)
    if (these.length === 0) continue
    const inThem = these.flatMap((relPath) => {
      try {
        return standingIn(root, relPath, forms).filter((one) => one.klass !== "form")
      } catch (error) {
        if (error instanceof UnscannableFile) return []
        throw error
      }
    })
    process.stdout.write(
      `\n${inThem.length} comments in ${these.length} ${reason} file(s), set aside; ${reasonSaid(reason)}\n`,
    )
  }
  if (unscannable.length > 0) {
    process.stdout.write(`\nunscannable, so uncounted:\n${unscannable.map((one) => `  ${one}`).join("\n")}\n`)
  }
  if (standing.some((one) => one.klass !== "form") || unscannable.length > 0) process.exitCode = 1
}

if (import.meta.main) {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) process.stdout.write(HELP)
  else run(argv)
}
