import { Servico } from "src/shared/servico";

export interface RetornoAddEditServico {
    servico: Servico | null;
    delete?: boolean;
}