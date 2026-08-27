import { z } from "zod"

export type DockerfileRecipeAttrs = {
  readonly name: string
  readonly extensionsPath: string
}

export type DockerfileRecipeNodeType = "dockerfile-recipe"
export const DOCKERFILE_RECIPE_NODE_TYPE: DockerfileRecipeNodeType = "dockerfile-recipe"

export const DockerfileRecipeAttrsSchema = z
  .object({
    name: z.string(),
    extensionsPath: z.string(),
  })
  .passthrough()

export type DockerfileRecipeInputKind = "extensions-json" | "generator-script"

export type DockerfileRecipeInputAttrs = {
  readonly kind: DockerfileRecipeInputKind
}

export type DockerfileRecipeInputEdgeType = "dockerfile-recipe-input"
export const DOCKERFILE_RECIPE_INPUT_EDGE_TYPE: DockerfileRecipeInputEdgeType =
  "dockerfile-recipe-input"

export const DockerfileRecipeInputAttrsSchema = z
  .object({
    kind: z.enum(["extensions-json", "generator-script"]),
  })
  .passthrough()
