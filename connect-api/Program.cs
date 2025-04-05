using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Reflection;

namespace ConnectExtension.Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var log4netRepository = log4net.LogManager.GetRepository(Assembly.GetEntryAssembly());
            log4net.Config.XmlConfigurator.Configure(log4netRepository, new FileInfo("log4net.config"));
            
            // Créer le dossier logs s'il n'existe pas
            if (!Directory.Exists("logs"))
            {
                Directory.CreateDirectory("logs");
            }
            
            var logger = log4net.LogManager.GetLogger(typeof(Program));
            logger.Info("--- Application Connect API démarrée ---");

            try
            {
                var host = CreateHostBuilder(args).Build();
                logger.Info("Configuration chargée avec succès");
                
                host.Run();
            }
            catch (Exception ex)
            {
                logger.Error($"Une erreur s'est produite au démarrage: {ex.Message}", ex);
                throw;
            }
            finally
            {
                logger.Info("--- Application Connect API arrêtée ---");
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                    webBuilder.UseUrls("http://0.0.0.0:8000", "http://0.0.0.0:80");
                })
                .ConfigureLogging((hostContext, logging) =>
                {
                    logging.AddLog4Net();
                    logging.SetMinimumLevel(LogLevel.Information);
                });
    }
}
