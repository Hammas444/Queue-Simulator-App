var builder = WebApplication.CreateBuilder(args);


var port = Environment.GetEnvironmentVariable("PORT") ?? "5066";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
builder.Services.AddOpenApi();

builder.Services.AddControllers();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowVercel",
        policy => policy.WithOrigins("https://queue-simulator-app-tu4s.vercel.app/")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


var app = builder.Build();
app.UseCors("AllowVercel");
app.MapControllers();

app.Run();