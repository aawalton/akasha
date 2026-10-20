export type BuildVisibility = "live" | "target" | "private"


export function toBuildVisibility(value: string | undefined): BuildVisibility {
  if (value === "live" || value === "target") return value
  return "private"
}
