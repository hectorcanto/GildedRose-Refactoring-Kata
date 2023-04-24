import { Item } from './item';


const MINIMUM_QUALITY = 0
const MAXIMUM_QUALITY = 50
const SULFURAS_QUALITY = 80

export enum ItemType {
  AgedBrie = 'Aged Brie',
  BackstagePass = 'Backstage pass',
  Sulfuras = 'Sulfuras',
  Conjured = 'Conjured'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Array<Item> {
    this.items.forEach(item => {
      item = this.decreaseItemSellin(item)
      switch (item.name) {
        case ItemType.AgedBrie:
          item = this.updateAgedBrieQuality(item)
          break
        case ItemType.BackstagePass:
          item = this.updateBackstagePassQuality(item)
          break
        case ItemType.Sulfuras:
          item = this.updateSulfurasQuality(item)
          break
        case ItemType.Conjured:
          item = this.updateConjuredItemQuality(item)
          break
        default:
          item = this.updateRegularItemQuality(item)
      }

    })
    return this.items
  }

  private updateAgedBrieQuality(item): Item {
    let increaseAmount!: number;
    item.sellIn < 0 ? increaseAmount = 2 : increaseAmount = 1;
    item.quality = this.increaseQuality(item, increaseAmount)
    return item
  }

  private updateBackstagePassQuality(item): Item {

    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      let increaseAmount!: number;
      if (item.sellIn >= 10) {
        increaseAmount = 1;
      } else if (item.sellIn < 5) {
        increaseAmount = 3;
      } else {
        increaseAmount = 2;
      }
      item.quality = this.increaseQuality(item, increaseAmount)
    }
    return item
  }

  private updateSulfurasQuality(item): Item {
    item.quality = SULFURAS_QUALITY
    return item
  }

  private updateConjuredItemQuality(item): Item {
    let decreaseAmount: number;
    if(item.sellIn === 4) {
      decreaseAmount = 3
    } else {
      item.sellIn < 0 ? decreaseAmount = 4 : decreaseAmount = 2;7
    }
    item.quality = this.decreaseQuality(item, decreaseAmount)
    return item
  }

  private updateRegularItemQuality(item): Item {
    let decreaseAmount: number;
    item.sellIn < 0 ? decreaseAmount = 2 : decreaseAmount = 1;
    item.quality = this.decreaseQuality(item, decreaseAmount)
    return item
  }

  private decreaseItemSellin(item): Item {
    // item.sellIn > 1 ? item.sellIn -- : null;
    item.sellIn--;
    return item;
  }

  private increaseQuality(item: Item, value: number = 1): number {
    item.quality += value
    this.isAboveMaximum(item.quality) ? item.quality = MAXIMUM_QUALITY : item.quality
    return item.quality
  }

  private decreaseQuality(item: Item, value: number = 1): number {
    item.quality -= value
    this.isBelowMinimum(item.quality) ? item.quality = MINIMUM_QUALITY : item.quality
    return item.quality
  }
  private isBelowMinimum = (quality: number): Boolean => quality < MINIMUM_QUALITY
  private isAboveMaximum = (quality: number): Boolean => quality > MAXIMUM_QUALITY





}
