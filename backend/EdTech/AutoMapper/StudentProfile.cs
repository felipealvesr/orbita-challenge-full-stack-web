using AutoMapper;
using EdTech.API.GraphQL.Types.Inputs;
using EdTech.API.ViewModels;
using EdTech.Domain.Entities;

namespace EdTech.API.AutoMapper
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            // Mapeamento de InsertStudentInput para Student
            CreateMap<InsertStudentInput, Student>();

            // Mapeamento de UpdateStudentInput para Student
            CreateMap<UpdateStudentInput, Student>();

            // Mapeamento de Student para StudentViewModel
            CreateMap<Student, StudentViewModel>()
                .ForMember(dest => dest.RA, opt => opt.MapFrom(src => src.RA))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.CPF, opt => opt.MapFrom(src => src.CPF));
        }
    }
}

