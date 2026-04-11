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
        var deck = Enumerable.Range(1, 20).Select(x => GenerateCard(x, options)).ToList();

        return new LegendsDeck(deck);
    }

    private LegendsCard GenerateCard(int roundNumber, GenerateLegendsOptions options)
    {
        var speeds = GenerateSpeedArray(options.Difficulty);
        randomGenerator.Shuffle(speeds);
        randomGenerator.Shuffle(speeds);

        return new LegendsCard
        {
            RoundNumber = roundNumber,
            Drivers = [.. GenerateDrivers(options, speeds)]
        };
    }

    private IEnumerable<LegendsDriver> GenerateDrivers(GenerateLegendsOptions options, int[] speeds)
    {
        if (options.UseSilver)
        {
            yield return GenerateDriver(options.Difficulty, speeds[0], "Silver", 2);
        }

        if (options.UseRed)
        {
            yield return GenerateDriver(options.Difficulty, speeds[1], "Red", 3);
        }

        if (options.UseOrange)
        {
            yield return GenerateDriver(options.Difficulty, speeds[2], "Orange", 4);
        }

        if (options.UseGreen)
        {
            yield return GenerateDriver(options.Difficulty, speeds[3], "Green", 5);
        }

        if (options.UseBlack)
        {
            yield return GenerateDriver(options.Difficulty, speeds[4], "Black", 7);
        }

        if (options.UsePurple)
        {
            yield return GenerateDriver(options.Difficulty, speeds[5], "Purple", 9);
        }

        if (options.UseBlue)
        {
            yield return GenerateDriver(options.Difficulty, speeds[6], "Blue", 10);
        }

        if (options.UseYellow)
        {
            yield return GenerateDriver(options.Difficulty, speeds[7], "Yellow", 14);
        }
    }

    private static LegendsDriver GenerateDriver(LegendDifficulty difficulty, int speed, string name, int number)
    {
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

    private static int[] GenerateSpeedArray(LegendDifficulty difficulty)
    {
        return difficulty switch
        {
            LegendDifficulty.Easy => [.. Enumerable.Range(8, 10)],
            LegendDifficulty.Hard => [.. Enumerable.Range(12, 9)],
            LegendDifficulty.Legendary => [.. Enumerable.Range(14, 8)],
            _ => [.. Enumerable.Range(10, 10)],
        };
    }
}
