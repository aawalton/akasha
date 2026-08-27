import { requireEnv } from "@shared/utils-narrow/validate"

export async function getAgentId(): Promise<string> {
  return requireEnv("AGENT_ID")
}
