#!/usr/bin/env bun

import { readAliasSnapshot } from "./init/alias-snapshot.ts"
import { generateBashInit } from "./init/bash.ts"

const args = process.argv.slice(2)
const command = args[0]
const subcommand = args[1]

if (command === "init" && subcommand === "bash") {
  console.log(generateBashInit(readAliasSnapshot()))
} else {
  console.error("Usage: aw init bash")
  process.exit(1)
}
