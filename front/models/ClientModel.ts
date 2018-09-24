import { ClientViewModel } from "api/apiclient";

export class ClientModel {
    id: number;
    name: string;
    level: ClientLevel;
    children: Array<ClientModel>;
}

export enum ClientLevel {
    Root = 0,
    Node,
    Leaf
}

export function ToClientModel(m: ClientViewModel): ClientModel {
    return {
        id: m.id,
        level: m.level,
        name: m.name,
        children: (m.subClients || []).map(ToClientModel)
    };
}