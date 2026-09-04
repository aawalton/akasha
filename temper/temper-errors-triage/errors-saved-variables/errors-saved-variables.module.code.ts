import type { ErrorsPayload } from "@akasha/temper-capture-errors/errors-payload"
import { assertSchemaMatchesPayload } from "@akasha/temper-capture-host/assert-schema-matches-payload"
import { savedVariablesRootSchema as captureRootSchema } from "@akasha/temper-saved-variables/account-wide"
import { luaArrayOrEmpty } from "@akasha/temper-saved-variables/lua-array"
import { z } from "zod"

export const errorEntrySchema = z
  .object({
    traceback: z.string().nullish(),
    message: z.string(),
    count: z.number(),
    firstSeenAt: z.number(),
    lastSeenAt: z.number(),
    account: z.string(),
    character: z.string(),
    world: z.string(),
    esoVersion: z.string(),
    apiVersion: z.number(),
    eventCode: z.number(),
    errorCode: z.number().optional(),
    attributedAddon: z.string().optional(),
    attributedBuildId: z.string().optional(),
    buildIds: z.record(z.string(), z.string()).optional(),
  })
  .strict()

const accountWideSchema = z
  .object({
    version: z.number().optional(),
    entries: luaArrayOrEmpty(errorEntrySchema).optional(),
  })
  .strict()

assertSchemaMatchesPayload<typeof accountWideSchema, ErrorsPayload>()

export const rootSchema = captureRootSchema(accountWideSchema)

export type SavedVariablesRoot = z.infer<typeof rootSchema>
