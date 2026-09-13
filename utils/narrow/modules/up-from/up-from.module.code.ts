import { dirname } from "node:path"

const UP = ".."

export function upFrom(path: string): string {
  return dirname(path)
    .split("/")
    .map(() => UP)
    .join("/")
}
