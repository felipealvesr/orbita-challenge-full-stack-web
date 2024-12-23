import { gql } from "@apollo/client/core";

// Consulta sem filtro
export const GET_STUDENTS = gql`
  query {
    students {
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
