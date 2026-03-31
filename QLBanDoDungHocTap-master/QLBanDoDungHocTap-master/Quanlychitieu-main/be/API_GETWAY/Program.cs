using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot();

// CORS
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("GW", p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "API Gateway - BANDODUNGHOCTAP",
        Version = "v1",
        Description = "Gateway tổng hợp tất cả các API"
    });
});

var app = builder.Build();

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Gateway v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("GW");

// Health check + root endpoint - must be before UseOcelot
app.MapWhen(context => context.Request.Path == "/" || context.Request.Path == "/health", appBuilder =>
{
    appBuilder.Run(async context =>
    {
        context.Response.ContentType = "application/json";
        await context.Response.WriteAsJsonAsync(new
        {
            service = "API Gateway - BANDODUNGHOCTAP",
            status = "Running",
            timestamp = DateTime.Now,
            routes = new[]
            {
                "/api/auth/* -> API_Login (5010)",
                "/api/dohoctap/* -> API_SanPham (5020)",
                "/api/nhacungcap/* -> API_SanPham (5020)",
                "/api/donhang/* -> API_DonHang (5030)",
                "/api/hoadonnhap/* -> API_DonHang (5030)"
            },
            swagger = new[]
            {
                "https://localhost:5010/swagger - API_Login",
                "https://localhost:5020/swagger - API_SanPham",
                "https://localhost:5030/swagger - API_DonHang"
            }
        });
    });
});

await app.UseOcelot();

app.Run();
