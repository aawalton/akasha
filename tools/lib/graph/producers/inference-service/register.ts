import type { Engine } from "../../types.ts"
import { INFERENCE_SERVICE_NODE_TYPE, INFERENCE_SERVICE_SOURCE_EDGE_TYPE } from "./types.ts"

export const registerInferenceServiceTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: INFERENCE_SERVICE_NODE_TYPE })
  engine.registerEdgeType({
    name: INFERENCE_SERVICE_SOURCE_EDGE_TYPE,
    from: INFERENCE_SERVICE_NODE_TYPE,
    to: INFERENCE_SERVICE_NODE_TYPE,
  })
}
