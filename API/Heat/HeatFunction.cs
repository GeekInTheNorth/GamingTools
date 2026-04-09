using GamingTools.Api.Common;
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace GamingTools.Api.Heat;

public class HeatFunction : BaseFunction
{
    [Function("HeatGenerateLegends")]
    public async Task<HttpResponseData> GenerateLegends([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "game/heat/legends/generate")] HttpRequestData req)
    {
        var model = await GetModelAsync<GenerateLegendsOptions>(req);

        if (model is not { HasDrivers: true })
        {
            return CreateEmptyResponse(req, HttpStatusCode.BadRequest);
        }

        var generator = new LegendsDeckGenerator();
        var deck = generator.Generate(model ?? new GenerateLegendsOptions());

        return await CreateResponseAsync(req, HttpStatusCode.OK, deck);
    }
}
