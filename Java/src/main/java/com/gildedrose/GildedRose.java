package com.gildedrose;

class GildedRose {

    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (int i = 0; i < items.length; i++) {
            if (!items[i].name.equals("Aged Brie")
                    && !items[i].name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                Sulfuras(items);
            } else {
                Aged(items);
                Backstage(items);
                
            }

            if (!items[i].name.equals("Sulfuras, Hand of Ragnaros")) {
                items[i].sellIn = items[i].sellIn - 1;
            }

            if (items[i].sellIn < 0) {
                if (!items[i].name.equals("Aged Brie")) {
                    if (!items[i].name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                        Sulfuras(items);
                    } else {
                        items[i].quality = items[i].quality - items[i].quality;
                    }
                } else {
                    Aged(items);
                }
            }
        }
    }

    public String Sulfuras(items) {
        for (int i = 0; i < items.length; i++) {
            if (items[i].quality > 0 || 
                if (items[i].sellIn < 0) {)
                    {
                        if (!items[i].name.equals("Sulfuras, Hand of Ragnaros")) {
                            items[i].quality = items[i].quality - 1;
                        }
                    }

                }
        }
    }

    public void Backstage(items) {
        for (int i = 0; i < items.length; i++) {
            if (items[i].name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                if (items[i].sellIn < 11) {
                    Aged(items);
                }
                if (items[i].sellIn < 6) {
                    Aged(items);
                }
            }
        }
    }
    
    public void Aged(items) {
        for (int i = 0; i < items.length; i++) {
            if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1;
                }

        }
    }
}
