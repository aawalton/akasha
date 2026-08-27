import { z } from "zod"

export type DbFunctionAttrs = {
  readonly schema: string
  readonly name: string
  readonly language: string
  readonly sourcePath: string
  readonly line: number
}

export type DbFunctionNodeType = "db-function"
export type DbFunctionDeclaredInEdgeType = "db-function-declared-in"

export const DB_FUNCTION_NODE_TYPE: DbFunctionNodeType = "db-function"
export const DB_FUNCTION_DECLARED_IN_EDGE_TYPE: DbFunctionDeclaredInEdgeType =
  "db-function-declared-in"

export const dbFunctionKey = (schema: string, name: string): string => `${schema}.${name}`

export const DbFunctionAttrsSchema = z
  .object({
    schema: z.string(),
    name: z.string(),
    language: z.string(),
    sourcePath: z.string(),
    line: z.number(),
  })
  .passthrough()
