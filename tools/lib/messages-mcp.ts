import "@akasha/seat-system/messages-console-stdout-guard"

import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { getAgentId } from "@akasha/seat-system/messages-agent-id"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { type ChannelServer, startChannelListener } from "./messages-agent-tools.ts"

function loadSecrets(): void {
  try {
    const content = readFileSync(join(homedir(), ".secrets.env"), "utf-8")
    for (const line of content.split("\n")) {
      const trimmed = line.trim()
      if (trimmed === "" || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const rawKey = trimmed.slice(0, eq).trim()
      const key = rawKey.startsWith("export ") ? rawKey.slice(7).trim() : rawKey
      const val = trimmed.slice(eq + 1).replace(/^["']|["']$/g, "")
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {}
}

loadSecrets()

const server = new McpServer(
  {
    name: "messages",
    version: "0.1.0",
  },
  {
    capabilities: {
      experimental: {
        "claude/channel": {},
        "claude/channel/permission": {},
      },
    },
  }
)

const transport = new StdioServerTransport()
await server.connect(transport)

let cleanupListener: (() => void) | undefined
getAgentId()
  .then(async (agentId) => {
    cleanupListener = await startChannelListener(server, agentId)
  })
  .catch((err) => {
    console.error("[messages] Channel listener startup failed:", err)
  })

const cleanup = () => {
  cleanupListener?.()
}
process.on("SIGTERM", cleanup)
process.on("SIGINT", cleanup)
