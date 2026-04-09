namespace GamingTools.Api.Heat;

public class GenerateLegendsOptions
{
    /// <summary>
    /// Difficulty level
    /// </summary>
    public LegendDifficulty Difficulty { get; set; } = LegendDifficulty.Normal;

    /// <summary>
    /// Car #2, Silver
    /// </summary>
    public bool UseSilver { get; set; } = true;

    /// <summary>
    /// Car #3, Red
    /// </summary>
    public bool UseRed { get; set; } = true;

    /// <summary>
    /// Car #4, Orange
    /// </summary>
    public bool UseOrange { get; set; } = true;

    /// <summary>
    /// Car #5, Green
    /// </summary>
    public bool UseGreen { get; set; } = true;

    /// <summary>
    /// Car #7, Black
    /// </summary>
    public bool UseBlack { get; set; } = true;

    /// <summary>
    /// Car #9, Purple
    /// </summary>
    public bool UsePurple { get; set; } = true;

    /// <summary>
    /// Car #10, Blue
    /// </summary>
    public bool UseBlue { get; set; } = true;

    /// <summary>
    /// Car #14, Yellow
    /// </summary>
    public bool UseYellow { get; set; } = true;

    public bool HasDrivers => UseSilver || UseRed || UseOrange || UseGreen || UseBlack || UsePurple || UseBlue || UseYellow;
}
