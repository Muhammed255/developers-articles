import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import {
  emailValidator,
  matchingPasswords,
} from "src/app/helpers/app-validators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  imagePreview: string;

  constructor(
    public formBuilder: FormBuilder,
    public flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        name: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        username: [
          null,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        email: [
          null,
          Validators.compose([Validators.required, emailValidator]),
        ],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        bio: [
          "",
          Validators.compose([Validators.required, Validators.minLength(10)]),
        ],
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({ imageUrl: file });
    this.registerForm.get("imageUrl").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.authService
      .createUser(
        this.registerForm.value.name,
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.bio
      )
      .subscribe((data) => {
        if (data.response.success) {
          this.flashMessagesService.show(data.response.message, {
            cssClass: "alert-success",
            timeout: 3000,
          });
          this.router.navigateByUrl("/account/email-confirmation");
        } else {
          this.flashMessagesService.show(data.response.message, {
            cssClass: "alert-danger",
            timeout: 3000,
          });
          return;
        }
      });
  }
}
