import type { Engine } from "../../../types.ts"
import { TS_FILE_NODE_TYPE } from "../ts-file/types.ts"
import { DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE, DOCKERFILE_FILE_NODE_TYPE } from "./types.ts"

export const registerDockerfileFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: DOCKERFILE_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: DOCKERFILE_COMPILES_ENTRY_EDGE_TYPE,
    from: DOCKERFILE_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
