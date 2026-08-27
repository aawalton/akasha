import type { NodeInit } from "../../../types.ts"
import { CODE_REPO } from "../../../../../../repo/scope/scope.ts"
import { SYSTEMD_UNIT_FILE_NODE_TYPE, type SystemdUnitFileAttrs } from "./types.ts"

export const classifySystemdUnitFile = (relPath: string): NodeInit<"systemd-unit-file", SystemdUnitFileAttrs> => ({
  type: SYSTEMD_UNIT_FILE_NODE_TYPE,
  repo: CODE_REPO,
  key: relPath,
  attrs: { path: relPath },
})
