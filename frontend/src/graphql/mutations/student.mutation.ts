import { gql } from "@apollo/client/core";
import { InsertStudentInput, DeleteStudentInput, UpdateStudentInput } from "@/graphql/graphql";

export const INSERT_STUDENT = gql`
mutation InsertStudent($input: InsertStudentInput!) {
  insertStudent(input: $input) {
    studentViewModel {
      ra
      name
      email
      cpf
    }
  }
}
`;

export const UPDATE_STUDENT = gql`
mutation UpdateStudent($ra: Int!, $input: UpdateStudentInput!) {
  updateStudent(ra: $ra, input: $input) {
    studentViewModel {
      ra
      name
      email
      cpf
    }
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