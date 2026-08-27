import type { Engine } from "../../../types.ts"
import { SQL_FILE_NODE_TYPE } from "../../file/sql-file/types.ts"
import { DB_TABLE_DECLARED_IN_EDGE_TYPE, DB_TABLE_NODE_TYPE, FOREIGN_KEY_EDGE_TYPE } from "./types.ts"

export const registerDbTableTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: DB_TABLE_NODE_TYPE })
  engine.registerEdgeType({
    name: FOREIGN_KEY_EDGE_TYPE,
    from: DB_TABLE_NODE_TYPE,
    to: DB_TABLE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: DB_TABLE_DECLARED_IN_EDGE_TYPE,
    from: DB_TABLE_NODE_TYPE,
    to: SQL_FILE_NODE_TYPE,
  })
}
