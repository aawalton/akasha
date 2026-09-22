import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

export function registerUiStrings(): undefined {
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_QUEST_BOOK", "Quest [%s]")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_QUEST_BOOK_ZONENAME", "Quest in %s [%s]")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MAYBE_NOT_HERE", "[Book is maybe not here]")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_QUEST_IN_ZONE", "Quest in <<1>>")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_SPECIAL_QUEST", "Special quest in <<1>>")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_LBPOS_OPEN_BOOK",
    "You must be reading a book to use /lbpos"
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_LBPOS_ERROR",
    "Crafting Book or no relation to Eidetic Memory or Shalidor's Library."
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_UPDATE", "Please Help Update")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_CLIMB", "Climb")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_BOOKSHELF", "Bookshelf")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO1", "Town")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO2", GetString(SI_INSTANCEDISPLAYTYPE7))
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO3", GetString(SI_INSTANCEDISPLAYTYPE6))
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO4", "Underground")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO5", GetString(SI_INSTANCETYPE2))
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_MOREINFO6", "Inside Inn")

  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_SET_WAYPOINT",
    GetString(SI_WORLD_MAP_ACTION_SET_PLAYER_WAYPOINT) + " : |cFFFFFF<<1>>|r"
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_TITLE", "LoreBooks")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE", "Select map pin icons")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE_EIDETIC", "Select map pin icons (<<1>>)")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE_DESC", "Select map pin icons.")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_GRAYSCALE", " - Use grayscale")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_PIN_GRAYSCALE_DESC",
    "Use grayscale for collected lore books. (Only applies to 'real icons')"
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_PIN_GRAYSCALE_EIDETIC_DESC",
    "Use grayscale for uncollected eidetic books. (Only applies to 'real icons')"
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_SIZE", "Pin size")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_SIZE_DESC", "Set the size of the map pins.")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_LAYER", "Pin layer")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_LAYER_DESC", "Set the layer of the map pins")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_PIN_CLICK_MENU",
    "Enable Lorebook player waypoint click option"
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_PIN_CLICK_MENU_DESC",
    "Enable and disable the click option when Lorebooks are stacked to set player waypoint."
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_DUNGEON_TAG_MENU",
    "Add Dungeon or Location name to tooltip"
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_DUNGEON_TAG_MENU_DESC",
    "Enable and disable adding the Dungeon or Location name to the tooltip. Example [Dungeon], or [Zenithar's Abbey]"
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_QUESTINFO_MENU", "Add Quest name and Location to tooltip")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_QUESTINFO_MENU_DESC",
    "Enable and disable adding the Quest name and Location name if available to the tooltip. Example Quent in Blackwood [The Golden Anvil]"
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE1", "Real icons")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE2", "Book icon set 1")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE3", "Book icon set 2")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_PIN_TEXTURE4", "Esohead's icons (Rushmik)")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_COMPASS_UNKNOWN", "Show lorebooks on the compass.")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_COMPASS_UNKNOWN_DESC",
    "Show/Hide icons for unknown lorebooks on the compass."
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_COMPASS_DIST", "Max pin distance")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_COMPASS_DIST_DESC",
    "The maximum distance for pins to appear on the compass."
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_UNKNOWN", "Show unknown lorebooks")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_UNKNOWN_DESC",
    "Show/Hide icons for unknown lorebooks on the map."
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_COLLECTED", "Show already collected lorebooks")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_COLLECTED_DESC",
    "Show/Hide icons for already collected lorebooks on the map."
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_EIDETIC", "Show unknown Eidetic Memory")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_EIDETIC_DESC",
    "Show/Hide unknown Eidetic Memory scrolls on map. Those scrolls are lore-related scrolls not involved into Mages Guild Progression, but only informative about Tamriel"
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_EIDETIC_COLLECTED", "Show known Eidetic Memory")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_EIDETIC_COLLECTED_DESC",
    "Show/Hide known Eidetic Memory scrolls on map. Those scrolls are lore-related scrolls not involved into Mages Guild Progression, but only informative about Tamriel"
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_BOOKSHELF_NAME", "Show bookshelves")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_BOOKSHELF_DESC",
    "Show/Hide bookshelves on map. Bookshelves contain a random book from the zone."
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_COMPASS_EIDETIC", "Show unknown Eidetic Memory on compass")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_COMPASS_EIDETIC_DESC",
    "Show/Hide unknown Eidetic Memory scrolls on compass. Those scrolls are lore-related scrolls not involved into Mages Guild Progression, but only informative about Tamriel"
  )
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_COMPASS_BOOKSHELF_NAME", "Show bookshelves on compass")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_COMPASS_BOOKSHELF_DESC",
    "Show/Hide bookshelves on compass. Bookshelves contain a random book from the zone."
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_UNLOCK_EIDETIC", "Unlock Eidetic Library")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_UNLOCK_EIDETIC_DESC",
    "This will unlock Eidetic Library even if you haven't done the Mage Guild questline. This option is only valid for EN/FR/DE users."
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_UNLOCK_EIDETIC_WARNING",
    "This option is disabled because either LoreBooks has not yet been updated for the latest game update or your language is not supported"
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_FILTER_UNKNOWN", "Unknown lorebooks")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_FILTER_COLLECTED", "Collected lorebooks")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_FILTER_COLLECTED_FORMATTER", "<<1>> (Collected)")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_FILTER_BOOKSHELF", "Lorebooks Bookshelf")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_SEARCH_LABEL", "Search in the lore library :")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_SEARCH_PLACEHOLDER", "Lorebook Name")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_INCLUDE_MOTIFS_CHECKBOX", "Include Motifs")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_RANDOM_POSITION", "[Bookshelves]")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_REPORT_KEYBIND_RPRT", "Report")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_REPORT_KEYBIND_SWITCH", "Switch Mode")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_REPORT_KEYBIND_COPY", "Copy")

  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_RS_FEW_BOOKS_MISSING",
    "Few books are still missing in the Shalidor Library.."
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_RS_MDONE_BOOKS_MISSING",
    "You maxed Mages Guild Skillline ! But few books are still missing"
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_RS_GOT_ALL_BOOKS",
    "You collected all Shalidor Library. Congratulations !"
  )

  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_RE_FEW_BOOKS_MISSING",
    "Few books are still missing in the Eidetic Memory.."
  )
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_RE_THREESHOLD_ERROR",
    "You need to collect few more books in order to get a report on Eidetic Memory .."
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE", "Enable Immersive Mode based on")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_IMMERSIVE_DESC",
    "Unknown Lorebooks won't be displayed based on the completion of the following objective on the current zone you are looking at"
  )

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE1", "Disabled")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE2", "Zone Main Quest")
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE3", GetString(SI_MAPFILTER8))
  const [achievementCategory6] = GetAchievementCategoryInfo(6)
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE4", achievementCategory6)
  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_IMMERSIVE_CHOICE5", "Zone Quests")

  ZO_CreateStringId("SI_TEMPER_LOREBOOKS_USE_QUEST_BOOKS", "Use Quest Books (Beta)")
  ZO_CreateStringId(
    "SI_TEMPER_LOREBOOKS_USE_QUEST_BOOKS_DESC",
    "Will try to use quest tools when they are received to avoid missing inventory-only books. May also use things like maps because there's no distinction between books and other usable quest items."
  )
}
