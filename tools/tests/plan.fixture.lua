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
                        ["char-1"] =
                        {
                            ["displayName"] = "Auriel",
                            ["lastScanned"] = 100,
                            ["bags"] =
                            {
                                [1] =
                                {
                                    [1] =
                                    {
                                        ["itemId"] = 16424,
                                        ["itemName"] = "Crafting Motif 1: High Elf Style",
                                        ["itemLink"] = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h",
                                        ["quality"] = 3,
                                        ["filterType"] = 0,
                                        ["itemType"] = 8,
                                        ["specializedItemType"] = 61,
                                        ["traitType"] = 0,
                                        ["requiredLevel"] = 0,
                                        ["requiredCP"] = 0,
                                        ["stackCount"] = 1,
                                    },
                                    [2] =
                                    {
                                        ["itemId"] = 50000,
                                        ["itemName"] = "Some Trash",
                                        ["itemLink"] = "",
                                        ["quality"] = 1,
                                        ["filterType"] = 1,
                                        ["itemType"] = 11,
                                        ["traitType"] = 0,
                                        ["requiredLevel"] = 0,
                                        ["requiredCP"] = 0,
                                        ["stackCount"] = 5,
                                    },
                                    [3] =
                                    {
                                        ["itemId"] = 60000,
                                        ["itemName"] = "Some Weapon",
                                        ["itemLink"] = "",
                                        ["quality"] = 2,
                                        ["filterType"] = 2,
                                        ["itemType"] = 1,
                                        ["traitType"] = 0,
                                        ["requiredLevel"] = 1,
                                        ["requiredCP"] = 0,
                                        ["stackCount"] = 1,
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
                            ["categoryId"] = "weapons",
                            ["action"] = "move-to",
                            ["destination"] = "bank",
                        },
                        {
                            ["categoryId"] = "all",
                            ["action"] = "sell",
                            ["maxQuality"] = 1,
                            ["qualityOp"] = "<=",
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
            },
        },
    },
}
