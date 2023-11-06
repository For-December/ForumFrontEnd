declare module NetResp {

    import PostRecords = Items.PostRecords;

    interface Authorize {
        username: string;
        role: string;
        token: string;
        expire: Date;
    }

    interface UserInfo {
        id: number;
        nickname: string;
        username: string;
        avatar: string; // 头像路径（不要存二进制！
        balance: number; // 用户声望什么的
        role: string;
        registerTime: Date;
        modifyTime: Date;
    }

    interface Posts {
        records: PostRecords[];
        total: number;
        size: number;
        current: number;
    }

}