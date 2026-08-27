import type { Engine } from "../../../types.ts"
import { SYSTEMD_UNIT_FILE_NODE_TYPE } from "./types.ts"

export const registerSystemdUnitFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: SYSTEMD_UNIT_FILE_NODE_TYPE })
}
