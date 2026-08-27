import type { Engine } from "../../../types.ts"
import { PYTHON_FILE_NODE_TYPE } from "./types.ts"

export const registerPythonFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: PYTHON_FILE_NODE_TYPE })
}
