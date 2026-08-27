import { describe, expect, test } from "bun:test"
import { dirname } from "node:path"
import {
  akashaTreePath,
  instructionsTreePath,
} from "../lib/ci-container-dispatcher/container-name.ts"
import {
  AKASHA_TREE_STEP_NAME,
  akashaTreeStep,
  COMPILER_PROBE,
} from "../lib/main-pipeline-creator/akasha-tree-step.ts"

const COMMIT = "0123456789abcdef0123456789abcdef01234567"

const commandsOf = (): readonly string[] => {
  const held = akashaTreeStep(COMMIT).definition.commands
  return Array.isArray(held) ? (held as readonly string[]) : []
}

const firstAt = (commands: readonly string[], needle: string): string | undefined =>
  commands.find((one) => one.includes(needle))

describe("where the akasha tree lands", () => {
  test("it sits beside the instructions tree, which is what its relative imports resolve against", () => {
    expect(dirname(akashaTreePath(COMMIT))).toBe(dirname(instructionsTreePath(COMMIT)))
    expect(akashaTreePath(COMMIT).endsWith("/akasha")).toBe(true)
  })

  test("the tree it writes is the tree the step names", () => {
    expect(firstAt(commandsOf(), "TREE=")).toBe(`TREE=${akashaTreePath(COMMIT)}`)
  })
})

describe("what the akasha tree step acquires", () => {
  test("it clones akasha rather than any other repository", () => {
    expect(commandsOf().some((one) => one.includes("alan/akasha.git"))).toBe(true)
  })

  test("it takes the tip of main, no akasha commit being recorded per pipeline", () => {
    expect(firstAt(commandsOf(), "rev-parse")).toContain("refs/heads/main")
  })

  test("it refuses a tree holding no compiler, rather than landing one an addon build cannot use", () => {
    expect(COMPILER_PROBE).toBe("lua-compiler/src/tstl.ts")
    expect(firstAt(commandsOf(), "holds no $PROBE")).toContain("exit 1")
  })

  test("it installs the tree, an uninstalled one being unable to run", () => {
    expect(firstAt(commandsOf(), "bun install")).toContain("--frozen-lockfile")
  })

  test("it lands the tree in one move rather than writing into the live path", () => {
    const commands = commandsOf()
    expect(firstAt(commands, "mv \"$INCOMING\"")).toBe('mv "$INCOMING" "$TREE"')
    expect(commands.some((one) => one.includes("$INCOMING"))).toBe(true)
  })

  test("it names itself as the preparation step other steps depend on", () => {
    expect(AKASHA_TREE_STEP_NAME).toBe("preparation-akasha-tree")
    expect(akashaTreeStep(COMMIT).alwaysRuns).toBe(true)
  })
})
