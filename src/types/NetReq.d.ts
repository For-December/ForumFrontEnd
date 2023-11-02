declare module NetReq {
    interface AuthUserRegister {
        /** 用户UID */
        id: number;
        /** 用户名 */
        username: string;
    }
    interface AuthUserLogin {
        token: string;
    }
}