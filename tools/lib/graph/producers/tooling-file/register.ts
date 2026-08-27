import type { Engine } from "../../types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { PKG_CARRIES_TOOLING_EDGE_TYPE } from "./types.ts"

export const registerToolingFileTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: PKG_CARRIES_TOOLING_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
}
