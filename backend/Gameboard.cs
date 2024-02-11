using System;

namespace ConwayGameOfLife
{
    class GameBoard
    {
        public void Draw()
        {
            int length = 10;
            for (int i = 0; i < length; i++)
            {
                for (int j = 0; j < length; j++)
                {
                    Console.Write(" . ");
                }
                Console.WriteLine();
            }
        }
    }
}
