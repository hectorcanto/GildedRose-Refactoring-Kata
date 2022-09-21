const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const MIN_SELLIN = 0;
const SELLIN_BACKSTAGE_10 = 11;
const SELLIN_BACKSTAGE_5 = 6;
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }
      if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePasses(this.items[i]);
        continue;
      }
      if (this.items[i].name === "Aged Brie") {
        this.updateAgedBrie(this.items[i]);
        continue;
      }

      this.updateNormalItem(this.items[i]);
      return this.items;

    }
  }

  updateNormalItem(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality = item.quality - 1;
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < MIN_SELLIN) {
      if (item.quality > MIN_QUALITY) {
        item.quality = item.quality - 1;
      }
    }
  }

  updateAgedBrie(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < MIN_SELLIN) {
      if (item.quality < MAX_QUALITY) {
        item.quality = item.quality + 1;
      }
    }
  }

  updateBackstagePasses(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality = item.quality + 1;
      if (item.sellIn < SELLIN_BACKSTAGE_10) {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < SELLIN_BACKSTAGE_5) {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
        }
      }
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < MIN_SELLIN) {
      item.quality = 0;
    }
  }
}

module.exports = {
  Item,
  Shop,
};
