const {
  MAX_QUALITY,
  MIN_QUALITY,
  SELLIN_BACKSTAGE_5,
  SELLIN_BACKSTAGE_10,
  MIN_SELLIN,
} = require("./constants.js");


const ITEM_QUALITY_UPDATE_MAPPER = {
  "Aged Brie": (item) => {
    if (item.quality >= MAX_QUALITY) return item.quality;
    newQuality = item.quality + (item.sellIn < MIN_SELLIN ? 2 : 1);
    if (item.quality > MAX_QUALITY) return MAX_QUALITY;
    return newQuality;
  },
  "Backstage passes to a TAFKAL80ETC concert": (item) => {
    if (item.quality >= MAX_QUALITY) return item.quality;
    if (item.sellIn < MIN_SELLIN) return MIN_QUALITY;
    if (item.sellIn < SELLIN_BACKSTAGE_5)
      return item.quality + 3 > MAX_QUALITY ? MAX_QUALITY : item.quality + 3;
    if (item.sellIn < SELLIN_BACKSTAGE_10)
      return item.quality + 2 > MAX_QUALITY ? MAX_QUALITY : item.quality + 2;
    return item.quality + 1;
  },
  default: (item) => {
    if (item.quality <= MIN_QUALITY) return item.quality;
    newQuality = item.quality - (item.sellIn < MIN_SELLIN ? 2 : 1);
    if (newQuality <= MIN_QUALITY) return MIN_QUALITY;
    return newQuality;
  },
};

module.exports = {
  ITEM_QUALITY_UPDATE_MAPPER,
};
