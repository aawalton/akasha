export interface VerifyRolloutCommandsConfig {
  namespace: string
  deployment: string
  timeout?: string
}

export function verifyRolloutCommands({
  namespace,
  deployment,
  timeout = "120s",
}: VerifyRolloutCommandsConfig): readonly string[] {
  return [`kubectl rollout status -n ${namespace} deployment/${deployment} --timeout=${timeout}`]
}
