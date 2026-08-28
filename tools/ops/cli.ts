#!/usr/bin/env bun

import type { CodeKit } from "./code.ts"
import { codeKit } from "./code.ts"
import { dispatch, findCommand, reportableMessage } from "./dispatch.ts"
import { EXIT, exitCodeOf } from "../lib/exit.ts"
import { ignoreClosedConsumerWrites } from "../lib/closed-consumer.ts"
import { answerPageQueriesInProcess } from "./page-queries-in-process.ts"

const UNREACHABLE_CODE_REPOSITORY = 70

let loadedKit: CodeKit | null = null

async function main(): Promise<void> {
  const kit = await codeKit()
  loadedKit = kit

  process.on("unhandledRejection", (reason) => {
    const message = reason instanceof Error ? reason.message : String(reason)
    process.stderr.write(`ops: unhandled rejection: ${message.split("\n", 1)[0] ?? "<empty>"}\n`)
    process.exit(EXIT.OPERATIONAL)
  })
  process.on("uncaughtException", (err) => {
    process.stderr.write(`ops: uncaught exception: ${err.message.split("\n", 1)[0] ?? "<empty>"}\n`)
    process.exit(EXIT.OPERATIONAL)
  })

  ignoreClosedConsumerWrites([process.stdout, process.stderr])
  answerPageQueriesInProcess()

  const args = process.argv.slice(2)
  const match = findCommand(kit.commands, args)

  let dispatchError: unknown = null
  let exitCode: number = EXIT.OK
  try {
    await dispatch(kit, args, match)
  } catch (err) {
    dispatchError = err
    exitCode = exitCodeOf(err)
  }

  if (dispatchError !== null) console.error(await reportableMessage(kit, dispatchError, match))

  if (exitCode !== EXIT.OK) process.exit(exitCode)
}

export async function run(): Promise<void> {
  await main().catch((err: unknown) => {
    console.error(err instanceof Error ? err.message : String(err))
    process.exit(loadedKit === null ? UNREACHABLE_CODE_REPOSITORY : EXIT.OPERATIONAL)
  })
}

if (import.meta.main) {
  void run()
}
