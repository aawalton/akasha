import type { Engine } from "../../../types.ts"
import { CSV_FILE_NODE_TYPE } from "./types.ts"

export const registerCsvFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: CSV_FILE_NODE_TYPE })
}
