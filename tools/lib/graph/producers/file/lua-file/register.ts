import type { Engine } from "../../../types.ts"
import { LUA_FILE_NODE_TYPE } from "./types.ts"

export const registerLuaFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: LUA_FILE_NODE_TYPE })
}
