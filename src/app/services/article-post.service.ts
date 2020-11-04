import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

const BACKEND_URL = environment.backendUrl + "/articles/";

@Injectable({
  providedIn: "root",
})
export class ArticlePostService {
  constructor(private http: HttpClient) {}

  newPost(
    title: string,
    sub_title: string,
    content: string,
    article_image: File,
    topicId: string
  ) {
    const articleData = new FormData();
    articleData.append("title", title);
    articleData.append("sub_title", sub_title);
    articleData.append("content", content);
    articleData.append("article_image", article_image, title);
    articleData.append("topicId", topicId);

    return this.http.post<{ response: any }>(
      BACKEND_URL + "add-post",
      articleData
    );
  }

  getArticles() {
    return this.http.get<{ response: any }>(BACKEND_URL + "get-articles");
  }

  findOneArticle(id: string) {
    return this.http.get<{ response: any }>(BACKEND_URL + id);
  }

  updateArticle(
    id: string,
    title: string,
    sub_title: string,
    content: string,
    article_image: File,
    topicId: string
  ) {
    let articleData: FormData | any;

    if (typeof article_image === "object") {
      articleData = new FormData();
      articleData.append("title", title);
      articleData.append("sub_title", sub_title);
      articleData.append("content", content);
      articleData.append("article_image", article_image, title);
      articleData.append("topicId", topicId);
    } else {
      articleData = {
        _id: id,
        title,
        sub_title,
        content,
        article_image,
        topicId,
      };
    }

    return this.http.put<{ response: any }>(BACKEND_URL + id, articleData);
  }

  deleteArticle(id: string) {
    return this.http.delete<{ response: any }>(BACKEND_URL + id);
  }

  commentArticle(id: string, comment: string) {
    const commentData = { id, comment };
    return this.http.post<{ response: any }>(
      BACKEND_URL + "add-comment",
      commentData
    );
  }

  postCommentReply(postId, commentId, reply) {
    // Create blogData to pass to backend
    const commentReplyData = {
      reply: reply,
      commentId: commentId,
      postId: postId,
    };
    return this.http.post(BACKEND_URL + "do-reply", commentReplyData);
  }

  likeArticle(id) {
    return this.http.post<{response: any}>(BACKEND_URL + 'like-article', {id});
  }

  dislikeArticle(id) {
    return this.http.post<{response: any}>(BACKEND_URL + 'dislike-article', {id});
  }

  addToBookmarks(id) {
    return this.http.put<{response: any}>(BACKEND_URL + 'add-to-bookmark/' + id, id);
  }

  removeFromBookmarks(id) {
    return this.http.put<{response: any}>(BACKEND_URL + 'remove-from-bookmark/' + id, id);
  }

  getSpceficAdminArticles(id) {
    return this.http.get<{response: any}>(BACKEND_URL + 'admin-articles/' + id);
  }
}
