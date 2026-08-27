import { posix } from "node:path"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import type { EdgeInit, Node } from "../../types.ts"
import { CODE_REPO } from "../lib/constants.ts"
import { repoFiles } from "../lib/repo-files.ts"
import { discoverSynthFiles } from "./synth-discover.ts"
import { SYNTH_RECIPE_INPUT_EDGE_TYPE, type SynthRecipeInputAttrs } from "./synth-types.ts"

const SYNTH_ENTRY = "synth.ts"

export const synthRecipeInputEdgeProducer = defineEdgeProducer({
  name: "synth-recipe-input",
  edgeTypes: [SYNTH_RECIPE_INPUT_EDGE_TYPE],
  dependsOn: ["file"],
  build: (ctx, graph) => {
    const paths = repoFiles(ctx, CODE_REPO)
    const edges: EdgeInit[] = []

    const fileAt = (at: string): Node | undefined =>
      graph.nodesByKey(at, CODE_REPO).find((one: Node) => one.type.endsWith("-file"))

    for (const found of discoverSynthFiles(ctx)) {
      const dir = found.serviceDir
      const entry = fileAt(`${dir}/${SYNTH_ENTRY}`)
      if (entry === undefined) continue
      for (const at of paths) {
        if (posix.dirname(at) !== dir) continue
        if (at.endsWith(".ts")) continue
        const target = fileAt(at)
        if (target === undefined) continue
        const attrs: SynthRecipeInputAttrs = { path: at }
        edges.push({
          type: SYNTH_RECIPE_INPUT_EDGE_TYPE,
          from: entry.id,
          to: target.id,
          attrs,
        })
      }
    }

    return { edges }
  },
})

export default synthRecipeInputEdgeProducer
