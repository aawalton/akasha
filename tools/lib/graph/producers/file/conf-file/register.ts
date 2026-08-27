import type { Engine } from "../../../types.ts"
import { CONF_FILE_NODE_TYPE } from "./types.ts"

export const registerConfFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: CONF_FILE_NODE_TYPE })
}
