import type { Engine } from "../../types.ts"
import {
  FILE_IN_PKG_EDGE_TYPE,
  PACKAGE_NODE_TYPE,
  PKG_CONTAINS_FILE_EDGE_TYPE,
  PKG_DEPENDS_EDGE_TYPE,
  TSCONFIG_REF_EDGE_TYPE,
  TSTL_BUNDLE_ENTRY_EDGE_TYPE,
  TSTL_PLUGIN_EDGE_TYPE,
  WORKSPACE_ROOT_NODE_TYPE,
} from "./types.ts"

export const registerPackageTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: PACKAGE_NODE_TYPE })
  engine.registerNodeType({ name: WORKSPACE_ROOT_NODE_TYPE })
  engine.registerEdgeType({
    name: PKG_DEPENDS_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: TSCONFIG_REF_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: TSTL_BUNDLE_ENTRY_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: TSTL_PLUGIN_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: PKG_CONTAINS_FILE_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: FILE_IN_PKG_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
}
