namespace EdTech.API.ViewModels
{
    public record class StudentViewModel
    {
        public int RA { get; set; }
        public string Name { get; set; }
        public string Email { get; set; } 
        public string CPF { get; set; } 
    }
}
