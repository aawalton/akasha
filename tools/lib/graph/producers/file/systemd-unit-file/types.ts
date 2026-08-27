import { z } from "zod"

export type SystemdUnitFileAttrs = {
  readonly path: string
}

export type SystemdUnitFileNodeType = "systemd-unit-file"

export const SYSTEMD_UNIT_FILE_NODE_TYPE: SystemdUnitFileNodeType = "systemd-unit-file"

export const SystemdUnitFileAttrsSchema = z
  .object({
    path: z.string(),
  })
  .passthrough()
