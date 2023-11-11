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