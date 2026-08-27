import ts from "typescript"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Node } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { discoverSynthFiles } from "./synth-discover.ts"
import { SYNTH_RUNS_ENTRY_EDGE_TYPE, type SynthRunsEntryAttrs } from "./synth-types.ts"

const SYNTH_ENTRY = "synth.ts"

const CONTAINER_COMMAND_KEYS: readonly string[] = ["command", "args"]

const keyOf = (name: ts.PropertyName): string | null => {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return null
}

export const entriesCommandsStart = (
  sourcePath: string,
  text: string,
  standing: ReadonlySet<string>
): readonly string[] => {
  const sf = ts.createSourceFile(sourcePath, text, ts.ScriptTarget.Latest, true)
  const found = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isPropertyAssignment(node) && ts.isArrayLiteralExpression(node.initializer)) {
      const key = keyOf(node.name)
      if (key !== null && CONTAINER_COMMAND_KEYS.includes(key)) {
        for (const element of node.initializer.elements) {
          if (!ts.isStringLiteral(element)) continue
          if (!element.text.endsWith(".ts")) continue
          if (!standing.has(element.text)) continue
          found.add(element.text)
        }
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return [...found].sort()
}

export const synthRunsEntryEdgeProducer = defineEdgeProducer({
  name: "synth-runs-entry",
  edgeTypes: [SYNTH_RUNS_ENTRY_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const standing = new Set(repoFiles(ctx, CODE_REPO))
    const edges: EdgeInit[] = []

    const fileAt = (at: string): Node | undefined =>
      graph.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    for (const found of discoverSynthFiles(ctx)) {
      const entry = fileAt(`${found.serviceDir}/${SYNTH_ENTRY}`)
      if (entry === undefined) continue
      const held = new Set<string>()
      for (const source of found.sources) {
        for (const at of entriesCommandsStart(source.sourcePath, source.text, standing)) {
          held.add(at)
        }
      }
      for (const at of [...held].sort()) {
        const target = fileAt(at)
        if (target === undefined) continue
        if (target.id === entry.id) continue
        const attrs: SynthRunsEntryAttrs = { path: at }
        edges.push({ type: SYNTH_RUNS_ENTRY_EDGE_TYPE, from: entry.id, to: target.id, attrs })
      }
    }

    return { edges }
  },
})

export default synthRunsEntryEdgeProducer
