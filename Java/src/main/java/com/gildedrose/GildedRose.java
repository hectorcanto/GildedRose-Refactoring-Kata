package com.gildedrose;

import static com.gildedrose.ItemNameValues.AGED_BRIE;
import static com.gildedrose.ItemNameValues.BACKSTAGE_PASSES;
import static com.gildedrose.ItemNameValues.CONJURED;
import static com.gildedrose.ItemNameValues.SULFURAS;

class GildedRose {

    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {

            final String itemName = item.name;

            if (itemName.equals(AGED_BRIE)) {
                processAgedBrie(item);
                continue;
            }

            if (itemName.equals(BACKSTAGE_PASSES)) {
                processBackstagePasses(item);
                continue;
            }

            if (itemName.equals(SULFURAS)) {
                processSulfuras(item);
                continue;
            }

            if (itemName.startsWith(CONJURED)) {
                processConjured(item);
                continue;
            }

            processDefaultItem(item);
        }
    }

    private void processDefaultItem(Item item) {
        UpdateQualityHelper.decreaseItemQuality(item, 1);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.decreaseItemQualityPostSellIn(item, 1);
    }

    private void processAgedBrie(Item item) {
        UpdateQualityHelper.increaseItemQuality(item, 1);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.decreaseItemQualityPostSellIn(item, 1);
    }

    private void processBackstagePasses(Item item) {
        increaseBackStagePassesPreSellIn(item);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.decreaseItemQualityPostSellIn(item, 1);
    }

    private void processSulfuras(Item item) {
        //do nothing
    }

    private void processConjured(Item item) {
        UpdateQualityHelper.decreaseItemQuality(item, 2);
        UpdateQualityHelper.updateSellIn(item);
        UpdateQualityHelper.decreaseItemQualityPostSellIn(item, 2);
    }

    private void increaseBackStagePassesPreSellIn(Item item) {
        UpdateQualityHelper.increaseItemQuality(item, 1);
        if (item.sellIn < 11) {
            UpdateQualityHelper.increaseItemQuality(item, 1);
        }

        if (item.sellIn < 6) {
            UpdateQualityHelper.increaseItemQuality(item, 1);
        }
    }
}
