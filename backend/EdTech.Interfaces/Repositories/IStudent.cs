using EdTech.Domain.Entities;

namespace EdTech.Interfaces.Repositories
{
    public interface IStudent
    {
        Task<IEnumerable<Student>> GetAllStudentsAsync();
        Task<Student?> GetStudentByRAAsync(int ra);
        Task InsertStudent(Student student);
        Task UpdateStudent(Student student);
        Task DeleteStudent(int ra);
    }
}
