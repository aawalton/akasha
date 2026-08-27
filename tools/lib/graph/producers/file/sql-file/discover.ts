import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoFiles } from "../../lib/repo-files.ts"

const isSqlFileName = (name: string): boolean => name.endsWith(".sql")

export const walkSqlFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isSqlFileName)
