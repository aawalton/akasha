import { describe, expect, test } from "bun:test"
import { pickContainerRuntime } from "./container-runtime.ts"

describe("pickContainerRuntime", () => {
  test("explicit override wins over PATH detection", () => {
    expect(pickContainerRuntime({ override: "nerdctl", hasDocker: true, hasPodman: true })).toBe(
      "nerdctl"
    )
  })

  test("empty override is ignored (treated as unset)", () => {
    expect(pickContainerRuntime({ override: "", hasDocker: false, hasPodman: true })).toBe("podman")
  })

  test("prefers docker when both are present", () => {
    expect(pickContainerRuntime({ override: undefined, hasDocker: true, hasPodman: true })).toBe(
      "docker"
    )
  })

  test("falls back to podman when docker is absent", () => {
    expect(pickContainerRuntime({ override: undefined, hasDocker: false, hasPodman: true })).toBe(
      "podman"
    )
  })

  test("falls back to docker when neither is present (clear failure downstream)", () => {
    expect(pickContainerRuntime({ override: undefined, hasDocker: false, hasPodman: false })).toBe(
      "docker"
    )
  })
})
