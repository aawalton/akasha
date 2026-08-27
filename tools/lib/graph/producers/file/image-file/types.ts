import { z } from "zod"

export type ImageFileAttrs = {
  readonly path: string
}

export type ImageFileNodeType = "image-file"

export const IMAGE_FILE_NODE_TYPE: ImageFileNodeType = "image-file"

export const ImageFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
