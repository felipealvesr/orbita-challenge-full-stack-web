//estrutura temporaria pois o graphql ainda nao esta devolvendo os types para o front via codegen

// Tipo usado no input da mutation InsertStudent
export interface InsertStudentInput {
  name: string;
  cpf: string;
  email: string;
  ra: number;
}

// Tipo usado no input da mutation UpdateStudent
export interface UpdateStudentInput {
  name?: string; // Campos opcionais para atualização
  cpf?: string;
  email?: string;
}

// Tipo de resposta para as mutations InsertStudent e UpdateStudent
export interface StudentViewModel {
  ra: number;
  name: string;
  email: string;
  cpf: string;
}

// Tipo de resposta para a mutation DeleteStudent
export interface DeleteStudentResponse {
  success: boolean;
  message: string;
}