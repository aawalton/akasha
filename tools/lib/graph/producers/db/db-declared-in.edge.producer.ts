import type { Repo } from "../../../../../page/document/types.ts"
import { defineEdgeProducer } from "../../define-edge-producer.ts"
import { nodeKey } from "../../key.ts"
import type { EdgeInit } from "../../types.ts"
import { SQL_FILE_NODE_TYPE } from "../file/sql-file/types.ts"
import {
  DB_FUNCTION_DECLARED_IN_EDGE_TYPE,
  DB_FUNCTION_NODE_TYPE,
  DbFunctionAttrsSchema,
} from "./function/types.ts"
import { DB_TABLE_DECLARED_IN_EDGE_TYPE, DB_TABLE_NODE_TYPE, DbTableAttrsSchema } from "./table/types.ts"
import {
  DB_TRIGGER_DECLARED_IN_EDGE_TYPE,
  DB_TRIGGER_NODE_TYPE,
  DbTriggerAttrsSchema,
} from "./trigger/types.ts"

const DB_REPO: Repo = "code"

const declaredIn = (type: string, from: string, path: string): EdgeInit => ({
  type,
  from,
  to: nodeKey({ type: SQL_FILE_NODE_TYPE, repo: DB_REPO, key: path }),
  attrs: {},
})

export const dbDeclaredInEdgeProducer = defineEdgeProducer({
  name: "db-declared-in-edge",
  edgeTypes: [
    DB_FUNCTION_DECLARED_IN_EDGE_TYPE,
    DB_TABLE_DECLARED_IN_EDGE_TYPE,
    DB_TRIGGER_DECLARED_IN_EDGE_TYPE,
  ],
  dependsOn: ["db"],
  build: (_ctx, graph) => {
    const edges: EdgeInit[] = []
    for (const node of graph.nodes(DB_FUNCTION_NODE_TYPE)) {
      const attrs = DbFunctionAttrsSchema.parse(node.attrs)
      edges.push(declaredIn(DB_FUNCTION_DECLARED_IN_EDGE_TYPE, node.id, attrs.sourcePath))
    }
    for (const node of graph.nodes(DB_TABLE_NODE_TYPE)) {
      const attrs = DbTableAttrsSchema.parse(node.attrs)
      edges.push(declaredIn(DB_TABLE_DECLARED_IN_EDGE_TYPE, node.id, attrs.sourcePath))
    }
    for (const node of graph.nodes(DB_TRIGGER_NODE_TYPE)) {
      const attrs = DbTriggerAttrsSchema.parse(node.attrs)
      edges.push(declaredIn(DB_TRIGGER_DECLARED_IN_EDGE_TYPE, node.id, attrs.sourceFile))
    }
    return { edges }
  },
})

export default dbDeclaredInEdgeProducer
