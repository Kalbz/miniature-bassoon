// src/app/components/item-list/item-list.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../item.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(
    private itemService: ItemService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Initial load
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
        console.log('Items:', this.items);

        // Start polling after initial load
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.startPolling();
          }, 0);
        }
      },
      error => {
        this.errorMessage = 'Failed to load items from the backend';
        console.error('Error:', error);
      }
    );
  }

  startPolling(): void {
    interval(5000).pipe( // Poll every 5 seconds
      switchMap(() => this.itemService.getItems())
    ).subscribe({
      next: items => {
        this.items = items;
      },
      error: error => {
        this.errorMessage = 'Failed to load items from the backend';
        console.error('Error:', error);
      }
    });
  }
}
