import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-square',
  standalone: true,
  templateUrl: './idea-square.component.html',
  styleUrls: ['./idea-square.component.scss'],
  imports: [CommonModule]
})
export class IdeaSquareComponent {
  @Input() item: any;
}
