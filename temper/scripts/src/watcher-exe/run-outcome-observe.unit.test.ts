import { describe, expect, test } from "bun:test"
import {
  ADDON_DIRECTORY_ABSENT,
  observeChain,
  observeSideFileExport,
  preDispatchOperations,
  SKIPPED_AFTER_FAILURE,
  statMtimeMs,
  TARGET_OPERATIONS,
} from "./run-outcome-observe"

const INSTALLED_CONFIG = "/tmp/TemperCharactersConfig.lua"
const ABSENT_CONFIG = "/nonexistent-addons/TemperCharacters/TemperCharactersConfig.lua"

describe("observeSideFileExport", () => {
  test("an absent addon dir skips the write and never creates the directory", async () => {
    const seen: (string | undefined)[] = []
    const { operation, value } = await observeSideFileExport(
      "charactersConfig",
      ABSENT_CONFIG,
      async (configPath) => {
        seen.push(configPath)
        return "export-ran"
      }
    )

    expect(operation?.state).toBe("skipped")
    expect(operation?.detail).toBe(ADDON_DIRECTORY_ABSENT)
    expect(operation?.path).toBe(ABSENT_CONFIG)
    expect(seen).toEqual([undefined])
    expect(value).toBe("export-ran")
  })

  test("an installed addon dir passes the destination through and reports synced", async () => {
    const seen: (string | undefined)[] = []
    const { operation } = await observeSideFileExport(
      "charactersConfig",
      INSTALLED_CONFIG,
      async (configPath) => {
        seen.push(configPath)
        return "written"
      }
    )

    expect(operation?.state).toBe("synced")
    expect(seen).toEqual([INSTALLED_CONFIG])
  })

  test("a throwing export is upload_failed and carries the message", async () => {
    const { operation, value } = await observeSideFileExport(
      "charactersConfig",
      INSTALLED_CONFIG,
      async () => {
        throw new Error("EACCES: permission denied")
      }
    )

    expect(operation?.state).toBe("upload_failed")
    expect(operation?.detail).toBe("EACCES: permission denied")
    expect(value).toBeNull()
  })

  test("no configured destination reports no operation rather than inventing a path", async () => {
    const { operation, value } = await observeSideFileExport(
      "charactersConfig",
      undefined,
      async () => "export-ran"
    )

    expect(operation).toBeNull()
    expect(value).toBe("export-ran")
  })
})

describe("observeChain", () => {
  test("halts at the first failure and does not run what follows", async () => {
    const ran: string[] = []
    const target = (name: string) => ({ kind: "import" as const, name, path: `/eso/${name}.lua` })

    const operations = await observeChain([
      { target: target("characters"), run: async () => void ran.push("characters") },
      {
        target: target("completion"),
        run: async () => {
          ran.push("completion")
          throw new Error("parse blew up")
        },
      },
      { target: target("tasks"), run: async () => void ran.push("tasks") },
    ])

    expect(operations.map((o) => o.state)).toEqual(["synced", "upload_failed", "skipped"])
    expect(operations[2]?.detail).toBe(SKIPPED_AFTER_FAILURE)
    expect(ran).toEqual(["characters", "completion"])
  })
})

describe("preDispatchOperations", () => {
  test("reports every operation the target would have run, not just one", async () => {
    const operations = preDispatchOperations({
      fileType: "characters",
      sourcePath: "/eso/live/SavedVariables/TemperCharacters.lua",
      configPath: INSTALLED_CONFIG,
      state: "file_not_found",
    })

    expect(operations.map((o) => o.name)).toEqual([
      "characters",
      "completion",
      "tasks",
      "charactersConfig",
    ])
    expect(operations.filter((o) => o.kind === "import").map((o) => o.state)).toEqual([
      "file_not_found",
      "file_not_found",
      "file_not_found",
    ])
    expect(operations.at(-1)?.state).toBe("skipped")
  })

  test("omits the side-file entry for a target that has none", async () => {
    const operations = preDispatchOperations({
      fileType: "sales",
      sourcePath: "/eso/live/SavedVariables/TemperSales.lua",
      state: "parse_failed",
      detail: "content looks truncated (no closing brace)",
    })

    expect(operations.map((o) => o.name)).toEqual(["sales"])
    expect(operations[0]?.detail).toBe("content looks truncated (no closing brace)")
  })
})

describe("TARGET_OPERATIONS", () => {
  test("every operation name is distinct, because the name is the merge key", async () => {
    const names = Object.values(TARGET_OPERATIONS).flatMap((target) => [
      ...target.imports,
      ...("sideFile" in target ? [target.sideFile] : []),
    ])

    expect(new Set(names).size).toBe(names.length)
  })
})

describe("statMtimeMs", () => {
  test("reports an unobservable file as null rather than guessing", async () => {
    expect(statMtimeMs(ABSENT_CONFIG)).toBeNull()
  })
})
