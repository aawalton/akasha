export type BuildVisibility = "live" | "target" | "private"

export type SettableBuildVisibility = Exclude<BuildVisibility, "live" | "target">

export function toBuildVisibility(value: string | undefined): BuildVisibility {
  if (value === "live" || value === "target") return value
  return "private"
}
