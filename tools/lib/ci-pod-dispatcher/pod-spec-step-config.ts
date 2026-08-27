import type { InputsHash12 } from "../workflow-dsl/ci-identifiers.ts"
import type { SecretRef } from "./secrets.ts"

export interface StepConfig {
  name: string
  image: string
  commands: readonly string[]
  environment?: Record<string, string | SecretRef>
  serviceAccountName?: string
  volumes?: readonly string[]
  resources?: {
    limits?: { memory?: string; cpu?: string }
    requests?: { memory?: string; cpu?: string }
  }
  dependsOn?: readonly string[]
  shell?: readonly string[]
  skipIfTagExists?: string
  outputs?: readonly string[]
  runAsUser?: number
  secretMounts?: ReadonlyArray<{
    secretName: string
    key: string
    mountPath: string
    mode?: number
  }>
}

export interface RunToCompletionContext {
  seq: number
  workflowName: string
  sha: string
  branch: string
  gitAccessToken: string
  inputsHash?: InputsHash12
}
