using System.Text;
using BLL;
using DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var connStr = builder.Configuration.GetConnectionString("DefaultConnection")!;

// DAL
builder.Services.AddTransient(sp => new DonHang_DAL(connStr));
builder.Services.AddTransient(sp => new ChiTietDonHang_DAL(connStr));
builder.Services.AddTransient(sp => new HoaDonNhap_DAL(connStr));
builder.Services.AddTransient(sp => new ChiTietHDNhap_DAL(connStr));
builder.Services.AddTransient(sp => new Kho_DAL(connStr));
builder.Services.AddTransient(sp => new ThongKe_DAL(connStr));
builder.Services.AddTransient(sp => new KhachHang_DAL(connStr));

// BLL
builder.Services.AddScoped<IDonHang_BLL, DonHang_BLL>();
builder.Services.AddScoped<IHoaDonNhap_BLL, HoaDonNhap_BLL>();
builder.Services.AddScoped<IKho_BLL, Kho_BLL>();
builder.Services.AddScoped<IThongKe_BLL>(sp => new ThongKe_BLL(connStr));
builder.Services.AddScoped<IKhachHang_BLL, KhachHang_BLL>();

// CORS - Allow all origins
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll", p => p
        .AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod()
    );
});

var jwtSection = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSection["Key"]!);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSection["Issuer"],
        ValidAudience = jwtSection["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();
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
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
