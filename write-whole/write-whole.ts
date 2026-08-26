import { renameSync, rmSync, writeFileSync } from "node:fs"

export function writeWhole(path: string, contents: string): void {
  const temp = `${path}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`
  writeFileSync(temp, contents, "utf8")
  try {
    renameSync(temp, path)
  } catch (failed) {
    rmSync(temp, { force: true })
    throw failed
  }
}
