import type { Engine } from "../../../types.ts"
import { CERTIFICATE_FILE_NODE_TYPE } from "./types.ts"

export const registerCertificateFileTypes = (engine: Engine): undefined => {
  engine.registerNodeType({ name: CERTIFICATE_FILE_NODE_TYPE })
}
