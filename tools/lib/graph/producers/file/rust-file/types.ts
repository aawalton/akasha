import { z } from "zod"

export type RustFileAttrs = {
  readonly path: string
}

export type RustFileNodeType = "rust-file"

export const RUST_FILE_NODE_TYPE: RustFileNodeType = "rust-file"

export const RustFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
