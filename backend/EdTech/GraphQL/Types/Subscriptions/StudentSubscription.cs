using EdTech.API.GraphQL.Types.Mutations;
using EdTech.API.ViewModels;

namespace EdTech.API.GraphQL.Types.Subscriptions
{
    public class StudentSubscription
    {
        [Subscribe]
        [Topic(nameof(Queries.StudentQuery))]
        public int OnListedStudent([EventMessage] int studentListCount) =>
       studentListCount;

        [Subscribe]
        [Topic(nameof(StudentMutation.InsertStudent))]
        public StudentViewModel OnInsertedPokemon([EventMessage] StudentViewModel insertedStudent) =>
            insertedStudent;

        [Subscribe]
        [Topic(nameof(StudentMutation.UpdateStudent))]
        public StudentViewModel OnUpdatedPokemon([EventMessage] StudentViewModel updatedStudent) =>
            updatedStudent;
    }
}
