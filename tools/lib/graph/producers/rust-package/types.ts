import { z } from "zod"

export type RustPackageAttrs = {
  readonly name: string
  readonly path: string
}

export type RustPackageNodeType = "rust-package"

export const RUST_PACKAGE_NODE_TYPE: RustPackageNodeType = "rust-package"

export const RUST_MANIFEST_NAME = "Cargo.toml"

export const RustPackageAttrsSchema = z
  .object({
    name: z.string(),
    path: z.string(),
  })
  .passthrough()
