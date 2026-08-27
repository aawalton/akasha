TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 0,
                    },
                    ["locations"] =
                    {
                        ["backpack"] =
                        {
                            ["displayName"] = "Backpack",
                            ["lastScanned"] = 0,
                            ["bags"] =
                            {
                                [1] =
                                {
                                    [1] =
                                    {
                                        ["itemId"] = 16424,
                                        ["itemName"] = "Crafting Motif 1: High Elf Style",
                                        ["itemLink"] = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h",
                                        ["quality"] = 3, ["filterType"] = 0,
                                        ["itemType"] = 8, ["specializedItemType"] = 61,
                                        ["traitType"] = 0, ["requiredLevel"] = 0,
                                        ["requiredCP"] = 0, ["stackCount"] = 1,
                                    },
                                },
                            },
                        },
                    },
                },
                ["sellCompiled"] =
                {
                    ["version"] = 3,
                    ["orderedRules"] =
                    {
                        {
                            ["categoryId"] = "motif-chapters",
                            ["action"] = "use",
                            ["destination"] = "character:by-priority",
                            ["canUnlock"] = "can-unlock",
                            ["unlockScope"] = "any-character",
                        },
                        {
                            ["categoryId"] = "all",
                            ["action"] = "nothing",
                        },
                    },
                    ["itemRules"] = {},
                    ["wantedEquipment"] = {},
                    ["wantedCompanionEquipment"] = {},
                    ["wantedConsumables"] = {},
                    ["consumableStock"] = {},
                    ["characterPriority"] =
                    {
                        "char-1",
                        "char-2",
                    },
                },
                ["diagnostics"] =
                {
                    ["lastExplain"] =
                    {
                        ["schemaVersion"] = 1,
                        ["timestamp"] = 20085498,
                        ["itemId"] = 16424,
                        ["itemName"] = "Crafting Motif 1: High Elf Style",
                        ["itemNameRaw"] = "Crafting Motif 1: High Elf Style",
                        ["itemLink"] = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h",
                        ["inventory"] = { ["bagId"] = 1, ["slotIndex"] = 1, ["found"] = true },
                        ["signals"] =
                        {
                            ["itemType"] = 8, ["specializedItemType"] = 61,
                            ["filterType"] = 0, ["traitType"] = 7, ["equipType"] = 0,
                            ["armorType"] = 0, ["weaponType"] = 0, ["quality"] = 3,
                        },
                        ["classification"] =
                        {
                            ["leafCategoryId"] = "motif-chapters",
                            ["ancestorChain"] = { "knowledge", "motif-chapters" },
                            ["categoryPath"] = "knowledge > motif-chapters",
                        },
                        ["itemKey"] =
                        {
                            ["kind"] = "motif",
                            ["detail"] = { ["collection"] = 1, ["book"] = 3 },
                        },
                        ["orderedWalk"] =
                        {
                            ["rulesConsidered"] = 2, ["rulesEvaluated"] = 1,
                            ["matched"] =
                            {
                                ["index"] = 0, ["categoryId"] = "motif-chapters",
                                ["action"] = "use", ["destination"] = "character:by-priority",
                                ["conditions"] = "isMotifChapter()",
                            },
                            ["rejections"] = {},
                        },
                        ["outcome"] =
                        {
                            ["action"] = "use",
                            ["destination"] = "character:char-2",
                            ["summary"] = "Use on char-2",
                        },
                        ["notes"] = { "Resolved character:by-priority → character:char-2" },
                    },
                },
            },
        },
    },
}
