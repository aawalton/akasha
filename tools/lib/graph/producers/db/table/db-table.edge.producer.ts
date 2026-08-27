import type { Repo } from "../../../../../../page/document/types.ts"
import { defineEdgeProducer } from "../../../define-edge-producer.ts"
import { nodeKey } from "../../../key.ts"
import type { EdgeInit } from "../../../types.ts"
import { discoverFkConstraintFiles } from "./discover.ts"
import { extractForeignKeyConstraints } from "./extract.ts"
import {
  DB_TABLE_NODE_TYPE,
  dbTableKey,
  FOREIGN_KEY_EDGE_TYPE,
  type ForeignKeyAttrs,
} from "./types.ts"

const DB_REPO: Repo = "code"

const tableNodeId = (schema: string, table: string): string =>
  nodeKey({ type: DB_TABLE_NODE_TYPE, repo: DB_REPO, key: dbTableKey(schema, table) })

export const dbTableEdgeProducer = defineEdgeProducer({
  name: "db-table-edge",
  edgeTypes: [FOREIGN_KEY_EDGE_TYPE],
  dependsOn: ["db"],
  build: (ctx) => {
    const edges: EdgeInit<"foreign-key", ForeignKeyAttrs>[] = []
    for (const fkFile of discoverFkConstraintFiles(ctx, DB_REPO)) {
      for (const fk of extractForeignKeyConstraints(fkFile.content)) {
        const attrs: ForeignKeyAttrs = {
          constraintName: fk.constraintName,
          fromColumns: fk.fromColumns,
          toColumns: fk.toColumns,
          onDelete: fk.onDelete,
          sourcePath: fkFile.relPath,
          line: fk.line,
        }
        edges.push({
          type: FOREIGN_KEY_EDGE_TYPE,
          from: tableNodeId(fk.ownerSchema, fk.ownerTable),
          to: tableNodeId(fk.targetSchema, fk.targetTable),
          attrs,
        })
      }
    }
    return { edges }
  },
})

export default dbTableEdgeProducer
