namespace EdTech.API.GraphQL.Types.Inputs
{
    public class InsertStudentInput
    {
        public int RA { get; set; }
        public string Name { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string CPF { get; set; } = default!;
    }
}
