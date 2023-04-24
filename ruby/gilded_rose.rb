class GildedRose

  def initialize(items)
    @items = items
  end

  def update_quality()
    @items.each do |item|
      item.update_quality
    end
  end

  # This is legacy code and will be eventually removed, but for now we're
  # keeping it so that we can run unit tests comparing old and new behaviour.
  def update_quality__legacy()
    @items.each do |item|
      if item.name != "Aged Brie" and item.name != "Backstage passes to a TAFKAL80ETC concert"
        if item.quality > 0
          if item.name != "Sulfuras, Hand of Ragnaros"
            item.quality = item.quality - 1
          end
        end
      else
        if item.quality < 50
          item.quality = item.quality + 1
          if item.name == "Backstage passes to a TAFKAL80ETC concert"
            if item.sell_in < 11
              if item.quality < 50
                item.quality = item.quality + 1
              end
            end
            if item.sell_in < 6
              if item.quality < 50
                item.quality = item.quality + 1
              end
            end
          end
        end
      end
      if item.name != "Sulfuras, Hand of Ragnaros"
        item.sell_in = item.sell_in - 1
      end
      if item.sell_in < 0
        if item.name != "Aged Brie"
          if item.name != "Backstage passes to a TAFKAL80ETC concert"
            if item.quality > 0
              if item.name != "Sulfuras, Hand of Ragnaros"
                item.quality = item.quality - 1
              end
            end
          else
            item.quality = item.quality - item.quality
          end
        else
          if item.quality < 50
            item.quality = item.quality + 1
          end
        end
      end
    end
  end
end

class Item
  attr_accessor :name, :sell_in, :quality

  def initialize(name, sell_in, quality)
    @name = name
    @sell_in = sell_in
    @quality = quality
  end

  def to_s()
    "#{@name}, #{@sell_in}, #{@quality}"
  end

  # Hope the goblins don't mind, it's *so* useful for some unit test assertions
  def ==(other)
    @quality == other.quality and @sell_in == other.sell_in
  end

  def update_quality
    @quality = @quality + daily_quality_delta
    @sell_in = @sell_in + daily_sell_in_delta
  end
end


class NormalItem < Item
  def initialize(name, sell_in, quality)
    super name, sell_in, quality
    @min_quality = 0
    @max_quality = 50
  end

  def daily_quality_delta()
    if @sell_in <= 0
      -2 # "Once the sell by date has passed, Quality degrades twice as fast"
    else
      -1
    end
  end

  def daily_sell_in_delta()
    -1
  end

  def update_quality
    super
    @quality = [ @max_quality, [ @min_quality, @quality ].max ].min
  end
end

class AgedItem < NormalItem
  def daily_quality_delta()
    if @sell_in <= 0
      2 # Once the sell by date has passed, Quality *increases* twice as fast?
    else
      1 # "actually increases in Quality the older it gets"
    end
  end
end

class BackstagePass < NormalItem
  def daily_quality_delta()
    if @sell_in <= 0
      -@max_quality # "Quality drops to 0 after the concert"
    elsif @sell_in <= 5
      3 # "Quality increases by 3 when there are 5 days or less"
    elsif @sell_in <= 10
      2 # "Quality increases by 2 when there are 10 days or less"
    else
      1
    end
  end
end

class LegendaryItem < NormalItem
  def initialize(name, sell_in, quality)
    super name, sell_in, quality
    @max_quality = 80
  end

  def daily_quality_delta()
    0 # "its Quality is 80 and it never alters"
  end

  def daily_sell_in_delta()
    0 # "never has to be sold or decreases in Quality"
  end
end

class ConjuredItem < NormalItem
  def daily_quality_delta()
    2 * super # "degrade in Quality twice as fast as normal items"
  end
end
