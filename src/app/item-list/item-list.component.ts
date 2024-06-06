// src/app/components/item-list/item-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [ItemService]
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  errorMessage: string = '';

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
        console.log('Items:', this.items);
      },
      error => {
        this.errorMessage = 'Failed to load items from the backend';
        console.error('Error:', error);
      }
    );
  }

  addItem(name: string, description: string): void {
    const newItem = { name, description };
    this.itemService.createItem(newItem).subscribe(
      item => {
        this.items.push(item);
        console.log('Added item:', item);
      },
      error => {
        this.errorMessage = 'Failed to add item';
        console.error('Error:', error);
      }
    );
  }
}
