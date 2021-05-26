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

  getState() {
    if (this.sellIn <= 0) {
      this.isSellIn = false
    }
    if (this.name.includes("Sulfuras")) {
      this.isLegendary = true
      this.isSellIn = true
    }

    if (this.name.includes("Conjured")) {
      this.isConjured = true
    }

    if (this.name.includes("Aged Brie") || this.name.includes("Backstage passes")) {
      this.isQualityIncrease = true
    }

  }

  getNewQualityItem() {
    if (this.name.includes("Aged Brie")) {
      this.quality++
      this.sellIn--
      if (this.quality > 50) {
        this.quality = 50
      }
    }

    if (this.name.includes("Backstage passes")) {
      if (this.sellIn > 10) {
        this.quality++
        this.sellIn--
        if (this.quality > 50) {
          this.quality = 50
        }
      }

      if (this.sellIn > 5 && this.sellIn <= 10) {
        this.quality = this.quality + 2
        this.sellIn--
        if (this.quality > 50) {
          this.quality = 50
        }
      }
      if (this.sellIn <= 5) {
        this.quality = this.quality + 3
        this.sellIn--
        if (this.quality > 50) {
          this.quality = 50
        }
      }
      if (this.sellIn <= 0) {
        this.quality = 0
      }
    }

    if (this.isLegendary) {
      this.quality = 80
      this.sellIn--
    }
    if (this.isConjured) {
      this.quality = this.quality - 2
      this.sellIn--
      if (this.quality < 0) {
        this.quality = 0
      }
    }
    if (!this.isConjured && !this.isLegendary && !this.isQualityIncrease) {
      if (this.isSellIn) {
        this.quality--
        this.sellIn--
        if (this.quality < 0) {
          this.quality = 0
        }
      }
      if (!this.isSellIn) {
        this.quality = this.quality - 2
        this.sellIn--
        if (this.quality < 0) {
          this.quality = 0
        }
      }
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      item.getState()
      item.getNewQualityItem()
    })

    return this.items

  }
}
module.exports = {
  Item,
  Shop
}


// const item = new Item(name = "aged Brie", sellIn = 0, quality = 48)
// item.getState()
// item.getNewQualityItem()
// console.log(item)