import type { Engine } from "../../../types.ts"
import { TOML_FILE_NODE_TYPE } from "./types.ts"

export const registerTomlFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: TOML_FILE_NODE_TYPE })
}
