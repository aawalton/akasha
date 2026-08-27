import { z } from "zod"

export type CertificateFileAttrs = {
  readonly path: string
}

export type CertificateFileNodeType = "certificate-file"

export const CERTIFICATE_FILE_NODE_TYPE: CertificateFileNodeType = "certificate-file"

export const CertificateFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
