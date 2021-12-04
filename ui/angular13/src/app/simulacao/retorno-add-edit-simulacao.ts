import { Servico } from "../servico";

export interface RetornoAddEditSimulacao {
    servico: Servico | null;
    hora: Date;
    delete?: boolean;
}