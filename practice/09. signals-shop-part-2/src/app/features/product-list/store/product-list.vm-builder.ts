import { CartQuantities } from '../../../models/cart-quantities.model';
import { Product } from '../../../models/product.model';
import { ProductListVm } from '../view-model/product-list.vm';

export function buildProductListVm(
  products: Product[],
  searchWord: string,
  quantities: CartQuantities
): ProductListVm {
  return {
    productItems: buildProductItems(),
  };

  function buildProductItems() {
    const word = searchWord.trim().toLowerCase();

    if (!word) return [];

    return products
      .filter((product) => product.name.toLowerCase().includes(word))
      .map((product) => ({
        ...product,
        quantity: quantities[product.id] || 0,
      }));
  }
}
