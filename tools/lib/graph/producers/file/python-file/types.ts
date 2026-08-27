import { z } from "zod"

export type PythonFileAttrs = {
  readonly path: string
}

export type PythonFileNodeType = "python-file"

export const PYTHON_FILE_NODE_TYPE: PythonFileNodeType = "python-file"

export const PythonFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
