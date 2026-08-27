import type { Engine } from "../../../types.ts"
import { RUST_FILE_NODE_TYPE } from "./types.ts"

export const registerRustFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: RUST_FILE_NODE_TYPE })
}
