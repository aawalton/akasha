// The old graph is gone. This module is a stub so its callers still resolve.
// Every value here refuses; the callers are waiting to be migrated onto `graph/ask.ts`.
import type { Repo } from "../../../../../page/document/types.ts"
import { oldGraphGone } from "../../graph-gone.ts"
import type { BuildContext } from "../../types.ts"

export const workspaceDirsAt: (ctx: BuildContext, repo: Repo) => readonly string[] = () =>
  oldGraphGone("workspaceDirsAt")
