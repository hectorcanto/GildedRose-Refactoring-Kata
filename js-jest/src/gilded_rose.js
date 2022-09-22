/**
 * Item class is dumb and used as dataclass
 */
class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  setQuality(newQuality){
    this.quality = newQuality
  }

  setSellIn(newSellIn){
    this.SellIn = newSellIn
  }

  upgradeQuality(delta){
    let upgradedQuality = this.quality + delta
    this.setQuality(newQuality)
  }
  
  downgradeQuality(delta){
    let downgradedQuality = this.quality - delta
    this.setQuality(downgradedQuality)
  }
  
  downgradeSellIn(delta){
    let downgradedSellIn = this.sellIn - delta
    this.setQuality(downgradedSellIn)
  }
}


/**
 * Shop class knows about quality and sell in logic
 */
class Shop {

  QUALITY_MIN_BOUND = 0
  QUALITY_MAX_BOUND = 50
  QUALITY_DELTA = 1
  QUALITY_DELTA_DOUBLE = 2
  QUALITY_DELTA_TRIPLE = 3
  SELL_IN_DELTA = 1
  SELL_IN_MIN_BOUND = 0
  SELL_IN_MIDDLE_BOUND = 6
  SELL_IN_MAX_BOUND = 11
  AGED_BRIE = 'Aged Brie'
  BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
  SULFURAS = 'Sulfuras, Hand of Ragnaros'

  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    for (let i = 0; i < this.items.length; i++) {
      let currentItem = this.items[i]
      updateQualityOnItem(currentItem)   
    }

    return this.items;
  }

  updateQualityOnItem(currentItem){

      const isAgedBrie = (currentItem.name == this.AGED_BRIE)
      const isBackstage = (currentItem.name == this.BACKSTAGE)
      const isSulfuras = (currentItem.name == this.SULFURAS)
      
      const hasBadQuality = (currentItem.quality < this.QUALITY_MAX_BOUND)
      const hasGoodQuality = (currentItem.quality  > this.QUALITY_MIN_BOUND)
      const isBelowMaxSellIn = (currentItem.sellIn < this.SELL_IN_MAX_BOUND)
      const isBelowHalfSellIn = (currentItem.sellIn < this.SELL_IN_MIDDLE_BOUND)
      const isBelowMinSellIn = (currentItem.sellIn < this.SELL_IN_MIN_BOUND)


      /**
       * Wicked logic. Don't know how to handle it
       */

      if (!isAgedBrie && !isBackstage) {
        if(hasGoodQuality){
          if (!isSulfuras) {
            currentItem.downgradeQuality(this.QUALITY_DELTA);
          }
        }
      } else {
        if (hasBadQuality) {
          currentItem.upgradeQuality(this.QUALITY_DELTA)
          if (isBackstage) {
            if (isBelowMaxSellIn) {
              if (hasBadQuality) {
                currentItem.upgradeQuality(this.QUALITY_DELTA)
              }
            }
            if (isBelowHalfSellIn) {
              if (hasBadQuality) {
                currentItem.upgradeQuality(this.QUALITY_DELTA)
              }
            }
          }
        }
      }

      if (!isSulfuras) {
        currentItem.downgradeSellIn(this.SELL_IN_DELTA)
      }

      if (isBelowMinSellIn) {
        if (!isAgedBrie) {
          if (!isBackstage) {
            if (hasGoodQuality) {
              if (!isSulfuras) {
                currentItem.downgradeQuality(this.QUALITY_DELTA);
              }
            }
          } else {
            currentItem.downgradeQuality(currentItem.quality);
          }
        } else {
          if (hasBadQuality) {
            currentItem.upgradeQuality(this.QUALITY_DELTA)
          }
        }
      }
  }
}

module.exports = {
  Item,
  Shop
}
