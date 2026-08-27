import type { Engine } from "../../../types.ts"
import {
  IMPORT_DYNAMIC_EDGE_TYPE,
  IMPORT_STATIC_EDGE_TYPE,
  MOCK_MODULE_EDGE_TYPE,
  IMPORT_REFERENCE_PATH_EDGE_TYPE,
  MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
  RE_EXPORT_EDGE_TYPE,
  TS_FILE_NODE_TYPE,
  TSX_FILE_NODE_TYPE,
} from "./types.ts"

export const registerTsFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TS_FILE_NODE_TYPE })
  engine.registerNodeType({ name: TSX_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: IMPORT_STATIC_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: IMPORT_DYNAMIC_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: RE_EXPORT_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: MOCK_MODULE_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: IMPORT_REFERENCE_PATH_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
