import type { Engine } from "../../types.ts"
import { JSON_FILE_NODE_TYPE } from "../file/json-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  IMAGE_BUILT_FROM_EDGE_TYPE,
  IMAGE_CARRIES_EDGE_TYPE,
  IMAGE_RUNS_ENTRY_EDGE_TYPE,
} from "./types.ts"

export const registerServiceImageTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: IMAGE_CARRIES_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: IMAGE_RUNS_ENTRY_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: IMAGE_BUILT_FROM_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: JSON_FILE_NODE_TYPE,
  })
}
