import type { Engine } from "../../../types.ts"
import { IMAGE_FILE_NODE_TYPE } from "./types.ts"

export const registerImageFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: IMAGE_FILE_NODE_TYPE })
}
