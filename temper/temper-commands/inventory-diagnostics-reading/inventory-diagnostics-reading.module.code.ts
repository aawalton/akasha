import { DataError } from "@akasha/errors-core/exit-code"
import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { parseLuaSavedVariablesFile } from "@akasha/temper-saved-variables/lua-parser"
import type { z } from "zod"

const FILE_NAME = "TemperInventory.lua"

const VARIABLES_NAME = "TemperInventory_SavedVariables"

const ACCOUNT_MARK = "@"

/**
 * Reads one diagnostic the inventory addon left behind in TemperInventory.lua.
 *
 * The addon writes per account, under a `@<account>` key whose name this side
 * does not know, so the accounts are walked in turn and the first one carrying
 * the diagnostic answers. `wide` rules on one account's `$AccountWide` table and
 * `pick` reaches the one value out of it, which is what differs between the
 * bank profile, the bank trace, the master craft traces, the master writ probe
 * and the last explain — everything around them is the same walk.
 */
export async function readInventoryDiagnostic<Wide extends z.ZodTypeAny, Found>(
  inventoryPath: string,
  wide: Wide,
  pick: (accountWide: z.infer<Wide>) => Found | undefined,
  missing: string
): Promise<Found> {
  const file = Bun.file(inventoryPath)
  if (!(await file.exists())) {
    throw new DataError(`${FILE_NAME}: file not found at ${inventoryPath}`)
  }

  let content: string
  try {
    content = await file.text()
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw new DataError(`${FILE_NAME}: failed to read ${inventoryPath} — ${reason}`)
  }

  const root = savedVariablesRootSchema(wide).parse(
    parseLuaSavedVariablesFile(content, VARIABLES_NAME)
  )

  const defaultTable = root.Default
  if (!defaultTable) {
    throw new DataError(`${FILE_NAME} at ${inventoryPath}: missing Default table`)
  }

  const accountKeys = Object.keys(defaultTable).filter((key) => key.startsWith(ACCOUNT_MARK))
  if (accountKeys.length === 0) {
    throw new DataError(
      `${FILE_NAME} at ${inventoryPath}: no ${ACCOUNT_MARK}<account> entry under Default`
    )
  }

  for (const key of accountKeys) {
    const accountWide = defaultTable[key]?.$AccountWide
    if (accountWide === undefined) continue
    const found = pick(accountWide)
    if (found !== undefined) return found
  }

  throw new DataError(
    `${FILE_NAME} at ${inventoryPath}: ${missing} under any ${ACCOUNT_MARK}<account>/$AccountWide`
  )
}
