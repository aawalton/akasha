import { z } from "zod"

export type XmlFileAttrs = {
  readonly path: string
}

export type XmlFileNodeType = "xml-file"

export const XML_FILE_NODE_TYPE: XmlFileNodeType = "xml-file"

export const XmlFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
