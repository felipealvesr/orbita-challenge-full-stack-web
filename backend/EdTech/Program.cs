using EdTech.API.AutoMapper;
using EdTech.API.GraphQL.Types;
using EdTech.API.GraphQL.Types.Mutations;
using EdTech.API.GraphQL.Types.Queries;
using EdTech.API.GraphQL.Types.Subscriptions;
using EdTech.Data.Context;
using EdTech.Data.Repositories;
using EdTech.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IStudent, StudentRepository>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<StudentQuery>()
    .AddMutationType<StudentMutation>()
    .AddType<StudentType>()
    .AddSubscriptionType<StudentSubscription>()
    .AddMutationConventions()
    .AddInMemorySubscriptions()
    .AddFiltering()
    .AddSorting()
    .AddProjections();


builder.Services.AddAutoMapperSetup();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "EdTech API",
        Version = "v1",
        Description = @"
        API para gerenciamento de matrículas de alunos - Grupo A Educação.

        - **[GraphQL Playground](https://localhost:7221/graphql/)** 
        ",
        Contact = new OpenApiContact
        {
            Name = "Felipe Rodrigues Alves",
            Email = "imfelipe.rodrigues1@gmail.com",
            Url = new Uri("https://github.com/felipealvesr/orbita-challenge-full-stack-web")
        },
    });

    c.AddServer(new OpenApiServer
    {
        Url = "https://localhost:7221/graphql",
        Description = "Endpoint GraphQL"
    });
});

var app = builder.Build();

app.UseRouting();
app.UseWebSockets();
app.UseHttpsRedirection();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EdTech API v1");
        c.RoutePrefix = string.Empty;
    });
}
app.MapGraphQL("/graphql");

app.UseHttpsRedirection();
app.Run();
