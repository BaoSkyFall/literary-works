import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraryWorkComponent } from './literary-work.component';

describe('LiteraryWorkComponent', () => {
  let component: LiteraryWorkComponent;
  let fixture: ComponentFixture<LiteraryWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiteraryWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiteraryWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
