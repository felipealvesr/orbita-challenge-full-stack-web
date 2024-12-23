export class InputRulesConstants {
    static NAO_PODE_SER_VAZIO(field: string): string {
      return `${field} não pode ser vazio.`;
    }
  
    static CARACTER_INVALIDO(field: string, char: string): string {
      return `${field} contém caracteres inválidos: ${char}`;
    }
  
    static CPF_INVALIDO(): string {
      return "CPF inválido. Deve estar no formato 000.000.000-00.";
    }
  
    static EMAIL_INVALIDO(): string {
      return "E-mail inválido.";
    }
  }