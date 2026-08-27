import type { Engine } from "../../../types.ts"
import { LOCK_FILE_NODE_TYPE } from "./types.ts"

export const registerLockFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: LOCK_FILE_NODE_TYPE })
}
