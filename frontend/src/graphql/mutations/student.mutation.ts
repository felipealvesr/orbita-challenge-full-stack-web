import { gql } from "@apollo/client/core";

export const INSERT_STUDENT = gql`
  mutation InsertStudent($input: InsertStudentInput!) {
    insertStudent(input: $input) {
      ra
      nome
      email
      cpf
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudent($ra: Int!, $input: UpdateStudentInput!) {
    updateStudent(ra: $ra, input: $input) {
      ra
      nome
      email
      cpf
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($ra: Int!) {
    deleteStudent(ra: $ra) {
      success
      message
    }
  }
`;