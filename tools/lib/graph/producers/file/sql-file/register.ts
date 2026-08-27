import type { Engine } from "../../../types.ts"
import { SQL_FILE_NODE_TYPE } from "./types.ts"

export const registerSqlFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: SQL_FILE_NODE_TYPE })
}
