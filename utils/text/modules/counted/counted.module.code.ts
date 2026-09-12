export function counted(many: number, one: string): string {
  return `${many} ${one}${many === 1 ? "" : "s"}`
}
