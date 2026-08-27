import { z } from "zod"

export type DbTriggerTiming = "BEFORE" | "AFTER" | "INSTEAD OF"
export type DbTriggerEvent = "INSERT" | "UPDATE" | "DELETE" | "TRUNCATE"
export type DbTriggerLevel = "ROW" | "STATEMENT"

export type DbTriggerAttrs = {
  readonly schema: string
  readonly table: string
  readonly name: string
  readonly timing: DbTriggerTiming
  readonly events: readonly DbTriggerEvent[]
  readonly level: DbTriggerLevel
  readonly sourceFile: string
  readonly tableSchema: string
  readonly tableName: string
  readonly functionSchema: string
  readonly functionName: string
}

export type DbTriggerFunctionAttrs = {
  readonly functionSchema: string
  readonly functionName: string
}

export type DbTriggerTableAttrs = {
  readonly tableSchema: string
  readonly tableName: string
}

export type DbTriggerNodeType = "db-trigger"
export type DbTriggerFunctionEdgeType = "db-trigger-function"
export type DbTriggerTableEdgeType = "db-trigger-table"
export type DbTriggerDeclaredInEdgeType = "db-trigger-declared-in"

export const DB_TRIGGER_NODE_TYPE: DbTriggerNodeType = "db-trigger"
export const DB_TRIGGER_FUNCTION_EDGE_TYPE: DbTriggerFunctionEdgeType = "db-trigger-function"
export const DB_TRIGGER_TABLE_EDGE_TYPE: DbTriggerTableEdgeType = "db-trigger-table"
export const DB_TRIGGER_DECLARED_IN_EDGE_TYPE: DbTriggerDeclaredInEdgeType =
  "db-trigger-declared-in"

export const dbTriggerKey = (schema: string, table: string, name: string): string =>
  `${schema}.${table}.${name}`

const TimingSchema: z.ZodType<DbTriggerTiming> = z.enum(["BEFORE", "AFTER", "INSTEAD OF"])
const EventSchema: z.ZodType<DbTriggerEvent> = z.enum(["INSERT", "UPDATE", "DELETE", "TRUNCATE"])
const LevelSchema: z.ZodType<DbTriggerLevel> = z.enum(["ROW", "STATEMENT"])

export const DbTriggerAttrsSchema: z.ZodType<DbTriggerAttrs> = z
  .object({
    schema: z.string(),
    table: z.string(),
    name: z.string(),
    timing: TimingSchema,
    events: z.array(EventSchema).readonly(),
    level: LevelSchema,
    sourceFile: z.string(),
    tableSchema: z.string(),
    tableName: z.string(),
    functionSchema: z.string(),
    functionName: z.string(),
  })
  .passthrough()

export const DbTriggerFunctionAttrsSchema = z
  .object({
    functionSchema: z.string(),
    functionName: z.string(),
  })
  .passthrough()

export const DbTriggerTableAttrsSchema = z
  .object({
    tableSchema: z.string(),
    tableName: z.string(),
  })
  .passthrough()
