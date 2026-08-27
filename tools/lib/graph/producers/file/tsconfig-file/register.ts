import type { Engine } from "../../../types.ts"
import { TS_FILE_NODE_TYPE } from "../ts-file/types.ts"
import { TSCONFIG_FILE_NODE_TYPE, TSCONFIG_INCLUDES_FILE_EDGE_TYPE } from "./types.ts"

export const registerTsconfigFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TSCONFIG_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: TSCONFIG_INCLUDES_FILE_EDGE_TYPE,
    from: TSCONFIG_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
