using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ConnectExtension.Backend.Middlewares
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestResponseLoggingMiddleware> _logger;

        public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Capture the request body
            context.Request.EnableBuffering();
            var requestBodyStream = new MemoryStream();
            await context.Request.Body.CopyToAsync(requestBodyStream);
            requestBodyStream.Seek(0, SeekOrigin.Begin);
            
            var requestBodyText = await new StreamReader(requestBodyStream).ReadToEndAsync();
            requestBodyStream.Seek(0, SeekOrigin.Begin);
            context.Request.Body = requestBodyStream;

            // Log the request method and path
            _logger.LogInformation("Requête: {Method} {Path}", context.Request.Method, context.Request.Path + context.Request.QueryString);
            
            // If request body is not empty, log it as JSON
            if (!string.IsNullOrEmpty(requestBodyText))
            {
                try
                {
                    // Try to format as JSON if valid
                    var formattedJson = TryFormatJson(requestBodyText);
                    _logger.LogInformation("Corps de la requête: {RequestBody}", formattedJson);
                }
                catch
                {
                    // Log as plain text if not valid JSON
                    _logger.LogInformation("Corps de la requête: {RequestBody}", requestBodyText);
                }
            }

            // Get original response body stream
            var originalBodyStream = context.Response.Body;

            // Create a new memory stream to capture the response
            using (var responseBodyStream = new MemoryStream())
            {
                // Set the response body stream to our memory stream
                context.Response.Body = responseBodyStream;

                // Continue the pipeline
                await _next(context);

                // Log the response status code after the request is completed
                _logger.LogInformation("Réponse: StatusCode {StatusCode}", context.Response.StatusCode);

                // Copy the memory stream back to the original stream
                responseBodyStream.Seek(0, SeekOrigin.Begin);
                await responseBodyStream.CopyToAsync(originalBodyStream);
            }
        }

        private string TryFormatJson(string json)
        {
            try
            {
                // Try to parse and format as JSON
                var obj = JsonConvert.DeserializeObject(json);
                return JsonConvert.SerializeObject(obj, Formatting.Indented);
            }
            catch
            {
                // Return original if not valid JSON
                return json;
            }
        }
    }
}