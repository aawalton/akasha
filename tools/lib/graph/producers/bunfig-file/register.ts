import type { Engine } from "../../types.ts"
import { TOML_FILE_NODE_TYPE } from "../file/toml-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { BUNFIG_PRELOADS_FILE_EDGE_TYPE } from "./types.ts"

export const registerBunfigFileEdgeTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: BUNFIG_PRELOADS_FILE_EDGE_TYPE,
    from: TOML_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
}
