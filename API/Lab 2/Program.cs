
using Lab_2.Config;
using Lab_2.Models;
using Lab_2.UoW;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Lab_2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddXmlSerializerFormatters();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

            builder.Services.AddDbContext<AngularLabDbContext>(options =>
           options.UseSqlServer(builder.Configuration.GetConnectionString("AngularLab5")));
            builder.Services.AddIdentity<IdentityStudent, IdentityRole>().AddEntityFrameworkStores<AngularLabDbContext>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });
            builder.Services.AddSwaggerGen();
            builder.Services.AddOpenApi();
            builder.Services.AddAutoMapper(cfg => cfg.AddProfile<AutoMapperConfig>());
            builder.Services.AddScoped<UnitOFWork>();
            builder.Services.AddAuthentication(
                op =>
                {
                    op.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(
                op =>
                {
                    
                    string key = "I'm Gonna Make him an offer he cannot Refuse";
                    var seckey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));

                    
                    op.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        IssuerSigningKey = seckey,
                        ValidateLifetime = true,
                    };





                });
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowAll");
            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
