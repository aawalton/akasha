import type { Engine } from "../../types.ts"
import { SH_FILE_NODE_TYPE } from "../file/sh-file/types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { YAML_FILE_NODE_TYPE } from "../file/yaml-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import { WORKFLOW_NODE_TYPE } from "../pipeline/types.ts"
import { NAMESPACE_ROLE_NODE_TYPE, RBAC_DECLARES_EDGE_TYPE } from "./rbac-types.ts"
import {
  APPLYRBAC_USES_EDGE_TYPE,
  RBAC_APPLIES_EDGE_TYPE,
  SOPS_SECRET_EDGE_TYPE,
  SYNTH_EMITS_EDGE_TYPE,
  SYNTH_GENERATED_BY_EDGE_TYPE,
  SYNTH_NAMES_FILE_EDGE_TYPE,
  SYNTH_RECIPE_INPUT_EDGE_TYPE,
  SYNTH_RUNS_ENTRY_EDGE_TYPE,
} from "./synth-types.ts"
import {
  K8S_DECLARED_IN_EDGE_TYPE,
  K8S_RESOURCE_NODE_TYPE,
  K8S_ROUTES_TO_EDGE_TYPE,
  K8S_SELECTS_EDGE_TYPE,
  K8S_USES_CONFIG_EDGE_TYPE,
  K8S_USES_PVC_EDGE_TYPE,
  K8S_USES_SECRET_EDGE_TYPE,
  K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
  NODE_HOSTNAME_NODE_TYPE,
  PINNED_TO_EDGE_TYPE,
} from "./types.ts"

const CROSS_REF_EDGE_TYPES = [
  K8S_USES_CONFIG_EDGE_TYPE,
  K8S_USES_SECRET_EDGE_TYPE,
  K8S_USES_SERVICE_ACCOUNT_EDGE_TYPE,
  K8S_USES_PVC_EDGE_TYPE,
  K8S_ROUTES_TO_EDGE_TYPE,
  K8S_SELECTS_EDGE_TYPE,
] as const

export const registerK8sNodeTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: K8S_RESOURCE_NODE_TYPE })
  engine.registerNodeType({ name: NODE_HOSTNAME_NODE_TYPE })
  engine.registerNodeType({ name: NAMESPACE_ROLE_NODE_TYPE })
  engine.registerEdgeType({
    name: PINNED_TO_EDGE_TYPE,
    from: K8S_RESOURCE_NODE_TYPE,
    to: NODE_HOSTNAME_NODE_TYPE,
  })
  for (const edgeType of CROSS_REF_EDGE_TYPES) {
    engine.registerEdgeType({
      name: edgeType,
      from: K8S_RESOURCE_NODE_TYPE,
      to: K8S_RESOURCE_NODE_TYPE,
    })
  }
  engine.registerEdgeType({
    name: RBAC_DECLARES_EDGE_TYPE,
    from: PACKAGE_NODE_TYPE,
    to: NAMESPACE_ROLE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: K8S_DECLARED_IN_EDGE_TYPE,
    from: K8S_RESOURCE_NODE_TYPE,
    to: YAML_FILE_NODE_TYPE,
  })
}

export const registerK8sSynthEdgeTypes = (engine: Engine): undefined => {
  engine.registerEdgeType({
    name: SYNTH_EMITS_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: K8S_RESOURCE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: RBAC_APPLIES_EDGE_TYPE,
    from: K8S_RESOURCE_NODE_TYPE,
    to: K8S_RESOURCE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: SOPS_SECRET_EDGE_TYPE,
    from: K8S_RESOURCE_NODE_TYPE,
    to: YAML_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: APPLYRBAC_USES_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: SYNTH_GENERATED_BY_EDGE_TYPE,
    from: K8S_RESOURCE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: SYNTH_RECIPE_INPUT_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: SYNTH_RUNS_ENTRY_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: SYNTH_NAMES_FILE_EDGE_TYPE,
    from: TS_FILE_NODE_TYPE,
    to: SH_FILE_NODE_TYPE,
  })
}
