import { randomBytes } from "node:crypto"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { createServer, type Server } from "node:http"
import { join } from "node:path"
import { writeFileAtomicSync } from "@shared/utils-fs/atomic-write"
import { watcherConfigDir } from "../../../shared-foundation-misc-eso-paths/src/eso-paths"
import { z } from "zod"
import { log } from "./logger"

const SERVER_URL = z.string().default("https://tempereso.com").parse(process.env.TEMPER_SERVER_URL)

const WATCHER_CONFIG_SCHEMA = z
  .object({
    "temper-watcher-session": z.string().optional(),
    serverUrl: z.string().optional(),
  })
  .passthrough()

export interface PersistedSession {
  access_token: string
  refresh_token: string
}

export interface WatcherConfig {
  "temper-watcher-session"?: string
  serverUrl: string
}

export const SESSION_STORAGE_KEY = "temper-watcher-session"

export function getConfigPath(): string {
  return `${watcherConfigDir()}/config.json`
}

export function loadConfig(): WatcherConfig | null {
  const configPath = getConfigPath()
  if (!existsSync(configPath)) return null

  try {
    const parsed = WATCHER_CONFIG_SCHEMA.parse(JSON.parse(readFileSync(configPath, "utf-8")))
    return {
      "temper-watcher-session": parsed["temper-watcher-session"],
      serverUrl: parsed.serverUrl ?? SERVER_URL,
    }
  } catch {
    return null
  }
}

export function saveConfig(updates: Partial<WatcherConfig>): undefined {
  const configPath = getConfigPath()
  const dir = join(configPath, "..")
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  let existing: Partial<WatcherConfig> = {}
  if (existsSync(configPath)) {
    try {
      existing = WATCHER_CONFIG_SCHEMA.parse(JSON.parse(readFileSync(configPath, "utf-8")))
    } catch {}
  }

  const merged = { ...existing, ...updates }
  writeFileAtomicSync(configPath, JSON.stringify(merged, null, 2), { mode: 0o600 })
}

export type CallbackDecision =
  | { kind: "reject"; status: number; body: string }
  | { kind: "accept"; redirectTo: string; session: PersistedSession }

export function decideCallbackResponse(args: {
  searchParams: URLSearchParams
  expectedState: string
  serverUrl: string
}): CallbackDecision {
  const accessToken = args.searchParams.get("access_token")
  const refreshToken = args.searchParams.get("refresh_token")

  if (args.searchParams.get("state") !== args.expectedState) {
    return {
      kind: "reject",
      status: 400,
      body: "<html><body><h2>State mismatch. Please try again.</h2></body></html>",
    }
  }
  if (accessToken == null || refreshToken == null) {
    return {
      kind: "reject",
      status: 400,
      body: "<html><body><h2>Missing tokens in callback. Please try again.</h2></body></html>",
    }
  }

  return {
    kind: "accept",
    redirectTo: `${args.serverUrl}/watcher`,
    session: { access_token: accessToken, refresh_token: refreshToken },
  }
}

export async function authenticate(): Promise<{ session: PersistedSession; serverUrl: string }> {
  const state = randomBytes(16).toString("hex")

  return new Promise((resolve, reject) => {
    const server: Server = createServer((req, res) => {
      const url = new URL(req.url ?? "/", `http://localhost`)

      if (url.pathname === "/callback") {
        const decision = decideCallbackResponse({
          searchParams: url.searchParams,
          expectedState: state,
          serverUrl: SERVER_URL,
        })

        if (decision.kind === "reject") {
          res.writeHead(decision.status, { "Content-Type": "text/html" })
          res.end(decision.body)
          return
        }

        res.writeHead(302, { Location: decision.redirectTo })
        res.end()

        server.close()
        resolve({ session: decision.session, serverUrl: SERVER_URL })
      } else {
        res.writeHead(404)
        res.end()
      }
    })

    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      if (address == null || typeof address === "string") {
        reject(new Error("Failed to start local auth server"))
        return
      }

      const port = address.port
      const linkUrl = `${SERVER_URL}/cli-link?port=${port}&state=${encodeURIComponent(state)}`

      log(`Open this URL in your browser to link your account: ${linkUrl}`)

      try {
        const isWindows = process.platform === "win32"
        if (isWindows) {
          Bun.spawn(["rundll32.exe", "url.dll,FileProtocolHandler", linkUrl])
        } else {
          Bun.spawn(["xdg-open", linkUrl]).unref()
        }
      } catch {}

      log("Waiting for authorization...")

      setTimeout(
        () => {
          server.close()
          reject(new Error("Authorization timed out after 5 minutes"))
        },
        5 * 60 * 1000
      )
    })
  })
}
