using BLL;
using DAL;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var connStr = builder.Configuration.GetConnectionString("DefaultConnection")!;

// DAL
builder.Services.AddTransient(sp => new DonHang_DAL(connStr));
builder.Services.AddTransient(sp => new ChiTietDonHang_DAL(connStr));
builder.Services.AddTransient(sp => new HoaDonNhap_DAL(connStr));
builder.Services.AddTransient(sp => new ChiTietHDNhap_DAL(connStr));
builder.Services.AddTransient(sp => new Kho_DAL(connStr));

// BLL
builder.Services.AddScoped<IDonHang_BLL, DonHang_BLL>();
builder.Services.AddScoped<IHoaDonNhap_BLL, HoaDonNhap_BLL>();
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
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API_DonHang", Version = "v1" });
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
