package com.gildedrose;

class GildedRose {
    Item[] items;

    private static String AGED_BRIE = "Aged Brie";
    private static String TAFKAL80ETC_CONCERT = "Backstage passes to a TAFKAL80ETC concert";
    private static String SULFURAS =  "Sulfuras, Hand of Ragnaros";
    private static int QUALITY_LVL = 50;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {

        for (int i = 0; i < items.length; i++) {
            int quality = items[i].quality;
            final int sellIn = items[i].sellIn;
            final String name = items[i].name;

            final Boolean AGED_BRIE_RESULT = AGED_BRIE.equals(name);
            final Boolean TAFKAL80ETC_CONCERT_RESULT = TAFKAL80ETC_CONCERT.equals(name);
            final Boolean SULFURAS_RESULT = SULFURAS.equals(name);

            if (!AGED_BRIE_RESULT && !TAFKAL80ETC_CONCERT_RESULT && quality > 0 && SULFURAS_RESULT) {
                quality =- 1;
            }

            if (SULFURAS_RESULT && quality < QUALITY_LVL && sellIn < 11) {
                quality =+ 2;
            }

            if (SULFURAS_RESULT && quality < QUALITY_LVL && sellIn < 6) {
                quality =+ 2;
            }

            if (!SULFURAS_RESULT) {
                quality =- 1;
            }

            if (sellIn < 0 && !AGED_BRIE_RESULT) {
                quality =- 1;
            }

            if (sellIn < 0 && AGED_BRIE_RESULT && quality < QUALITY_LVL) {
                quality =+ 1;
            }

            items[i].quality = quality;
        }
    }
}