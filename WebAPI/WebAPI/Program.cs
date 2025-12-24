using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DonationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetIsOriginAllowed((host) => true));
});

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowReactApp");
app.UseAuthorization();


app.MapControllers(); 

app.Run();