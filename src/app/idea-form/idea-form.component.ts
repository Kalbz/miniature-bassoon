import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ItemService } from '../item.service';
import { Category } from '../categories.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule, ColorPickerModule]
})
export class IdeaFormComponent implements OnInit {
  name: string = '';
  description: string = '';
  categories: string[] = [];
  emoji: string = '';
  errorMessage: string = '';
  color: string = '#ffffff'; // Default color

  availableCategories: Category[] = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Education' }
    // Add more categories as needed
  ];

  constructor(
    private itemService: ItemService,
    public dialogRef: MatDialogRef<IdeaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.item) {
      this.name = this.data.item.name;
      this.description = this.data.item.description;
      this.categories = this.data.item.categories;
      this.emoji = this.data.item.emoji;
      this.color = this.data.item.color;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newItem = {
      id: this.data?.item?._id, // Ensure the id is correctly set here
      name: this.name,
      description: this.description,
      upvotes: this.data?.item?.upvotes || 0,
      categories: this.categories,
      emoji: this.emoji,
      color: this.color,
    };

    if (this.data && this.data.item) {
      this.updateItem(newItem);
    } else {
      this.createItem(newItem);
    }
  }

  private createItem(item: any): void {
    this.itemService.createItem(item).subscribe({
      next: item => {
        console.log('Added item:', item);
        this.dialogRef.close(item);
      },
      error: error => {
        this.errorMessage = 'Failed to add item';
        console.error('Error:', error);
      }
    });
  }

  private updateItem(item: any): void {
    this.itemService.updateItem(item).subscribe({
      next: updatedItem => {
        console.log('Updated item:', updatedItem);
        this.dialogRef.close(updatedItem);
      },
      error: error => {
        this.errorMessage = 'Failed to update item';
        console.error('Error:', error);
      }
    });
  }
}
