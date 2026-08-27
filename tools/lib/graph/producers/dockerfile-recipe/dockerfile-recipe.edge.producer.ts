import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { DOCKERFILE_GENERATOR_SCRIPT_PATH } from "./discover.ts"
import {
  DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
  DOCKERFILE_RECIPE_NODE_TYPE,
  DockerfileRecipeAttrsSchema,
  type DockerfileRecipeInputAttrs,
} from "./types.ts"

export const dockerfileRecipeEdgeProducer = defineEdgeProducer({
  name: "dockerfile-recipe-edge",
  edgeTypes: [DOCKERFILE_RECIPE_INPUT_EDGE_TYPE],
  dependsOn: ["dockerfile-recipe"],
  build: (_ctx, upstream) => {
    const edges: EdgeInit[] = []
    for (const node of upstream.nodes(DOCKERFILE_RECIPE_NODE_TYPE)) {
      const attrs = DockerfileRecipeAttrsSchema.parse(node.attrs)
      const extensionsAttrs: DockerfileRecipeInputAttrs = { kind: "extensions-json" }
      edges.push({
        type: DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
        from: node.id,
        to: nodeKey({
          type: JSON_FILE_NODE_TYPE,
          repo: node.repo,
          key: attrs.extensionsPath,
        }),
        attrs: extensionsAttrs,
      })
      const generatorAttrs: DockerfileRecipeInputAttrs = { kind: "generator-script" }
      edges.push({
        type: DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
        from: node.id,
        to: nodeKey({
          type: TS_FILE_NODE_TYPE,
          repo: node.repo,
          key: DOCKERFILE_GENERATOR_SCRIPT_PATH,
        }),
        attrs: generatorAttrs,
      })
    }
    return { edges }
  },
})

export default dockerfileRecipeEdgeProducer
