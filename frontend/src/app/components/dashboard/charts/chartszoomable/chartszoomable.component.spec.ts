import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartszoomableComponent } from './chartszoomable.component';

describe('ChartszoomableComponent', () => {
  let component: ChartszoomableComponent;
  let fixture: ComponentFixture<ChartszoomableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartszoomableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartszoomableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
