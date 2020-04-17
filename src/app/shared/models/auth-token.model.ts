export interface AuthTokenModel {
    token: string;
    expiredIn: number;
    refreshToken: string;
}
