export function pad2(n: number): string {
  return String(n).padStart(2, "0")
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function localIndex(num: string): number {
  const parts = num.split(".")
  const last = parts[parts.length - 1]
  if (last === undefined) throw new Error(`malformed number: ${num}`)
  const n = Number(last)
  if (!Number.isInteger(n)) throw new Error(`non-integer segment in number: ${num}`)
  return n
}

export function nodeDirName(localIdx: number, title: string): string {
  return `${pad2(localIdx)}-${slugify(title)}`
}
