import type { Engine } from "../../types.ts"
import { CLUSTER_CHECK_NODE_TYPE } from "./types.ts"

export const registerClusterCheckTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: CLUSTER_CHECK_NODE_TYPE })
}
