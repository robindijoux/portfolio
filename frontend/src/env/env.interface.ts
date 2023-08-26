export interface IEnv {
    backend?: {
        host: string;
        protocol: string;
        endpoints: {
            project: string;
            paragraph: string;
            authentication: string;
        }
    }
}