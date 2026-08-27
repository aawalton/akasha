import type { Engine } from "../../types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  LOCKFILE_DEPENDS_EDGE_TYPE,
  LOCKFILE_PACKAGE_NODE_TYPE,
  LOCKFILE_RESOLVES_EDGE_TYPE,
} from "./types.ts"

export const registerLockfilePackageTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: LOCKFILE_PACKAGE_NODE_TYPE })
  engine.registerEdgeType({
    name: LOCKFILE_RESOLVES_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: LOCKFILE_PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: LOCKFILE_DEPENDS_EDGE_TYPE,
    from: LOCKFILE_PACKAGE_NODE_TYPE,
    to: LOCKFILE_PACKAGE_NODE_TYPE,
  })
}
