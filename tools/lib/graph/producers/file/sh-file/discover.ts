import type { BuildContext } from "../../../types.ts"
import { CODE_REPO } from "../../lib/constants.ts"
import { repoFiles } from "../../lib/repo-files.ts"

const isShFileName = (name: string): boolean => name.endsWith(".sh")

export const walkShFiles = (ctx: BuildContext): readonly string[] =>
  repoFiles(ctx, CODE_REPO).filter(isShFileName)
