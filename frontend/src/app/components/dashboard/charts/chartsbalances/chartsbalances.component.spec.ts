import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsbalancesComponent } from './chartsbalances.component';

describe('ChartsbalancesComponent', () => {
  let component: ChartsbalancesComponent;
  let fixture: ComponentFixture<ChartsbalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsbalancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsbalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
