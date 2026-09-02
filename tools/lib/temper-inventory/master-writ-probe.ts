import { DataError } from "@akasha/errors-core/exit-code"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import { z } from "zod"

const CONDITION_SCHEMA = z
  .object({
    conditionIndex: z.number(),
    condText: z.string(),
    current: z.number(),
    max: z.number(),
    complete: z.boolean(),
    masterItemId: z.number().optional(),
    materialItemId: z.number().optional(),
    craftingType: z.number().optional(),
    quality: z.number().optional(),
    templateId: z.number().optional(),
    setId: z.number().optional(),
    traitType: z.number().optional(),
    styleId: z.number().optional(),
    encodedAlchemyTraits: z.number().optional(),
  })
  .strict()

const STEP_SCHEMA = z
  .object({
    stepIndex: z.number(),
    ending: z.boolean(),
    numConditions: z.number(),
    conditions: luaArrayOrEmpty(CONDITION_SCHEMA),
  })
  .strict()

const QUEST_SCHEMA = z
  .object({
    questIndex: z.number(),
    name: z.string(),
    repeatType: z.number(),
    questType: z.number(),
    numSteps: z.number(),
    activeStepText: z.string(),
    steps: luaArrayOrEmpty(STEP_SCHEMA),
  })
  .strict()

export const PROBE_SCHEMA = z
  .object({
    timestamp: z.number(),
    quests: luaArrayOrEmpty(QUEST_SCHEMA),
  })
  .strict()

type MasterWritProbe = z.infer<typeof PROBE_SCHEMA>

const DIAGNOSTICS_SCHEMA = z
  .object({
    lastMasterWritProbe: PROBE_SCHEMA.optional(),
  })
  .passthrough()

const ACCOUNT_WIDE_SCHEMA = z
  .object({
    diagnostics: DIAGNOSTICS_SCHEMA.optional(),
  })
  .passthrough()

const ROOT_SCHEMA = savedVariablesRootSchema(ACCOUNT_WIDE_SCHEMA)

export async function readMasterWritProbe(inventoryPath: string): Promise<MasterWritProbe> {
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
    const probe = account?.$AccountWide?.diagnostics?.lastMasterWritProbe
    if (probe !== undefined) return probe
  }

  throw new DataError(
    `TemperInventory.lua at ${inventoryPath}: no diagnostics.lastMasterWritProbe under any ` +
      `@<account>/$AccountWide (have you run /tempermwprobe then /reloadui?)`
  )
}
