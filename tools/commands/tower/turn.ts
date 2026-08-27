export const summary = "Resolve one action through the pure engine and print the roll (coordinator-only)"

import { readFile } from "node:fs/promises"
import type { ActionInput } from "@alanwalton/tower-engine/types"
import { resolveAction } from "@alanwalton/tower-engine/resolve-action"
import { actionResultToRollPayload } from "@alanwalton/tower/tower/roll-payload"
import { z } from "zod"
import type { CommandHelp } from "../../ops/surface.ts"
import { dataError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--action",
      argLabel: "<path|->",
      valueShape: "token",
      required: true,
      description: "Engine ActionInput JSON file ('-' for stdin)",
    },
    {
      name: "--turn",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Turn number to label the roll",
    },
    {
      name: "--action-label",
      argLabel: "<text>",
      valueShape: "prose",
      description: "Optional action label for the roll",
    },
    { name: "--json", description: "Emit the roll payload as JSON" },
  ],
  exits: [{ code: 2, meaning: "Missing/malformed ActionInput or turn number" }],
  examples: [
    "ops tower turn --turn 57 --action /tmp/action.json",
    "cat action.json | ops tower turn --turn 57 --action - --action-label-file ./action-label.txt --json",
  ],
}

const AttributesSchema = z.object({
  MIGHT: z.number(),
  FINESSE: z.number(),
  VITALITY: z.number(),
  INTELLECT: z.number(),
  PERCEPTION: z.number(),
  WILL: z.number(),
  PRESENCE: z.number(),
  LUCK: z.number(),
})

const SheetSchema = z
  .object({
    name: z.string(),
    kind: z.enum(["player", "enemy", "ally"]),
    level: z.number(),
    class: z.string().optional(),
    attributes: AttributesSchema,
    rollMode: z.enum(["2d10", "1d20"]).optional(),
    equipment: z
      .object({
        weapon: z.object({ atk: z.number().optional() }).nullable().optional(),
        armor: z.object({ def: z.number().optional() }).nullable().optional(),
      })
      .optional(),
    skills: z
      .array(z.object({ id: z.string(), name: z.string(), bonus: z.number().optional() }))
      .optional(),
  })
  .passthrough()

const ActionInputSchema = z
  .object({
    attacker: SheetSchema,
    defender: SheetSchema,
    mode: z.enum(["phys", "ment"]),
    baseDamage: z.number(),
    skillBonus: z.number().optional(),
    intent: z.number(),
    gate: z.number().optional(),
    seed: z.number(),
  })
  .strict()

export default async function towerTurn(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const actionPath = parsed.requireString("--action")
  const turn = parsed.nonNegativeInt("--turn")
  if (turn === undefined) {
    throw dataError("--turn is required (the turn number to label the roll)")
  }
  const actionLabel = parsed.string("--action-label")
  const json = parsed.boolean("--json")

  let raw: string
  try {
    raw = actionPath === "-" ? await Bun.stdin.text() : await readFile(actionPath, "utf8")
  } catch (err) {
    throw dataError(
      `cannot read --action: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  let input: ActionInput
  try {
    input = ActionInputSchema.parse(JSON.parse(raw)) as ActionInput
  } catch (err) {
    throw dataError(
      `invalid ActionInput: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  const result = resolveAction(input)
  const payload = actionResultToRollPayload(input, result, {
    turn,
    ...(actionLabel !== undefined ? { action: actionLabel } : {}),
  })

  if (json) {
    process.stdout.write(`${JSON.stringify(payload)}\n`)
    return
  }
  process.stdout.write(`${result.line}\n`)
}
