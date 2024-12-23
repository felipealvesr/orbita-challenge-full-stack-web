import { gql } from "@apollo/client/core";

export const GET_STUDENTS = gql`
  query GetStudents($filter: StudentFilterInput) {
    students(where: $filter) {
      ra
      name
      email
      cpf
    }
  }
`;

export const GET_STUDENT_BY_RA = gql`
  query GetStudent($ra: Int!) {
    student(ra: $ra) {
      ra
      name
      email
      cpf
    }
  }
`;
