import type { Engine } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { IMPORT_CODE_REF_EDGE_TYPE } from "./types.ts"

export const registerCodeRefEdgeTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: IMPORT_CODE_REF_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
