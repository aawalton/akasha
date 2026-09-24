import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { z } from "zod"

export function savedVariablesRootSchema<AccountWide extends z.ZodTypeAny>(
  accountWide: AccountWide
) {
  return z
    .object({
      Default: z
        .record(z.string(), z.object({ $AccountWide: accountWide.optional() }).passthrough())
        .optional(),
    })
    .passthrough()
}

export function accountWideHolding(
  root: Record<string, unknown>,
  key: string
): Record<string, unknown> | undefined {
  const accounts = asRecord(root.Default)
  if (accounts === undefined) return undefined
  for (const account of Object.keys(accounts).sort()) {
    if (!account.startsWith("@")) continue
    const held = asRecord(asRecord(asRecord(accounts[account])?.["$AccountWide"])?.[key])
    if (held) return held
  }
  return undefined
}

export function readFirstAccountWide(
  defaultTable: Record<string, unknown>
): Record<string, unknown> | undefined {
  for (const key of Object.keys(defaultTable)) {
    if (!key.startsWith("@")) continue
    const accountTable = asRecord(defaultTable[key])
    const accountWide = asRecord(accountTable?.["$AccountWide"])
    if (accountWide) return accountWide
  }
  return undefined
}
