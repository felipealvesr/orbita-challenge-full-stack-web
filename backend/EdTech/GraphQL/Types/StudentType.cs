using EdTech.Domain.Entities;

namespace EdTech.API.GraphQL.Types
{
    public class StudentType : ObjectType<Student>
    {
        protected override void Configure(IObjectTypeDescriptor<Student> descriptor)
        {
            descriptor.Name("Student");

            descriptor.Field(s => s.RA)
                .Type<NonNullType<IntType>>()
                .Description("O RA (Registro Acadêmico) do aluno, é a chave primária.");

            descriptor.Field(s => s.Name)
                .Type<NonNullType<StringType>>()
                .Description("O Nome do aluno.");

            descriptor.Field(s => s.Email)
                .Type<NonNullType<StringType>>()
                .Description("O endereço de email do aluno.");

            descriptor.Field(s => s.CPF)
                .Type<NonNullType<StringType>>()
                .Description("O CPF (Cadastro de Pessoa Física) do aluno.");
        }
    }
}
