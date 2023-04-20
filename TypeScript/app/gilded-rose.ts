export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export interface ContractItem{
  updateQuality();
  changeNumberDaysToSellItem();
  changeQuality();
}

export class NormalItem extends Item implements ContractItem{
  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
  }
  updateQuality(){
    this.changeQuality();
    this.changeNumberDaysToSellItem();
  }
  changeNumberDaysToSellItem(){
    this.sellIn -=1;
    if(this.sellIn < 0){
      this.changeQuality();
    }
  }
  changeQuality(){
    if(this.quality > 0){
      this.quality -=1;
    }
  }
}

export class AgedBrie extends Item implements ContractItem{
  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
  }
  updateQuality(){
    this.changeQuality();
    this.changeNumberDaysToSellItem();
  }
  changeNumberDaysToSellItem() {
    this.sellIn -=1;
    if(this.sellIn < 0){
      this.changeQuality();
    }
  }
  changeQuality() {
    if(this.quality < 50){
      this.quality += 1;
    }
  }
}

export class Backstage extends Item implements ContractItem{
  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
  }
  updateQuality(){
    this.changeQuality();
    this.changeNumberDaysToSellItem();
  }
  changeNumberDaysToSellItem() {
    if(this.sellIn < 11){
      this.changeQuality();
    }
    if(this.sellIn < 6){
      this.changeQuality();
    }
    this.sellIn -= 1;
    if(this.sellIn < 0){
      this.degradeQuality();
    }
  }
  changeQuality() {
    if(this.quality < 50){
      this.quality += 1;
    }
  }
  private degradeQuality(){
    this.quality -= this.quality;
  }
}

export class Sulfuras extends Item implements ContractItem{
  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
  }
  updateQuality(){

  }
  changeNumberDaysToSellItem() {

  }
  changeQuality() {

  }
}

export class Conjured extends Item implements ContractItem{
  constructor(name, sellIn, quality){
    super(name,sellIn,quality);
  }
  updateQuality(){
    this.changeQuality();
    this.changeNumberDaysToSellItem();
  }
  changeNumberDaysToSellItem() {
    this.sellIn -=1;
    if(this.sellIn < 0){
      this.changeQuality();
    }
  }
  changeQuality() {
    if(this.quality > 0){
      this.quality -=2;
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private factoryItem(item:Item){
    let itemResult:NormalItem;
    switch(item.name){
      case 'Aged Brie':
        itemResult = new AgedBrie(item.name,item.sellIn,item.quality);
      break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        itemResult = new Backstage(item.name,item.sellIn,item.quality);
      break;
      case 'Sulfuras, Hand of Ragnaros':
        itemResult = new Sulfuras(item.name,item.sellIn,item.quality);
      break;
      case 'Conjured Mana Cake':
        itemResult = new Conjured(item.name,item.sellIn,item.quality);
      break;
      default:
        itemResult = new NormalItem(item.name,item.sellIn,item.quality);
      break;
    }
    return itemResult;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.factoryItem(this.items[i]);
      item.updateQuality();
      this.items[i] = item;
    }
    return this.items;
  }
}
