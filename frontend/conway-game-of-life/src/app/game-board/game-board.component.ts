import { Component } from '@angular/core';

// TODO: Move these imports to some kind of `base` class
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'game-board',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

  ngAfterViewInit(): void {
    console.log("Game board has been loaded");
  }
}
