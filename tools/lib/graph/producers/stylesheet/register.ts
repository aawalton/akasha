import type { Engine } from "../../types.ts"
import { CSS_FILE_NODE_TYPE } from "../file/css-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { IMPORT_STYLESHEET_EDGE_TYPE } from "./types.ts"

export const registerStylesheetTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: IMPORT_STYLESHEET_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: CSS_FILE_NODE_TYPE,
  })
}
