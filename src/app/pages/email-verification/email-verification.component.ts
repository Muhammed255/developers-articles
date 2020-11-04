import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.confirm_email(form.value.token).subscribe(
      (data) => {
        if(data.response.success) {
          this.isLoading = true;
          this.flashMessagesService.show(data.response.msg, {
            cssClass: 'alert-success',
            timeout: 3000,
          });
          this.router.navigate(['/account/login']);
        } else {
          this.flashMessagesService.show(data.response.msg, {
            cssClass: 'alert-danger',
            timeout: 3000,
          });
          return;
        }
      }
    );
  }
}
