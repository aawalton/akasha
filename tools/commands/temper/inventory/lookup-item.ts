export const summary = "Resolve an itemId or link against TemperInventory.lua and classify it"

import { readFile } from "node:fs/promises"
import type { CommandHelp } from "../../../ops/surface.ts"
import { classifyItemToNodeIds } from "@temper/game-items-core/classify-item-node-ids"
import { parseInventoryContent } from "@temper/game-items-core/inventory-parser"
import type { InventoryDatabase, InventoryItemData } from "@temper/game-items-core/inventory-types"
import { parseItemLink } from "@temper/game-items-core/item-link-parser"
import { parseMotifBookName } from "@temper/game-items-core/motif-name-parser"
import { getRecipeResultId } from "@temper/game-items-core/recipe-result-id-lookup"
import { getScriptItemIdByName } from "@temper/game-items-core/script-knowledge-lookup"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { TEMPER_INVENTORY_LUA, savedVarsFile } from "../../../lib/temper-inventory-paths.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<itemIdOrLink>",
      description: "Bare integer item id, or a full ESO item link (|H1:item:...|h|h)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--inventory-path",
      argLabel: "<path>",
      valueShape: "token",
      description: `Path to TemperInventory.lua (default: ${TEMPER_INVENTORY_LUA})`,
    },
    {
      name: "--json",
      description: "Emit JSON object instead of TSV",
    },
  ],
  examples: [
    "ops temper inventory lookup-item 16424",
    "ops temper inventory lookup-item '|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h'",
    "ops temper inventory lookup-item 16424 --json",
    "ops temper inventory lookup-item 16424 --inventory-path ./TemperInventory.lua",
  ],
}

interface RecipeClassification {
  readonly kind: "recipe"
  readonly resultItemId: number
}
interface ScriptClassification {
  readonly kind: "script"
  readonly scriptId: number
}
interface MotifClassification {
  readonly kind: "motif"
  readonly styleId: number
  readonly chapterId: number | null
}
interface UnknownClassification {
  readonly kind: "unknown"
}

type Classification =
  | RecipeClassification
  | ScriptClassification
  | MotifClassification
  | UnknownClassification

interface LookupItemJsonOutput {
  readonly itemId: number
  readonly itemLink: string | null
  readonly itemName: string | null
  readonly classification: "recipe" | "script" | "motif" | "unknown"
  readonly categoryNodeIds: readonly string[]
  readonly recipeResultItemId?: number
  readonly scriptId?: number
  readonly motifStyleId?: number
  readonly motifChapterId?: number | "master"
}

function findItemByIdInInventory(
  db: InventoryDatabase,
  targetItemId: number
): InventoryItemData | null {
  for (const location of Object.values(db.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.itemId === targetItemId) {
          return item
        }
      }
    }
  }
  return null
}

function buildJson(
  itemId: number,
  match: InventoryItemData | null,
  classification: Classification,
  categoryNodeIds: readonly string[]
): LookupItemJsonOutput {
  const base: LookupItemJsonOutput = {
    itemId,
    itemLink: match?.itemLink ?? null,
    itemName: match?.itemName ?? null,
    classification: classification.kind,
    categoryNodeIds,
  }
  if (classification.kind === "recipe")
    return { ...base, recipeResultItemId: classification.resultItemId }
  if (classification.kind === "script") return { ...base, scriptId: classification.scriptId }
  if (classification.kind === "motif")
    return {
      ...base,
      motifStyleId: classification.styleId,
      motifChapterId: classification.chapterId === null ? "master" : classification.chapterId,
    }
  return base
}

function buildTsv(
  itemId: number,
  match: InventoryItemData | null,
  classification: Classification,
  categoryNodeIds: readonly string[]
): string {
  const lines: string[] = [
    `itemId\t${itemId}`,
    `itemLink\t${match?.itemLink ?? ""}`,
    `itemName\t${match?.itemName ?? ""}`,
    `classification\t${classification.kind}`,
    `categoryNodeIds\t${JSON.stringify(categoryNodeIds)}`,
  ]
  if (classification.kind === "recipe")
    lines.push(`recipeResultItemId\t${classification.resultItemId}`)
  else if (classification.kind === "script") lines.push(`scriptId\t${classification.scriptId}`)
  else if (classification.kind === "motif") {
    lines.push(`motifStyleId\t${classification.styleId}`)
    lines.push(
      `motifChapterId\t${classification.chapterId === null ? "master" : classification.chapterId}`
    )
  }
  return `${lines.join("\n")}\n`
}

export default async function temperInventoryLookupItem(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const positional = parsed.positionals[0]
  if (positional == null) throw inputError("item id or link is required")

  const asInt = Number(positional)
  const itemId =
    Number.isInteger(asInt) && asInt >= 0 && /^\d+$/.test(positional)
      ? asInt
      : (parseItemLink(positional)?.itemId ?? null)
  if (itemId === null) {
    throw inputError(`could not parse item id or link: ${positional}`)
  }

  const inventoryPath =
    parsed.string("--inventory-path") ?? (await savedVarsFile("TemperInventory.lua"))
  let inventoryContent: string
  try {
    inventoryContent = await readFile(inventoryPath, "utf8")
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err)
    throw dataError(`could not read TemperInventory.lua at ${inventoryPath}: ${reason}`)
  }

  const match = findItemByIdInInventory(parseInventoryContent(inventoryContent), itemId)

  function classifyItemByName(name: string): Classification {
    const recipeResultId = getRecipeResultId(name)
    if (recipeResultId !== undefined) return { kind: "recipe", resultItemId: recipeResultId }

    const scriptId = getScriptItemIdByName(name)
    if (scriptId !== undefined) return { kind: "script", scriptId }

    const motifParsed = parseMotifBookName(name)
    if (motifParsed !== undefined)
      return {
        kind: "motif",
        styleId: motifParsed.styleId,
        chapterId: motifParsed.chapterId,
      }

    return { kind: "unknown" }
  }

  const classification: Classification = match
    ? classifyItemByName(match.itemName)
    : { kind: "unknown" }
  const categoryNodeIds = match ? classifyItemToNodeIds(match) : []

  if (parsed.boolean("--json")) {
    process.stdout.write(
      `${JSON.stringify(buildJson(itemId, match, classification, categoryNodeIds))}\n`
    )
    return
  }
  process.stdout.write(buildTsv(itemId, match, classification, categoryNodeIds))
}
