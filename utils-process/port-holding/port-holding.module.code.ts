import { readdirSync, readFileSync, readlinkSync } from "node:fs"

const LISTEN_STATE = "0A"

const PROC_NET_TCP = ["/proc/net/tcp", "/proc/net/tcp6"]

const SOCKET_LINK = /^socket:\[(\d+)\]$/

const PID_DIR = /^\d+$/

const INODE_FIELD = 9

function hexPort(port: number): string {
  return port.toString(16).toUpperCase().padStart(4, "0")
}

export function parseListeningInodes(table: string, port: number): string[] {
  const wanted = `:${hexPort(port)}`
  const inodes: string[] = []
  for (const line of table.split("\n").slice(1)) {
    const field = line.trim().split(/\s+/)
    if (field.length <= INODE_FIELD) continue
    if (field[3] !== LISTEN_STATE) continue
    if (field[1]?.endsWith(wanted) !== true) continue
    const inode = field[INODE_FIELD]
    if (inode !== undefined && inode !== "0" && !inodes.includes(inode)) inodes.push(inode)
  }
  return inodes
}

function readText(path: string): string {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return ""
  }
}

function listeningInodes(port: number): Set<string> {
  const inodes = new Set<string>()
  for (const table of PROC_NET_TCP) {
    for (const inode of parseListeningInodes(readText(table), port)) inodes.add(inode)
  }
  return inodes
}

export function portIsHeld(port: number): boolean {
  return listeningInodes(port).size > 0
}

export function pidsListeningOn(port: number): number[] {
  const inodes = listeningInodes(port)
  if (inodes.size === 0) return []
  let entries: string[]
  try {
    entries = readdirSync("/proc")
  } catch {
    return []
  }
  const holders: number[] = []
  for (const entry of entries) {
    if (!PID_DIR.test(entry)) continue
    let fds: string[]
    try {
      fds = readdirSync(`/proc/${entry}/fd`)
    } catch {
      continue
    }
    for (const fd of fds) {
      let link: string
      try {
        link = readlinkSync(`/proc/${entry}/fd/${fd}`)
      } catch {
        continue
      }
      const inode = SOCKET_LINK.exec(link)?.[1]
      if (inode !== undefined && inodes.has(inode)) {
        holders.push(Number.parseInt(entry, 10))
        break
      }
    }
  }
  return holders
}
