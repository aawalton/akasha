import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { STEP_NODE_TYPE, type StepAttrs, stepKey } from "../pipeline/types.ts"
import { type CheckStepComposition, readCheckStepComposition } from "./composition.ts"
import { CLUSTER_CHECK_REPO, discoverClusterChecks } from "./discover.ts"
import {
  CHECK_WORKFLOW_NAME,
  CLUSTER_CHECK_NODE_TYPE,
  type ClusterCheckAttrs,
} from "./types.ts"

export const buildClusterCheckNodes = (
  checks: readonly ClusterCheckAttrs[],
  composition: CheckStepComposition
): readonly NodeInit[] => {
  const nodes: NodeInit[] = []
  for (const check of checks) {
    const checkNode: NodeInit<"cluster-check", ClusterCheckAttrs> = {
      type: CLUSTER_CHECK_NODE_TYPE,
      repo: CLUSTER_CHECK_REPO,
      key: check.name,
      attrs: check,
    }
    nodes.push(checkNode)

    const stepName = `${composition.stepPrefix}${check.name}`
    const attrs: StepAttrs = {
      name: stepName,
      workflow: CHECK_WORKFLOW_NAME,
      image: check.image ?? composition.defaultImage,
      ...(check.alwaysRun !== undefined && { alwaysRun: check.alwaysRun }),
      dependsOnSteps: check.dependsOn.map((on) => `${composition.stepPrefix}${on}`),
      script: check.script,
    }
    const stepNode: NodeInit<"step", StepAttrs> = {
      type: STEP_NODE_TYPE,
      repo: CLUSTER_CHECK_REPO,
      key: stepKey(CHECK_WORKFLOW_NAME, stepName),
      attrs,
    }
    nodes.push(stepNode)
  }
  return nodes
}

export const clusterCheckNodeProducer = defineNodeProducer({
  name: "cluster-check",
  nodeTypes: [CLUSTER_CHECK_NODE_TYPE, STEP_NODE_TYPE],
  build: (ctx) => ({
    nodes: buildClusterCheckNodes(
      discoverClusterChecks(ctx, CLUSTER_CHECK_REPO),
      readCheckStepComposition(ctx)
    ),
  }),
})

export default clusterCheckNodeProducer
