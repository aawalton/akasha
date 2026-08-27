import type { Engine } from "../../../types.ts"
import { SOPS_CONFIG_FILE_NODE_TYPE } from "./types.ts"

export const registerSopsConfigFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: SOPS_CONFIG_FILE_NODE_TYPE })
}
