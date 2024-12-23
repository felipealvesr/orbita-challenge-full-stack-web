using AutoMapper;
using EdTech.API.GraphQL.Types.Inputs;
using EdTech.API.ViewModels;
using EdTech.Interfaces.Repositories;
using HotChocolate.Subscriptions;

namespace EdTech.API.GraphQL.Types.Queries
{
    public class StudentQuery
    {
        private readonly IMapper _mapper;

        public StudentQuery(IMapper mapper) => _mapper = mapper;

        [UsePaging(MaxPageSize = 50)] // Limite máximo por página
        [UseFiltering(typeof(StudentFilterInput))]
        [HotChocolate.Data.UseSorting]

        [GraphQLDescription("Consulta alunos no sistema com paginação, filtros e ordenação.")]
        public async Task<IEnumerable<StudentViewModel>> GetStudents(
            [Service] IStudent studentRepository,
            [Service] ITopicEventSender eventSender)
        {
            var studentList = await studentRepository.GetAllStudentsAsync();

          //  await eventSender
          //.SendAsync(nameof(studentList), studentList.Count());

            return studentList
                .Select(student => _mapper.Map<StudentViewModel>(student));
        }

        [GraphQLDescription("Consulta um aluno pelo RA.")]
        public async Task<StudentViewModel?> GetStudent(
            int ra,
            [Service] IStudent studentRepository)
        {
            var student = await studentRepository.GetStudentByRAAsync(ra)
                ?? throw new ApplicationException($"Aluno com o RA: {ra} não encontrado.");

            return _mapper.Map<StudentViewModel>(student);
        }
    }
}
