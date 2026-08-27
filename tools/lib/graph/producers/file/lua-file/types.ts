import { z } from "zod"

export type LuaFileAttrs = {
  readonly path: string
}

export type LuaFileNodeType = "lua-file"

export const LUA_FILE_NODE_TYPE: LuaFileNodeType = "lua-file"

export const LuaFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
