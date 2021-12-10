import { Servico } from "../servico";

export interface RetornoAddEditServico {
    servico: Servico | null;
    delete?: boolean;
}