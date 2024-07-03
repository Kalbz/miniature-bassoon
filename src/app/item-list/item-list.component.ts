import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from '../item.service';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { IdeaSquareComponent } from '../idea-square/idea-square.component';
import { MatDialog } from '@angular/material/dialog';  // Import MatDialog
import { ItemDetailsComponent } from '../item-details/item-details.component'; // Import ItemDetailsComponent

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IdeaSquareComponent, HttpClientModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [ItemService]
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  errorMessage: string = '';
  itemColors = new Map<string, string>(); // Map to store random colors for items

  constructor(
    private itemService: ItemService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    // Initial load
    this.itemService.getItems().subscribe(
      data => {
        this.items = data;
        this.assignColors(); // Assign colors on initial load
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
        this.assignColors(); // Reassign colors if new items are added
      },
      error: error => {
        this.errorMessage = 'Failed to load items from the backend';
        console.error('Error:', error);
      }
    });
  }

  assignColors(): void {
    this.items.forEach(item => {
      if (!this.itemColors.has(item._id)) {
        this.itemColors.set(item._id, this.getRandomColor());
      }
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getItemColor(itemId: string): string {
    return this.itemColors.get(itemId) || '#FFFFFF'; // Default to white if no color found
  }

  kek(itemId: string): void {
    const dialogRef = this.dialog.open(ItemDetailsComponent, {
      width: '80%',
      height: '80%',
      data: { itemId }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }
}
