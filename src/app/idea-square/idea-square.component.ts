import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../item.service';
import { IdeaFormComponent } from '../idea-form/idea-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-idea-square',
  standalone: true,
  templateUrl: './idea-square.component.html',
  styleUrls: ['./idea-square.component.scss'],
  imports: [CommonModule]
})
export class IdeaSquareComponent implements OnInit {
  @Input() item: any;
  @Input() color: string = '#FFFFFF'; // Default to white

  constructor(private itemService: ItemService, public dialog: MatDialog) {}

  ngOnInit() {}

  async upvote() {
    try {
      const observable = await this.itemService.upvoteItem(this.item._id);
      observable.subscribe({
        next: updatedItem => {
          this.item.upvotes = updatedItem.upvotes;
          this.item.downvotes = updatedItem.downvotes;
          this.item.totalVotes = updatedItem.totalVotes;
        },
        error: error => {
          console.error('Error upvoting item:', error);
        }
      });
    } catch (error) {
      console.error('Error getting upvote observable:', error);
    }
  }

  async downvote() {
    try {
      const observable = await this.itemService.downvoteItem(this.item._id);
      observable.subscribe({
        next: updatedItem => {
          this.item.downvotes = updatedItem.downvotes;
          this.item.upvotes = updatedItem.upvotes;
          this.item.totalVotes = updatedItem.totalVotes;
        },
        error: error => {
          console.error('Error downvoting item:', error);
        }
      });
    } catch (error) {
      console.error('Error getting downvote observable:', error);
    }
  }

  edit() {  
    const dialogRef = this.dialog.open(IdeaFormComponent, {
      width: '250px'
    });
  }

}
