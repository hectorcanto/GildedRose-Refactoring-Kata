package com.gildedrose;

import static com.gildedrose.ItemNameValues.AGED_BRIE;
import static com.gildedrose.ItemNameValues.BACKSTAGE_PASSES;
import static com.gildedrose.ItemNameValues.SULFURAS;

class GildedRose {

    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQualityV2(){
        for (Item item : items) {
            final String itemName = item.name;

            switch (itemName){
                case AGED_BRIE:
                    processAgedBrie(item);
                    continue;
                case BACKSTAGE_PASSES:
                    processBackstagePasses(item);
                    continue;
                    //TODO add rest of item types
                default:
                    processDefaultItem(item);
            }
        }
    }

    private void processDefaultItem(Item item){
        UpdateQualityHelper.decreaseItemQuality(item, 1);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.decreaseItemQuality(item, 1);
    }

    private void processAgedBrie(Item item){
        UpdateQualityHelper.increaseItemQuality(item, 1);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.increaseItemQuality(item, 1);
    }

    private void processBackstagePasses(Item item){
        UpdateQualityHelper.increaseItemQuality(item, 1);
        UpdateQualityHelper.updateSellIn(item);
        increaseBackStagePassesPostSellIn(item);
    }

    private void processSulfuras(Item item){
        //TODO complete method
    }

    private void increaseBackStagePassesPostSellIn(Item item){
        UpdateQualityHelper.increaseItemQuality(item,1);
        if (item.sellIn < 11) {
            UpdateQualityHelper.increaseItemQuality(item,1);
        }

        if (item.sellIn < 6) {
            UpdateQualityHelper.increaseItemQuality(item,1);
        }
    }

    public void updateQuality() {
        for (Item item : items) {
            if (!item.name.equals(AGED_BRIE)
                && !item.name.equals(BACKSTAGE_PASSES)) {
                if (item.quality > 0) {
                    if (!item.name.equals(SULFURAS)) {
                        item.quality = item.quality - 1;
                    }
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;

                    if (item.name.equals(BACKSTAGE_PASSES)) {
                        if (item.sellIn < 11) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1;
                            }
                        }

                        if (item.sellIn < 6) {
                            if (item.quality < 50) {
                                item.quality = item.quality + 1;
                            }
                        }
                    }
                }
            }

            UpdateQualityHelper.updateSellIn(item);

            if (item.sellIn < 0) {
                if (!item.name.equals(AGED_BRIE)) {
                    if (!item.name.equals(BACKSTAGE_PASSES)) {
                        if (item.quality > 0) {
                            if (!item.name.equals(SULFURAS)) {
                                item.quality = item.quality - 1;
                            }
                        }
                    } else {
                        item.quality = item.quality - item.quality;
                    }
                } else {
                    UpdateQualityHelper.increaseItemQuality(item, 1);
                }
            }
        }
    }

}
