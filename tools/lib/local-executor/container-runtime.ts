import { z } from "zod"

export interface ContainerRuntimeInputs {
  readonly override: string | undefined
  readonly hasDocker: boolean
  readonly hasPodman: boolean
}

export function pickContainerRuntime(inputs: ContainerRuntimeInputs): string {
  const { override, hasDocker, hasPodman } = inputs
  if (override !== undefined && override !== "") return override
  if (hasDocker) return "docker"
  if (hasPodman) return "podman"
  return "docker"
}

export function containerRuntime(): string {
  return pickContainerRuntime({
    override: z.string().optional().parse(process.env.CONTAINER_CLI),
    hasDocker: Bun.which("docker") !== null,
    hasPodman: Bun.which("podman") !== null,
  })
}
