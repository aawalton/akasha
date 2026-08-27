import { nodeKey } from "../../key.ts"
import { CODE_REPO } from "./constants.ts"

export const nodeId = (type: string, key: string): string => nodeKey({ type, repo: CODE_REPO, key })

export const nodeIdPrefix = (type: string): string => nodeId(type, "")
