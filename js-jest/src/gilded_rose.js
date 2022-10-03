const CONSTANTS = require("./constants.js");
const ITEM_QUALITY_UPDATE_MAPPER = CONSTANTS.ITEM_QUALITY_UPDATE_MAPPER;
const LEGENDARY_ITEMS = CONSTANTS.LEGENDARY_ITEMS;

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
    this.items = this.items.map((item) => {
      if (LEGENDARY_ITEMS.includes(item.name)) return item;
      item.sellIn -= 1;
      item.quality = ITEM_QUALITY_UPDATE_MAPPER[item.name]
        ? ITEM_QUALITY_UPDATE_MAPPER[item.name](item)
        : ITEM_QUALITY_UPDATE_MAPPER.default(item);
      return item;
    });
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
