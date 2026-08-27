
import { countLiveSeatChildren } from "./seat-children.ts"

const parent = process.argv[2] ?? ""

process.stdout.write(`${parent === "" ? 0 : countLiveSeatChildren(parent)}\n`)
