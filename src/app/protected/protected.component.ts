import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `
    <div class="protected-container">
      <h2>Protected Page</h2>
      <p>Only authenticated users can see this page.</p>
    </div>
  `,
  styles: [`
    .protected-container {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class ProtectedComponent {}
