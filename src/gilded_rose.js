class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.isSellIn = true;
    this.isConjured = false;
    this.isLegendary = false;
    this.isQualityIncrease = false;
  }

}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  getState(item) {
    if (item.sellIn <= 0) {
      item.isSellIn = false
    }
    if (item.name.includes("Sulfuras")) {
      item.isLegendary = true
      item.isSellIn = true
    }

    if (item.name.includes("Conjured")) {
      item.isConjured = true
    }

    if (item.name.includes("Aged Brie") || item.name.includes("Backstage passes")) {
      item.isQualityIncrease = true
    }

  }

  getNewQualityItem(item) {
    if (item.name.includes("Aged Brie")) {
      item.quality++
      item.sellIn--
      if (item.quality > 50) {
        item.quality = 50
      }
    }

    if (item.name.includes("Backstage passes")) {
      if (item.sellIn > 10) {
        item.quality++
        item.sellIn--
        if (item.quality > 50) {
          item.quality = 50
        }
      }

      if (item.sellIn > 5 && item.sellIn <= 10) {
        item.quality = item.quality + 2
        item.sellIn--
        if (item.quality > 50) {
          item.quality = 50
        }
      }
      if (item.sellIn <= 5) {
        item.quality = item.quality + 3
        item.sellIn--
        if (item.quality > 50) {
          item.quality = 50
        }
      }
      if (item.sellIn <= 0) {
        item.quality = 0
      }
    }

    if (item.isLegendary) {
      item.quality = 80
      item.sellIn--
    }
    if (item.isConjured) {
      item.quality = item.quality - 2
      item.sellIn--
      if (item.quality < 0) {
        item.quality = 0
      }
    }
    if (!item.isConjured && !item.isLegendary && !item.isQualityIncrease) {
      if (item.isSellIn) {
        item.quality--
        item.sellIn--
        if (item.quality < 0) {
          item.quality = 0
        }
      }
      if (!item.isSellIn) {
        item.quality = item.quality - 2
        item.sellIn--
        if (item.quality < 0) {
          item.quality = 0
        }
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      this.getState(item)
      this.getNewQualityItem(item)
    })

    return this.items

  }
}
module.exports = {
  Item,
  Shop
}
