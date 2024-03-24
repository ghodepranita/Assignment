import { HttpClient } from '@angular/common/http';
import { SharedDataService } from './../../Servies/shared-data.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  isLoading = false;
  private subscriptions: Subscription[] = [];
  imageUrl: string | undefined;

  imageData: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private _toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private _service: SharedDataService,
    private chef: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    debugger
    this.initForm();
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
          imageName: [''],
      imagePath: ['']
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // address: ['']
    });
    const imageData = this.route.snapshot.paramMap.get('imageData');
    if (imageData) {
      // Display the image preview
      this.imageUrl = imageData;
    }
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const sub = this._service.getUserById(userId).pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          this._toaster.error('Error fetching user data');
          return of(null);
        })
      ).subscribe(userData => {
        if (userData) {
          this.registrationForm.patchValue(userData);
        }
      });

      this.subscriptions.push(sub);
    }
  }

  submitData(): void {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      const userData = this.registrationForm.value;
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
        const sub = this._service.updateUser(userId, userData).subscribe(
          data => {
            this._toaster.success('Data updated successfully!');
            this.clearFormDataAndRedirect();
          }
        );

        this.subscriptions.push(sub);
      } else {
        this.saveDataToService1();
        this.clearFormDataAndRedirect();
        this._toaster.success('Data saved successfully!');
      }
    }
  }

  saveDataToService(): void {
    const userData = this.registrationForm.value;
    this._service.savePost(userData);
  }

  saveDataToService1(): void {
    const userData = this.registrationForm.value;
    const sub = this._service.savePost(userData).subscribe(
      response => {
        console.log('Data saved successfully:', response);
      },
      error => {
        console.error('Error saving data:', error);
      }
    );

    this.subscriptions.push(sub);
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





// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     const imageName = file.name;
//     const imagePath = `C:\Users\Admin\OneDrive\Pictures\Screenshots/${imageName}`; // Adjust the path as needed
//     console.log('Image Name:', imageName);
//     console.log('Image Path:', imagePath);
//     this.registrationForm.patchValue({
//       imageName: imageName,
//       imagePath: imagePath
//     });
//   }
// }


// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       const imageData = reader.result as string;
//       localStorage.setItem('imageData', imageData);
//       this.imageUrl = imageData; // Display the selected image
//     };
//   }
// }

// onFileSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     const imagePath = `assets/UploadImages/${file.name}`;
//     this.registrationForm.patchValue({ imagePath: imagePath });
//     // Optionally, you can display a preview of the selected image
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       this.imageUrl = reader.result as string;
//     };
//   }
// }


onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Save the image data (base64 string) to a variable or property
      this.imageData = reader.result as string;
      // Save the image path and name to your form or wherever you need
      const imageName = file.name;
      const imagePath = `assets/UploadImages/${imageName}`;
      this.registrationForm.patchValue({ imageName, imagePath });
      // Optionally, you can also display a preview of the selected image
      this.imageUrl = this.imageData;
    };
  }
}




  

}
