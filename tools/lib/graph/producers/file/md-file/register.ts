import type { Engine } from "../../../types.ts"
import { MD_FILE_NODE_TYPE, MD_IMPORTS_EDGE_TYPE, MD_LINK_EDGE_TYPE } from "./types.ts"

export const registerMdFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: MD_FILE_NODE_TYPE })
  engine.registerEdgeType({ name: MD_IMPORTS_EDGE_TYPE, from: MD_FILE_NODE_TYPE, to: "ts-file" })
  engine.registerEdgeType({
    name: MD_LINK_EDGE_TYPE,
    from: MD_FILE_NODE_TYPE,
    to: MD_FILE_NODE_TYPE,
  })
}
