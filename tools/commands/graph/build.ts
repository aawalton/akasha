
export const summary = "Build the graph at a tree sha with this repo's own engine, and report what it holds"

import { inputError, operationalError } from "../../lib/exit.ts"
import { buildFrom, readAt } from "../../lib/graph/held-snapshot.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--tree-sha",
      argLabel: "<sha>",
      valueShape: "token",
      description:
        "The tree sha to assemble the graph at. The repositories are read at this sha and the " +
        "engine builds from what they hold there, so the answer is about that tree rather than " +
        "about whatever stands in a working copy.",
    },
  ],
  exits: [
    { code: 0, meaning: "the graph assembled, and its node and edge counts are printed" },
    { code: 1, meaning: "the graph did not assemble, or assembled holding no node at all" },
  ],
  examples: ["ops graph build --tree-sha <sha>"],
}

export default async function graphBuild(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const treeSha = parsed.string("--tree-sha")
  if (treeSha === undefined) {
    throw inputError("name the tree to assemble at with `--tree-sha <sha>`; there is no default.")
  }

  const graph = await buildFrom(readAt(treeSha).ctx)

  const nodes = graph.nodes().length
  const edges = graph.edges().length
  if (nodes === 0) {
    throw operationalError(
      `the graph assembled at ${treeSha} holding 0 nodes, which reads exactly like a tree with ` +
        "nothing in it. Something stopped the producers reaching the repositories."
    )
  }
  process.stdout.write(`graph at ${treeSha}: ${nodes} node(s), ${edges} edge(s)\n`)
}
