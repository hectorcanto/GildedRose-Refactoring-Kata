import { GildedRose, ItemType } from '@/gilded-rose';
import { Item } from '@/item';
import { before } from 'mocha';

// Basic stuff

describe('Given a Gilded Rose Class', () => {
  describe('When I instantiate a new Gilded Rose', () => {
    const gildedRose = new GildedRose();
    it('Then it should be defined', () => {
      expect(gildedRose).toBeDefined();
    });
  });
});

describe('Given a new Gilded Rose', () => {
  describe('When I check the Items parameter', () => {
    const gildedRose = new GildedRose();
    it('Then it should empty', () => {
      expect(gildedRose.items).toEqual([]);
    });
  });
});

describe('Given a Gilded Rose without Items', () => {
  describe('When I add a Item', () => {
    const gildedRose = new GildedRose();
    const item = new Item('foo', 0, 0);
    gildedRose.items.push(item);
    it('Then it should contain the added Item', () => {
      expect(gildedRose.items[0]).toBe(item);
    });
  });
});

// Regular items

describe('Given quality rules for regular items', () => {
  describe('When update quality for an item with an expiration date (SellIn) of 1 day and a quality of 1', () => {
    it('then its quality should be 0 an it sellIn should be 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(0);
      expect(added.sellIn).toEqual(0);
    });
  });

  describe('When update quality for an item with an expiration date (SellIn) of 0 days and a quality of 4', () => {
    it('Then its quality should decrease 2x as fast being 2 and sellin -1 days', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 4)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(2);
      expect(added.sellIn).toEqual(-1);
    });
  });

  describe('When update quality for an item with an expiration date (SellIn) of 0 days and a quality of 1', () => {
    it('Then its quality should never go below 0', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(0);
      expect(added.sellIn).toEqual(-1);
    });
  });
});

// Aged Brie

describe('Given quality rules for aged brie', () => {
  describe('When update quality for an item with an expiration date (SellIn) of 1 day and a quality of 1', () => {
    it('Then quality of Aged Brie goes up an sellin goes down', () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 1, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(2);
      expect(added.sellIn).toEqual(0);
    });
  });

  describe('When increasing the quality updating an item with a quality of 50', () => {
    it('Then quality should never go above 50', () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, 1, 50)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(50);
      expect(added.sellIn).toEqual(0);
    });
  });
  describe('When the sellin parameter fall below -10', () => {
    it('Then Quality should increase by 2', () => {
      const gildedRose = new GildedRose([new Item(ItemType.AgedBrie, -10, 10)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(12);
      expect(added.sellIn).toEqual(-11);
    });
  });
})

describe('Given sulfuras quality rules', () => {
  describe('When update quality for a sulfuras item ', () => {
    it('Then quality for sulfuras should not decrease', () => {
      const gildedRose = new GildedRose([new Item(ItemType.Sulfuras, 1, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(80);
      expect(added.sellIn).toEqual(0);
    });
  })
})

describe('Given backstage pass quality rules', () => {
  describe('When more than 10 days remaining', () => {
    it('Then quality of backstage passes should increase by 1', () => {
      const gildedRose = new GildedRose([new Item(ItemType.BackstagePass, 11, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(2);
      expect(added.sellIn).toEqual(10);
    });
  })
  describe('When more than 5 days remaining', () => {
    it('Then quality of backstage passes should increase  by 2', () => {
      const gildedRose = new GildedRose([new Item(ItemType.BackstagePass, 6, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(3);
      expect(added.sellIn).toEqual(5);
    });
  });
  describe('When there are 5 days remaining', () => {
    it('Then quality of backstage passes should increase by 3', () => {
      const gildedRose = new GildedRose([new Item(ItemType.BackstagePass, 3, 1)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(4);
      expect(added.sellIn).toEqual(2);
    });
  });
  describe('When the concert ended', () => {
    it('Then quality of backstage passes should set to 0', () => {
      const gildedRose = new GildedRose([new Item(ItemType.BackstagePass, 0, 10)]);
      const items = gildedRose.updateQuality();
      const added = items[0]
      expect(added.quality).toEqual(0);
      expect(added.sellIn).toEqual(-1);
    });
  });
})

describe('Given conjured items', () => {
  describe('When update quality for conjured sellin 1 day', () => {
  it('Then should update quality and sellin ', () => {
    const gildedRose = new GildedRose([new Item(ItemType.Conjured, 1, 2)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(0);
  });
});

describe('When update quality for conjured with sellin=0', () => {
  it('Then should update conjured quality 4x as fast', () => {
    const gildedRose = new GildedRose([new Item(ItemType.Conjured, 0, 4)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(-1);
  });
});

describe('When decrease quality for conjured with quality of 0', () => {
  it('Then conjured item quality should never go below 0', () => {
    const gildedRose = new GildedRose([new Item(ItemType.Conjured, 0, 1)]);
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toEqual(0);
    expect(added.sellIn).toEqual(-1);
  });
});

describe('When update quality for conjured with 5 days left', () => {
  it('Then should lower quality by 3', () => {
    const gildedRose = new GildedRose([new Item(ItemType.Conjured, 5, 6)])
    const items = gildedRose.updateQuality();
    const added = items[0]
    expect(added.quality).toEqual(3);
    expect(added.sellIn).toEqual(4);
  })
})
})
