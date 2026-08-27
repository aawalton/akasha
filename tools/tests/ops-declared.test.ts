
import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { declaredCommands } from "../ops/declared.ts"

let root = ""

beforeAll(() => {
  root = mkdtempSync("/var/tmp/ops-declared-")
  const put = (rel: string, body: string): void => {
    const file = `${root}/tools/commands/${rel}`
    mkdirSync(file.slice(0, file.lastIndexOf("/")), { recursive: true })
    writeFileSync(file, body)
  }
  put(
    "project/finish.ts",
    "export const summary = \"Close out a project\"\nexport default async (): Promise<void> => {}\n"
  )
  put(
    "agent/spawn.ts",
    "export const summary = \"Spawn an agent\"\nexport default async (): Promise<void> => {}\n"
  )
  put("agent/shared/helper.ts", "export const helper = 1\n")
  put(
    "app/list.ts",
    "export const summary = \"Every hostname in any `**/tunnel-routes.ts` file\"\nexport default async (): Promise<void> => {}\n"
  )
})

afterAll(() => {
  if (root !== "") rmSync(root, { recursive: true, force: true })
})

describe("declaredCommands", () => {
  test("a file's path under tools/commands is the command", () => {
    expect(declaredCommands(root).map((one) => one.path)).toEqual([
      ["agent", "shared", "helper"],
      ["agent", "spawn"],
      ["app", "list"],
      ["project", "finish"],
    ])
  })

  test("the summary is the one the header declares", () => {
    const finish = declaredCommands(root).find((one) => one.path.join(" ") === "project finish")
    expect(finish?.summary).toBe("Close out a project")
  })

  test("a summary naming a recursive glob survives being read", () => {
    const list = declaredCommands(root).find((one) => one.path.join(" ") === "app list")
    expect(list?.summary).toBe("Every hostname in any `**/tunnel-routes.ts` file")
  })

  test("a file declaring no command is a command still, carrying no summary", () => {
    const helper = declaredCommands(root).find((one) => one.path.includes("helper"))
    expect(helper).toBeDefined()
    expect(helper?.summary).toBe("")
  })

  test("a root with no command directory yields none rather than throwing", () => {
    expect(declaredCommands(`${root}/nothing-here`)).toEqual([])
  })
})

