import {request} from "@/plugins/myAxios.ts";
import CreateCommentParam = NetParams.CreateCommentParam;
import CommentRecords = Items.CommentRecords;
import Comments = NetResp.Comments;

export const getComments = (postId: number, pageNum: number, pageSize: number): Promise<Comments> => {
    return request({
        method: "get",
        url: "/comments",
        params: {postId, pageNum, pageSize}
    });
};

export const createComment = (data: CreateCommentParam) => {
    return request({
        method: "post",
        url: "/comments",
        data
    });
};

export const getCommentById = (id: number): Promise<CommentRecords> => {
    return request({
        method: "get",
        url: `/comments/${id}`,
    });
};