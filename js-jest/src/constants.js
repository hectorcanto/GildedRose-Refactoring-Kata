// Fixen esta constante polo enunciado: "being a legendary item, never has to be sold or decreases in Quality"
// Da a posibilidade de engadir novos items lexendarios que non se ven modificados.
const LEGENDARY_ITEMS = ["Sulfuras, Hand of Ragnaros"];
const ITEMS = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"];

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const MIN_SELLIN = 0;

// As constantes chamanse 5 e 10, a pesar de que os numeros sexan 6 ou 11 polo enunciado.
// "Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less"
const SELLIN_BACKSTAGE_10 = 11;
const SELLIN_BACKSTAGE_5 = 6;



module.exports = {
  LEGENDARY_ITEMS,
  ITEMS,
  MIN_QUALITY,
  MAX_QUALITY,
  MIN_SELLIN,
  SELLIN_BACKSTAGE_10,
  SELLIN_BACKSTAGE_5,
};
