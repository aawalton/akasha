import { z } from "zod"

export type HtmlFileAttrs = {
  readonly path: string
}

export type HtmlFileNodeType = "html-file"

export const HTML_FILE_NODE_TYPE: HtmlFileNodeType = "html-file"

export const HtmlFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
