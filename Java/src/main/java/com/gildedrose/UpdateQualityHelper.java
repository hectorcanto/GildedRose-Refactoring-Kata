package com.gildedrose;

import static com.gildedrose.GildedRoseConstants.MAX_QUALITY_VALUE;
import static com.gildedrose.GildedRoseConstants.MIN_QUALITY_VALUE;
import static com.gildedrose.ItemNameValues.SULFURAS;

public class UpdateQualityHelper {

    public static void updateSellIn(Item item) {
        item.sellIn = item.sellIn - 1;
    }

    public static void increaseItemQuality(Item item, int amount) {
        if (item.quality < MAX_QUALITY_VALUE) {
            item.quality = item.quality + 1;
        }
    }

    public static void decreaseItemQuality(Item item, int amount) {
        if (item.quality > MIN_QUALITY_VALUE) {
            item.quality = item.quality - amount;
        }
    }

    public static void decreaseItemQualityPostSellIn(Item item, int amount) {
        if (item.sellIn < 0) {
            if (item.quality > MIN_QUALITY_VALUE) {
                item.quality = item.quality - amount;
            }
        }
    }

}
