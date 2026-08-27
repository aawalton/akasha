import { describe, expect, test } from "bun:test"
import { computePlan } from "./plan"
import type { ActualResource, InferenceService } from "./schema"

function svc(name: string): InferenceService {
  return {
    name,
    host: "macbook",
    pythonVersion: "3.12",
    sourceDir: `packages/infra/inference/src/services/${name}`,
    workdir: name,
    command: ["python", "-m", "server"],
    port: 8080,
    lifecycle: "always-on",
    publicBind: "tailnet",
    warm: false,
  }
}

function actual(name: string, over: Partial<ActualResource> = {}): ActualResource {
  return {
    name,
    dirPresent: true,
    inputsHash: "deadbeef0000",
    launchdLoaded: true,
    condaEnvPresent: true,
    condaEnvHealthy: true,
    ...over,
  }
}

describe("computePlan", () => {
  test("skips a fully-present service whose hash matches", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "deadbeef0000" }],
      actual: [actual("a")],
    })
    expect(plan.skip.map((s) => s.service.name)).toEqual(["a"])
    expect(plan.apply).toHaveLength(0)
    expect(plan.prune).toHaveLength(0)
  })

  test("applies (absent) a service with no actual resource", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h1" }],
      actual: [],
    })
    expect(plan.apply).toHaveLength(1)
    expect(plan.apply[0]?.reason).toBe("absent")
  })

  test("applies (stale-or-partial) on hash mismatch", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "new" }],
      actual: [actual("a", { inputsHash: "old" })],
    })
    expect(plan.apply[0]?.reason).toBe("stale-or-partial")
    expect(plan.skip).toHaveLength(0)
  })

  test("re-applies when hash matches but the launchd job is not loaded (drift)", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h", launchdLoaded: false })],
    })
    expect(plan.apply).toHaveLength(1)
    expect(plan.skip).toHaveLength(0)
  })

  test("re-applies when the conda env is missing even if dir+hash match", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h", condaEnvPresent: false })],
    })
    expect(plan.apply).toHaveLength(1)
  })

  test("re-applies (corrupt) when the env is present-but-unhealthy even if hash matches", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h", condaEnvPresent: true, condaEnvHealthy: false })],
    })
    expect(plan.apply).toHaveLength(1)
    expect(plan.apply[0]?.reason).toBe("corrupt")
    expect(plan.skip).toHaveLength(0)
  })

  test("a corrupt env that is also absent-on-dir reports absent, not corrupt", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { dirPresent: false, condaEnvPresent: false, condaEnvHealthy: false })],
    })
    expect(plan.apply[0]?.reason).toBe("absent")
  })

  test("prunes an actual resource not in the desired set", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h" }), actual("orphan")],
    })
    expect(plan.prune.map((p) => p.name)).toEqual(["orphan"])
    expect(plan.skip.map((s) => s.service.name)).toEqual(["a"])
  })

  test("empty desired prunes every actual resource (full teardown)", () => {
    const plan = computePlan({
      desired: [],
      actual: [actual("a"), actual("b")],
    })
    expect(plan.prune.map((p) => p.name).sort()).toEqual(["a", "b"])
    expect(plan.apply).toHaveLength(0)
  })

  test("empty desired and empty actual is a no-op", () => {
    const plan = computePlan({ desired: [], actual: [] })
    expect(plan.apply).toHaveLength(0)
    expect(plan.skip).toHaveLength(0)
    expect(plan.prune).toHaveLength(0)
  })

  test("does not prune an actual env named in the managed-env keep-set", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [
        actual("a", { inputsHash: "h" }),
        actual("image-facelock", { dirPresent: false, launchdLoaded: false }),
      ],
      managedEnvNames: ["image-facelock"],
    })
    expect(plan.prune).toHaveLength(0)
    expect(plan.skip.map((s) => s.service.name)).toEqual(["a"])
  })

  test("still prunes an undeclared env even when a managed env is declared", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h" }), actual("rogue"), actual("image-facelock")],
      managedEnvNames: ["image-facelock"],
    })
    expect(plan.prune.map((p) => p.name)).toEqual(["rogue"])
  })

  test("a managed env is protect-only — never applied or skipped, just kept", () => {
    const plan = computePlan({
      desired: [],
      actual: [actual("image-facelock")],
      managedEnvNames: ["image-facelock"],
    })
    expect(plan.apply).toHaveLength(0)
    expect(plan.skip).toHaveLength(0)
    expect(plan.prune).toHaveLength(0)
  })

  test("omitting managedEnvNames prunes every undeclared actual (back-compat)", () => {
    const plan = computePlan({
      desired: [{ service: svc("a"), inputsHash: "h" }],
      actual: [actual("a", { inputsHash: "h" }), actual("image-facelock")],
    })
    expect(plan.prune.map((p) => p.name)).toEqual(["image-facelock"])
  })
})
