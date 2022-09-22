const QUALITY_MIN_BOUND = 0
const QUALITY_MAX_BOUND = 50
const QUALITY_DELTA = 1
const QUALITY_DELTA_DOUBLE = 2
const QUALITY_DELTA_TRIPLE = 3

const SELL_IN_MIN_BOUND = 0
const SELL_IN_MIDDLE_BOUND = 6
const SELL_IN_MAX_BOUND = 11

const AGED_BRIE = 'Aged Brie'
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
const SULFURAS = 'Sulfuras, Hand of Ragnaros'

/**
 * Base class for item products.
 * Its methods implement logic for common cases
 * 
 * Then, subclasses implement their own behaviour when their
 * state changes
 */

class Item {
  
  constructor(name, sellIn, quality){
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
  
  updateQuality() {
    // Code
  }
  
  updateSellInDay() {
    // Code
  }
}

class AgedBrie extends Item{
  constructor(sellIn, quality) {
    super(AGED_BRIE, sellIn, quality)
  }

  // Overrides parent if applicable following requirements
  updateQuality() {
    // Code
  }
  
  // Overrides parent if applicable following requirements
  updateSellInDay() {
    // Code
  }
}

class Backstage extends Item{
  constructor(sellIn, quality) {
    super(BACKSTAGE, sellIn, quality)
  }

  // Overrides parent if applicable following requirements
  updateQuality() {
    // Code
  }
  
  // Overrides parent if applicable following requirements
  updateSellInDay() {
    // Code
  }
}

class Sulfuras extends Item {
  constructor() {
    super(SULFURAS, sellIn, quality)
  }

  // Overrides parent if applicable following requirements
  updateQuality() {
    // Code
  }
  
  // Overrides parent if applicable following requirements
  updateSellInDay() {
    // Code
  }
}

/**
 * Shop class contains a collection of items.
 * Casts every item to proper type.
 * Executes shop logic dispatching an update on items state
 */
class Shop {

  constructor(items=[]){
    this.items = items.map(item => this.castToType(item));
  }

  castToType(item) {
    if (item.name == AGED_BRIE) return new AgedBrie(item.sellIn, item.quality)
    if (item.name == BACKSTAGE) return new Backstage(item.sellIn, item.quality)
    if (item.name == SULFURAS) return new Sulfuras(item.sellIn, item.quality)
    return new Item(item.name, item.sellIn, item.quality)
  }

  updateQuality() {
    return this.items.forEach(currentItem => {
      currentItem.updateQuality()
      currentItem.updateSellInDay()
    })
  }
}

module.exports = {
  Item,
  Shop
}
