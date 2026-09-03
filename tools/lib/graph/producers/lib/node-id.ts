import { nodeKey } from "../../key.ts"

// `CODE_REPO` stands in `@akasha/checks/repo-scope`, which this file used to reach by a
// five-level relative path. `@akasha/checks` depends on `@tools/lib`, so naming the reverse in
// this package's manifest would be a cycle, and the raw path was how the reach got made anyway.
// It is the string `code`, so it is stated here rather than smuggled across the boundary.
const CODE_REPO = "code"

export const nodeId = (type: string, key: string): string => nodeKey({ type, repo: CODE_REPO, key })

export const nodeIdPrefix = (type: string): string => nodeId(type, "")
