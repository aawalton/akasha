import type { Engine } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { DOCKERFILE_RECIPE_INPUT_EDGE_TYPE, DOCKERFILE_RECIPE_NODE_TYPE } from "./types.ts"

export const registerDockerfileRecipeTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: DOCKERFILE_RECIPE_NODE_TYPE })
  engine.registerEdgeType({
    name: DOCKERFILE_RECIPE_INPUT_EDGE_TYPE,
    from: DOCKERFILE_RECIPE_NODE_TYPE,
    to: JSON_FILE_NODE_TYPE,
  })
}
