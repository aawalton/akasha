#!/usr/bin/env bun

import { mailbox } from "@akasha/google-email/gmail-mailbox"
import { oneRun } from "@akasha/email-watch/inbox-run"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const named = args.indexOf("--person")
const person = named === -1 ? "alan" : (args[named + 1] ?? "alan")
const root = akashaRoot()

const report = await oneRun(person, root, await mailbox(), { dryRun })
for (const line of report.decisions) process.stdout.write(`  ${line}\n`)
process.stdout.write(
  `${dryRun ? "dry-run" : "pass"}: examined ${report.examined} message(s) — ${report.acted} acted on, ` +
    `${report.waiting} waiting on an agent, ${report.unclaimed} that no rule claimed\n`
)
