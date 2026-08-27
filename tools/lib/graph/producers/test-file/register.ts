import type { Engine } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { TESTED_BY_EDGE_TYPE } from "./types.ts"

export const registerTestFileTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: TESTED_BY_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
