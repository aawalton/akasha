import type { Repo } from "../../../../../page/document/types.ts"
import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export const workspaceDirsAt: (ctx: BuildContext, repo: Repo) => readonly string[] = () =>
  oldGraphGone("workspaceDirsAt")
