import { asInternalTable, asPublicTable } from "../casts"
import type { InternalTable, PublicTable } from "../shape"

const Public: PublicTable = asPublicTable({
  Used: false,
})

const Internal: InternalTable = asInternalTable({
  name: "LibExtendedJournal",
  SCENE_NAME: "ExtendedJournalScene",
  initialized: false,
  controls: {},
  tabs: {},
  activeTab: undefined,
  settingsVisible: false,
})

export { Internal, Public }
