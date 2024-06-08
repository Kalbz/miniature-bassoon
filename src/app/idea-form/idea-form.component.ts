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

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule, MatSelectModule]
})
export class IdeaFormComponent implements OnInit {
  name: string = '';
  description: string = '';
  categories: string[] = [];
  imageUrl: string = '';
  emoji: string = '';
  errorMessage: string = '';

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

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newItem = {
      name: this.name,
      description: this.description,
      upvotes: 0,
      categories: this.categories,
      emoji: this.emoji
    };
    console.log('New item:', newItem);
    this.itemService.createItem(newItem).subscribe({
      next: item => {
        console.log('Added item:', item);
        this.dialogRef.close(item);
        this.itemService.getItems().subscribe({
          next: items => {
            console.log('Items:', items);
          },
          error: error => {
            this.errorMessage = 'Failed to load items from the backend';
            console.error('Error:', error);
          }
        });
      },
      error: error => {
        this.errorMessage = 'Failed to add item';
        console.error('Error:', error);
      }
    });
  }
}
