using EdTech.Domain.Entities;
using HotChocolate.Data.Filters;

namespace EdTech.API.GraphQL.Types.Inputs
{
    public class StudentFilterInput : FilterInputType<Student>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Student> descriptor)
        {
            descriptor.Name("StudentFilterInput");

            // Campo RA - Operadores de comparação numérica
            descriptor.Field(s => s.RA)
                .Type<ComparableOperationFilterInputType<int>>() 
                .Description("Filtrar pelo RA do aluno.");

            // Campo Name - Operadores de string
            descriptor.Field(s => s.Name)
                .Type<StringOperationFilterInputType>()
                .Description("Filtrar pelo Nome do aluno.");

            // Campo Email - Operadores de string
            descriptor.Field(s => s.Email)
                .Type<StringOperationFilterInputType>()
                .Description("Filtrar pelo Email do aluno.");

            // Campo CPF - Operadores de string
            descriptor.Field(s => s.CPF)
                .Type<StringOperationFilterInputType>()
                .Description("Filtrar pelo CPF do aluno.");
        }
    }
}
