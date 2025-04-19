export class DateUtil {
  /**
   * Retorna a data atual no fuso horário local
   * @returns Date
   */
  static getCurrentDate(): Date {
    return new Date();
  }

  /**
   * Retorna a data atual formatada como string ISO no fuso horário local
   * @returns string
   */
  static getCurrentDateISO(): string {
    const date = this.getCurrentDate();
    return date.toISOString();
  }

  /**
   * Converte uma string ISO para Date no fuso horário local
   * @param isoString - String ISO da data
   * @returns Date
   */
  static fromISOString(isoString: string): Date {
    const date = new Date(isoString);
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  }

  /**
   * Formata uma data para string ISO no fuso horário local
   * @param date - Data a ser formatada
   * @returns string
   */
  static toISOString(date: Date): string {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  }

  /**
   * Verifica se uma data é válida
   * @param date - Data a ser verificada
   * @returns boolean
   */
  static isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  /**
   * Adiciona dias a uma data
   * @param date - Data base
   * @param days - Número de dias a adicionar
   * @returns Date
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Formata uma data para o formato brasileiro (dd/mm/yyyy)
   * @param date - Data a ser formatada
   * @returns string
   */
  static formatToBrazilianDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  /**
   * Formata uma data para o formato brasileiro com hora (dd/mm/yyyy hh:mm)
   * @param date - Data a ser formatada
   * @returns string
   */
  static formatToBrazilianDateTime(date: Date): string {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
