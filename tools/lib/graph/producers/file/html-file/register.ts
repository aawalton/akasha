import type { Engine } from "../../../types.ts"
import { HTML_FILE_NODE_TYPE } from "./types.ts"

export const registerHtmlFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: HTML_FILE_NODE_TYPE })
}
