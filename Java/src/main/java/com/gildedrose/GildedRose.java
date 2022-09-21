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
            final String name = item.name;
            int quality = item.quality;
            int sellIn = item.sellIn;
            if (!name.equals(AGED_BRIE) && !name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                if (isMoreThanMinQuality(item) && !name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                    quality = quality - 1;
                }
            } else {
                if (isLessThanMaxQuality(item)) {
                    quality = quality + 1;

                    if (name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                        if (sellIn < 11 && isLessThanMaxQuality(item)) {
                            quality = quality + 1;
                        }

                        if (sellIn < 6 && isLessThanMaxQuality(item)) {
                            quality = quality + 1;
                        }
                    }
                }
            }

            if (!name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                sellIn = sellIn - 1;
            }

            if (item.sellIn < 0) {
                if (!name.equals(AGED_BRIE)) {
                    if (!name.equals(BACKSTAGE_PASSES_TO_A_TAFKAL_80_ETC_CONCERT)) {
                        if (isMoreThanMinQuality(item) && !name.equals(SULFURAS_HAND_OF_RAGNAROS)) {
                            quality = quality - 1;
                        }
                    } else {
                        quality = 0;
                    }
                } else {
                    if (isLessThanMaxQuality(item)) {
                        quality = quality + 1;
                    }
                }
            }
            item.quality = quality;
            item.sellIn = sellIn;
        }

    }

    private boolean isLessThanMaxQuality(Item item) {
        return item.quality < MAX_QUALITY;
    }

    private boolean isMoreThanMinQuality(Item item) {
        return item.quality > MIN_QUALITY;
    }
}
