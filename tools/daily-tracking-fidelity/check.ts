import { existsSync, readFileSync } from "node:fs"
import { compareCorpora, type Fault, type IdMap } from "./compare.ts"
import { readCorpus, summarise } from "./read-corpus.ts"
import { LEDGERS } from "./ledger.ts"

const HELP = `daily-tracking-fidelity

  bun tools/daily-tracking-fidelity/check.ts --old <dir> --new <dir> [--id-map <file.json>] [--census]

  --old      the corpus as it is today: *.daily-tracking.md plus the two jsonl sidecars
  --new      the migrated corpus: the same markdown layout, or akasha page .ts files
  --id-map   json object mapping every re-minted old page identity to its new one
  --census   print the key ledger and exit

  Exit 0 when every value round-tripped. Exit 1 on any fault. Exit 2 on a usage or read error.
  A source that cannot be read is a read-fault and never an empty source.
`

function argOf(name: string): string | null {
  const at = process.argv.indexOf(`--${name}`)
  if (at === -1) return null
  const value = process.argv[at + 1]
  if (value === undefined || value.startsWith("--")) {
    process.stderr.write(`--${name} needs a value\n`)
    process.exit(2)
  }
  return value
}

function loadIdMap(path: string | null): IdMap {
  if (path === null) return {}
  if (!existsSync(path)) {
    process.stderr.write(`id map does not exist: ${path}\n`)
    process.exit(2)
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"))
  } catch (error) {
    process.stderr.write(`id map is not json: ${(error as Error).message}\n`)
    process.exit(2)
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    process.stderr.write("id map is not a json object\n")
    process.exit(2)
  }
  for (const [from, to] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof to !== "string") {
      process.stderr.write(`id map entry ${from} does not name a string\n`)
      process.exit(2)
    }
  }
  return parsed as IdMap
}

function census(): never {
  for (const [kind, ledger] of Object.entries(LEDGERS)) {
    process.stdout.write(`\n${kind} keys (${Object.keys(ledger).length})\n`)
    for (const [key, entry] of Object.entries(ledger)) {
      const need = entry.optional ? "optional" : "required"
      process.stdout.write(`  ${key.padEnd(34)} ${entry.policy.padEnd(28)} ${need.padEnd(9)} ${entry.note}\n`)
    }
  }
  process.exit(0)
}

function report(faults: Fault[]): void {
  const byKind = new Map<string, Fault[]>()
  for (const fault of faults) {
    const bucket = byKind.get(fault.kind) ?? []
    bucket.push(fault)
    byKind.set(fault.kind, bucket)
  }
  for (const [kind, bucket] of [...byKind].sort((a, b) => b[1].length - a[1].length)) {
    process.stdout.write(`\n  ${kind} (${bucket.length})\n`)
    for (const fault of bucket.slice(0, 12)) {
      process.stdout.write(`    ${fault.where} :: ${fault.key} :: ${fault.detail}\n`)
    }
    if (bucket.length > 12) process.stdout.write(`    ... and ${bucket.length - 12} more\n`)
  }
}

const main = async (): Promise<never> => {
  if (process.argv.includes("--help")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  if (process.argv.includes("--census")) census()
  const oldRoot = argOf("old")
  const newRoot = argOf("new")
  if (oldRoot === null || newRoot === null) {
    process.stderr.write(HELP)
    process.exit(2)
  }
  const idMap = loadIdMap(argOf("id-map"))

  let before: Awaited<ReturnType<typeof readCorpus>>
  let after: Awaited<ReturnType<typeof readCorpus>>
  try {
    before = await readCorpus(oldRoot)
    after = await readCorpus(newRoot)
  } catch (error) {
    process.stderr.write(`read error: ${(error as Error).message}\n`)
    process.exit(2)
  }

  process.stdout.write(`old      ${summarise(before)}\n`)
  process.stdout.write(`migrated ${summarise(after)}\n`)

  const verdict = compareCorpora(before, after, idMap)
  process.stdout.write(
    `checked  ${verdict.recordsChecked} records, ${verdict.valuesChecked} values, ${Object.keys(idMap).length} id-map entries\n`,
  )
  if (verdict.faults.length === 0) {
    process.stdout.write("\nVERDICT lossless: every value round-tripped\n")
    process.exit(0)
  }
  process.stdout.write(`\nVERDICT ${verdict.faults.length} fault(s)\n`)
  report(verdict.faults)
  process.exit(1)
}

await main()
