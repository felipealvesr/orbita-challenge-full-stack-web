import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<Scalars['Int']['input']>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomResult = {
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteStudentInput = {
  ra: Scalars['Int']['input'];
};

export type DeleteStudentPayload = {
  customResult?: Maybe<CustomResult>;
};

export type InsertStudentInput = {
  cpf: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  ra: Scalars['Int']['input'];
};

export type InsertStudentPayload = {
  studentViewModel?: Maybe<StudentViewModel>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Student = {
  /** O CPF (Cadastro de Pessoa Física) do aluno. */
  cpf: Scalars['String']['output'];
  /** O endereço de email do aluno. */
  email: Scalars['String']['output'];
  /** O Nome do aluno. */
  name: Scalars['String']['output'];
  /** O RA (Registro Acadêmico) do aluno, é a chave primária. */
  ra: Scalars['Int']['output'];
};

export type StudentFilterInput = {
  and?: InputMaybe<Array<StudentFilterInput>>;
  /** Filtrar pelo CPF do aluno. */
  cpf?: InputMaybe<StringOperationFilterInput>;
  /** Filtrar pelo Email do aluno. */
  email?: InputMaybe<StringOperationFilterInput>;
  /** Filtrar pelo Nome do aluno. */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StudentFilterInput>>;
  /** Filtrar pelo RA do aluno. */
  ra?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type StudentMutation = {
  deleteStudent: DeleteStudentPayload;
  insertStudent: InsertStudentPayload;
  updateStudent: UpdateStudentPayload;
};


export type StudentMutationDeleteStudentArgs = {
  input: DeleteStudentInput;
};


export type StudentMutationInsertStudentArgs = {
  input: InsertStudentInput;
};


export type StudentMutationUpdateStudentArgs = {
  input: UpdateStudentInput;
  ra: Scalars['Int']['input'];
};

export type StudentQuery = {
  /** Consulta um aluno pelo RA. */
  student?: Maybe<StudentViewModel>;
  /** Consulta alunos no sistema com paginação, filtros e ordenação. */
  students: Array<StudentViewModel>;
};


export type StudentQueryStudentArgs = {
  ra: Scalars['Int']['input'];
};


export type StudentQueryStudentsArgs = {
  where?: InputMaybe<StudentFilterInput>;
};

export type StudentSubscription = {
  onInsertedPokemon: StudentViewModel;
  onListedStudent: Scalars['Int']['output'];
  onUpdatedPokemon: StudentViewModel;
};

export type StudentViewModel = {
  cpf: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ra: Scalars['Int']['output'];
};

export type UpdateStudentInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateStudentPayload = {
  studentViewModel?: Maybe<StudentViewModel>;
};

export type DeleteStudentMutationVariables = Exact<{
  input: DeleteStudentInput;
}>;


export type DeleteStudentMutation = { deleteStudent: { customResult?: { success: boolean, message?: string | null } | null } };

export type InsertStudentMutationVariables = Exact<{
  input: InsertStudentInput;
}>;


export type InsertStudentMutation = { insertStudent: { studentViewModel?: { ra: number, name: string, email: string, cpf: string } | null } };

export type UpdateStudentMutationVariables = Exact<{
  ra: Scalars['Int']['input'];
  input: UpdateStudentInput;
}>;


export type UpdateStudentMutation = { updateStudent: { studentViewModel?: { ra: number, name: string, email: string, cpf: string } | null } };

export type GetStudentQueryVariables = Exact<{
  ra: Scalars['Int']['input'];
}>;


export type GetStudentQuery = { student?: { ra: number, name: string, email: string, cpf: string } | null };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { students: Array<{ ra: number, name: string, email: string, cpf: string }> };


export const DeleteStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customResult"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const InsertStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InsertStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentViewModel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ra"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}}]}}]}}]}}]} as unknown as DocumentNode<InsertStudentMutation, InsertStudentMutationVariables>;
export const UpdateStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStudentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ra"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentViewModel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ra"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStudentMutation, UpdateStudentMutationVariables>;
export const GetStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ra"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"student"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ra"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ra"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ra"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}}]}}]}}]} as unknown as DocumentNode<GetStudentQuery, GetStudentQueryVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ra"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"cpf"}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;