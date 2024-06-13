import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-idea-square',
  standalone: true,
  templateUrl: './idea-square.component.html',
  styleUrls: ['./idea-square.component.scss'],
  imports: [CommonModule]
})
export class IdeaSquareComponent implements OnInit {
  @Input() item: any;
  randomColor: string;

  constructor() {
    this.randomColor = this.getRandomColor();
  }

  ngOnInit() {
    this.randomColor = this.getRandomColor();
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
