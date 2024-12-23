using EdTech.Data.Context;
using EdTech.Domain.Entities;
using EdTech.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EdTech.Data.Repositories
{
    public class StudentRepository : IStudent
    {
        private readonly AppDbContext _context;

        public StudentRepository(AppDbContext context)
        {
            _context = context
                ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            return await _context.Student.ToListAsync();
        }

        public async Task<Student?> GetStudentByRAAsync(int ra)
        {
            return await _context.Student
                .FirstOrDefaultAsync(s => s.RA == ra)
                ?? throw new ApplicationException($"Aluno com o RA: {ra} não encontrado.");
        }

        public async Task InsertStudent(Student student)
        {
            await _context.Student.AddAsync(student);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateStudent(Student student)
        {
            _context.Student.Update(student);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStudent(int ra)
        {
            var student = await GetStudentByRAAsync(ra);

            _context.Student.Remove(student);
            await _context.SaveChangesAsync();
        }
    }
}
