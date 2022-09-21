const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const MIN_SELL_IN_DAY = 0;
const QUALITY_INCREMENT = 1;
const QUALITY_DOUBLE_INCREMENT = 2;
const QUALITY_TRIPLE_INCREMENT = 3;
const FIRST_CHECK_DAYS_TO_EVENT = 11;
const SECOND_CHECK_DAYS_TO_EVENT = 6;
const SULFURAS_DEFAULT_QUALITY = 80;
const SULFURAS_DEFAULT_SELL_IN_DAY = -1;

const AGED_BRIE_ITEM_NAME = 'Aged Brie';
const SULFURAS_ITEM_NAME = 'Sulfuras, Hand of Ragnaros';
const BACKSTAGE_PASS_ITEM_NAME = 'Backstage passes to a TAFKAL80ETC concert';

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class StandardItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    if (this.quality == MIN_QUALITY) {
      return;
    }
    const qualityIncrement = this.sellIn < MIN_SELL_IN_DAY ? QUALITY_DOUBLE_INCREMENT : QUALITY_INCREMENT;
    this.quality = Math.max(MIN_QUALITY, this.quality - qualityIncrement);
  }

  subtractSellInDay() {
    if (this.sellIn < MIN_SELL_IN_DAY) {
      return;
    }
    this.sellIn--;
  }
}

class AgedBrie extends StandardItem {
  constructor(sellIn, quality) {
    super(AGED_BRIE_ITEM_NAME, sellIn, quality);
  }

  updateQuality() {
    if (this.quality == MAX_QUALITY) {
      return;
    }
    const qualityIncrement = this.sellIn < MIN_SELL_IN_DAY ? QUALITY_DOUBLE_INCREMENT : QUALITY_INCREMENT;
    this.quality = Math.min(MAX_QUALITY, this.quality + qualityIncrement);
  }
}

class Sulfuras extends StandardItem {
  constructor() {
    super(SULFURAS_ITEM_NAME, SULFURAS_DEFAULT_SELL_IN_DAY, SULFURAS_DEFAULT_QUALITY);
  }

  updateQuality() {
    // do nothing, quality never changes
  }

  subtractSellInDay() {
    // do nothing, sellIn never changes
  }
}

class BackstagePass extends StandardItem {
  constructor(sellIn, quality) {
    super(BACKSTAGE_PASS_ITEM_NAME, sellIn, quality);
  }

  updateQuality() {
    if (this.sellIn < MIN_SELL_IN_DAY) {
      this.quality = MIN_QUALITY;
      return;
    }

    if (this.quality == MAX_QUALITY) {
      return;
    }

    let qualityIncrement = QUALITY_INCREMENT;
    if (this.sellIn < FIRST_CHECK_DAYS_TO_EVENT) {
      qualityIncrement = QUALITY_DOUBLE_INCREMENT;
    }
    if (this.sellIn < SECOND_CHECK_DAYS_TO_EVENT) {
      qualityIncrement = QUALITY_TRIPLE_INCREMENT;
    }
    this.quality = Math.min(MAX_QUALITY, this.quality + qualityIncrement);
  }
}

class Shop {
  constructor(items=[]){
    this.items = items.map(item => {
      return this.transformItem(item);
    });
  }
  
  transformItem(item) {
    if (item.name == AGED_BRIE_ITEM_NAME) {
      return new AgedBrie(item.sellIn, item.quality);
    }
    if (item.name == SULFURAS_ITEM_NAME) {
      return new Sulfuras();
    }
    if (item.name == BACKSTAGE_PASS_ITEM_NAME) {
      return new BackstagePass(item.sellIn, item.quality);
    }
    return new StandardItem(item.name, item.sellIn, item.quality);
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].subtractSellInDay();
      this.items[i].updateQuality();
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
