import type { Engine } from "../../types.ts"
import { DOCKERFILE_FILE_NODE_TYPE } from "../file/dockerfile-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { DOCKERFILE_CARRIES_EDGE_TYPE } from "./types.ts"

export const registerDockerfileCarriesTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: DOCKERFILE_CARRIES_EDGE_TYPE,
    from: DOCKERFILE_FILE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
}
