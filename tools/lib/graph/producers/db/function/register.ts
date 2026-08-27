import type { Engine } from "../../../types.ts"
import { SQL_FILE_NODE_TYPE } from "../../file/sql-file/types.ts"
import { DB_FUNCTION_DECLARED_IN_EDGE_TYPE, DB_FUNCTION_NODE_TYPE } from "./types.ts"

export const registerDbFunctionTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: DB_FUNCTION_NODE_TYPE })
  engine.registerEdgeType({
    name: DB_FUNCTION_DECLARED_IN_EDGE_TYPE,
    from: DB_FUNCTION_NODE_TYPE,
    to: SQL_FILE_NODE_TYPE,
  })
}
