
import { execFileSync } from "node:child_process"
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { GENERATED_PREFIX } from "./service-unit.ts"

const UNITS = ".local/state/workstation-services"
const SYSTEMD = ".config/systemd/user"
const SYSTEM_UNITS = "/etc/systemd/system"

export function homeReal(): string {
  const raw = process.env.HOME
  if (raw === undefined || raw === "") {
    throw new Error("this environment names no HOME, so no unit has an address to be written to")
  }
  return realpathSync(raw)
}

export function unitsDir(): string {
  return `${homeReal()}/${UNITS}`
}

export function systemdDir(): string {
  return `${homeReal()}/${SYSTEMD}`
}

export function systemUnitsDir(): string {
  return SYSTEM_UNITS
}

export function ourInstalled(): readonly string[] {
  const dir = systemdDir()
  const ours = unitsDir()
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  const found: string[] = []
  for (const name of names) {
    const at = `${dir}/${name}`
    let stat
    try {
      stat = lstatSync(at)
    } catch {
      continue
    }
    if (!stat.isSymbolicLink()) continue
    let target: string
    try {
      target = realpathSync(at)
    } catch {
      continue
    }
    if (target.startsWith(`${ours}/`)) found.push(name)
  }
  return found.sort()
}

export function ourGenerated(): readonly string[] {
  let names: readonly string[]
  try {
    names = readdirSync(unitsDir())
  } catch {
    return []
  }
  return names.filter((name) => name.endsWith(".service") || name.endsWith(".timer")).sort()
}

function carriesOurHeader(at: string): boolean {
  try {
    return readFileSync(at, "utf8").startsWith(GENERATED_PREFIX)
  } catch {
    return false
  }
}

export function ourGeneratedSystem(): readonly string[] {
  let names: readonly string[]
  try {
    names = readdirSync(systemUnitsDir())
  } catch {
    return []
  }
  return names
    .filter((name) => name.endsWith(".service") || name.endsWith(".timer"))
    .filter((name) => carriesOurHeader(`${systemUnitsDir()}/${name}`))
    .sort()
}

export function unitChanged(name: string, text: string): boolean {
  const at = `${unitsDir()}/${name}`
  if (!existsSync(at)) return true
  try {
    return readFileSync(at, "utf8") !== text
  } catch {
    return true
  }
}

export function systemUnitChanged(name: string, text: string): boolean {
  const at = `${systemUnitsDir()}/${name}`
  if (!existsSync(at)) return true
  try {
    return readFileSync(at, "utf8") !== text
  } catch {
    return true
  }
}

export function writeUnit(name: string, text: string): void {
  mkdirSync(unitsDir(), { recursive: true })
  writeFileSync(`${unitsDir()}/${name}`, text)
}

export function linkUnit(name: string): void {
  mkdirSync(systemdDir(), { recursive: true })
  const at = `${systemdDir()}/${name}`
  const target = `${unitsDir()}/${name}`
  try {
    if (lstatSync(at).isSymbolicLink() && realpathSync(at) === target) return
    rmSync(at, { force: true })
  } catch {
    rmSync(at, { force: true })
  }
  symlinkSync(target, at)
}

export function unlinkUnit(name: string): void {
  rmSync(`${systemdDir()}/${name}`, { force: true })
  rmSync(`${unitsDir()}/${name}`, { force: true })
}

function sudo(args: readonly string[], input?: string): { code: number; out: string } {
  try {
    const out = execFileSync("sudo", ["-n", ...args], {
      encoding: "utf8",
      ...(input === undefined ? {} : { input }),
    })
    return { code: 0, out }
  } catch (err) {
    const held = err as { status?: number; stdout?: string; stderr?: string }
    return { code: held.status ?? 1, out: `${held.stdout ?? ""}${held.stderr ?? ""}` }
  }
}

export function writeSystemUnit(name: string, text: string): { code: number; out: string } {
  return sudo(["tee", `${systemUnitsDir()}/${name}`], text)
}

export function removeSystemUnit(name: string): { code: number; out: string } {
  return sudo(["rm", "-f", `${systemUnitsDir()}/${name}`])
}

export function systemctl(args: readonly string[]): { code: number; out: string } {
  try {
    const out = execFileSync("systemctl", ["--user", ...args], { encoding: "utf8" })
    return { code: 0, out }
  } catch (err) {
    const held = err as { status?: number; stdout?: string; stderr?: string }
    return { code: held.status ?? 1, out: `${held.stdout ?? ""}${held.stderr ?? ""}` }
  }
}

export function systemSystemctl(args: readonly string[]): { code: number; out: string } {
  return sudo(["systemctl", ...args])
}

export function systemctlIn(scope: string, args: readonly string[]): { code: number; out: string } {
  return scope === "system" ? systemSystemctl(args) : systemctl(args)
}
