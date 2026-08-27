import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { LUA_FILE_NODE_TYPE, type LuaFileAttrs } from "./types.ts"

export const classifyLuaFile = (relPath: string): NodeInit<"lua-file", LuaFileAttrs> => ({
  type: LUA_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
