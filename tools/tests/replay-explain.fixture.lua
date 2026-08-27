TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
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
                            ["filterType"] = 0, ["traitType"] = 0, ["equipType"] = 0,
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
                            ["rulesConsidered"] = 2,
                            ["rulesEvaluated"] = 2,
                            ["matched"] =
                            {
                                ["index"] = 1, ["categoryId"] = "motif-chapters",
                                ["action"] = "use", ["destination"] = "character:by-priority",
                                ["conditions"] = "isMotifChapter()",
                            },
                            ["rejections"] =
                            {
                                {
                                    ["index"] = 0, ["categoryId"] = "controlled-vendor",
                                    ["action"] = "sell", ["reason"] = "category-miss",
                                    ["detail"] = "not a sellable category",
                                },
                            },
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
