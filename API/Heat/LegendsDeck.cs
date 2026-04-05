using System.Collections;

namespace GamingTools.Api.Heat;

public class LegendsDeck(IEnumerable<LegendsCard> cards) : IEnumerable<LegendsCard>
{
    private IEnumerable<LegendsCard> _cards = cards;

    public IEnumerator<LegendsCard> GetEnumerator()
    {
        return _cards.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}