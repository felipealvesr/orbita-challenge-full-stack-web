namespace EdTech.API.AutoMapper
{
    public static class AutoMapperSetup
    {
        public static void AddAutoMapperSetup(this IServiceCollection services)
        {
            services
                .AddAutoMapper(typeof(StudentProfile));
        }
    }
}
