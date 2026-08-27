import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { JS_FILE_NODE_TYPE, type JsFileAttrs, JSX_FILE_NODE_TYPE } from "./types.ts"

export const classifyJsFile = (relPath: string): NodeInit<"js-file", JsFileAttrs> => ({
  type: JS_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})

export const classifyJsxFile = (relPath: string): NodeInit<"jsx-file", JsFileAttrs> => ({
  type: JSX_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
