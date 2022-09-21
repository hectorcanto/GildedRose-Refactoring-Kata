package com.gildedrose;

import static com.gildedrose.ItemNameValues.SULFURAS;

public class UpdateQualityHelper {

    private static int MAX_QUALITY_VALUE = 50;

    private static int MIN_QUALITY_VALUE = 0;

    public static void updateSellIn(Item item){
        if (!item.name.equals(SULFURAS)) {
            item.sellIn = item.sellIn - 1;
        }
    }

    public static void increaseItemQuality(Item item, int amount){
        if (item.quality < MAX_QUALITY_VALUE) {
            item.quality = item.quality + 1;
        }
    }

    public static void decreaseItemQuality(Item item, int amount){
        if (item.quality > MIN_QUALITY_VALUE) {
            item.quality = item.quality - amount;
        }
    }

}
