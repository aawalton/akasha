import type {
  Command,
  CommandDocument,
  CommandModule,
} from "@akasha/command-system/command-declaring"
import { commandDocuments } from "./documented.ts"

/**
 * The commands `ops` forwards to a file, each one an `ops-command` page read out of the index.
 *
 * Until 2026-09-03 this read every `tools/*.ts` off the disk and matched a regular expression
 * against each file's text for an `export const tool` declaration, so the set of forwarded
 * commands was whatever the folder held and no list of them was written anywhere. A file taken
 * away left the set one smaller with nothing to say so: `ops domain dag`, `ops domain declarations`
 * and `ops domain unreached` went that way. The pages are the list now. A file that goes leaves
 * its page behind, so the command stays in the listing and a run of it names the file that is
 * not there, and the page is taken away with the command rather than before it.
 */
function forwarder(document: CommandDocument): Command {
  return {
    path: document.path,
    summary: document.summary,
    document,
    load: async (): Promise<CommandModule> => {
      const { forwardHelp, forwardRunner } = await import("./tool-forward.ts")
      return { default: forwardRunner(document), help: forwardHelp(document) }
    },
  }
}

export function forwarderCommands(
  documents: readonly CommandDocument[] = commandDocuments()
): readonly Command[] {
  return documents.filter((one) => one.entryFile !== "").map(forwarder)
}
