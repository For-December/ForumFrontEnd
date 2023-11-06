declare module Items {
    interface PostRecords {
        id: number;
        authorId: number;
        commentCount: number;
        upvoteCount: number;
        tags: string;
        title: string;
        content: string;
        latestRepliedTime: Date;
        createTime: Date;
        modifyTime: Date;
    }
}