import { z } from "zod"

export type JsFileAttrs = {
  readonly path: string
}

export type JsFileNodeType = "js-file"
export type JsxFileNodeType = "jsx-file"

export const JS_FILE_NODE_TYPE: JsFileNodeType = "js-file"
export const JSX_FILE_NODE_TYPE: JsxFileNodeType = "jsx-file"

export const JS_FILE_NODE_TYPES: readonly [JsFileNodeType, JsxFileNodeType] = [
  JS_FILE_NODE_TYPE,
  JSX_FILE_NODE_TYPE,
]

export const JsFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
