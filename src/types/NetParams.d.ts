declare module NetParams {
    interface AuthUserLogin {
        /** 用户名 */
        username: string;
        /** 密码 */
        password: string;
    }

    interface AuthUserRegister {
        /** 用户名 */
        username: string;
        /** 密码 */
        password: string;
    }

    interface CreatePostParam {
        authorId: number;
        authorName: string,
        content: string;
        tags: string;
    }

    interface CreateCommentParam {
        authorId: number;
        authorName: string,
        postId: number;
        content: string;
    }
}