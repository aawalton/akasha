#!/usr/bin/env bun

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Glob } from "bun"

const HELP = `bun tools/extension-node-clean.ts — refuse a bun-only global in what the extension host loads

The editor's extension host is node. Electron runs it as a utility process under its own
node build, and \`utilityProcess.fork\` takes no option naming another binary, so the host
cannot be bun and every reach the extension makes into akasha inside its own process is a
reach for something that may not be there.

THE ENTRY POINT THAT MATTERS IS THE ONE THAT ACTIVATES.

The extension the host loads is \`akasha/editor-extension/ops-extension\`, so its \`main\` is
what this judges. Judging the files a lane last repaired says only that those files were
repaired. This command once answered \`4 of 5 entry points carry no bun-only global\` while
activation was dying on \`undefined stands under no akasha folder\`, because the file that
activates was not among the five.

SO NO LIST OF ENTRY POINTS IS KEPT HERE.

The manifest names one: \`main\` is what the host loads, and it is read from
\`akasha/editor-extension/ops-extension/package.json\` rather than spelled here, so a manifest
pointing somewhere else is followed rather than missed. Everything that entry reaches is in
its bundle and is judged with it.

What is left over is judged too. Every \`.module.code.ts\` under \`akasha/editor-extension\`
that no entry point's bundle reaches becomes an entry point of its own, and that repeats
until nothing is left over. So every module in the package is judged either as part of a
bundle or as a bundle, a module added and not yet wired in is judged rather than invisible,
and there is no list to forget to add it to. The code beside a module page is what the host
loads; the page and the test beside it are not, so neither is bundled here.

Each entry point is bundled for node, and the whole bundle is judged, so a reach six
modules down through \`tools/lib\` into akasha is caught where reading one file's imports
would miss it.

THREE OF THE FOUR REFUSED GLOBALS ARE NOT SPELLED \`Bun\`.

  Bun.*                throws \`Bun is not defined\` where it is reached
  import.meta.path     answers undefined under node rather than throwing
  import.meta.dir      answers undefined under node rather than throwing
  import.meta.dirname  node holds it in a module and not in a script

The three on \`import.meta\` are the dangerous ones, because a search for bun APIs does not
find them and undefined travels a long way before it is noticed. \`import.meta.main\` is
not refused: node holds it, and some two hundred files here turn on it.

A reach that answers nothing under node is worse than one that throws. \`page-value\`
returns \`{ value: null }\` for every page body when no transpiler is there, exit code 0,
so the trees draw empty rather than saying why.

TWO STAGES, AND THE SECOND IS THE ONE TO BELIEVE.

The first reads the bundle. A \`Bun.*\` reached from a file that also spells \`typeof Bun\`
is carried rather than refused, because a guarded reach is what a file that must run under
both runtimes looks like. That test asks the file rather than the path through it, so a
second unguarded reach in a file that guards its first would be carried wrongly. A reach
standing at the bundle's top level is refused whatever its file spells, since that one runs
at import.

A name inside a quote is passed over, because these files name the globals they refuse in
their own refusal messages, and \`page-value\` spells \`Bun.Transpiler\` in the sentence it
throws when no transpiler is there. The quote is judged one line at a time, so a global
named inside a template literal spanning lines would be read as code and refused. That is
the way round to be wrong.

The second imports the bundle under node against a stub \`vscode\`, and reports what it
throws. Nothing about it is a heuristic: a module that imports is a module that imports.
It sees only what runs at import time, which is where activation dies, so the two stages
catch different halves and both must pass.

WHAT A GUARD IS BELIEVED TO MEAN, AND WHERE THAT STOPS.

A guarded reach is carried, not proved. This runs no branch, so a file that asks
\`typeof Bun\` and then throws, returns null, or draws nothing on the node side reads exactly
like one that works there. That is how both usage figures on the status bar were dead while
this said every entry point was clean: \`readUsage\` threw on every poll, an \`allSettled\`
swallowed it, the slots drew \`—\`, and activation still counted itself whole.

Deciding whether a node branch works is deciding what the code does, which no scan of the
text can answer. The guarded reaches are counted and named at the end instead, so the
closing line can never read as a clean bill while a guard stands unproved. Proving one needs
a test that calls it with \`Bun\` absent, and that belongs beside the code rather than here.

  --entry <path>  an entry point to judge, repeatable. Given none, they are derived.
  --no-run        read the bundles and do not import them under node.
  --help          This.
`

const REFUSED = /Bun\.\w+|import\.meta\.(?:path|dir|dirname)\b/g

const BUN_REACH = /^Bun\./

const GUARD = "typeof Bun"

const SECTION = /^\/\/ (\S+\.tsx?)$/

const QUOTES = new Set(["'", '"', "`"])

export function quotedAt(line: string, at: number): boolean {
  let open: string | null = null
  for (let i = 0; i < at; i += 1) {
    const one = line[i]
    if (one === "\\") {
      i += 1
      continue
    }
    if (one === undefined || !QUOTES.has(one)) continue
    if (open === null) open = one
    else if (open === one) open = null
  }
  return open !== null
}

const PACKAGE = "akasha/editor-extension/ops-extension"

const MANIFEST = "package.json"

// The manifest and the modules stand apart: `ops-extension` is the extension the host loads and
// holds only its entry, while every module that entry reaches lives under the workspace package
// above it. Sweeping the package the manifest sits in would sweep one file and report the rest
// unwritten.
const MODULES_UNDER = "akasha/editor-extension"

const SOURCES = "**/*.module.code.ts"

const MAIN = "main"

export function namedByManifest(text: string): string | null {
  let held: unknown
  try {
    held = JSON.parse(text)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object") return null
  const said = (held as Record<string, unknown>)[MAIN]
  if (typeof said !== "string" || said === "") return null
  return said.replace(/^\.\//, "")
}

export function sectionsIn(bundle: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const line of bundle.split("\n")) {
    const named = SECTION.exec(line)
    if (named?.[1] !== undefined) found.add(named[1])
  }
  return found
}

export function unreachedIn(
  root: string,
  pkg: string,
  reached: ReadonlySet<string>
): readonly string[] {
  return [...new Glob(`${pkg}/${SOURCES}`).scanSync(root)].filter((one) => !reached.has(one)).sort()
}

const STUB = `const anything = () => new Proxy(function () {}, {
  get: (_t, k) => (k === "then" ? undefined : anything()),
  apply: () => anything(),
  construct: () => anything(),
})
module.exports = anything()
`

export interface Reach {
  readonly global: string
  readonly file: string
  readonly atImport: boolean
  readonly guarded: boolean
}

export function refusedIn(reach: Reach): boolean {
  if (reach.atImport) return true
  if (!BUN_REACH.test(reach.global)) return true
  return !reach.guarded
}

export function saidAs(reach: Reach): string {
  const where = reach.atImport ? ", at import" : ""
  return `${reach.global} in ${reach.file}${where}`
}

export function reachesIn(bundle: string): readonly Reach[] {
  const sections = new Map<string, string[]>()
  const lines = bundle.split("\n")
  let file = "the bundle"
  const order: { line: string; file: string }[] = []
  for (const line of lines) {
    const named = SECTION.exec(line)
    if (named?.[1] !== undefined) file = named[1]
    order.push({ line, file })
    const held = sections.get(file)
    if (held === undefined) sections.set(file, [line])
    else held.push(line)
  }
  const found: Reach[] = []
  const seen = new Set<string>()
  for (const { line, file: at } of order) {
    for (const hit of line.matchAll(REFUSED)) {
      if (quotedAt(line, hit.index)) continue
      const reach: Reach = {
        global: hit[0],
        file: at,
        atImport: !/^\s/.test(line),
        guarded: (sections.get(at) ?? []).some((one) => one.includes(GUARD)),
      }
      const key = saidAs(reach)
      if (seen.has(key)) continue
      seen.add(key)
      found.push(reach)
    }
  }
  return found
}

export interface Judged {
  readonly entry: string
  readonly refused: readonly string[]
  readonly carried: readonly string[]
  readonly threw: string | null
  readonly built: boolean
  readonly why: string | null
  readonly reached: ReadonlySet<string>
}

function firstLines(said: string, count: number): string {
  return said
    .split("\n")
    .filter((one) => one.trim() !== "")
    .slice(0, count)
    .join(" / ")
}

async function threwUnderNode(bundleAt: string): Promise<string | null> {
  const out = mkdtempSync(join(tmpdir(), "ext-node-run-"))
  try {
    mkdirSync(join(out, "node_modules", "vscode"), { recursive: true })
    writeFileSync(join(out, "package.json"), `{ "type": "module" }\n`)
    writeFileSync(
      join(out, "node_modules", "vscode", "package.json"),
      `{ "name": "vscode", "version": "0.0.0", "main": "index.cjs" }\n`
    )
    writeFileSync(join(out, "node_modules", "vscode", "index.cjs"), STUB)
    writeFileSync(join(out, "bundle.js"), readFileSync(bundleAt, "utf8"))
    writeFileSync(join(out, "probe.mjs"), `await import("./bundle.js")\nprocess.exit(0)\n`)
    const ran = Bun.spawnSync(["node", join(out, "probe.mjs")], { cwd: out })
    if (ran.exitCode === 0) return null
    const said = `${ran.stderr.toString()}${ran.stdout.toString()}`.trim()
    return said === "" ? `node exited ${String(ran.exitCode)} and said nothing` : said
  } catch (err) {
    return `node could not be run: ${err instanceof Error ? err.message : String(err)}`
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

export async function judge(root: string, entry: string, run: boolean): Promise<Judged> {
  const out = mkdtempSync(join(tmpdir(), "ext-node-clean-"))
  const nothing = { refused: [], carried: [], threw: null, reached: new Set<string>() }
  try {
    const built = await Bun.build({
      entrypoints: [join(root, entry)],
      target: "node",
      external: ["vscode"],
      outdir: out,
    })
    if (!built.success) {
      const why = built.logs.map((one) => String(one)).join("; ")
      return { entry, ...nothing, built: false, why: why === "" ? "the bundle failed" : why }
    }
    const files = [...new Glob("**/*.js").scanSync(out)]
    if (files.length === 0) {
      return {
        entry,
        ...nothing,
        built: false,
        why: "the bundle wrote no file, so nothing was judged",
      }
    }
    const refused = new Set<string>()
    const carried = new Set<string>()
    const reached = new Set<string>()
    for (const one of files) {
      const bundle = readFileSync(join(out, one), "utf8")
      for (const said of sectionsIn(bundle)) reached.add(said)
      for (const reach of reachesIn(bundle)) {
        if (refusedIn(reach)) refused.add(saidAs(reach))
        else carried.add(saidAs(reach))
      }
    }
    const threw = run ? await threwUnderNode(join(out, files[0]!)) : null
    return {
      entry,
      refused: [...refused].sort(),
      carried: [...carried].sort(),
      threw,
      built: true,
      why: null,
      reached,
    }
  } finally {
    rmSync(out, { recursive: true, force: true })
  }
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const asked: string[] = []
  let run = true
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === "--no-run") {
      run = false
      continue
    }
    if (argv[at] === "--entry") {
      const named = argv[at + 1]
      if (named === undefined) {
        process.stderr.write("error: --entry takes a path after it\n")
        return 1
      }
      asked.push(named)
      at += 1
      continue
    }
    process.stderr.write(`error: this command takes no flag ${String(argv[at])}\n`)
    return 1
  }
  const root = process.cwd()
  const deriving = asked.length === 0
  const entries: string[] = [...asked]
  if (deriving) {
    let text: string
    try {
      text = readFileSync(join(root, PACKAGE, MANIFEST), "utf8")
    } catch (err) {
      process.stderr.write(
        `error: ${PACKAGE}/${MANIFEST} could not be read, and it names the entry point: ` +
          `${err instanceof Error ? err.message : String(err)}\n`
      )
      return 3
    }
    const named = namedByManifest(text)
    if (named === null) {
      process.stderr.write(`error: ${PACKAGE}/${MANIFEST} names no \`${MAIN}\` to judge\n`)
      return 3
    }
    entries.push(`${PACKAGE}/${named}`)
  }
  const unreached = new Set<string>()
  const reached = new Set<string>()
  const unproved = new Set<string>()
  let refused = 0
  let unbuilt = 0
  let warned = 0
  for (let at = 0; at < entries.length; at += 1) {
    const entry = entries[at]!
    const judged = await judge(root, entry, run)
    const wired = !unreached.has(entry)
    const word = wired ? "REFUSED " : "UNWIRED "
    if (!judged.built) {
      if (wired) unbuilt += 1
      process.stdout.write(`UNJUDGED ${entry} — ${String(judged.why)}\n`)
    } else {
      const bad = judged.refused.length > 0 || judged.threw !== null
      if (!bad) {
        process.stdout.write(`clean    ${entry}${wired ? "" : ", which nothing reaches"}\n`)
      } else {
        if (wired) refused += 1
        else warned += 1
        if (judged.refused.length > 0) {
          process.stdout.write(`${word} ${entry} reaches ${judged.refused.join(", ")}\n`)
        }
        if (judged.threw !== null) {
          process.stdout.write(
            `${word} ${entry} threw under node: ${firstLines(judged.threw, 3)}\n`
          )
        }
      }
      if (wired) {
        for (const one of judged.carried) {
          unproved.add(one)
          process.stdout.write(`  carried ${one}, guarded by \`${GUARD}\` in that file\n`)
        }
      }
    }
    for (const one of judged.reached) reached.add(one)
    if (!deriving) continue
    for (const one of unreachedIn(root, MODULES_UNDER, reached)) {
      if (entries.includes(one)) continue
      unreached.add(one)
      entries.push(one)
    }
  }
  const total = entries.length - unreached.size
  process.stdout.write(
    `${total - refused - unbuilt} of ${total} entry points carry no unguarded bun-only global\n`
  )
  if (unreached.size > 0) {
    process.stdout.write(
      `${unreached.size} ${unreached.size === 1 ? "file" : "files"} no entry point reaches ` +
        `${unreached.size === 1 ? "was" : "were"} judged too, and ${String(warned)} would be ` +
        `refused on being wired in. The host loads none of them, so none is counted above\n`
    )
  }
  if (unproved.size > 0) {
    process.stdout.write(
      `${unproved.size} guarded ${unproved.size === 1 ? "reach is" : "reaches are"} unproved: ` +
        `this runs no branch, so a guard whose node side throws is counted clean here\n`
    )
  }
  if (unbuilt > 0) return 4
  return refused > 0 ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
