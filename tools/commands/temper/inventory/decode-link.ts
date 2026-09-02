
export const summary = "Decode a 20-field ESO item link string to labeled fields"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<link>",
      description: "ESO item link string (|H1:item:...|h|h)",
      required: true,
    },
  ],
  flags: [
    {
      name: "--json",
      description: "Emit JSON object instead of TSV",
    },
  ],
  examples: [
    "ops temper inventory decode-link '|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h'",
    "ops temper inventory decode-link '|H1:item:16424:...|h|h' --json",
  ],
}

export default async function temperInventoryDecodeLink(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const link = parsed.positionals[0]
  if (link === undefined) throw inputError("item link is required")
  const json = parsed.boolean("--json")

  const decoded = parseItemLink(link)
  if (decoded === null) {
    throw inputError(`could not parse item link: ${link}`)
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(decoded)}\n`)
    return
  }

  const lines: string[] = [
    `itemId\t${decoded.itemId}`,
    `subType\t${decoded.subType}`,
    `level\t${decoded.level}`,
    `enchantId\t${decoded.enchantId}`,
    `enchantSubType\t${decoded.enchantSubType}`,
    `enchantLevel\t${decoded.enchantLevel}`,
    `traitType\t${decoded.traitType}`,
    `flags\t${decoded.flags}`,
    `style\t${decoded.style}`,
    `crafted\t${decoded.crafted}`,
    `bound\t${decoded.bound}`,
    `stolen\t${decoded.stolen}`,
    `charges\t${decoded.charges}`,
    `potionData\t${decoded.potionData}`,
  ]
  process.stdout.write(`${lines.join("\n")}\n`)
}
