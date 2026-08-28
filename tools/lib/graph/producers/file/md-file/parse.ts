import { oldGraphGone } from "../../../graph-gone.ts"

export interface MdPathLink {
  target: string
  fragment: string | null
  line: number
}
export const parseMdLinks: (source: string) => readonly MdPathLink[] = () =>
  oldGraphGone("parseMdLinks")
