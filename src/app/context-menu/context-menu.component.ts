import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { IdeaFormComponent } from '../idea-form/idea-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class ContextMenuComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  addIdea() {
    const dialogRef = this.dialog.open(IdeaFormComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logic to handle the added idea
        console.log('The idea:', result);
      }
      this.close.emit();
    });
  }

  closeContextMenu() {
    this.close.emit();
  }

  editIdea() {
    // Logic to handle the edit idea
    console.log('Edit idea');
    this.close.emit();
  }

  deleteIdea() {
    // Logic to handle the delete idea
    console.log('Delete idea');
    this.close.emit();
  }
}
