#!/usr/bin/env bun

import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { Glob } from "bun"

const HELP = `bun tools/extension-node-clean.ts — refuse a bun-only global in what the extension host loads

The editor's extension host is node. Electron runs it as a utility process under its own
node build, and \`utilityProcess.fork\` takes no option naming another binary, so the host
cannot be bun and every reach the extension makes into akasha inside its own process is a
reach for something that may not be there.

This bundles each entry point for node and refuses the bundle that carries a bun-only
global. Bundling rather than reading imports is the point: the whole reach is judged,
including what it pulls in six modules down.

THREE GLOBALS ARE REFUSED, AND ONLY ONE OF THEM IS SPELLED \`Bun\`.

  Bun.*             throws \`Bun is not defined\` where it is reached
  import.meta.path  answers undefined under node rather than throwing
  import.meta.dir   answers undefined under node rather than throwing

The two on \`import.meta\` are the dangerous ones, because a search for bun APIs does not
find them and undefined travels a long way before it is noticed. \`import.meta.main\` is
not refused: node holds it.

A reach that answers nothing under node is worse than one that throws. \`page-value\`
returns \`{ value: null }\` for every page body when no transpiler is there, exit code 0,
so the trees draw empty rather than saying why.

  --entry <path>  an entry point to judge, repeatable. Defaults to the extension's five.
  --help          This.
`

const REFUSED = /Bun\.\w+|import\.meta\.(?:path|dir)\b/g

const ENTRIES: readonly string[] = [
  "editor-extension/src/features/page-tree/harness.ts",
  "editor-extension/src/features/domain-tree/harness.ts",
  "editor-extension/src/features/agent-tree/forest.ts",
  "editor-extension/src/features/transcript/sources.ts",
  "editor-extension/src/seat/observation-store.ts",
]

export interface Judged {
  readonly entry: string
  readonly found: readonly string[]
  readonly built: boolean
  readonly why: string | null
}

export async function judge(root: string, entry: string): Promise<Judged> {
  const out = mkdtempSync(join(tmpdir(), "ext-node-clean-"))
  try {
    const built = await Bun.build({
      entrypoints: [join(root, entry)],
      target: "node",
      outdir: out,
    })
    if (!built.success) {
      const why = built.logs.map((one) => String(one)).join("; ")
      return { entry, found: [], built: false, why: why === "" ? "the bundle failed" : why }
    }
    const files = [...new Glob("**/*.js").scanSync(out)]
    if (files.length === 0) {
      return { entry, found: [], built: false, why: "the bundle wrote no file, so nothing was judged" }
    }
    const found = new Set<string>()
    for (const one of files) {
      for (const hit of readFileSync(join(out, one), "utf8").matchAll(REFUSED)) found.add(hit[0])
    }
    return { entry, found: [...found].sort(), built: true, why: null }
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
  for (let at = 0; at < argv.length; at += 1) {
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
    process.stderr.write(`error: this command takes no flag ${argv[at]}\n`)
    return 1
  }
  const root = process.cwd()
  const entries = asked.length > 0 ? asked : ENTRIES
  let refused = 0
  let unbuilt = 0
  for (const entry of entries) {
    const judged = await judge(root, entry)
    if (!judged.built) {
      unbuilt += 1
      process.stdout.write(`UNJUDGED ${entry} — ${judged.why}\n`)
      continue
    }
    if (judged.found.length === 0) {
      process.stdout.write(`clean    ${entry}\n`)
      continue
    }
    refused += 1
    process.stdout.write(`REFUSED  ${entry} carries ${judged.found.join(", ")}\n`)
  }
  const total = entries.length
  process.stdout.write(
    `${total - refused - unbuilt} of ${total} entry points carry no bun-only global\n`
  )
  if (unbuilt > 0) return 4
  return refused > 0 ? 2 : 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
