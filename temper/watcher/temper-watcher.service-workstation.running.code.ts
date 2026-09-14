import { runWatcherWorker } from "akasha/temper/watcher/modules/watcher-running/watcher-running.module.code.ts"

export async function runService(): Promise<never> {
  return process.exit(await runWatcherWorker())
}
