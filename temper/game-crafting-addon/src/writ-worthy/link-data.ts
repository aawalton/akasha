import { LINK } from "./generated/link-data-table.generated"

export { LINK }

export function toLinkKey(name: string): string {
  const [s1] = string.gsub(name, "%^.*", "")
  const [s2] = string.gsub(s1, "|.*", "")
  return string.lower(s2)
}

export function findLink(mat_name: string): string | undefined {
  const key = toLinkKey(mat_name)
  return LINK[key]
}

TemperWrit.LINK = LINK
TemperWrit.FindLink = findLink
TemperWrit.ToLinkKey = toLinkKey
