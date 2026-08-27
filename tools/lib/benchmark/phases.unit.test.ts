import { describe, expect, it } from "bun:test"

import { IMAGES } from "../workflow-dsl/images"
import { type Step } from "../workflow-dsl/types"

import { BENCHMARK_RUNNER_IMAGE, isForeignRuntime, selectPhaseSteps } from "./phases.ts"

function step(over: { name: string; image: string; dependsOn?: readonly string[] }): Step {
  return { name: over.name, image: over.image, commands: ["true"], dependsOn: over.dependsOn }
}

describe("isForeignRuntime", () => {
  it("treats the debian/bun/universal toolchain images as compatible", () => {
    expect(isForeignRuntime(IMAGES.BUN)).toBe(false)
    expect(isForeignRuntime(IMAGES.BUN_GIT)).toBe(false)
    expect(isForeignRuntime(IMAGES.UNIVERSAL)).toBe(false)
    expect(isForeignRuntime(IMAGES.CI)).toBe(false)
    expect(isForeignRuntime("buildpack-deps:bookworm-scm")).toBe(false)
    expect(isForeignRuntime("oven/bun:1")).toBe(false)
  })

  it("treats alpine / buildkit / kubectl images as foreign-runtime", () => {
    expect(isForeignRuntime("alpine:3.20.6")).toBe(true)
    expect(isForeignRuntime(IMAGES.BUILDKIT)).toBe(true)
    expect(isForeignRuntime(IMAGES.KUBECTL)).toBe(true)
    expect(isForeignRuntime("bitnami/kubectl:latest")).toBe(true)
  })
})

describe("selectPhaseSteps", () => {
  it("keeps only the wanted steps, in workflow order", () => {
    const all = [
      step({ name: "preparation-prep", image: IMAGES.BUN_GIT }),
      step({ name: "preparation-synth-k8s", image: IMAGES.BUN_GIT }),
      step({ name: "preparation-deploy-supervisor", image: IMAGES.CI }),
    ]
    const sel = selectPhaseSteps(all, ["preparation-prep"])
    expect(sel.runnable.map((s) => s.name)).toEqual(["preparation-prep"])
  })

  it("rewrites compatible step images to the subprocess-forcing sentinel", () => {
    const all = [step({ name: "preparation-prep", image: IMAGES.BUN_GIT })]
    const sel = selectPhaseSteps(all)
    expect(sel.runnable.at(0)?.image).toBe(BENCHMARK_RUNNER_IMAGE)
    expect(sel.originalImageByName.get("preparation-prep")).toBe(IMAGES.BUN_GIT)
  })

  it("reports foreign-runtime steps in the skip census, does not run them", () => {
    const all = [
      step({ name: "preparation-provision-ci-shell", image: "alpine:3.20.6" }),
      step({ name: "preparation-prep", image: IMAGES.BUN_GIT }),
    ]
    const sel = selectPhaseSteps(all)
    expect(sel.skipped).toEqual([
      { name: "preparation-provision-ci-shell", image: "alpine:3.20.6" },
    ])
    expect(sel.runnable.map((s) => s.name)).toEqual(["preparation-prep"])
  })

  it("asserts an empty census when every step is compatible (drift detection)", () => {
    const all = [
      step({ name: "check-a", image: IMAGES.BUN }),
      step({ name: "check-b", image: IMAGES.UNIVERSAL }),
    ]
    const sel = selectPhaseSteps(all)
    expect(sel.skipped).toHaveLength(0)
    expect(sel.runnable).toHaveLength(2)
  })

  it("strips dependsOn edges pointing outside the selected subset", () => {
    const all = [
      step({ name: "preparation-prep", image: IMAGES.BUN_GIT }),
      step({
        name: "preparation-synth-k8s",
        image: IMAGES.BUN_GIT,
        dependsOn: ["preparation-prep"],
      }),
    ]
    const sel = selectPhaseSteps(all, ["preparation-synth-k8s"])
    expect(sel.runnable.at(0)?.dependsOn).toBeUndefined()
  })

  it("keeps dependsOn edges that stay inside the subset", () => {
    const all = [
      step({ name: "reverse-reachability-graph", image: IMAGES.BUN }),
      step({
        name: "check-unit-tests",
        image: IMAGES.BUN,
        dependsOn: ["reverse-reachability-graph"],
      }),
    ]
    const sel = selectPhaseSteps(all)
    const unit = sel.runnable.find((s) => s.name === "check-unit-tests")
    expect(unit?.dependsOn).toEqual(["reverse-reachability-graph"])
  })
})
