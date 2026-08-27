import type { Repo } from "../../../../../../page/document/types.ts"
import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { nodeKey } from "../../../key.ts"
import type { EdgeInit } from "../../../types.ts"
import { DB_FUNCTION_NODE_TYPE, dbFunctionKey } from "../function/types.ts"
import { DB_TABLE_NODE_TYPE, dbTableKey } from "../table/types.ts"
import {
  DB_TRIGGER_FUNCTION_EDGE_TYPE,
  DB_TRIGGER_NODE_TYPE,
  DB_TRIGGER_TABLE_EDGE_TYPE,
  type DbTriggerAttrs,
  DbTriggerAttrsSchema,
  type DbTriggerFunctionAttrs,
  type DbTriggerTableAttrs,
} from "./types.ts"

const DB_REPO: Repo = "code"

export const dbTriggerEdgeProducer = defineEdgeProducer({
  name: "db-trigger-edge",
  edgeTypes: [DB_TRIGGER_FUNCTION_EDGE_TYPE, DB_TRIGGER_TABLE_EDGE_TYPE],
  dependsOn: ["db"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    for (const node of graph.nodes(DB_TRIGGER_NODE_TYPE)) {
      const attrs: DbTriggerAttrs = DbTriggerAttrsSchema.parse(node.attrs)
      const fnAttrs: DbTriggerFunctionAttrs = {
        functionSchema: attrs.functionSchema,
        functionName: attrs.functionName,
      }
      const fnEdge: EdgeInit<"db-trigger-function", DbTriggerFunctionAttrs> = {
        type: DB_TRIGGER_FUNCTION_EDGE_TYPE,
        from: node.id,
        to: nodeKey({
          type: DB_FUNCTION_NODE_TYPE,
          repo: DB_REPO,
          key: dbFunctionKey(attrs.functionSchema, attrs.functionName),
        }),
        attrs: fnAttrs,
      }
      edges.push(fnEdge)

      const tblAttrs: DbTriggerTableAttrs = {
        tableSchema: attrs.tableSchema,
        tableName: attrs.tableName,
      }
      const tblEdge: EdgeInit<"db-trigger-table", DbTriggerTableAttrs> = {
        type: DB_TRIGGER_TABLE_EDGE_TYPE,
        from: node.id,
        to: nodeKey({
          type: DB_TABLE_NODE_TYPE,
          repo: DB_REPO,
          key: dbTableKey(attrs.tableSchema, attrs.tableName),
        }),
        attrs: tblAttrs,
      }
      edges.push(tblEdge)
    }
    return { edges }
  },
})

export default dbTriggerEdgeProducer
