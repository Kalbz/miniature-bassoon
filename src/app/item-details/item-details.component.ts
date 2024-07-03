import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from '../item.service';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class ItemDetailsComponent implements OnInit {
  item: any;
  comments: Comment[] = [];
  commentForm: FormGroup;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    public dialogRef: MatDialogRef<ItemDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commentForm = this.fb.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    console.log('Initializing ItemDetailsComponent with data:', this.data);
    const itemId = this.data.itemId;
    if (itemId) {
      this.loadItem(itemId);
      this.loadComments(itemId);
    } else {
      console.error('Error: itemId is null');
    }
  }

  loadItem(itemId: string): void {
    this.itemService.getItem(itemId).subscribe(
      data => {
        this.item = data;
        console.log('Loaded item:', this.item);
      },
      error => {
        console.error('Error retrieving item:', error);
      }
    );
  }

  loadComments(itemId: string): void {
    this.commentService.getComments(itemId).subscribe(
      comments => {
        this.comments = comments;
        console.log('Loaded comments:', this.comments);
      },
      error => {
        console.error('Error retrieving comments:', error);
      }
    );
  }

  postComment(): void {
    const content = this.commentForm.value.content;
    const user: UserInterface | null = this.authService.getUser();
    if (user) {
      const newComment: Comment = {
        id: '',
        itemId: this.data.itemId,
        userId: user.id,
        userName: user.username,
        content: content,
        timestamp: new Date()
      };
      console.log('Posting comment:', newComment); // Add log
      this.commentService.postComment(newComment).subscribe(
        comment => {
          this.comments.push(comment);
          this.commentForm.reset();
          console.log('Posted comment:', comment); // Add log
        },
        error => {
          console.error('Error posting comment:', error);
        }
      );
    } else {
      console.error('User not logged in');
    }
  }
  

  deleteComment(id: string): void {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== id);
        console.log('Deleted comment with id:', id);
      },
      error => {
        console.error('Error deleting comment:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
    this.router.navigate(['/']); // Navigate back to the main page
  }
}
