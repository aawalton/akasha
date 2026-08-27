import type { PipelineStatus, StepStatus, WorkflowStatus } from "./ci-status-vocabulary.ts"


export type PipelineGuardId =
  | "pipeline.pending_to_dispatching.created"
  | "pipeline.pending_to_failed.no_workflows_selected"
  | "pipeline.pending_to_completed.vacuous_prev_pass_skip"
  | "pipeline.pending_to_pending.wait_for_main_predecessor"
  | "pipeline.any_to_superseded.superseded_stamp_set"
  | "pipeline.dispatching_to_failed.children_failed"
  | "pipeline.dispatching_to_completed.children_done"
  | "pipeline.dispatching_to_running.child_running"
  | "pipeline.running_to_failed.children_failed"
  | "pipeline.running_to_completed.children_done"

export type WorkflowGuardId =
  | "workflow.pending_to_skipped.deploy_ref_match"
  | "workflow.pending_to_skipped.inputs_hash_match"
  | "workflow.pending_to_completed.stepless"
  | "workflow.any_to_superseded.pipeline_superseded"
  | "workflow.any_to_canceled.pipeline_canceled"
  | "workflow.any_to_resolved.pipeline_resolved"
  | "workflow.pending_to_dispatching.deps_met"
  | "workflow.pending_to_blocked.dep_failed"
  | "workflow.dispatching_to_running.child_running"
  | "workflow.dispatching_to_completed.stepless"
  | "workflow.dispatching_to_completed.children_done"
  | "workflow.dispatching_to_failed.children_failed"
  | "workflow.running_to_failed.children_failed"
  | "workflow.running_to_completed.children_done"

export type StepGuardId =
  | "step.pending_to_dispatching.guards_passed"
  | "step.any_to_superseded.parent_workflow"
  | "step.any_to_canceled.parent_workflow"
  | "step.any_to_blocked.parent_workflow"
  | "step.any_to_resolved.parent_workflow"
  | "step.pending_to_blocked.transitive_failure"
  | "step.pending_to_skipped.when_unmet"
  | "step.launching_to_running.pod_started"
  | "step.launching_to_pending.admission_rejected"
  | "step.launching_to_pending.launch_timeout"
  | "step.launching_to_failed.admission_exhausted"
  | "step.launching_to_failed.launch_timeout"
  | "step.dispatching_to_failed.enqueue_timeout"
  | "step.dispatching_to_failed.capacity_starved"
  | "step.running_to_completed.pod_terminal"
  | "step.running_to_failed.pod_terminal"

export type GuardId = PipelineGuardId | WorkflowGuardId | StepGuardId


export type TransitionEffect = {
  type: "transition"
  guardId: GuardId
  targetId: string
  toStatus: PipelineStatus | WorkflowStatus | StepStatus
  diagnostics?: Record<string, unknown>
  extraPatch?: Record<string, unknown>
}

export type SupersedePipelineEffect = {
  type: "supersede_pipeline"
  guardId: PipelineGuardId
  targetId: string
  supersededBy: number
}

export type CreateWorkflowEffect = {
  type: "create_workflow"
  guardId: GuardId
  pipelineId: string
  workflowName: string
  config: Record<string, unknown>
}

export type Effect = TransitionEffect | SupersedePipelineEffect | CreateWorkflowEffect
