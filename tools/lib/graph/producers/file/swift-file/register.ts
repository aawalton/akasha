import type { Engine } from "../../../types.ts"
import { SWIFT_FILE_NODE_TYPE } from "./types.ts"

export const registerSwiftFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: SWIFT_FILE_NODE_TYPE })
}
