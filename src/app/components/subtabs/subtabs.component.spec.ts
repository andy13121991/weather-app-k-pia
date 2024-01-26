import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtabsComponent } from './subtabs.component';

describe('SubtabsComponent', () => {
  let component: SubtabsComponent;
  let fixture: ComponentFixture<SubtabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubtabsComponent]
    });
    fixture = TestBed.createComponent(SubtabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
