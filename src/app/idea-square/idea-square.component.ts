import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../item.service';

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

  constructor(private itemService: ItemService) {}

  ngOnInit() {}

  upvote() {
    this.itemService.upvoteItem(this.item._id).subscribe(updatedItem => {
      this.item.upvotes = updatedItem.upvotes;
    });
  }

  downvote() {
    this.itemService.downvoteItem(this.item._id).subscribe(updatedItem => {
      this.item.upvotes = updatedItem.upvotes;
    });
  }
}
