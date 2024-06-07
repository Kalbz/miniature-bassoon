// src/app/components/idea-form/idea-form.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ItemService } from '../item.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  styleUrls: ['./idea-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatInputModule, MatButtonModule]
})
export class IdeaFormComponent {
  name: string = '';
  description: string = '';
  errorMessage: string = '';

  constructor(
    private itemService: ItemService,
    public dialogRef: MatDialogRef<IdeaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newItem = { name: this.name, description: this.description };
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
