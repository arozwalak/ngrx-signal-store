import { computed, Signal } from '@angular/core';
import {
  signalStoreFeature,
  SignalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';
import { BusySlice, initialBusySlice } from './with-busy.slice';

export function withBusy(): SignalStoreFeature<
  {
    state: {};
    props: {};
    methods: {};
  },
  {
    state: BusySlice;
    props: {
      isIdle: Signal<boolean>;
    };
    methods: {};
  }
>;

export function withBusy(): SignalStoreFeature {
  return signalStoreFeature(
    withState(initialBusySlice),
    withComputed((store) => ({
      isIdle: computed(() => !store.isBusy),
    }))
  );
}
