import { CODE_REPO } from "../../../../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts"
import { nodeKey } from "../../key.ts"

export const nodeId = (type: string, key: string): string => nodeKey({ type, repo: CODE_REPO, key })

export const nodeIdPrefix = (type: string): string => nodeId(type, "")
