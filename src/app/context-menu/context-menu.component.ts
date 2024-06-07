// src/app/components/context-menu/context-menu.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IdeaFormComponent } from '../idea-form/idea-form.component';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class ContextMenuComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public dialog: MatDialog, private itemService: ItemService) {}

  addIdea() {
    const dialogRef = this.dialog.open(IdeaFormComponent, {
      width: '250px'
    });
  }

  closeContextMenu() {
    this.close.emit();
  }

  editIdea() {
    console.log('Edit idea');
    this.close.emit();
  }

  deleteIdea() {
    console.log('Delete idea');
    this.close.emit();
  }
}
