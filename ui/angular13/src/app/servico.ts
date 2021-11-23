export class Servico {
    id: number = 0;
    nome: string = "";
    descricao: string = "";
    duracao: string = "00:00:00";
    valor: number = 0;
    custo: number = 0;

    static getMinutos(servico: Servico): number {
        return Number.parseInt(servico.duracao.split(':')[1]);
    }

    static getHoras(servico: Servico): number {
        return Number.parseInt(servico.duracao.split(':')[0]);
    }

    static duracaoAsString(horas: number, minutos: number): string {
        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + ':00';
    }
}