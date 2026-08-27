import type { Engine } from "../../../types.ts"
import { BIOME_CONFIG_FILE_NODE_TYPE } from "./types.ts"

export const registerBiomeConfigFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: BIOME_CONFIG_FILE_NODE_TYPE })
}
