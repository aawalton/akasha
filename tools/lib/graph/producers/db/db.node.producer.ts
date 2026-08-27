import type { Repo } from "../../../../../page/document/types.ts"
import { defineNodeProducer } from "../../define-node-producer.ts"
import type { NodeInit } from "../../types.ts"
import { discoverAllFunctions } from "./function/discover.ts"
import { DB_FUNCTION_NODE_TYPE, type DbFunctionAttrs, dbFunctionKey } from "./function/types.ts"
import { discoverTableFiles } from "./table/discover.ts"
import { extractTableIdentifier, type TableIdentifier } from "./table/extract.ts"
import { DB_TABLE_NODE_TYPE, type DbTableAttrs, dbTableKey } from "./table/types.ts"
import { discoverAllTriggers } from "./trigger/discover.ts"
import { DB_TRIGGER_NODE_TYPE, type DbTriggerAttrs, dbTriggerKey } from "./trigger/types.ts"

const DB_REPO: Repo = "code"

export const dbNodeProducer = defineNodeProducer({
  name: "db",
  nodeTypes: [DB_FUNCTION_NODE_TYPE, DB_TABLE_NODE_TYPE, DB_TRIGGER_NODE_TYPE],
  build: (ctx) => {
    const nodes: NodeInit[] = []

    for (const f of discoverAllFunctions(ctx, DB_REPO)) {
      const attrs: DbFunctionAttrs = {
        schema: f.schema,
        name: f.name,
        language: f.language,
        sourcePath: f.sourcePath,
        line: f.line,
      }
      nodes.push({
        type: DB_FUNCTION_NODE_TYPE,
        repo: DB_REPO,
        key: dbFunctionKey(f.schema, f.name),
        attrs,
      })
    }

    for (const file of discoverTableFiles(ctx, DB_REPO)) {
      const fromBody: TableIdentifier | null = extractTableIdentifier(file.content)
      const schema = fromBody?.schema ?? file.schema
      const table = fromBody?.table ?? file.table
      const attrs: DbTableAttrs = { schema, table, sourcePath: file.relPath }
      nodes.push({
        type: DB_TABLE_NODE_TYPE,
        repo: DB_REPO,
        key: dbTableKey(schema, table),
        attrs,
      })
    }

    for (const t of discoverAllTriggers(ctx, DB_REPO)) {
      const attrs: DbTriggerAttrs = {
        schema: t.schema,
        table: t.tableName,
        name: t.name,
        timing: t.timing,
        events: t.events,
        level: t.level,
        sourceFile: t.sourceFile,
        tableSchema: t.tableSchema,
        tableName: t.tableName,
        functionSchema: t.functionSchema,
        functionName: t.functionName,
      }
      nodes.push({
        type: DB_TRIGGER_NODE_TYPE,
        repo: DB_REPO,
        key: dbTriggerKey(t.schema, t.tableName, t.name),
        attrs,
      })
    }

    return { nodes }
  },
})

export default dbNodeProducer
