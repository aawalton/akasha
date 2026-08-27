const STAR = "*"

const HERE = "./"

const UP = ".."

export interface Landed {
  readonly from: string
  readonly to: string | null
}

export function normalized(path: string): string {
  const out: string[] = []
  for (const part of path.split("/")) {
    if (part === "" || part === ".") continue
    if (part === UP) {
      if (out.length === 0 || out[out.length - 1] === UP) out.push(UP)
      else out.pop()
      continue
    }
    out.push(part)
  }
  return out.join("/")
}

export function splitGlob(spec: string): { readonly head: string; readonly tail: string } {
  const parts = spec.split("/")
  const at = parts.findIndex((part) => part.includes(STAR))
  if (at === -1) return { head: spec, tail: "" }
  return { head: parts.slice(0, at).join("/"), tail: parts.slice(at).join("/") }
}

export function joined(head: string, tail: string): string {
  if (tail === "") return head
  if (head === "") return tail
  return `${head}/${tail}`
}

export function relativeFrom(dir: string, target: string): string {
  const here = dir === "" ? [] : dir.split("/")
  const there = target === "" ? [] : target.split("/")
  let same = 0
  while (same < here.length && same < there.length && here[same] === there[same]) same += 1
  const up = new Array(here.length - same).fill(UP)
  const down = there.slice(same)
  const said = [...up, ...down].join("/")
  if (said === "") return "."
  return said.startsWith(UP) ? said : `${HERE}${said}`
}

export function within(dir: string, target: string): boolean {
  if (dir === "") return true
  return target === dir || target.startsWith(`${dir}/`)
}

export function landedOver(landed: readonly Landed[], target: string): Landed | null {
  let held: Landed | null = null
  for (const one of landed) {
    if (!within(one.from, target)) continue
    if (held === null || one.from.length > held.from.length) held = one
  }
  return held
}

export function spelledLike(spec: string, said: string): string {
  if (spec.startsWith(HERE) || spec.startsWith(UP)) return said
  return said.startsWith(HERE) ? said.slice(HERE.length) : said
}

export function relocatedPath(
  fromDir: string,
  toDir: string,
  spec: string,
  landed: readonly Landed[]
): string | null {
  const { head, tail } = splitGlob(spec)
  const target = normalized(joined(fromDir, head))
  const over = landedOver(landed, target)
  if (target.startsWith(UP) && (over === null || over.from === "")) return null
  if (within(fromDir, target) && (over === null || over.from.length <= fromDir.length)) {
    const carried = joined(toDir, target.slice(fromDir.length).replace(/^\//, ""))
    return joined(spelledLike(spec, relativeFrom(toDir, normalized(carried))), tail)
  }
  if (over === null) return joined(spelledLike(spec, relativeFrom(toDir, target)), tail)
  if (over.to === null) return null
  const rest = target.slice(over.from.length).replace(/^\//, "")
  return joined(spelledLike(spec, relativeFrom(toDir, normalized(joined(over.to, rest)))), tail)
}
