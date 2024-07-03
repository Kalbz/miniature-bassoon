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
    const itemId = this.data.itemId;
    if (itemId) {
      this.itemService.getItem(itemId).subscribe(
        data => {
          this.item = data;
        },
        error => {
          console.error('Error retrieving item:', error);
        }
      );

      this.loadComments(itemId);
    } else {
      console.error('Error: itemId is null');
    }
  }

  loadComments(itemId: string): void {
    this.commentService.getComments(itemId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        console.error('Error retrieving comments:', error);
      }
    );
  }

  postComment(): void {
    const newComment: Comment = {
      id: '',
      itemId: this.data.itemId,
      userId: '', // This should be the current user's ID, fetched from the authentication service
      userName: '', // This should be the current user's name, fetched from the authentication service
      content: this.commentForm.value.content,
      timestamp: new Date()
    };

    this.commentService.postComment(newComment).subscribe(
      comment => {
        this.comments.push(comment);
        this.commentForm.reset();
      },
      error => {
        console.error('Error posting comment:', error);
      }
    );
  }

  deleteComment(id: string): void {
    this.commentService.deleteComment(id).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== id);
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
