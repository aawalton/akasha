
export const summary = "Move a category rule by absolute index (--to, the `pos` column) or relative to another user rule (--before/--after)"

import type { CommandHelp } from "../../../../ops/surface.ts"
import { codeModule } from "../../../../lib/code-import.ts"
import { inputError, dataError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import { emitJson } from "../../../../lib/format-output.ts"
import {
  assertWriteAllowed,
  inventorySettings,
  type RuleSettings,
} from "../../../../lib/temper-inventory.ts"

const RULE_SETTINGS = "@temper/game-items-rules-core/inventory-rule-settings"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<id>",
      description: "Rule id to move",
      required: true,
    },
  ],
  flags: [
    {
      name: "--to",
      argLabel: "<index>",
      valueShape: "token",
      description: "0-based destination index in the user-rule list (the `pos` column)",
    },
    {
      name: "--before",
      argLabel: "<anchorId>",
      valueShape: "token",
      description: "Position the moved rule immediately before this user rule",
    },
    {
      name: "--after",
      argLabel: "<anchorId>",
      valueShape: "token",
      description: "Position the moved rule immediately after this user rule",
    },
    {
      name: "--force",
      description: "Bypass the locked-rule guard",
    },
  ],
  mutuallyExclusive: [["--to", "--before", "--after"]],
  exits: [{ code: 2, meaning: "rule (or anchor) with the given id was not found" }],
  examples: [
    "ops temper inventory rule reorder 7913abcd --to 0",
    "ops temper inventory rule reorder 7913abcd --before a1b2c3d4",
    "ops temper inventory rule reorder 7913abcd --after a1b2c3d4 --force",
  ],
}

interface RuleTransforms {
  readonly reorderCategoryRule: (
    settings: RuleSettings,
    id: string,
    toIndex: number
  ) => RuleSettings
  readonly resolveAnchorIndex: (
    settings: RuleSettings,
    id: string,
    anchorId: string,
    side: "before" | "after"
  ) => number | undefined
}

export default async function temperInventoryRuleReorder(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const id = parsed.positionals[0]
  if (id === undefined) throw inputError("rule id is required")
  const toFlag = parsed.nonNegativeInt("--to")
  const before = parsed.string("--before")
  const after = parsed.string("--after")
  const force = parsed.boolean("--force")

  if (toFlag === undefined && before === undefined && after === undefined) {
    throw inputError("one of --to, --before, or --after is required")
  }

  const [settingsAccess, transforms] = await Promise.all([
    inventorySettings(),
    codeModule<RuleTransforms>(RULE_SETTINGS),
  ])
  const settings = await settingsAccess.read()
  const existing = settings.rules.find((r) => r.id === id)
  if (existing === undefined) {
    throw dataError(`rule with id '${id}' not found in user rules`)
  }
  assertWriteAllowed(existing, force)

  let toIndex: number
  if (toFlag !== undefined) {
    if (toFlag > settings.rules.length) {
      throw inputError(
        `--to: index ${toFlag} is out of range (user-rules length is ${settings.rules.length})`
      )
    }
    toIndex = toFlag
  } else {
    const anchorFlag = before !== undefined ? "--before" : "--after"
    const anchorId = before ?? after
    if (anchorId === undefined) {
      throw inputError("one of --to, --before, or --after is required")
    }
    if (anchorId === id) {
      throw inputError(`${anchorFlag}: cannot anchor a rule to itself`)
    }
    const resolved = transforms.resolveAnchorIndex(
      settings,
      id,
      anchorId,
      before !== undefined ? "before" : "after"
    )
    if (resolved === undefined) {
      throw dataError(
        `${anchorFlag}: anchor rule '${anchorId}' not found in user rules (controlled rules cannot be used as anchors)`
      )
    }
    toIndex = resolved
  }

  const next = transforms.reorderCategoryRule(settings, id, toIndex)
  await settingsAccess.write(next)
  process.stdout.write(`${emitJson({ id, toIndex })}\n`)
}
