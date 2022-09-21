package com.gildedrose;

import static com.gildedrose.ItemNameValues.SULFURAS;

public class UpdateQualityHelper {

    public static void updateSellIn(Item item){
        if (!item.name.equals(SULFURAS)) {
            item.sellIn = item.sellIn - 1;
        }
    }

    public static void increaseItemQuality(Item item){
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    public static void decreaseItemQuality(Item item, int amount){
        item.quality = item.quality - amount;
    }

}
