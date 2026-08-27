import type { Engine } from "../../../types.ts"
import { JS_FILE_NODE_TYPE, JSX_FILE_NODE_TYPE } from "./types.ts"

export const registerJsFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: JS_FILE_NODE_TYPE })
  engine.registerNodeType({ name: JSX_FILE_NODE_TYPE })
}
