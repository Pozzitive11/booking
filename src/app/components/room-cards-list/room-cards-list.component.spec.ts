import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardsListComponent } from './room-cards-list.component';

describe('RoomCardsListComponent', () => {
  let component: RoomCardsListComponent;
  let fixture: ComponentFixture<RoomCardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCardsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
