// The eleven systemd units under ~/.config/systemd/user still name this path in their ExecStart,
// and those units are written by `akasha service install` from workstation-service pages that do
// not exist yet for those eleven services. Until they do, this path has to keep answering, so it
// stands as a shim over the module that supersedes it rather than as a second copy of the body.
import { commandIn, rootOf, wrapping } from "@akasha/service-system/service-wrapping"

const REFUSED_EXIT = 2

const command = commandIn(process.argv.slice(2))

if (command.length === 0) {
  console.error("service-wrapper: name the command to run, after `--`")
  process.exit(REFUSED_EXIT)
}

process.exit(await wrapping({ root: rootOf(), command }))
