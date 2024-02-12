using System;
using System.Linq;
using System.Threading;

namespace ConwayGameOfLife
{

  public class GameBoardComponent
  {

    private static int[][] gameBoard;

    static void Main(string[] args)
    {
      GameBoardComponent game = new GameBoardComponent();

      gameBoard = game.GenerateGameBoard();

      while (true)
      {
        game.Render(gameBoard);
        game.CreateNextGeneration(gameBoard);
        Thread.Sleep(125);
      }
    }


    private void CreateNextGeneration(int[][] gameBoard)
    {
      var nextGeneration = gameBoard.Select(arr => arr.ToArray()).ToArray();

      int rowIndex = 0;
      foreach (var row in gameBoard)
      {
        int colIndex = 0;
        foreach (var col in row)
        {
          var rowAbove = gameBoard[rowIndex - 1];
          var rowBelow = gameBoard[rowIndex + 1];
          var fieldBefore = gameBoard[rowIndex][colIndex - 1];
          var fieldAfter = gameBoard[rowIndex][colIndex + 1];

          var numberOfLivingNeighbors = new int[]
          {
                rowAbove.ElementAtOrDefault(colIndex - 1),
                rowAbove.ElementAtOrDefault(colIndex),
                rowAbove.ElementAtOrDefault(colIndex + 1),
                rowBelow.ElementAtOrDefault(colIndex - 1),
                rowBelow.ElementAtOrDefault(colIndex),
                rowBelow.ElementAtOrDefault(colIndex + 1),
                fieldBefore,
                fieldAfter,
          }.Count(col => col == 1);

          var becomeLivingCell = numberOfLivingNeighbors == 3;
          var keepAlive = row[colIndex] == 1 && numberOfLivingNeighbors == 2;

          var newCellValue = becomeLivingCell || keepAlive ? 1 : 0;

          nextGeneration[rowIndex][colIndex] = newCellValue;

          colIndex++;
        }
        rowIndex++;
      }

      gameBoard = nextGeneration;
    }

    private void Render(int[][] gameBoard)
    {
      foreach (int[] row in gameBoard)
      {
        foreach (int cell in row)
        {
          Console.Write(cell == 1 ? "#" : " ");
        }
        Console.WriteLine();
      }
    }

    private int[][] GenerateGameBoard()
    {
      var random = new Random();
      return Enumerable.Range(0, 10)
          .Select(_ => Enumerable.Range(0, 10)
              .Select(__ => random.Next(2))
              .ToArray())
          .ToArray();
    }
  }
}
