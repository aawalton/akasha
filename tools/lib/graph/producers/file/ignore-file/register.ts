import type { Engine } from "../../../types.ts"
import { IGNORE_FILE_NODE_TYPE } from "./types.ts"

export const registerIgnoreFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: IGNORE_FILE_NODE_TYPE })
}
