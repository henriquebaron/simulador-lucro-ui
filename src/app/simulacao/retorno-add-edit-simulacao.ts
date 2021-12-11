import { Servico } from "src/shared/servico";

export interface RetornoAddEditSimulacao {
    servico: Servico | null;
    hora: Date;
    delete?: boolean;
}