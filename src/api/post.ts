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
    console.log(data)
    const formData = new FormData();
    formData.append('authorId', data.authorId.toString());
    formData.append('authorName', data.authorName)
    formData.append('text', data.text)
    data.images.forEach(image => formData.append('images', image));
    formData.append('tags', data.tags)
    console.log(formData)
    return request({
        method: "post",
        url: "/posts",
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
    });
};

export const getPostById = (id: number): Promise<PostRecords> => {
    return request({
        method: "get",
        url: `/posts/${id}`,
    });
};

// 帖子点赞
export const postStar = (postId: number,
                         userId: number,
                         userName: string,
                         like: boolean): Promise<boolean> => {
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