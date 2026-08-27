import type { Engine } from "../../types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { TSCONFIG_FILE_NODE_TYPE } from "../file/tsconfig-file/types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import {
  ADDON_CARRIES_FILE_EDGE_TYPE,
  ADDON_COMPILES_FILE_EDGE_TYPE,
  ADDON_MANIFEST_EDGE_TYPE,
  ADDON_TSCONFIG_EDGE_TYPE,
  TEMPER_ADDON_BUILT_FROM_EDGE_TYPE,
  TEMPER_ADDON_NODE_TYPE,
} from "./types.ts"

export const registerTemperAddonTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TEMPER_ADDON_NODE_TYPE })
  engine.registerEdgeType({
    name: TEMPER_ADDON_BUILT_FROM_EDGE_TYPE,
    from: TEMPER_ADDON_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: ADDON_CARRIES_FILE_EDGE_TYPE,
    from: TEMPER_ADDON_NODE_TYPE,
    to: TEMPER_ADDON_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: ADDON_TSCONFIG_EDGE_TYPE,
    from: TEMPER_ADDON_NODE_TYPE,
    to: TSCONFIG_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: ADDON_COMPILES_FILE_EDGE_TYPE,
    from: TEMPER_ADDON_NODE_TYPE,
    to: TEMPER_ADDON_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: ADDON_MANIFEST_EDGE_TYPE,
    from: TEMPER_ADDON_NODE_TYPE,
    to: JSON_FILE_NODE_TYPE,
  })
}
