import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { discoverDockerfileRecipes } from "./discover.ts"
import { DOCKERFILE_RECIPE_NODE_TYPE, type DockerfileRecipeAttrs } from "./types.ts"

export const dockerfileRecipeNodeProducer = defineNodeProducer({
  name: "dockerfile-recipe",
  nodeTypes: [DOCKERFILE_RECIPE_NODE_TYPE],
  build: (ctx) => {
    const nodes: NodeInit[] = []
    for (const repo of ctx.repoRoots.keys()) {
      for (const recipe of discoverDockerfileRecipes(ctx, repo)) {
        const attrs: DockerfileRecipeAttrs = {
          name: recipe.name,
          extensionsPath: recipe.extensionsPath,
        }
        const node: NodeInit<"dockerfile-recipe", DockerfileRecipeAttrs> = {
          type: DOCKERFILE_RECIPE_NODE_TYPE,
          repo,
          key: recipe.name,
          attrs,
        }
        nodes.push(node)
      }
    }
    return { nodes }
  },
})

export default dockerfileRecipeNodeProducer
