import type { Engine } from "../../types.ts"
import { RUST_PACKAGE_NODE_TYPE } from "./types.ts"

export const registerRustPackageTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: RUST_PACKAGE_NODE_TYPE })
}
