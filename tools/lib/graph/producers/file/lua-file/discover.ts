import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoFiles } from "../../lib/repo-files.ts"

const isLuaFileName = (name: string): boolean => name.endsWith(".lua")

export const walkLuaFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isLuaFileName)
