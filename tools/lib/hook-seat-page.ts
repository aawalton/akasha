import { existsSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs"
import { dirname, resolve } from "node:path"

export const SEAT_MODE_KEY = "start-mode"

export const SEAT_INITIATIVE_KEY = "initiative-slug"

const PAGE_SUFFIX = ".md"

const SIDECAR_SUFFIX = ".uncommitted.yaml"

const FENCE = "---"

export function seatPagesDir(): string {
  let here: string
  try {
    here = realpathSync(resolve(import.meta.dir, "..", ".."))
  } catch {
    return ""
  }
  const stated = process.env.AKASHA_ROOT
  const akasha = stated === undefined || stated === "" ? `${dirname(here)}/akasha` : stated
  return `${akasha}/agent/seat`
}

function seatPageNamed(key: string, value: string): string {
  if (value === "") return ""
  const dir = seatPagesDir()
  if (dir === "" || !existsSync(dir)) return ""
  let held: readonly string[]
  try {
    held = readdirSync(dir)
  } catch {
    return ""
  }
  const wanted = `${key}: ${value}`
  for (const name of [...held].filter((one) => one.endsWith(PAGE_SUFFIX)).sort()) {
    let body: string
    try {
      body = readFileSync(`${dir}/${name}`, "utf8")
    } catch {
      continue
    }
    if (body.split("\n").some((line) => line === wanted)) return `${dir}/${name}`
  }
  return ""
}

function sidecarHolds(body: string, key: string, value: string): boolean {
  let under = false
  for (const line of body.split("\n")) {
    if (line === `${key}:`) {
      under = true
      continue
    }
    if (!/^\s/.test(line)) {
      under = false
      continue
    }
    if (!under) continue
    const said = line.trim()
    if (!said.startsWith("value:")) continue
    const held = said.slice("value:".length).trim()
    if (held.replace(/^"/, "").replace(/"$/, "") === value) return true
  }
  return false
}

export function seatSidecarNamed(key: string, value: string): string {
  if (value === "") return ""
  const dir = seatPagesDir()
  if (dir === "" || !existsSync(dir)) return ""
  let held: readonly string[]
  try {
    held = readdirSync(dir)
  } catch {
    return ""
  }
  for (const name of [...held].filter((one) => one.endsWith(SIDECAR_SUFFIX)).sort()) {
    let body: string
    try {
      body = readFileSync(`${dir}/${name}`, "utf8")
    } catch {
      continue
    }
    if (!sidecarHolds(body, key, value)) continue
    const page = `${dir}/${name.slice(0, -SIDECAR_SUFFIX.length)}${PAGE_SUFFIX}`
    if (existsSync(page)) return page
  }
  return ""
}

export function seatPageFile(agent: string): string {
  let found = seatPageNamed("id", agent)
  if (found === "" && agent.includes("--")) {
    found = seatPageNamed("id", agent.slice(0, agent.indexOf("--")))
  }
  if (found === "") found = seatPageNamed("claude-code-session-uuid", agent)
  if (found === "") found = seatSidecarNamed("claude-code-session-uuid", agent)
  return found
}

export function seatPageValue(file: string, key: string): string {
  if (file === "" || key === "") return ""
  try {
    if (!statSync(file).isFile()) return ""
  } catch {
    return ""
  }
  let body: string
  try {
    body = readFileSync(file, "utf8")
  } catch {
    return ""
  }
  const lines = body.split("\n")
  if (lines[0] !== FENCE) return ""
  for (const line of lines.slice(1)) {
    if (line === FENCE) return ""
    if (!line.startsWith(`${key}: `)) continue
    return line.slice(key.length + 2).replace(/^"/, "").replace(/"$/, "")
  }
  return ""
}

export function seatNameOf(file: string): string {
  const bare = file.slice(file.lastIndexOf("/") + 1)
  const stem = bare.endsWith(PAGE_SUFFIX) ? bare.slice(0, -PAGE_SUFFIX.length) : bare
  return stem.replaceAll(/[^A-Za-z0-9._-]/g, "")
}
