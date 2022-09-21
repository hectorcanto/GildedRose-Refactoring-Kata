package com.gildedrose;

class GildedRose {
    Item[] itemArray;
	
	public static final String AGED_BRIE = "Aged Brie";
    public static final String BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
    public static final String SULFURAS_HAND_RAGNAROS = "Sulfuras, Hand of Ragnaros";
    
    public static final int MIN_QUALITY = 0;
    public static final int MAX_QUALITY = 50;

    public GildedRose(Item[] entryItemArray) {
        this.itemArray = entryItemArray;
    }

    public void updateQuality() {
        for (int i = 0; i < itemArray.length; i++) {
            itemArray[i] = updateItemQuality(itemArray[i];
        }
    }
	
	private Item updateItemQuality(Item entryItem){
		Item itemUpdated = entryItem;
        
        boolean isAgedBrie = itemUpdated.name.equals(AGED_BRIE);
        boolean isBackStage = itemUpdated.name.equals(BACKSTAGE_PASSES);
        boolean isSulfuras = itemUpdated.name.equals(SULFURAS_HAND_RAGNAROS);
		
		if (!isAgedBrie && !isBackStage && !isSulfuras && itemUpdated.quality > MIN_QUALITY) {
           itemUpdated.quality -= 1;
        }		
		else {
			if (itemUpdated.quality < MAX_QUALITY) {
				itemUpdated.quality += 1;

                 if (isBackstage) {
                     if (itemUpdated.sellIn < 11) {
                         if (itemUpdated.quality < MAX_QUALITY) {
                             itemUpdated.quality += 1;
                         }
                     }

                     if (itemUpdated.sellIn < 6) {
                         if (itemUpdated.quality < MAX_QUALITY) {
                             itemUpdated.quality += 1;
                         }
                     }
                 }
                }
        }

        if (!isSulfuras) {
            itemUpdated.sellIn -= 1;
        }

        if (itemUpdated.sellIn < 0) {
            if (!isAgedBrie) {
                if (!isBackstage) {
                    if (itemUpdated.quality > MIN_QUALITY) {
                        if (!isSulfuras) {
                            itemUpdated.quality -= 1;
                        }
                    }
                } else {
                    itemUpdated.quality = MIN_QUALITY;
                }
            } else {
                if (itemUpdated.quality < MAX_QUALITY) {
                    itemUpdated.quality += 1;
                }
            }
        }
        return itemUpdated;
	}
}
