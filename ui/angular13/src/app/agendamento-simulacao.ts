import { Servico } from "./servico";

export class AgendamentoSimulacao {
    hora: string = "00:00";
    idServico: number = 0;

    static getMinutos(agendamento: AgendamentoSimulacao): number {
        return Number.parseInt(agendamento.hora.split(':')[1]);
    }

    static getHoras(agendamento: AgendamentoSimulacao): number {
        return Number.parseInt(agendamento.hora.split(':')[0]);
    }

    static horaAsString(horas: number, minutos: number): string {
        return horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
    }

    getHoraTermino(servico: Servico | null): string {
        if (servico?.id != this.idServico) throw new Error("O ID do parâmetro Serviço não corresponde ao ID de serviço do objeto atual.");

        var minutos = AgendamentoSimulacao.getMinutos(this);
        var horas = AgendamentoSimulacao.getHoras(this);

        minutos += Servico.getMinutos(servico);
        horas += Math.floor(minutos / 60);

        minutos = minutos % 60;
        horas += Servico.getHoras(servico);

        return AgendamentoSimulacao.horaAsString(horas, minutos);
    }
}