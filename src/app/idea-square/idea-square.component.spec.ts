import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaSquareComponent } from './idea-square.component';

describe('IdeaSquareComponent', () => {
  let component: IdeaSquareComponent;
  let fixture: ComponentFixture<IdeaSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaSquareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeaSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
