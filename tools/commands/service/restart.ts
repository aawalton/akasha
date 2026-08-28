
export const summary = "Restart one workstation service by the name its document carries"

import { parseArgs } from "../../lib/parse-args.ts"
import { AKASHA, resolveRoots, rootFor } from "../../../repo/roots/roots"
import { systemctlIn } from "../../lib/service-install.ts"
import { serviceNamed } from "../../lib/service-project.ts"
import { installedUnitName } from "../../lib/service-unit.ts"
import type { CommandHelp } from "../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    { name: "<service>", description: "The slug of a document under `domains/services/`." },
  ],
  flags: [],
  exits: [
    { code: 0, meaning: "systemd was asked, and answered" },
    { code: 1, meaning: "no document carries that name, or systemd refused" },
  ],
  examples: ["ops service restart temper-watcher"],
}

export default async function serviceRestart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const slug = parsed.positionals[0]
  if (slug === undefined) {
    process.stderr.write("this takes the slug of one service; run it with --help\n")
    process.exit(1)
  }

  const doc = serviceNamed(rootFor(resolveRoots(), AKASHA), slug)
  const unit = installedUnitName(doc)
  const done = systemctlIn(doc.scope, ["restart", unit])
  if (done.code !== 0) {
    process.stderr.write(`${unit} was refused: ${done.out.trim()}\n`)
    process.exit(1)
  }
  process.stdout.write(`restarted\t${unit}\n`)
}
