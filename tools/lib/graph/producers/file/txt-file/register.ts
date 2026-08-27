import type { Engine } from "../../../types.ts"
import { TXT_FILE_NODE_TYPE } from "./types.ts"

export const registerTxtFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TXT_FILE_NODE_TYPE })
}
