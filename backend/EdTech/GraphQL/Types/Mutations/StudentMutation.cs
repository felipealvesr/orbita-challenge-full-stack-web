using AutoMapper;
using EdTech.API.GraphQL.Types.Inputs;
using EdTech.API.GraphQL.Types.Results;
using EdTech.API.ViewModels;
using EdTech.Domain.Entities;
using EdTech.Interfaces.Repositories;
using HotChocolate.Subscriptions;

namespace EdTech.API.GraphQL.Types.Mutations
{
    public class StudentMutation
    {
        private readonly IMapper _mapper;

        public StudentMutation(IMapper mapper) => _mapper = mapper;

        public async Task<StudentViewModel> InsertStudent(
            InsertStudentInput input,
            [Service] IStudent studentRepository,
            [Service] ITopicEventSender eventSender)
        {
            var student = _mapper.Map<Student>(input);
            await studentRepository.InsertStudent(student);

            var viewModel = _mapper.Map<StudentViewModel>(student);
            await eventSender.SendAsync(nameof(InsertStudent), viewModel);

            return viewModel;
        }

        public async Task<StudentViewModel?> UpdateStudent(
            int ra,
            UpdateStudentInput input,
            [Service] IStudent studentRepository,
            [Service] ITopicEventSender eventSender)
        {
            var student = await studentRepository.GetStudentByRAAsync(ra)
                ?? throw new Exception($"Aluno com o RA: {ra} não encontrado.");

            _mapper.Map(input, student);
            await studentRepository.UpdateStudent(student);

            var viewModel = _mapper.Map<StudentViewModel>(student);
            await eventSender.SendAsync(nameof(UpdateStudent), viewModel);

            return viewModel;
        }

        public async Task<CustomResult> DeleteStudent(
            DeleteStudentInput input,
            [Service] IStudent studentRepository,
            [Service] ITopicEventSender eventSender)
        {
            var student = await studentRepository.GetStudentByRAAsync(input.RA);
            if (student == null)
            {
                return new CustomResult { Success = false, Message = $"Aluno com o RA: {input.RA} não encontrado." };
            }

            await studentRepository.DeleteStudent(input.RA);
            await eventSender.SendAsync(nameof(DeleteStudent), new { RA = input.RA });

            return new CustomResult { Success = true, Message = "Aluno deletado com sucesso." };
        }
    }
}
