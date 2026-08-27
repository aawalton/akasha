import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Node } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { commandBodies, filesNamedIn } from "./command-body.ts"
import { discoverSynthFiles } from "./synth-discover.ts"
import { SYNTH_NAMES_FILE_EDGE_TYPE, type SynthNamesFileAttrs } from "./synth-types.ts"

const SYNTH_ENTRY = "synth.ts"

export const synthNamesFileEdgeProducer = defineEdgeProducer({
  name: "synth-names-file",
  edgeTypes: [SYNTH_NAMES_FILE_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const standing = new Set(repoFiles(ctx, CODE_REPO))
    const edges: EdgeInit[] = []

    const fileAt = (at: string): Node | undefined =>
      graph.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    for (const found of discoverSynthFiles(ctx)) {
      const entry = fileAt(`${found.serviceDir}/${SYNTH_ENTRY}`)
      if (entry === undefined) continue
      for (const at of filesNamedIn(commandBodies(found.sources), standing)) {
        const target = fileAt(at)
        if (target === undefined) continue
        if (target.id === entry.id) continue
        const attrs: SynthNamesFileAttrs = { path: at }
        edges.push({ type: SYNTH_NAMES_FILE_EDGE_TYPE, from: entry.id, to: target.id, attrs })
      }
    }

    return { edges }
  },
})

export default synthNamesFileEdgeProducer
