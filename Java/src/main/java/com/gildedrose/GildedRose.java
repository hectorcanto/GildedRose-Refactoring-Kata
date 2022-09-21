package com.gildedrose;

class GildedRose {

    public static final String BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT = "Backstage passes to a TAFKAL80ETC concert";
    public static final String SULFURAS_HAND_OF_RAGNAROS = "Sulfuras, Hand of Ragnaros";
    public static final String AGED_BRIE = "Aged Brie";
    public static final int MAX_QUALITY = 50;
    public static final int MIN_QUALITY = 0;
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            if (!item.name.equals(AGED_BRIE) && !item.name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                if (isMoreThanMinQuality(item) && !item.name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                    item.quality = item.quality - 1;
                }
            } else {
                if (isLessThanMaxQuality(item)) {
                    item.quality = item.quality + 1;

                    if (item.name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                        if (item.sellIn < 11 && isLessThanMaxQuality(item)) {
                            item.quality = item.quality + 1;
                        }

                        if (item.sellIn < 6 && isLessThanMaxQuality(item)) {
                            item.quality = item.quality + 1;
                        }
                    }
                }
            }

            if (!item.name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                item.sellIn = item.sellIn - 1;
            }

            if (item.sellIn < 0) {
                if (!item.name.equals(AGED_BRIE)) {
                    if (!item.name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                        if (isMoreThanMinQuality(item) && !item.name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                            item.quality = item.quality - 1;
                        }
                    } else {
                        item.quality = 0;
                    }
                } else {
                    if (isLessThanMaxQuality(item)) {
                        item.quality = item.quality + 1;
                    }
                }
            }
        }

    }

    private boolean isLessThanMaxQuality(Item item) {
        return item.quality < MAX_QUALITY;
    }

    private boolean isMoreThanMinQuality(Item item) {
        return item.quality > MIN_QUALITY;
    }
}
