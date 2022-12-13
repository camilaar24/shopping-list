import { Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];
  maxItemId!: number;

  @Output() itemsChangedEvent = new Subject<Item[]>();

  constructor(private http: HttpClient) { 
    this.getItems();
  }
  getItems() {
    this.http.get('http://localhost:3000/api/items').subscribe(
      //success method
      (items: any) => {
        this.items = items.items;
      },
      //error method
      (error: any) => {
        console.log(error);
      });
    }
    getItem(id: string) {
      for (let item of this.items) {
        if (item.id === id) {
          return item
        }
      }
      return null;
    }
    addItem(item: Item) {
      if (!item) {
        return;
      }
  
      // make sure id of the new Item is empty
      item.id = '';
  
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
      // add to database
      this.http.post<{ message: string, item: Item }>('http://localhost:3000/api/items',
        item,
        { headers: headers })
        .subscribe(
          (responseData) => {
            // add new item to items
            this.items.push(responseData.item);
          }
        );
      }
      updateItem(originalItem: Item, newItem: Item) {
        if (!originalItem || !newItem) {
          return;
        }
    
        const pos = this.items.findIndex(d => d.id === originalItem.id);
    
        if (pos < 0) {
          return;
        }
    
        // set the id of the new Item to the id of the old Item
        newItem.id = originalItem.id;
        newItem._id = originalItem._id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/api/items/' + originalItem.id,
          newItem, { headers: headers })
          .subscribe(
            (responseData) => {
              this.items[pos] = newItem;
         
            }
          );
      }
      deleteItem(item: Item) {

        if (!item) {
          return;
        }
    
        const pos = this.items.findIndex(d => d.id === item.id);
    
        if (pos < 0) {
          return;
        }
    
        // delete from database
        this.http.delete('http://localhost:3000/api/items/' + item.id)
          .subscribe(
            (responseData) => {
              this.items.splice(pos, 1);
            }
          );
      }
}
