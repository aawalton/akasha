
export function emitStartLine(
  json: boolean,
  pid: number,
  logPath: string,
  alreadyRunning: boolean
): undefined {
  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, pid, log_path: logPath, already_running: alreadyRunning })}\n`
    )
  } else {
    process.stdout.write(`pid=${pid} log=${logPath}\n`)
  }
}
