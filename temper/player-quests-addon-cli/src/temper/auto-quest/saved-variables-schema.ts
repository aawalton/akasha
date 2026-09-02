import { savedVariablesRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"

const traceOptionSchema = z
  .object({
    index: z.number(),
    optionType: z.number(),
    optionTypeName: z.string().optional(),
    kind: z.string(),
    important: z.boolean(),
    chosenBefore: z.boolean(),
    text: z.string(),
  })
  .strict()

const menuEntrySchema = z
  .object({
    kind: z.literal("menu"),
    at: z.number(),
    interactionType: z.number(),
    interactionTypeName: z.string().optional(),
    offerPending: z.boolean(),
    pendingCompletion: z.boolean(),
    options: luaArrayOrEmpty(traceOptionSchema),
    decision: z.string(),
  })
  .strict()

const actionEntrySchema = z
  .object({
    kind: z.literal("action"),
    at: z.number(),
    action: z.string(),
  })
  .strict()

const completeDialogEntrySchema = z
  .object({
    kind: z.literal("complete-dialog"),
    at: z.number(),
    journalIndex: z.number(),
    numRewards: z.number(),
  })
  .strict()

export const traceEntrySchema = z.discriminatedUnion("kind", [
  menuEntrySchema,
  actionEntrySchema,
  completeDialogEntrySchema,
])

const accountWideSchema = z
  .object({
    autoQuestDebugTrace: luaArrayOrEmpty(traceEntrySchema).optional(),
  })
  .passthrough()

export const rootSchema = savedVariablesRootSchema(accountWideSchema)

export type AutoQuestTraceEntry = z.infer<typeof traceEntrySchema>
export type SavedVariablesRoot = z.infer<typeof rootSchema>
