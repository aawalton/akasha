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

\`editor-extension/src/extension.ts\` is what the host imports, so it is what this judges.
Judging the files a lane last repaired says only that those files were repaired. This
command once answered \`4 of 5 entry points carry no bun-only global\` while activation was
dying on \`undefined stands under no akasha folder\`, because the file that activates was
not among the five.

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

  --entry <path>  an entry point to judge, repeatable. Defaults to the six below.
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

const ENTRIES: readonly string[] = [
  "editor-extension/src/extension.ts",
  "editor-extension/src/features/page-tree/harness.ts",
  "editor-extension/src/features/domain-tree/harness.ts",
  "editor-extension/src/features/agent-tree/forest.ts",
  "editor-extension/src/features/transcript/sources.ts",
  "editor-extension/src/seat/observation-store.ts",
]

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
  const nothing = { refused: [], carried: [], threw: null }
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
      return { entry, ...nothing, built: false, why: "the bundle wrote no file, so nothing was judged" }
    }
    const refused = new Set<string>()
    const carried = new Set<string>()
    for (const one of files) {
      for (const reach of reachesIn(readFileSync(join(out, one), "utf8"))) {
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
  const entries = asked.length > 0 ? asked : ENTRIES
  let refused = 0
  let unbuilt = 0
  for (const entry of entries) {
    const judged = await judge(root, entry, run)
    if (!judged.built) {
      unbuilt += 1
      process.stdout.write(`UNJUDGED ${entry} — ${String(judged.why)}\n`)
      continue
    }
    const bad = judged.refused.length > 0 || judged.threw !== null
    if (!bad) {
      process.stdout.write(`clean    ${entry}\n`)
    } else {
      refused += 1
      if (judged.refused.length > 0) {
        process.stdout.write(`REFUSED  ${entry} reaches ${judged.refused.join(", ")}\n`)
      }
      if (judged.threw !== null) {
        process.stdout.write(`REFUSED  ${entry} threw under node: ${firstLines(judged.threw, 3)}\n`)
      }
    }
    for (const one of judged.carried) {
      process.stdout.write(`  carried ${one}, guarded by \`${GUARD}\` in that file\n`)
    }
  }
  const total = entries.length
  process.stdout.write(
    `${total - refused - unbuilt} of ${total} entry points carry no bun-only global\n`
  )
  if (unbuilt > 0) return 4
  return refused > 0 ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
