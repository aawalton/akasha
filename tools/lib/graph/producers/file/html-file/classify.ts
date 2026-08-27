import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { HTML_FILE_NODE_TYPE, type HtmlFileAttrs } from "./types.ts"

export const classifyHtmlFile = (relPath: string): NodeInit<"html-file", HtmlFileAttrs> => ({
  type: HTML_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
