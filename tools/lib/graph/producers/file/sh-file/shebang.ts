const SHEBANG = "#!"

const SHELLS: readonly string[] = ["sh", "bash", "zsh", "dash", "ksh", "ash"]

export const namesShell = (body: string): boolean => {
  const stop = body.indexOf("\n")
  const first = stop < 0 ? body : body.slice(0, stop)
  if (!first.startsWith(SHEBANG)) return false
  return first
    .slice(SHEBANG.length)
    .trim()
    .split(/\s+/)
    .some((word) => SHELLS.includes(word.slice(word.lastIndexOf("/") + 1)))
}
