import { gql } from "@apollo/client/core";

export const ON_LISTED_STUDENT = gql`
  subscription OnListedStudent {
    studentListed {
      ra
      name
      email
      cpf
    }
  }
`;

export const ON_INSERTED_STUDENT = gql`
  subscription OnInsertedStudent {
    studentInserted {
      ra
      name
      email
      cpf
    }
  }
`;

export const ON_UPDATED_STUDENT = gql`
  subscription OnUpdatedStudent {
    studentUpdated {
      ra
      name
      email
      cpf
    }
  }
`;

export const ON_DELETED_STUDENT = gql`
  subscription OnDeletedStudent {
    studentDeleted {
      ra
      name
      email
      cpf
    }
  }
`;
