import { z } from "zod"

export type DbTableAttrs = {
  readonly schema: string
  readonly table: string
  readonly sourcePath: string
}

export type ForeignKeyAttrs = {
  readonly constraintName: string
  readonly fromColumns: readonly string[]
  readonly toColumns: readonly string[]
  readonly onDelete: string | null
  readonly sourcePath: string
  readonly line: number
}

export type DbTableNodeType = "db-table"
export type ForeignKeyEdgeType = "foreign-key"
export type DbTableDeclaredInEdgeType = "db-table-declared-in"

export const DB_TABLE_NODE_TYPE: DbTableNodeType = "db-table"
export const FOREIGN_KEY_EDGE_TYPE: ForeignKeyEdgeType = "foreign-key"
export const DB_TABLE_DECLARED_IN_EDGE_TYPE: DbTableDeclaredInEdgeType = "db-table-declared-in"

export const dbTableKey = (schema: string, table: string): string => `${schema}.${table}`

export const DbTableAttrsSchema = z
  .object({
    schema: z.string(),
    table: z.string(),
    sourcePath: z.string(),
  })
  .passthrough()

export const ForeignKeyAttrsSchema = z
  .object({
    constraintName: z.string(),
    fromColumns: z.array(z.string()),
    toColumns: z.array(z.string()),
    onDelete: z.string().nullable(),
    sourcePath: z.string(),
    line: z.number(),
  })
  .passthrough()
