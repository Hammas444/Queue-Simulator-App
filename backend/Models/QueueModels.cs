namespace QueueServer.Models;

public class MM1Request {
    public double InterArrivalTime { get; set; } // e.g., 2 minutes
    public double ServiceTime { get; set; }      // e.g., 1.5 minutes
}

public class MM1Result {
    public double Lambda { get; set; }           // Arrival Rate
    public double Mu { get; set; }               // Service Rate
    public double Rho { get; set; }              // Utilization
    public double Lq { get; set; }               // Mean No. in Queue
    public double Wq { get; set; }               // Mean Wait in Queue
    public double L { get; set; }                // Mean No. in System
    public double W { get; set; }                // Mean Wait in System
    public double P0 { get; set; }               // Idle Probability
}