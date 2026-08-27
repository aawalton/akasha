import { readRepoFile } from "../../../repos.ts"
import type { BuildContext, NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { parseFromLines } from "./extract.ts"
import { DOCKERFILE_FILE_NODE_TYPE, type DockerfileFileAttrs } from "./types.ts"

export const classifyDockerfile = (
  ctx: BuildContext,
  relPath: string
): NodeInit<"dockerfile-file", DockerfileFileAttrs> => {
  const text = readRepoFile(ctx, CODE_REPO, relPath) ?? ""
  const imageLines = parseFromLines(text)
  const attrs: DockerfileFileAttrs = { path: relPath, imageLines }
  return { type: DOCKERFILE_FILE_NODE_TYPE, repo: CODE_REPO, key: relPath, attrs }
}
