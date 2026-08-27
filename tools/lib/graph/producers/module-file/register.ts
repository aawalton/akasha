import type { Engine } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { MODULE_OPENS_FILE_EDGE_TYPE } from "./types.ts"

export const registerModuleFileEdgeTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: MODULE_OPENS_FILE_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
