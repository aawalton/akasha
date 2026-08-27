import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { CERTIFICATE_FILE_NODE_TYPE, type CertificateFileAttrs } from "./types.ts"

export const classifyCertificateFile = (relPath: string): NodeInit<"certificate-file", CertificateFileAttrs> => ({
  type: CERTIFICATE_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
