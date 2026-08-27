
import { appendFileSync, readFileSync } from "node:fs"

const [runDir, label] = Bun.argv.slice(2)
if (runDir === undefined || label === undefined) {
  process.stderr.write("error: hook-bench-record takes <run-dir> <label>\n")
  process.exit(2)
}

const command = readFileSync(`${runDir}/commands/${label}`, "utf8")
const stdin = await Bun.stdin.text()

const child = Bun.spawn(["sh", "-c", command], {
  stdin: new TextEncoder().encode(stdin),
  stdout: "pipe",
  stderr: "pipe",
})
const [stdout, stderr] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text()])
const exit = await child.exited

let received: unknown = null
try {
  received = JSON.parse(stdin)
} catch {
  received = { unparsed: stdin }
}

appendFileSync(
  `${runDir}/hooks.jsonl`,
  `${JSON.stringify({ at: new Date().toISOString(), label, command, received, stdout, stderr, exit })}\n`,
  "utf8"
)

if (stdout !== "") process.stdout.write(stdout)
if (stderr !== "") process.stderr.write(stderr)
process.exit(exit)
