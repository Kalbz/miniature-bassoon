import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../item.service';
import { IdeaFormComponent } from '../idea-form/idea-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

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
  currentUser: any; // Variable to store the current user
  editMode: boolean = false;

  

  constructor(
    private itemService: ItemService, 
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.compareUser();
  }

  compareUser() {
    if (this.currentUser && this.currentUser.id === this.item.creator) {
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

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
      width: '250px',
      data: { item: this.item },
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.item = result;
      }
    });
  }

  delete() {
    this.itemService.deleteItem(this.item._id).subscribe({
      next: () => {
        console.log('Item deleted');
      },
      error: error => {
        console.error('Error deleting item:', error);
      }
    });
  }


}
