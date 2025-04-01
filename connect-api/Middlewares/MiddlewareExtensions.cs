using Microsoft.AspNetCore.Builder;

namespace ConnectExtension.Backend.Middlewares
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestResponseLogging(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestResponseLoggingMiddleware>();
        }
    }
}