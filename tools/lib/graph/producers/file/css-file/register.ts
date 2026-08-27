import type { Engine } from "../../../types.ts"
import { CSS_FILE_NODE_TYPE, CSS_IMPORTS_EDGE_TYPE, CSS_SOURCE_EDGE_TYPE } from "./types.ts"

export const registerCssFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: CSS_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: CSS_IMPORTS_EDGE_TYPE,
    from: CSS_FILE_NODE_TYPE,
    to: CSS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: CSS_SOURCE_EDGE_TYPE,
    from: CSS_FILE_NODE_TYPE,
    to: "package",
  })
}
