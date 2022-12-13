import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [ItemService]
})
export class ItemsComponent implements OnInit {
  items!: Item [];
  item!: Item;
  name!: string;
  category!: string;
  quantity!: string;
  private subscription!: Subscription;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.subscription = this.itemService.itemsChangedEvent
    .subscribe(
      (item: Item[]) => {
        this.items = item;
      }
    )
  }
}
