
export const summary = "Decode a 20-field ESO item link string to labeled fields"

import type { CommandHelp } from "../../../ops/surface.ts"
import { codeModule } from "../../../lib/code-import.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"

const ITEM_LINK_PARSER = "@temper/game-items-core/item-link-parser"

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

interface ParsedItemLink {
  readonly itemId: unknown
  readonly subType: unknown
  readonly level: unknown
  readonly enchantId: unknown
  readonly enchantSubType: unknown
  readonly enchantLevel: unknown
  readonly traitType: unknown
  readonly flags: unknown
  readonly style: unknown
  readonly crafted: unknown
  readonly bound: unknown
  readonly stolen: unknown
  readonly charges: unknown
  readonly potionData: unknown
}

interface ItemLinkParser {
  readonly parseItemLink: (link: string) => ParsedItemLink | null
}

export default async function temperInventoryDecodeLink(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const link = parsed.positionals[0]
  if (link === undefined) throw inputError("item link is required")
  const json = parsed.boolean("--json")

  const parser = await codeModule<ItemLinkParser>(ITEM_LINK_PARSER)
  const decoded = parser.parseItemLink(link)
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
