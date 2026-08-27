import type { Engine } from "../../../types.ts"
import { SQL_FILE_NODE_TYPE } from "../../file/sql-file/types.ts"
import { DB_FUNCTION_NODE_TYPE } from "../function/types.ts"
import { DB_TABLE_NODE_TYPE } from "../table/types.ts"
import {
  DB_TRIGGER_DECLARED_IN_EDGE_TYPE,
  DB_TRIGGER_FUNCTION_EDGE_TYPE,
  DB_TRIGGER_NODE_TYPE,
  DB_TRIGGER_TABLE_EDGE_TYPE,
} from "./types.ts"

export const registerDbTriggerTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: DB_TRIGGER_NODE_TYPE })
  engine.registerEdgeType({
    name: DB_TRIGGER_FUNCTION_EDGE_TYPE,
    from: DB_TRIGGER_NODE_TYPE,
    to: DB_FUNCTION_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: DB_TRIGGER_TABLE_EDGE_TYPE,
    from: DB_TRIGGER_NODE_TYPE,
    to: DB_TABLE_NODE_TYPE,
  })
  engine.registerEdgeType({
    name: DB_TRIGGER_DECLARED_IN_EDGE_TYPE,
    from: DB_TRIGGER_NODE_TYPE,
    to: SQL_FILE_NODE_TYPE,
  })
}
