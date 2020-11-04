import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: ['./resend-confirmation.component.scss']
})
export class ResendConfirmationComponent implements OnInit {

  isLoading = false;
  constructor(private authService: AuthService, private router: Router, public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.authService.resend_confirmation(form.value.email).subscribe(data => {
      if(data.response.success) {
        this.isLoading = true;
        this.flashMessagesService.show(data.response.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/account/email-confirmation']);
      } else {
        this.flashMessagesService.show(data.response.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
      return;
    })
  }

}
