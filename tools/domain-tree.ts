#!/usr/bin/env bun

import { sayAnswer } from "@akasha/command-system/answer-bytes"
import { championTree, type DomainRow } from "@akasha/editor-extension/champions-tree"
import { domainsDrawn } from "@akasha/editor-extension/panel-domains"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const HELP = `bun tools/domain-tree.ts — the domain tree, composed from the files now

Prints one JSON object on stdout and nothing else:

  { "repo", "roots": [ { "slug", "relPath", "persona", "position", "children" }, … ],
    "unreached": [ "<slug>", … ] }

A domain hangs under the domain it names as its parent. One naming a parent no domain
answers to is left out of the tree and named in \`unreached\`, so a broken edge is said
rather than swallowed.

\`repo\` is the akasha checkout the tree was read from, and \`relPath\` is each domain's
path inside it, so a reader joins the two to open the file.

This is what the editor's domain tree reads. It asks this as a child process because
composing the tree reaches page bodies, and loading one needs a transpiler that only
bun carries.

  --help  This.
`

function domainRowsIn(repo: string): readonly DomainRow[] {
  return domainsDrawn(repo).map((one) => ({
    slug: one.slug,
    relPath: one.path,
    persona: null,
    parent: one.parent,
    sequence: one.sequence,
  }))
}

export function domainTree(): unknown {
  const repo = rootFor(resolveRoots(), AKASHA)
  const { roots, unreached } = championTree(domainRowsIn(repo))
  return { repo, roots, unreached }
}

export function main(argv: readonly string[]): number {
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
    sayAnswer(`${JSON.stringify(domainTree())}\n`)
  } catch (err) {
    process.stderr.write(`error: ${err instanceof Error ? err.message : String(err)}\n`)
    return 3
  }
  return 0
}

if (import.meta.main) process.exitCode = main(process.argv.slice(2))
