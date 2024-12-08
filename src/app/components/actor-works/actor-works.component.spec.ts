import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorWorksComponent } from './actor-works.component';

describe('ActorWorksComponent', () => {
  let component: ActorWorksComponent;
  let fixture: ComponentFixture<ActorWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorWorksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
