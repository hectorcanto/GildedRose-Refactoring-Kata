package com.gildedrose;

import static com.gildedrose.GildedRoseConstants.MAX_QUALITY_VALUE;
import static com.gildedrose.ItemNameValues.AGED_BRIE;
import static com.gildedrose.ItemNameValues.CONJURED;
import static com.gildedrose.ItemNameValues.SULFURAS;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class GildedRoseTest {

    @Test
    void testUnregisteredItem() {
        Item actual = new Item("Mock item", 2 , 5);
        Item expected = new Item("Mock item", 1 , 4);
    }

    @Test
    void testAgedBrie() {
        Item actual = new Item(AGED_BRIE, 2 , 0);
        Item expected = new Item(AGED_BRIE, 1 , 1);
    }

    @Test
    void testAgedBrieTopQuality() {
        Item actual = new Item(AGED_BRIE, 2 , MAX_QUALITY_VALUE);
        Item expected = new Item(AGED_BRIE, 1 , MAX_QUALITY_VALUE);
    }

    @Test
    void testSulfuras(){
        Item actual = new Item(SULFURAS, 2 , 1);
        Item expected = new Item(SULFURAS, 2 , 1);
    }

    @Test
    void testConjured(){
        Item actual = new Item(CONJURED, 2 , 5);
        Item expected = new Item(CONJURED, 2 , 3);
    }



    private void testUpdateQuality(Item expected, Item actual){
        Item[] items = new Item[] { actual };
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertEquals(actual, expected);
    }

}
