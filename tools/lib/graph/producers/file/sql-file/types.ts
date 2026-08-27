import { z } from "zod"
import { nodeIdPrefix } from "../../lib/node-id.ts"

export type SqlFileAttrs = {
  readonly path: string
}

export type SqlFileNodeType = "sql-file"

export const SQL_FILE_NODE_TYPE: SqlFileNodeType = "sql-file"

export const SQL_FILE_NODE_ID_PREFIX = nodeIdPrefix(SQL_FILE_NODE_TYPE)

export const SqlFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
