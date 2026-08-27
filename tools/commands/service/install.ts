
export const summary =
  "Project one workstation-service document into an installed systemd unit, or every one with --all (dry-run unless --apply)"

import { lstatSync, readdirSync, realpathSync } from "node:fs"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, akashaRoot, resolveRoots, rootFor } from "../../../repo/roots/roots"
import {
  applyToCluster,
  planClusterReach,
  reachOf,
  workstationAddress,
} from "../../lib/service-cluster-reach.ts"
import {
  homeReal,
  linkUnit,
  ourGenerated,
  ourGeneratedSystem,
  ourInstalled,
  removeSystemUnit,
  systemctl,
  systemdDir,
  systemSystemctl,
  systemUnitChanged,
  systemUnitsDir,
  unitChanged,
  unitsDir,
  unlinkUnit,
  writeSystemUnit,
  writeUnit,
} from "../../lib/service-install.ts"
import { planProjection, readServiceDocs, serviceNamed } from "../../lib/service-project.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "service",
      description: "The one service to install, named by its document's slug.",
      required: false,
    },
  ],
  flags: [
    {
      name: "--all",
      description: "Every service document, and the removal of every unit none accounts for.",
    },
    { name: "--apply", description: "Carry the plan out. Without it nothing is written." },
  ],
  exits: [
    { code: 0, meaning: "the plan printed, and was carried out where --apply was given" },
    {
      code: 1,
      meaning: "no service was named and --all was not given, or a document could not be read",
    },
  ],
  examples: [
    "ops service install send-due-reminders",
    "ops service install send-due-reminders --apply",
    "ops service install --all --apply",
  ],
}

function legacyInstalled(): readonly string[] {
  const dir = systemdDir()
  const legacy = `${realpathSync(rootFor(resolveRoots(), AKASHA))}/tools/`
  let names: readonly string[]
  try {
    names = readdirSync(dir)
  } catch {
    return []
  }
  const found: string[] = []
  for (const name of names) {
    if (!name.endsWith(".service") && !name.endsWith(".timer")) continue
    try {
      if (!lstatSync(`${dir}/${name}`).isSymbolicLink()) continue
      if (realpathSync(`${dir}/${name}`).startsWith(legacy)) found.push(name)
    } catch {
      continue
    }
  }
  return found.sort()
}

export function ownedByService(owned: readonly string[], slug: string): readonly string[] {
  return owned.filter((one) => one === `${slug}.service` || one === `${slug}.timer`)
}

export default async function serviceInstall(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const apply = parsed.boolean("--apply")
  const all = parsed.boolean("--all")
  const named = parsed.positionals[0]

  if (named === undefined && !all) {
    throw inputError(
      "this installs one service, named by its document's slug, or every one with --all"
    )
  }
  if (named !== undefined && all) {
    throw inputError(`--all reaches every service, so naming \`${named}\` beside it says two things`)
  }

  const root = akashaRoot()
  const docs = named === undefined ? readServiceDocs(root) : [serviceNamed(root, named)]
  const everyOwned = [
    ...new Set([...ourInstalled(), ...ourGenerated(), ...legacyInstalled()]),
  ].sort()
  const owned = named === undefined ? everyOwned : ownedByService(everyOwned, named)
  const ownedSystem =
    named === undefined ? ourGeneratedSystem() : ownedByService(ourGeneratedSystem(), named)
  const plan = planProjection(docs, owned, "user")
  const systemPlan = planProjection(docs, ownedSystem, "system")
  const reached = docs.some((one) => reachOf(one) !== null)
  const cluster = reached
    ? planClusterReach(docs, workstationAddress())
    : new Map<string, string>()

  const out: string[] = []
  out.push(`home\t${homeReal()}\tunits\t${unitsDir()}\tsystem\t${systemUnitsDir()}`)
  out.push(`scope\t${named === undefined ? "every service document" : named}`)
  out.push(
    `read\t${docs.length}\tdocument(s)\towned\t${owned.length}\tuser unit(s)\t` +
      `${ownedSystem.length}\tsystem unit(s)`
  )

  for (const slug of [...plan.held, ...systemPlan.held].sort()) {
    out.push(`held\t${slug}\tthe document states enabled: false`)
  }

  const changed = [...plan.write.keys()].filter((name) =>
    unitChanged(name, plan.write.get(name) as string)
  )
  for (const name of changed) out.push(`write\t${name}`)
  const changedSystem = [...systemPlan.write.keys()].filter((name) =>
    systemUnitChanged(name, systemPlan.write.get(name) as string)
  )
  for (const name of changedSystem) out.push(`write\tsystem\t${name}`)
  for (const name of plan.enable) out.push(`enable\t${name}`)
  for (const name of plan.enableIdle) out.push(`enable\t${name}\tleft for its own target to start`)
  for (const name of systemPlan.enable) out.push(`enable\tsystem\t${name}`)
  for (const name of systemPlan.enableIdle) {
    out.push(`enable\tsystem\t${name}\tleft for its own target to start`)
  }
  for (const name of plan.remove) out.push(`remove\t${name}`)
  for (const name of systemPlan.remove) out.push(`remove\tsystem\t${name}`)
  for (const name of cluster.keys()) out.push(`cluster\t${name}`)

  if (!apply) {
    out.push("dry-run\tnothing was written; pass --apply to carry this out")
    process.stdout.write(`${out.join("\n")}\n`)
    return
  }

  for (const [name, text] of plan.write) writeUnit(name, text)
  for (const name of plan.write.keys()) linkUnit(name)

  for (const name of plan.remove) {
    systemctl(["disable", "--now", name])
    unlinkUnit(name)
  }

  systemctl(["daemon-reload"])

  for (const name of plan.enable) {
    const done = systemctl(["enable", "--now", name])
    if (done.code !== 0) out.push(`refused\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  for (const name of plan.enableIdle) {
    const done = systemctl(["enable", name])
    if (done.code !== 0) out.push(`refused\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  for (const name of changedSystem) {
    const done = writeSystemUnit(name, systemPlan.write.get(name) as string)
    if (done.code !== 0) out.push(`refused\tsystem\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  for (const name of systemPlan.remove) {
    systemSystemctl(["disable", "--now", name])
    removeSystemUnit(name)
  }

  if (changedSystem.length > 0 || systemPlan.remove.length > 0) {
    systemSystemctl(["daemon-reload"])
  }

  for (const name of systemPlan.enable) {
    const done = systemSystemctl(["enable", "--now", name])
    if (done.code !== 0) out.push(`refused\tsystem\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  for (const name of systemPlan.enableIdle) {
    const done = systemSystemctl(["enable", name])
    if (done.code !== 0) out.push(`refused\tsystem\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  for (const [name, yaml] of cluster) {
    const done = applyToCluster(yaml)
    if (done.code !== 0) out.push(`refused\tcluster\t${name}\t${done.out.trim().slice(0, 200)}`)
  }

  out.push(
    `applied\t${plan.write.size + systemPlan.write.size}\twritten\t` +
      `${plan.enable.length + plan.enableIdle.length + systemPlan.enable.length + systemPlan.enableIdle.length}\tenabled\t` +
      `${plan.remove.length + systemPlan.remove.length}\tremoved\t` +
      `${cluster.size}\treached from the cluster`
  )
  process.stdout.write(`${out.join("\n")}\n`)
}
