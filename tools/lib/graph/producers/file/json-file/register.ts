import type { Engine } from "../../../types.ts"
import { JSON_FILE_NODE_TYPE } from "./types.ts"

export const registerJsonFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: JSON_FILE_NODE_TYPE })
}
