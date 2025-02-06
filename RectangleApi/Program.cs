using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

const string jsonFilePath = "rectangle.json";

app.MapGet("/rectangle", () =>
    {
        if (!File.Exists(jsonFilePath))
        {
            var initialRectangle = new Rectangle ( 100, 50 );
            File.WriteAllText(jsonFilePath, JsonSerializer.Serialize(initialRectangle));
        }

        var json = File.ReadAllText(jsonFilePath);
        var rectangle = JsonSerializer.Deserialize<Rectangle>(json);
        return rectangle;
    })
    .WithName("rectangle")
    .WithOpenApi();

app.MapPost("/rectangle", async ([FromBody] Rectangle rectangle) =>
{
    await Task.Delay(10000);

    if (rectangle.Width > rectangle.Height)
    {
        return new { error = "Width cannot exceed height." };
    }

    var json = JsonSerializer.Serialize(rectangle);
    File.WriteAllText(jsonFilePath, json);
    return null;
});

app.Run();

record Rectangle(int Width, int Height);