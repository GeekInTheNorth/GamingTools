using GamingTools.Api.Common;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace GamingTools.Api.Heat;

public class HeatFunction : BaseFunction
{
    [Function("HeatGenerateLegends")]
    public async Task<HttpResponseData> GenerateLegends([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "game/heat/legends/generate")] HttpRequestData req)
    {
        var model = await GetModelAsync<GenerateLegendsOptions>(req);
        var generator = new LegendsDeckGenerator();
        var deck = generator.Generate(model ?? new GenerateLegendsOptions());

        return await CreateResponseAsync(req, System.Net.HttpStatusCode.OK, deck);
    }
}
