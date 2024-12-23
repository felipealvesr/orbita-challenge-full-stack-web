using System.ComponentModel.DataAnnotations;

namespace EdTech.Domain.Entities
{
    public class Student
    {
        [Key]
        [Range(1, 9999999999)] 
        public int RA { get; set; } 

        [Required]
        [MaxLength(100)] 
        public string Name { get; set; } = default!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        [RegularExpression(@"^\d{11}$")]
        public string CPF { get; set; } = default!;
    }

}
