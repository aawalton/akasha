import type { Engine } from "../../../types.ts"
import { K8S_RESOURCE_NODE_TYPE } from "../../k8s/types.ts"
import { SOPS_DECRYPTS_TO_EDGE_TYPE, YAML_FILE_NODE_TYPE, YML_FILE_NODE_TYPE } from "./types.ts"

export const registerYamlFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: YAML_FILE_NODE_TYPE })
  engine.registerNodeType({ name: YML_FILE_NODE_TYPE })
  engine.registerEdgeType({
    name: SOPS_DECRYPTS_TO_EDGE_TYPE,
    from: YAML_FILE_NODE_TYPE,
    to: K8S_RESOURCE_NODE_TYPE,
  })
}
