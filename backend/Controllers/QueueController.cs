using Microsoft.AspNetCore.Mvc;
using QueueServer.Models;

[ApiController]
[Route("api/[controller]")]
public class QueueController : ControllerBase {
    [HttpPost("mm1")]
    public ActionResult<MM1Result> CalculateMM1([FromBody] MM1Request req) {
        // Validation: Service must be faster than arrival for stability
        if (req.InterArrivalTime <= req.ServiceTime) 
            return BadRequest(new { message = "System unstable: Arrival rate must be less than service rate." });

        double lambda = 1.0 / req.InterArrivalTime;
        double mu = 1.0 / req.ServiceTime;
        double rho = lambda / mu;

        return Ok(new MM1Result {
            Lambda = Math.Round(lambda, 4),
            Mu = Math.Round(mu, 4),
            Rho = Math.Round(rho, 4),
            Lq = Math.Round((rho * rho) / (1 - rho), 4),
            Wq = Math.Round(rho / (mu - lambda), 4),
            L = Math.Round(rho / (1 - rho), 4),
            W = Math.Round(1 / (mu - lambda), 4),
            P0 = Math.Round(1 - rho, 4)
        });
    }
}