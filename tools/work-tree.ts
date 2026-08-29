export const tool = {
  summary: "Print the work tree, initiative under initiative, composed from the files now",
  repos: ["akasha"],
} as const

import { type Drawn, type Initiatives, type Node, workTree, render, walk } from "./lib/work-tree.ts"
import { initiativesDrawn } from "../akasha/editor-extension/work-initiatives/work-initiatives.module.code.ts"
import { drawnNow } from "./lib/work-tree-drawn.ts"
import { akashaRoot } from "../repo/roots/roots.ts"

function initiativesIn(repo: string): Initiatives {
  return {
    initiatives: initiativesDrawn(repo).map((one) => ({
      slug: one.slug,
      relPath: one.path,
      parent: one.parent,
      persona: one.persona,
    })),
  }
}

const HELP = `bun tools/work-tree.ts — print the work tree, composed from the files now

The initiatives standing under no other, alphabetical by slug, and the initiatives standing under
each, as deep as the initiatives declare. Nothing is stored: this is akasha read at the moment of
asking, so it cannot disagree with the files it describes.

An initiative is keyed by the \`slug:\` it declares rather than by its file name, which is what a
seat's \`initiative-slug:\` and another initiative's \`parent-slug:\` both name.

An initiative whose parent names a document that is not there is drawn as a root and says so, rather
than being hung off a node that is not there and vanishing with its own children.

Every row carries \`kind: initiative\`, and \`--colors\` carries an empty \`byProject\`. Both are
there for the shipped Work panel, which refuses a row and an answer without them, and both go when
a build that ignores them is the one running.

An initiative row a seat states carries \`color\`, the color that seat's turn state is
drawn in, named rather than specified. A row several seats state takes the liveliest of them, so a
row says whether anything is moving on it. Every row nothing states carries null.

Usage:
  ops akasha work-tree
  ops akasha work-tree --json
  ops akasha work-tree --colors

Flags:
  --json    The tree as one JSON object, for a caller rather than a reader. It carries the
            akasha root beside the tree, so a caller joins absolute paths against what this
            command resolved rather than against a second copy of where the repository sits.
  --counts  A line saying how many nodes the tree holds.
  --colors  The colors alone, as one JSON object, keyed the way a row's \`key\` is keyed — an
            initiative by its slug. The tree is not composed and no
            initiative document is opened: this reads the seat pages and their
            sidecars and nothing else, so a caller repainting rows when a seat's turn moves
            pays none of the file walk the whole tree costs.
  --colours The same answer under the older spelling. The shipped Work panel asks by that
            name, and it goes once a build asking \`--colors\` is the one running.
  --help    This.

Exit codes:
  0  printed
`

export function colorsAnswer(
  repo: string,
  drawn: Drawn,
): {
  readonly repo: string
  readonly byProject: Record<string, string>
  readonly byInitiative: Record<string, string>
} {
  return { repo, byProject: {}, byInitiative: Object.fromEntries(drawn.byInitiative) }
}

function counts(roots: readonly Node[]): readonly string[] {
  return [`initiatives:  ${walk(roots).length}`]
}

function main(): void {
  const argv = process.argv.slice(2)
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP)
    return
  }
  const repo = akashaRoot()
  if (argv.includes("--colors") || argv.includes("--colours")) {
    process.stdout.write(`${JSON.stringify(colorsAnswer(repo, drawnNow()))}\n`)
    return
  }
  const tree = workTree(initiativesIn(repo), drawnNow())
  if (argv.includes("--json")) {
    process.stdout.write(`${JSON.stringify({ repo, roots: tree })}\n`)
    return
  }
  const lines = argv.includes("--counts") ? counts(tree) : render(tree)
  process.stdout.write(`${lines.join("\n")}\n`)
}

if (import.meta.main) main()
