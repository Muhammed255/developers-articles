import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { AddEditPostComponent } from "src/app/admin-pages/add-edit-post/add-edit-post.component";
import { ArticlePostService } from "src/app/services/article-post.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-admin-pages",
  templateUrl: "./admin-pages.component.html",
  styleUrls: ["./admin-pages.component.scss"],
})
export class AdminPagesComponent implements OnInit {
  auth_user: any;
  menu = "vertical";

  constructor(
    private cd: ChangeDetectorRef,
    public authService: AuthService,
    public dialog: MatDialog,
    private articleService: ArticlePostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService
      .findUserById(this.authService.getUserId())
      .subscribe((data) => {
        if (data.response.success) {
          this.auth_user = data.response.user;
          this.cd.detectChanges();
        }
      });
  }

  addPostDialog() {
    const dialogRef = this.dialog.open(AddEditPostComponent, {
      width: "100%",
      height: "685px",
    });

    dialogRef.afterClosed().subscribe((result) => {
	console.log(result)
      this.articleService
        .newPost(
          result.title,
          result.sub_title,
          result.content,
          result.article_image,
          result.topicId
        )
        .subscribe((data) => {
          if (data.response.success) {
            this.articleService.getArticles().subscribe((artData) => {
              if (artData.response.success) {
                artData.response.articles.push(data.response.article);
                this.snackBar.open(data.response.msg, "success", {
                  duration: 5000,
                });
              }
            });
          }
        });
    });
  }
}
