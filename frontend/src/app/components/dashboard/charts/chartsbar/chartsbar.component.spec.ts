import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsbarComponent } from './chartsbar.component';

describe('ChartsbarComponent', () => {
  let component: ChartsbarComponent;
  let fixture: ComponentFixture<ChartsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
