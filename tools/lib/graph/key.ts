import type { Repo } from "../../../page/document/types.ts"

export interface NodeKeyParts {
  readonly type: string
  readonly repo?: Repo
  readonly key: string
}

export function nodeKey(parts: NodeKeyParts): string {
  return parts.repo === undefined
    ? `${parts.type}:${parts.key}`
    : `${parts.type}:${parts.repo}:${parts.key}`
}
