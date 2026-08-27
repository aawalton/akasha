
import { readFileSync } from "node:fs"

function extractEnvironVar(environ: string, key: string): string | undefined {
  const prefix = `${key}=`
  for (const entry of environ.split("\0")) {
    if (entry.startsWith(prefix)) return entry.slice(prefix.length)
  }
  return undefined
}

function readProcEnviron(pid: number): string | null {
  try {
    return readFileSync(`/proc/${pid}/environ`, "utf8")
  } catch {
    return null
  }
}

export function parseProxyPortFromBaseUrl(baseUrl: string | undefined): number | null {
  if (baseUrl == null || baseUrl === "") return null
  let url: URL
  try {
    url = new URL(baseUrl)
  } catch {
    return null
  }
  if (url.protocol !== "http:") return null
  if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") return null
  if (url.port === "") return null
  const port = Number.parseInt(url.port, 10)
  if (!Number.isInteger(port) || port < 1 || port > 65535) return null
  return port
}

export function readAdoptedClaudeProxyPort(pid: number): number | null {
  const environ = readProcEnviron(pid)
  if (environ == null) return null
  return parseProxyPortFromBaseUrl(extractEnvironVar(environ, "ANTHROPIC_BASE_URL"))
}
