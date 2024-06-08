import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-idea-square',
  standalone: true,
  imports: [],
  templateUrl: './idea-square.component.html',
  styleUrl: './idea-square.component.scss'
})
export class IdeaSquareComponent {
  @Input() item: any;

}
