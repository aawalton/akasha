
import { describe } from "bun:test"
import { existsSync } from "node:fs"
import { getMcpServerRegistry } from "../lib/mcp-registry.ts"
import { holdAgainstStanding, type Scenario } from "./supervisor-mcp-arm.ts"

function playwrightArgs(): readonly string[] {
  const playwright = getMcpServerRegistry().playwright
  if (playwright?.type !== "stdio") throw new Error("the playwright server must be a stdio server")
  return playwright.args
}

const HOME = process.env.HOME ?? "/home/walton"

const scenarios: readonly Scenario[] = [
  {
    name: "playwright writes its output under the workstation-shared directory",
    ported: () => {
      const args = playwrightArgs()
      const at = args.indexOf("--output-dir")
      return {
        outputDirIndexFound: at >= 0,
        outputDirIsUnderHome: (args[at + 1] ?? "") === `${HOME}/.playwright-mcp`,
      }
    },
    standing: { outputDirIndexFound: true, outputDirIsUnderHome: true },
  },
  {
    name: "playwright is isolated and seeded, with no on-disk profile",
    ported: () => {
      const args = playwrightArgs()
      return {
        containsIsolated: args.includes("--isolated"),
        containsStorageStateFlag: args.includes(
          `--storage-state=${HOME}/.cache/claude-code/playwright-storage-state.json`
        ),
        hasUserDataDir: args.some((a) => a.startsWith("--user-data-dir")),
      }
    },
    standing: {
      containsIsolated: true,
      containsStorageStateFlag: true,
      hasUserDataDir: false,
    },
  },
  {
    name: "the playwright MCP version is pinned rather than a moving tag",
    ported: () => {
      const spec = playwrightArgs().find((a) => a.startsWith("@playwright/mcp@")) ?? null
      return {
        versionSpecIsLatest: spec === "@playwright/mcp@latest",
        versionSpecPinned: /^@playwright\/mcp@\d+\.\d+\.\d+$/.test(spec ?? ""),
      }
    },
    standing: {
      versionSpecIsLatest: false,
      versionSpecPinned: true,
    },
  },
  {
    name: "the commands and the environment scrub are what the declaration states",
    ported: () => {
      const registry = getMcpServerRegistry()
      const messages = registry.messages
      const playwright = registry.playwright
      return {
        messagesCommand: messages?.type === "stdio" ? messages.command : null,
        playwrightCommand: playwright?.type === "stdio" ? playwright.command : null,
        envIArgPrefix: playwrightArgs()[0] ?? null,
      }
    },
    standing: { messagesCommand: "bun", playwrightCommand: "env", envIArgPrefix: "-i" },
  },
  {
    name: "the messages server is spawned from a file that is in this repo and is there",
    ported: () => {
      const messages = getMcpServerRegistry().messages
      const args = messages?.type === "stdio" ? messages.args : []
      const spawned = args[1] ?? ""
      return {
        spawnsAnAbsolutePath: spawned.startsWith("/"),
        namesTheMessagesServer: spawned.endsWith("/tools/lib/messages-mcp.ts"),
        theFileIsThere: spawned !== "" && existsSync(spawned),
        reachesIntoTheCodeRepo: spawned.includes("/code/"),
      }
    },
    standing: {
      spawnsAnAbsolutePath: true,
      namesTheMessagesServer: true,
      theFileIsThere: true,
      reachesIntoTheCodeRepo: false,
    },
  },
]

describe("getMcpServerRegistry", () => {
  holdAgainstStanding(scenarios)
})
