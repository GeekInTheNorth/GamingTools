namespace GamingTools.Api.Heat;

/* Notes
Corners
0: 10-11
1: 12-14
2: 15-17
3: 18+

Speed:
9+D10
*/

public class LegendsDeckGenerator
{
    private readonly Random randomGenerator;

    public LegendsDeckGenerator()
    {
        randomGenerator = new Random();
    }

    public LegendsDeck Generate(GenerateLegendsOptions options)
    {
        var randomGenerator = new Random();

        var deck = Enumerable.Range(1, 20).Select(x => GenerateCard(x, options)).ToList();

        return new LegendsDeck(deck);
    }

    private LegendsCard GenerateCard(int roundNumber, GenerateLegendsOptions options)
    {
        return new LegendsCard
        {
            RoundNumber = roundNumber,
            Drivers = [.. GenerateDrivers(options)]
        };
    }

    private IEnumerable<LegendsDriver> GenerateDrivers(GenerateLegendsOptions options)
    {
        if (options.UseSilver)
        {
            yield return GenerateDriver(options.Difficulty, "Silver", 2);
        }

        if (options.UseRed)
        {
            yield return GenerateDriver(options.Difficulty, "Red", 3);
        }

        if (options.UseOrange)
        {
            yield return GenerateDriver(options.Difficulty, "Orange", 4);
        }

        if (options.UseGreen)
        {
            yield return GenerateDriver(options.Difficulty, "Green", 5);
        }

        if (options.UseBlack)
        {
            yield return GenerateDriver(options.Difficulty, "Black", 7);
        }

        if (options.UsePurple)
        {
            yield return GenerateDriver(options.Difficulty, "Purple", 9);
        }

        if (options.UseBlue)
        {
            yield return GenerateDriver(options.Difficulty, "Blue", 10);
        }

        if (options.UseYellow)
        {
            yield return GenerateDriver(options.Difficulty, "Yellow", 14);
        }
    }

    private LegendsDriver GenerateDriver(LegendDifficulty difficulty, string name, int number)
    {
        var speed = GenerateSpeed(difficulty);

        return new LegendsDriver
        {
            Colour = name,
            Number = number,
            Speed = speed,
            CornerLimit = GenerateCornerLimit(difficulty, speed)
        };
    }

    private static int GenerateCornerLimit(LegendDifficulty difficulty, int speed)
    {
        var fastestThreshold = 18;
        var fastThreshold = 15;
        var midThreshold = 12;

        if (difficulty == LegendDifficulty.Easy)
        {
            fastestThreshold = 15;
            fastThreshold = 12;
            midThreshold = 9;
        } else if (difficulty == LegendDifficulty.Hard)
        {
            fastestThreshold = 18;
            fastThreshold = 16;
            midThreshold = 14;
        } else if (difficulty == LegendDifficulty.Legendary)
        {
            fastestThreshold = 21;
            fastThreshold = 19;
            midThreshold = 17;
        }

        if (speed > fastestThreshold)
        {
            return 3;
        }

        if (speed > fastThreshold)
        {
            return 2;
        }

        if (speed > midThreshold)
        {
            return 1;
        }

        return 0;
    }

    private int GenerateSpeed(LegendDifficulty difficulty)
    {
        return difficulty switch
        {
            LegendDifficulty.Easy => randomGenerator.Next(8, 16),
            LegendDifficulty.Hard => randomGenerator.Next(12, 20),
            LegendDifficulty.Legendary => randomGenerator.Next(14, 22),
            _ => randomGenerator.Next(10, 19),
        };
    }
}
