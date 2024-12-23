export const MaskIdentificacao = {
    CNPJ: '##.###.###/####-##',
    CPF: '###.###.###-##',
    TELEFONE_9: '(##) #####-####',
    TELEFONE_8: '(##) ####-#####',
  };
  
  export class MaskUtil {
    static applyMask(value: string, mask: string): string {
      if (!value) return '';
      const onlyNumbers = value.replace(/\D/g, ''); 
      let maskedValue = '';
      let dataIndex = 0;
  
      for (let i = 0; i < mask.length && dataIndex < onlyNumbers.length; i++) {
        if (mask[i] === '#') {
          maskedValue += onlyNumbers[dataIndex];
          dataIndex++;
        } else {
          maskedValue += mask[i];
        }
      }
  
      return maskedValue;
    }
  
    static removeMask(value: string): string {
      return value.replace(/\D/g, '');
    }
  }
  