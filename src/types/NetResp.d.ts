declare module NetResp {

    import PostRecords = Items.PostRecords;
    import CommentRecords = Items.CommentRecords;

    interface Authorize {
        username: string; // id最好还是后端处理
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

    interface Comments {
        records: CommentRecords[];
        total: number;
        size: number;
        current: number;
    }
}