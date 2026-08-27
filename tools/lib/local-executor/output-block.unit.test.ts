import { describe, expect, test } from "bun:test"
import { buildOutputBlock } from "./output-block.ts"
import type { StepConfig } from "./types.ts"

function step(overrides: Partial<StepConfig>): StepConfig {
  return { name: "a", image: "b", commands: [], ...overrides }
}

describe("buildOutputBlock", () => {
  test("returns empty string when no outputs or dependsOn", () => {
    expect(buildOutputBlock(step({}))).toBe("")
  })

  test("sources upstream .env files listed in dependsOn", () => {
    const block = buildOutputBlock(step({ dependsOn: ["build", "test"] }))
    expect(block).toContain(`__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`)
    expect(block).toContain(`[ -f "$__out_dir/build.env" ] && . "$__out_dir/build.env"`)
    expect(block).toContain(`[ -f "$__out_dir/test.env" ] && . "$__out_dir/test.env"`)
    expect(block).not.toContain("__write_outputs")
    expect(block).not.toContain("trap")
  })

  test("installs EXIT trap that writes declared outputs on success", () => {
    const block = buildOutputBlock(step({ outputs: ["BUILD_HASH"] }))
    expect(block).toContain(`__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`)
    expect(block).toContain(`printf '%s\\n' "BUILD_HASH=$BUILD_HASH" > "$__out_dir/$STEP_NAME.env"`)
    expect(block).toContain("trap __write_outputs EXIT")
    expect(block).toContain("if [ $__rc -eq 0 ]")
  })

  test("produces expected output for a build→deploy BUILD_HASH pair", () => {
    const buildBlock = buildOutputBlock(step({ outputs: ["BUILD_HASH"] }))
    const deployBlock = buildOutputBlock(step({ dependsOn: ["build"], outputs: ["BUILD_HASH"] }))

    expect(buildBlock).toBe(
      [
        `__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`,
        `__write_outputs() { __rc=$?; if [ $__rc -eq 0 ]; then mkdir -p "$__out_dir" && printf '%s\\n' "BUILD_HASH=$BUILD_HASH" > "$__out_dir/$STEP_NAME.env"; fi; return $__rc; }`,
        "trap __write_outputs EXIT",
        "",
      ].join("\n")
    )

    expect(deployBlock).toBe(
      [
        `__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`,
        `[ -f "$__out_dir/build.env" ] && . "$__out_dir/build.env"`,
        `__write_outputs() { __rc=$?; if [ $__rc -eq 0 ]; then mkdir -p "$__out_dir" && printf '%s\\n' "BUILD_HASH=$BUILD_HASH" > "$__out_dir/$STEP_NAME.env"; fi; return $__rc; }`,
        "trap __write_outputs EXIT",
        "",
      ].join("\n")
    )
  })
})
