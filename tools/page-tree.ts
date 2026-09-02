#!/usr/bin/env bun

import { duringOneCall } from "@akasha/command-system/during-call"
import { askHere } from "../readouts/ask-here.ts"
import type { Ask } from "../readouts/readout-resolver.ts"

const HELP = `bun tools/page-tree.ts — the saved-query answers a page tree is composed from

Prints one JSON object on stdout and nothing else:

  { "types": [ row, … ], "properties": [ row, … ],
    "propertyTypes": [ row, … ], "domains": [ row, … ] }

A row is \`{ "at", "values" }\` exactly as the query answered it. Nothing here composes a
tree: the four groups are handed back as they were read, and whoever asked assembles
them. That keeps the assembling in one place rather than in two runtimes.

Six saved queries are asked at once and their rows gathered into four groups, because
the two type queries answer the same shape and the two property queries do too.

This is what the editor's page tree reads. It asks this as a child process because
\`askHere\` opens markdown page bodies, and loading one needs a transpiler that only bun
carries.

  --help  This.
`

export const TYPE_QUERIES: readonly string[] = ["page-type-all", "rules-engine-rule-set-all"]

export const PROPERTY_QUERIES: readonly string[] = [
  "page-property-definition-all",
  "alan-harness-tracking-field-all",
]

export const PROPERTY_TYPE_QUERY = "page-property-type-all"

export const DOMAIN_QUERY = "domain-all"

async function askQuery(slug: string, ask: Ask): Promise<readonly unknown[]> {
  let answer: Awaited<ReturnType<Ask>>
  try {
    answer = await ask(slug, {})
  } catch (cause) {
    throw new Error(`${slug} went unasked: ${String(cause)}`)
  }
  return answer.rows
}

export async function pageAnswers(ask: Ask = askHere()): Promise<unknown> {
  return duringOneCall(async () => {
    const slugs = [...TYPE_QUERIES, ...PROPERTY_QUERIES, PROPERTY_TYPE_QUERY, DOMAIN_QUERY]
    const answered = await Promise.all(slugs.map(async (slug) => askQuery(slug, ask)))
    const at = (slug: string): readonly unknown[] => answered[slugs.indexOf(slug)] ?? []
    return {
      types: TYPE_QUERIES.flatMap((slug) => [...at(slug)]),
      properties: PROPERTY_QUERIES.flatMap((slug) => [...at(slug)]),
      propertyTypes: at(PROPERTY_TYPE_QUERY),
      domains: at(DOMAIN_QUERY),
    }
  })
}

export async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return 0
  }
  const unknown = argv.filter((arg) => arg.startsWith("-"))
  if (unknown.length > 0) {
    process.stderr.write(`error: this command takes no flags, and was given ${unknown.join(" ")}\n`)
    return 1
  }
  try {
    process.stdout.write(`${JSON.stringify(await pageAnswers())}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = await main(process.argv.slice(2))
