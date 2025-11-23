import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellDialogComponent } from './buy-sell-dialog.component';

describe('BuySellDialogComponent', () => {
  let component: BuySellDialogComponent;
  let fixture: ComponentFixture<BuySellDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuySellDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuySellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
