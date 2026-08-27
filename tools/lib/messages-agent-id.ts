import { codeModule } from "./code-import.ts"

interface NarrowValidate {
  readonly requireEnv: (name: string) => string
}

export async function getAgentId(): Promise<string> {
  const validate = await codeModule<NarrowValidate>("@shared/utils-narrow/validate")
  return validate.requireEnv("AGENT_ID")
}
