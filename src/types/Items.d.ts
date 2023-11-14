declare module Items {
    interface PostRecords {
        id: number;
        authorId: number;
        authorName: string;
        commentCount: number;
        upvoteCount: number;
        tags: string;
        title: string;
        content: string;
        latestRepliedTime: Date;
        createTime: Date;
        modifyTime: Date;
    }

    interface CommentRecords {
        id: number;
        postId: number;
        authorId: number;
        authorName: string;
        upvoteCount: number;
        content: string;
        createTime: Date;
        modifyTime: Date;
    }
}