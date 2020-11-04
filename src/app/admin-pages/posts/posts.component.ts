import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ArticlePostService } from "src/app/services/article-post.service";
import { AuthService } from "src/app/services/auth.service";
import { AddEditPostComponent } from "../add-edit-post/add-edit-post.component";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  articles: any[];

  constructor(
    private articleService: ArticlePostService,
    private authService: AuthService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.articleService
      .getSpceficAdminArticles(this.authService.getUserId())
      .subscribe((data) => {
        if (data.response.success) {
          this.articles = data.response.articles;
        }
      });
  }

  editPostDialog(id) {
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      width: "100%",
      height: "685px",
      data: { articleId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.articleService
        .updateArticle(
          id,
          result.title,
          result.sub_title,
          result.content,
          result.article_image,
          result.articleId
        )
        .subscribe((data) => {
          if (data.response.success) {
            const index = this.articles.findIndex(a => a._id === id);
            this.articles[index] = this.articles;
            this.getArticles();
            this.snackBar.open(data.response.msg, "success", {
              duration: 5000,
            });
          }
        });
    });
  }

  onDeleteArticle(id) {
    this.articleService.deleteArticle(id).subscribe((data) => {
      if (data.response.success) {
        this.getArticles();
        this.snackBar.open(data.response.msg, "success", {
          duration: 5000,
        });
      }
    });
  }
}
