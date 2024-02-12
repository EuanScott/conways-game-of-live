import { Component, ElementRef, ViewChild } from '@angular/core'

// TODO: Move these imports to some kind of `base` class
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

export type Bit = 0 | 1
export type BitArray = Bit[]

@Component({
  selector: 'game-board',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

  @ViewChild('gameboard', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>
  canvasContext!: CanvasRenderingContext2D | null

  gameBoard: BitArray[] = []

  isGamePlaying: boolean = false

  ngAfterViewInit (): void {
    this.setupGameBoard()
  }

  playGame (): void {
    this.isGamePlaying = true
    this.gameBoard = this.generateGameBoard()
    this.render(this.gameBoard)
    this.animate()
  }

  pauseGame (): void {
    // TODO
  }

  resetGame (): void {
    this.setupGameBoard()
    this.playGame()
  }

  private setupGameBoard (): void {
    this.canvas.nativeElement.width = 800
    this.canvas.nativeElement.height = 800
    this.canvasContext = this.canvas.nativeElement.getContext('2d')
  }

  private render (board: BitArray[]) {
    const resolution = 10

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        this.canvasContext!.beginPath()
        this.canvasContext!.rect(colIndex * resolution, rowIndex * resolution, resolution, resolution)
        this.canvasContext!.fillStyle = cell ? '#673AB7' : 'white'
        this.canvasContext!.fill()
      })
    })
  }

  private animate () {
    requestAnimationFrame(() => this.animate())
    this.createNextGeneration(this.gameBoard)
    this.render(this.gameBoard)
  }

  //Rules to the game:
  //Any live cell with fewer than two live neighbors dies (referred to as under population or exposure).
  //Any live cell with more than three live neighbors dies (referred to as overpopulation or overcrowding).
  //Any live cell with two or three live neighbors lives, unchanged, to the next generation.
  //Any dead cell with exactly three live neighbors will come to life.
  private createNextGeneration (gameBoard: BitArray[]) {
    const nextGeneration: BitArray[] = gameBoard.map((innerArr) => [...innerArr])

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const rowAbove = gameBoard[rowIndex - 1] || []
        const rowBelow = gameBoard[rowIndex + 1] || []
        const fieldBefore = gameBoard[rowIndex][colIndex - 1]
        const fieldAfter = gameBoard[rowIndex][colIndex + 1]

        const numberOfLivingNeighbors = [
          rowAbove[colIndex - 1],
          rowAbove[colIndex],
          rowAbove[colIndex + 1],
          rowBelow[colIndex - 1],
          rowBelow[colIndex],
          rowBelow[colIndex + 1],
          fieldBefore,
          fieldAfter,
        ].reduce((previousValue: number, currentValue: number) => (currentValue != null ? previousValue + currentValue : previousValue), 0)

        const becomeLivingCell = numberOfLivingNeighbors === 3
        const keepAlive = cell && numberOfLivingNeighbors === 2

        const newCellValue = becomeLivingCell || keepAlive ? 1 : 0

        nextGeneration[rowIndex][colIndex] = newCellValue
      })
    })

    this.gameBoard = nextGeneration
  }

  //#region Helpers

  private generateGameBoard (): (0 | 1)[][] {
    const oneOrZero = () => (Math.random() > 0.5 ? 1 : 0)

    return new Array(80)
      .fill(0)
      .map(() => new Array(80).fill(0).map(oneOrZero));
  }

  //#endregion
}
