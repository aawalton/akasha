import { requireEnv } from "@akasha/utils-narrow/require-env"

export async function getAgentId(): Promise<string> {
  return requireEnv("AGENT_ID")
}
