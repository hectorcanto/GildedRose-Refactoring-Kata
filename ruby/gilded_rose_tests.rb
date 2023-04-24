require File.join(File.dirname(__FILE__), 'gilded_rose')
require 'test/unit'

class TestUntitled < Test::Unit::TestCase

  def test_foo
    item = NormalItem.new("foo", 0, 0)
    gilded_rose = GildedRose.new [item]

    gilded_rose.update_quality()
    assert_equal -1, item.sell_in
    assert_equal 0, item.quality

    gilded_rose.update_quality()
    assert_equal -2, item.sell_in
    assert_equal 0, item.quality
  end

  def test_normal_item
    item = NormalItem.new(name="+5 Dexterity Vest", sell_in=10, quality=20)
    gilded_rose = GildedRose.new [item]

    gilded_rose.update_quality()
    assert_equal 9, item.sell_in
    assert_equal 19, item.quality

    gilded_rose.update_quality()
    assert_equal 8, item.sell_in
    assert_equal 18, item.quality
  end

  def test_aged_item
    item = AgedItem.new(name="Aged Brie", sell_in=2, quality=0)
    gilded_rose = GildedRose.new [item]

    gilded_rose.update_quality()
    assert_equal 1, item.sell_in
    assert_equal 1, item.quality

    gilded_rose.update_quality()
    assert_equal 0, item.sell_in
    assert_equal 2, item.quality

    gilded_rose.update_quality()
    assert_equal -1, item.sell_in
    assert_equal 4, item.quality
  end

  def test_conjured_item
    item = ConjuredItem.new(name="Conjured Mana Cake", sell_in=3, quality=6)
    gilded_rose = GildedRose.new [item]

    gilded_rose.update_quality()
    assert_equal 2, item.sell_in
    assert_equal 4, item.quality

    gilded_rose.update_quality()
    assert_equal 1, item.sell_in
    assert_equal 2, item.quality

    gilded_rose.update_quality()
    assert_equal 0, item.sell_in
    assert_equal 0, item.quality

    gilded_rose.update_quality()
    assert_equal -1, item.sell_in
    assert_equal 0, item.quality

    gilded_rose.update_quality()
    assert_equal -2, item.sell_in
    assert_equal 0, item.quality
  end

  # This is not really a *unit* test, but it's a very useful test to
  # quickly verify the new code works just like the old code by reusing
  # the contents of texttest_fixture.rb, before I have time to go full TDD
  # and create tens of unit tests with all possible scenarios.
  def test_legacy_comparison
    items = [
      NormalItem.new(name="+5 Dexterity Vest", sell_in=10, quality=20),
      AgedItem.new(name="Aged Brie", sell_in=2, quality=0),
      NormalItem.new(name="Elixir of the Mongoose", sell_in=5, quality=7),
      LegendaryItem.new(name="Sulfuras, Hand of Ragnaros", sell_in=0, quality=80),
      LegendaryItem.new(name="Sulfuras, Hand of Ragnaros", sell_in=-1, quality=80),
      BackstagePass.new(name="Backstage passes to a TAFKAL80ETC concert", sell_in=15, quality=20),
      BackstagePass.new(name="Backstage passes to a TAFKAL80ETC concert", sell_in=10, quality=49),
      BackstagePass.new(name="Backstage passes to a TAFKAL80ETC concert", sell_in=5, quality=49),
    ]
    gilded_rose = GildedRose.new items

    items_legacy = Marshal.load(Marshal.dump(items)) # Couldn't find a cleaner way to deep-copy an array
    gilded_rose_legacy = GildedRose.new items_legacy

    days = 999
    (0...days).each do
      gilded_rose_legacy.update_quality__legacy
      gilded_rose.update_quality

      items.each_with_index do |item, i|
        assert_equal items_legacy[i], items[i]
      end
    end
  end
end