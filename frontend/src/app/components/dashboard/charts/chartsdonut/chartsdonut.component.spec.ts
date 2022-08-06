import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsdonutComponent } from './chartsdonut.component';

describe('ChartsdonutComponent', () => {
  let component: ChartsdonutComponent;
  let fixture: ComponentFixture<ChartsdonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsdonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsdonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
