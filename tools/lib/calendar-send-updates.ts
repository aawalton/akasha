import { inputError } from "./exit.ts"

export type SendUpdates = "all" | "externalOnly" | "none"

export const SEND_UPDATES: readonly SendUpdates[] = ["all", "externalOnly", "none"]

export async function narrowSendUpdates(
  raw: string | undefined
): Promise<SendUpdates | undefined> {
  if (raw === undefined) return undefined
  const match = SEND_UPDATES.find((value) => value === raw)
  if (match === undefined)
    throw inputError(
      `--send-updates must be one of: ${SEND_UPDATES.join(", ")} (got: ${raw})`
    )
  return match
}
