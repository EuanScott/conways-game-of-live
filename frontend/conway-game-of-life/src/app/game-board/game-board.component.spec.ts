import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the playGame method when the play button is clicked', (() => {
    spyOn(component, 'playGame');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.playGame).toHaveBeenCalled();
    });
  }));

  it('should call the resetGame method when the reset button is clicked', (() => {
    spyOn(component, 'resetGame');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.resetGame).toHaveBeenCalled();
    });
  }));
});
