import type { Engine } from "../../../types.ts"
import { ENV_FILE_NODE_TYPE } from "./types.ts"

export const registerEnvFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: ENV_FILE_NODE_TYPE })
}
