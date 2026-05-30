using BLL;
using DAL;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var connStr = builder.Configuration.GetConnectionString("DefaultConnection")!;

// DAL
builder.Services.AddTransient(sp => new DoHocTap_DAL(connStr));
builder.Services.AddTransient(sp => new LoaiDoHocTap_DAL(connStr));
builder.Services.AddTransient(sp => new NhaCungCap_DAL(connStr));
builder.Services.AddTransient(sp => new Kho_DAL(connStr));

// BLL
builder.Services.AddScoped<IDoHocTap_BLL, DoHocTap_BLL>();
builder.Services.AddScoped<INhaCungCap_BLL, NhaCungCap_BLL>();
builder.Services.AddScoped<IKho_BLL, Kho_BLL>();

// CORS - Allow all origins
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API_SanPham", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
