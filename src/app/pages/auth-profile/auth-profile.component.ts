import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticlePostService } from "src/app/services/article-post.service";

import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth-profile",
  templateUrl: "./auth-profile.component.html",
  styleUrls: ["./auth-profile.component.scss"],
})
export class AuthProfileComponent implements OnInit {
  user: any;
  articles: any[];
  constructor(
    public authService: AuthService,
    private articleService: ArticlePostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("username")) {
        this.authService
          .findUserByUsername(paramMap.get("username"))
          .subscribe((data) => {
            if (data.response.success) {
              this.user = data.response.user;
              this.articleService
                .getSpceficAdminArticles(this.user._id)
                .subscribe((postData) => {
                  if (postData.response.success) {
                    this.articles = postData.response.articles;
                  }
                });
            }
          });
      }
    });
    // this.authService.findUserById(localStorage.getItem('userId')).subscribe(data => {
    //   if(data.response.success) {
    //     this.auth_user = data.response.user;
    //   }
    // })
  }

  truncateChar(text: string): string {
    let charlimit = 100;
    if (!text || text.length <= charlimit) {
      return text;
    }
    let without_html = text.replace(/<(?:.|\n)*?>/gm, "");
    let shortened =
      without_html.substring(0, charlimit) + "    Show more .............";
    return shortened;
  }
}
