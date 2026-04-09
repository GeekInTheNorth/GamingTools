namespace GamingTools.Api.Heat;

public class LegendsCard
{
    public int RoundNumber { get; set; }

    public int NumberOfLegends => Drivers.Count;

    public List<LegendsDriver> Drivers { get; set; } = [];
}
