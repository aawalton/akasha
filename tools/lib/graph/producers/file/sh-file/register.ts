import type { Engine } from "../../../types.ts"
import { SH_FILE_NODE_TYPE, SH_SOURCES_FILE_EDGE_TYPE } from "./types.ts"

export const registerShFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: SH_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: SH_SOURCES_FILE_EDGE_TYPE,
    from: SH_FILE_NODE_TYPE,
    to: SH_FILE_NODE_TYPE,
  })
}
