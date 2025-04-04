using ConnectExtension.Backend.Services;
using ConnectExtension.Backend.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace ConnectExtension.Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            
            // Register the services
            services.AddSingleton<IConsultantService, ConsultantService>();
            services.AddSingleton<IAuthService, AuthService>();
            
            // Configure JWT authentication
            var jwtKey = Configuration["JWT:Secret"] ?? "FastConnectDefaultSecretKey12345678";
            var key = Encoding.ASCII.GetBytes(jwtKey);
            
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["JWT:Issuer"] ?? "FastConnectAPI",
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:Audience"] ?? "FastConnectUser",
                    ClockSkew = TimeSpan.Zero
                };
            });
            
            // Add CORS policy for Angular app
            services.AddCors(options =>
            {
                options.AddPolicy("AllowChromeExtension", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });
            
            // Add Swagger support
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { 
                    Title = "FastConnect API", 
                    Version = "v1",
                    Description = "API pour l'extension FastConnect"
                });
                
                // Configure Swagger pour utiliser JWT
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = Microsoft.OpenApi.Models.ParameterLocation.Header,
                    Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                
                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
                {
                    {
                        new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                        {
                            Reference = new Microsoft.OpenApi.Models.OpenApiReference
                            {
                                Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            // Configurer Log4Net
            loggerFactory.AddLog4Net();
            var logger = loggerFactory.CreateLogger<Startup>();
            logger.LogInformation("Application FastConnect API configurée");
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
                // Enable Swagger UI in development
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FastConnect API v1"));
            }

            // Middleware de logging des requêtes/réponses
            app.UseRequestResponseLogging();
            
            // Routes et middleware
            app.UseRouting();
            
            // Activation des fichiers statiques pour servir l'application Angular via .NET Core
            // Important: UseStaticFiles doit être après UseRouting pour que les routes API soient prioritaires
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            // Use CORS policy
            app.UseCors("AllowChromeExtension");
            
            // Ajouter l'authentification avant l'autorisation
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                
                // Ajout du fallback vers index.html pour les routes non-API (SPA fallback)
                // Version simplifiée pour éviter les problèmes de références
                endpoints.MapFallbackToFile("index.html");
            });
            
            logger.LogInformation("Routes et middlewares configurés");
        }
    }
}