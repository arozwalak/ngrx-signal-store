import { signalStore, withComputed, withProps, withState } from '@ngrx/signals';
import { initialProductListSlice } from './product-list.slice';
import { buildProductListVm } from './product-list.vm-builder';
import { computed, inject } from '@angular/core';
import { ShopStore } from '../../../store/shop.store';

export const ProductListStore = signalStore(
  withState(initialProductListSlice),
  withProps((store) => ({
    _shopStore: inject(ShopStore),
  })),
  withComputed((store) => ({
    vm: computed(() =>
      buildProductListVm(
        store._shopStore.products(),
        store._shopStore.searchWord(),
        store._shopStore.cartQuantities()
      )
    ),
  }))
);
