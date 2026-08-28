import { oldGraphGone } from "../../graph-gone.ts"

export const extractPackageName: (specifier: string) => string | null = () =>
  oldGraphGone("extractPackageName")
