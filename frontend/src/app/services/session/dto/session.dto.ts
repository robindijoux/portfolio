export interface Session {
    id: string;
    role: ROLE;
    token: string;
}

export enum ROLE {
    ADMIN = 1,
    CLASSIC = 0
}