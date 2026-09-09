const ICON_BASE_URL = "https://esoicons.uesp.net"

export function getEsoIconUrl(icon: string | null | undefined): string | null {
  if (icon == null) return null
  return `${ICON_BASE_URL}${icon.replace(".dds", ".png")}`
}
