import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { IMAGE_FILE_NODE_TYPE, type ImageFileAttrs } from "./types.ts"

export const classifyImageFile = (relPath: string): NodeInit<"image-file", ImageFileAttrs> => ({
  type: IMAGE_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
