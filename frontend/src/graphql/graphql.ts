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

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

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
  students?: Maybe<StudentsConnection>;
};


export type StudentQueryStudentArgs = {
  ra: Scalars['Int']['input'];
};


export type StudentQueryStudentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<StudentViewModelSortInput>>;
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

export type StudentViewModelSortInput = {
  cpf?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  ra?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type StudentsConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<StudentsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<StudentViewModel>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type StudentsEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: StudentViewModel;
};

export type UpdateStudentInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateStudentPayload = {
  studentViewModel?: Maybe<StudentViewModel>;
};
