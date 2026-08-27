import type { Engine } from "../../types.ts"
import { TS_FILE_NODE_TYPE } from "../file/ts-file/types.ts"
import { PACKAGE_NODE_TYPE } from "../package/types.ts"
import {
  STEP_DEPENDS_ON_EDGE_TYPE,
  STEP_NAMES_FILE_EDGE_TYPE,
  STEP_NODE_TYPE,
  STEP_OF_WORKFLOW_EDGE_TYPE,
  STEP_RUNS_SCRIPT_EDGE_TYPE,
  WORKFLOW_DEPENDS_ON_EDGE_TYPE,
  WORKFLOW_DISPATCHES_EDGE_TYPE,
  WORKFLOW_NODE_TYPE,
  WORKFLOW_OF_PACKAGE_EDGE_TYPE,
  WORKFLOW_RUNS_STEP_EDGE_TYPE,
} from "./types.ts"

export const registerPipelineTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: WORKFLOW_NODE_TYPE })
  engine.registerNodeType({ name: STEP_NODE_TYPE })
  engine.registerEdgeType({
    name: WORKFLOW_DEPENDS_ON_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: WORKFLOW_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: STEP_DEPENDS_ON_EDGE_TYPE,
    from: STEP_NODE_TYPE,
    to: STEP_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: STEP_OF_WORKFLOW_EDGE_TYPE,
    from: STEP_NODE_TYPE,
    to: WORKFLOW_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WORKFLOW_RUNS_STEP_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: STEP_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: STEP_RUNS_SCRIPT_EDGE_TYPE,
    from: STEP_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: STEP_NAMES_FILE_EDGE_TYPE,
    from: STEP_NODE_TYPE,
    to: TS_FILE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WORKFLOW_OF_PACKAGE_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: WORKFLOW_DISPATCHES_EDGE_TYPE,
    from: WORKFLOW_NODE_TYPE,
    to: PACKAGE_NODE_TYPE,
  })
}
