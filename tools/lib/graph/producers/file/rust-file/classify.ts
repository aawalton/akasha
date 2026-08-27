import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { RUST_FILE_NODE_TYPE, type RustFileAttrs } from "./types.ts"

export const classifyRustFile = (relPath: string): NodeInit<"rust-file", RustFileAttrs> => ({
  type: RUST_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
