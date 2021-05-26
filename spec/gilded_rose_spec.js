var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  //-------------------------MyTests--------------------------------//

  it("Augmente la qualité par 3 quand il reste 5 jours ou moins pour Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 5, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 31 },
      { sellIn: 4, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité de Sulfuras ne se modifie pas", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 5, 80));
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 80 },
      { sellIn: -1, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("Augmente la qualité par 1 quand il reste plus 10 jours pour Backstage passes", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 12, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 8, quality: 32 },
      { sellIn: 11, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("Augmente la qualité par 2 quand il reste 10 jours ou moins pour Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 9, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 8, quality: 31 },
      { sellIn: 8, quality: 32 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité tombe à zéro aprés le concert pour Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 0, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 31 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("Baisser de 2 la qualité d'item Conjured", function () {
    listItems.push(new Item("Conjured Dark Blade", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 18 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("Baisser de 2 la qualité d'items normaux aprés la date de péremption", function () {
    listItems.push(new Item("+5 Dexterity Vest", 1, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 0, quality: 19 },
      { sellIn: -1, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);

    });
  });

  it("La qualité ne peut jamais être négative", function () {
    listItems.push(new Item("Conjured Dark Blade", 10, 1));
    listItems.push(new Item("Mana Cake", -2, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: -3, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

  it("La qualité ne peut jamais augmente plus que 50", function () {
    listItems.push(new Item("Aged Brie", 10, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 3, quality: 50 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  })

});