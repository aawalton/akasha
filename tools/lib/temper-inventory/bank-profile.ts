import { DataError } from "@shared/errors-core/exit"
import { luaArrayOrEmpty } from "@temper/shared-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@temper/shared-saved-variables/lua-parser"
import { savedVariablesRootSchema } from "@temper/shared-saved-variables/saved-variables-account-wide"
import { z } from "zod"

const ENTRY_SCHEMA = z
  .object({
    kind: z.enum(["closure", "cfunction"]),
    name: z.string(),
    source: z.string(),
    line: z.number(),
    callCount: z.number(),
    inclusiveMs: z.number(),
    selfMs: z.number(),
  })
  .strict()

const SOURCE_BUCKET_SCHEMA = z
  .object({
    source: z.string(),
    selfMs: z.number(),
    inclusiveMs: z.number(),
    callCount: z.number(),
  })
  .strict()

export const PROFILE_SCHEMA = z
  .object({
    schemaVersion: z.number(),
    timestamp: z.number(),
    bankingBag: z.number(),
    profilerAvailable: z.boolean(),
    frameCount: z.number(),
    recordCount: z.number(),
    truncated: z.boolean(),
    totalLuaMs: z.number(),
    totalSelfMs: z.number(),
    gcMs: z.number(),
    bySource: luaArrayOrEmpty(SOURCE_BUCKET_SCHEMA),
    topByInclusive: luaArrayOrEmpty(ENTRY_SCHEMA),
    topBySelf: luaArrayOrEmpty(ENTRY_SCHEMA),
  })
  .strict()

type BankProfile = z.infer<typeof PROFILE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastBankProfile: PROFILE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

export async function readBankProfile(inventoryPath: string): Promise<BankProfile> {
  const file = Bun.file(inventoryPath)
  if (!(await file.exists())) {
    throw new DataError(`TemperInventory.lua: file not found at ${inventoryPath}`)
  }
  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`TemperInventory.lua: failed to read ${inventoryPath} — ${reason}`)
  }

  const rawRoot = parseLuaSavedVariablesFile(content, "TemperInventory_SavedVariables")
  const root = ROOT_SCHEMA.parse(rawRoot)

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`TemperInventory.lua at ${inventoryPath}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((k) => k.startsWith("@"))
  if (accountKeys.length === 0) {
    throw new DataError(
      `TemperInventory.lua at ${inventoryPath}: no @<account> entry under Default`
    )
  }

  for (const key of accountKeys) {
    const account = defaultTable[key]
    const profile = account?.$AccountWide?.diagnostics?.lastBankProfile
    if (profile !== undefined) return profile
  }

  throw new DataError(
    `TemperInventory.lua at ${inventoryPath}: no diagnostics.lastBankProfile under any ` +
      `@<account>/$AccountWide (interact with a banker, then /reloadui, then re-run)`
  )
}
