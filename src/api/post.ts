import {request} from "@/plugins/myAxios.ts";
import Posts = NetResp.Posts;
import CreatePostParam = NetParams.CreatePostParam;
import PostRecords = Items.PostRecords;

export const getPosts = (pageNum: number, pageSize: number): Promise<Posts> => {
    return request({
        method: "get",
        url: "/posts",
        params: {pageNum, pageSize}
    });
};

export const createPost = (data: CreatePostParam) => {
    return request({
        method: "post",
        url: "/posts",
        data
    });
};

export const getPostById = (id: number): Promise<PostRecords> => {
    return request({
        method: "get",
        url: `/posts/${id}`,
    });
};

// 帖子点赞
export const postStar = (postId: number, userId: number, userName: string, like: boolean): Promise<boolean> => {
    return request({
        method: "post",
        url: `/posts/star/${postId}`,
        params: {userId, userName, like}
    });
};


export const getStar = (postId: number, userId: number, userName: string): Promise<boolean> => {
    return request({
        method: "get",
        url: `/posts/star/${postId}`,
        params: {userId, userName}
    });
};

// 查询所有贴子的赞数量
export const getStarsList = (postIdList: number[]): Promise<number[]> => {
    console.log(postIdList)
    return request({
        method: "post",
        url: `/posts/stars`,
        data: postIdList,
    });
}