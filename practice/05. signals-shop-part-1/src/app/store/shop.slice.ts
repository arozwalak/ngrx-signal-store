import { ALL_PRODUCTS } from '../data/all-products';
import { Product } from '../models/product.model';

export interface ShopSlice {
  readonly products: Product[];
  readonly searchWord: string;
  readonly cartQuantities: Record<string, number>;
  readonly cartVisible: boolean;
  readonly taxRate: number;
}

export const initialShopSlice: ShopSlice = {
  products: ALL_PRODUCTS,
  searchWord: '',
  cartQuantities: {},
  cartVisible: false,
  taxRate: 0.08,
};

export type PersistedShopSlice = Pick<ShopSlice, 'cartQuantities'>;
