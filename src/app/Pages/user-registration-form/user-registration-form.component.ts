import { SharedDataService } from './../../Servies/shared-data.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private _toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private _service:SharedDataService,
    private chef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(12)]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['']
    });
  }

  submitData(): void {
    if (this.registrationForm.valid) {
      this.isLoading = true;
     this.saveDataToService();
      this.clearFormDataAndRedirect();
      this._toaster.success('Data saved successfully!');
    }
  }
  saveDataToService(): void {
    const userData = this.registrationForm.value;
    this._service.saveUserData(userData);
  }

  numberOnly(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    if (!pattern.test(String.fromCharCode(event.charCode))) {
      event.preventDefault();
    }
    this.chef.detectChanges();
  }

  clearFormDataAndRedirect(): void {
    this.registrationForm.reset();
    this.router.navigate(['/user-list']);
    this.isLoading = false;
    this.chef.detectChanges();
  }
}
