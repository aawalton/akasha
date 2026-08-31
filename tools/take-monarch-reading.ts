#!/usr/bin/env bun

import { takeReading } from "../akasha/alan-harness/monarch-reading/monarch-reading.module.code.ts"

const ROOT = `${import.meta.dir}/..`

const ABSENT =
  "no MONARCH_COOKIE, so there is no reading to take. It is the whole Cookie header from a " +
  "signed-in session at app.monarch.com, and only Alan at a browser can produce one."

const cookie = process.env.MONARCH_COOKIE?.trim()

if (cookie === undefined || cookie === "") {
  process.stderr.write(`${ABSENT}\n`)
  process.exit(2)
}

const unreviewed = await takeReading(ROOT, cookie)

process.stdout.write(`${unreviewed} unreviewed, kept beside the readout\n`)
