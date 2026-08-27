import { z } from "zod"

export type SwiftFileAttrs = {
  readonly path: string
}

export type SwiftFileNodeType = "swift-file"

export const SWIFT_FILE_NODE_TYPE: SwiftFileNodeType = "swift-file"

export const SwiftFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
