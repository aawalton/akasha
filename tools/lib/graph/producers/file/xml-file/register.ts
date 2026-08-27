import type { Engine } from "../../../types.ts"
import { XML_FILE_NODE_TYPE } from "./types.ts"

export const registerXmlFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: XML_FILE_NODE_TYPE })
}
