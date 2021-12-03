import { Servico } from "../servico";

export interface RetornoAddEditSimulacao {
    servico: Servico;
    hora: number;
    minuto: number;
}