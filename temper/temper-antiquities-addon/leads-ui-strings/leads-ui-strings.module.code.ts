const ZONENAME_ALLZONES = "All Zones"

export const STRINGS = {
  ZONENAME_ALLZONES,
  ZONENAME_BGS: "Battlegrounds",

  KEYBINDINGTEXT: "Toggle Display Leads Window",

  DropdownTooltips: {
    major: "Complex Filter Criteria",
    zone: "Filter by Zone",
    settype: "Filter by Set or Type of Antiquity",
  },

  DropdownData: {
    ChoicesMajor: [
      "Can Find",
      "Can Scry",
      "Missing Codex Entries",
      "Never dug out",
      "Actionable Leads",
      "All Leads",
      "Group Dungeons",
      "Latest DLC",
    ],
    TooltipsMajor: [
      "Exludes found but not scried Leads as well as non-repeatable ones already found once",
      "Only shows Leads which have been found but not scried yet",
      "Only shows Antiquities which have missing Codex Entries",
      "Only shows Antiquities which have not been dug out yet",
      "Shows all Leads except finished non-repeatables",
      "Shows all Leads including finished non-repeatables",
      "Shows only Leads coming from 4 Man dungeons",
      "Shows only new Leads from latest DLC",
    ],
    ChoicesZone: [ZONENAME_ALLZONES, "Current Zone", "Latest DLC", "Exclude minor DLC"],
    TooltipsZone: [
      "Shows Leads from all Zones",
      "Only shows Leads pertaining to current Zone",
      "Shows only new Leads from latest DLC",
      "Only shows Leads pertaining to Base Zones and Chapters",
    ],
    TooltipsZoneGenerated: "Show only Leads pertaining to %s",
    ChoicesSetType: ["Everything", "Hide Obvious", "Multipart Antiquities"],
    TooltipsSetType: [
      "Shows Leads for all Types and Sets",
      "Hides the Antique Maps, Free Treasure Leads, as well as Motif Chapters\nExcept if in 'Can Scry' Major mode. Then only hides built-in Green Treasure",
      "Shows only Leads for multipart Antiquities",
    ],
    TooltipsSetTypeGenerated: "Show only lead of type/set %s",
  },

  LABEL_ALERTS_UD_MISSING: "|c%sAlerts : %d 7D; %d 1D; %d 1H; ?? UD|r",
  LABEL_ALERTS: "|c%sAlerts : %d 7D; %d 1D; %d 1H; %d UD|r",

  TOOLTIP_ALERTS_UD_MISSING: [
    "UndauntedDaily Addon missing! Can't",
    "compute if Dailies have Leads for you",
  ],

  TOOLTIP_ALERTS_1HOUR: "Leads expiring in < 1 hour : %d",
  TOOLTIP_ALERTS_1DAY: " Leads expiring in < 1 day : %d",
  TOOLTIP_ALERTS_7DAYS: " Leads expiring in < 7 day : %d",
  TOOLTIP_ALERTS_UD_NONEFOUND: "No Undaunted Dailies have Leads for you",
  TOOLTIP_ALERTS_UD_SCRYFIRST: " (You already have this Lead, Scry/Excavate it first)",

  LABEL_URL_INITIAL: "No Leads discovered so far",
  LABEL_URL_LEADFOUND: "|c3A92FFReport latest Lead with ID %d|r",

  TOOLTIP_URL: [
    "To streamline reporting new locations: ",
    "If you find a Lead this Addon will:",
    " - post Lead ID Info into this Box",
    " - post existing Location into Field to the right",
    "   (if I thought Location Info was complete it will post ",
    "    a plea instead to doublecheck your info really is new)",
    " - If you found the Lead elsewhere please:",
    "   - remove what is in EditField",
    "   - describe your Location",
    "   - Click this Field here",
    "Addon will then:",
    " - transmogrify info into an URL",
    " - open URL in browser after you consent to ZOS Popup",
  ],

  EDITBOX_INITIAL:
    "If you find NEW Location: Replace what will appear here; Click Label on left to send to browser",
  EDITBOX_LOCATION_DATA_COMPLETE:
    "Location Info considered complete. Please only Submit if your find is not already covered by existing description",
  EDITBOX_NO_LEAD_FOUND_OR_SELECTED:
    "Find a lead first, or Click Row of Lead you would like to report",
  EDITBOX_NOT_EDITED:
    "To submit new find: Replace what is in this Editbox with your new Location first. Then click Label to the left.",
  EDITBOX_LOCDATA_EMPTY:
    "You need to enter your new Location into this Editbox. Then click Label to the left.",
  EDITBOX_THANKS: "Thank you for submitting new Location data",

  SORTHEADER_NAMES: ["Lead", "Zone", "Location", "Diff", "Lore", "Dug", "Set", "Expiration"],
  SORTHEADER_TOOLTIP: [
    "Name of the Antiquity",
    "Zone where Lead can be found/scried",
    "Short Location Description\n(D) = Delve\n(PD) = Public Dungeon\n(GD) = Group Dungeon\n(WB) = World Boss",
    "Actually Rarity of Lead. Except when Difficulty is 5.",
    "How many Lore/Codex Entries are still missing",
    "How many times has the antiquity been dug out already",
    "Name of the Set that will be rewarded if multipart Antiquity\n. Or type of Reward if single Lead Antiquity",
    "Time until Lead expires.\n For some Leads expiraton time does not go down for the first couple of days.",
  ],

  TOOLTIP_LEAD_HOWUPDATE: [
    "If you know about additional Location:",
    "Click Row to activate Location Data Update for this Lead.",
    "Replace Editbox content with your Location then click Label to the left of it",
  ],

  TOOLTIP_INKLING: [
    "Original Location Data provided by @inklings (Discord, Twitch)",
    "Thanks a lot for letting me use it",
  ],

  TOOLTIP_MAPPINS: "Included in Hoft's MapPins Addon",
} as const
