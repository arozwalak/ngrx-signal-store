import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ShopStore } from '../../store/shop.store';

@Component({
  selector: 'app-toolbar',
  imports: [SharedModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  host: {
    '(keydown.enter)': 'onEnter()',
  },
})
export class ToolbarComponent {
  readonly store = inject(ShopStore);
}
