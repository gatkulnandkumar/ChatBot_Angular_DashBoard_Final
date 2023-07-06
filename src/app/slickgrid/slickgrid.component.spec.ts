import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickgridComponent } from './slickgrid.component';

describe('SlickgridComponent', () => {
  let component: SlickgridComponent;
  let fixture: ComponentFixture<SlickgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlickgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
