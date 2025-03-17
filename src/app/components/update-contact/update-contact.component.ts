import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, Form, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactServiceService } from '../../services/contact-service.service';

@Component({
  selector: 'app-update-contact',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent {
  updateContactForm: any;
  contactDetailsData: any;
  viewMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactServiceService: ContactServiceService,
    private router: Router,
    private ActivatedRoute : ActivatedRoute,
  ) {
    this.contactServiceService.getContactDetails().subscribe(res => {
      console.log("result---", res);
      this.contactDetailsData = res;
    })
   }

   ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe(params => {
      this.viewMode = params['viewMode'] === 'true';
  
      // Ensure contactDetailsData is initialized before using it
      this.updateContactForm = this.fb.group({
        name: [this.contactDetailsData?.name || '', [Validators.required]],
        emailId: [this.contactDetailsData?.emailId || '', [Validators.required]],
        phoneNo: [this.contactDetailsData?.phoneNo || '', [Validators.pattern('^[0-9]+$'), this.mobileNumberValidator()]]
      });
  
      // Disable form if in view mode
      if (this.viewMode) {
        this.updateContactForm.disable();
      }
    });
  }

  getFormControlError(fieldName: string): string {
    const control = this.updateContactForm.get(fieldName);
    if (fieldName === 'phoneNo' ) {
      if (control.value && control.invalid && control.touched) {
        if (control.hasError('invalidMobileNumber')) {
          return `Please enter valid ${fieldName.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}. `;
        }
      }
    }
    if (control?.invalid && control?.touched) {
      if (control.hasError('required')) {
        return `Please enter ${fieldName.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}.`;
      }
      if (control.hasError('email')) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const mobileNumber = control.value;
  
      if (!mobileNumber) {
        return null;
      }
  
      const isStartingWith91 = mobileNumber.startsWith('91');
      const isStartingWithZero = mobileNumber.startsWith('0');
      const isTenDigitsLong = mobileNumber.length === 10;
      const isTwelveDigitsLong = mobileNumber.length === 12;
  
      // Validate 10 digit number not starting with 0
      if (isTenDigitsLong && isStartingWithZero) {
        return { 'invalidMobileNumber': true };
      }
  
      // Validate 12 digit number starting with 91 and not followed by 0
      if (isTwelveDigitsLong && isStartingWith91 && mobileNumber[2] === '0') {
        return { 'invalidMobileNumber': true };
      }
  
      // Valid cases
      if ((isTenDigitsLong && !isStartingWithZero) || (isTwelveDigitsLong && isStartingWith91 && mobileNumber[2] !== '0')) {
        return null;
      }
  
      // Invalid cases
      return { 'invalidMobileNumber': true };
    };
  }
  backToContactList(){
    this.router.navigate(['/contact-list']);

  }

  onUpdateContactDetails(){
    this.updateContactForm.markAllAsTouched();
    this.updateContactForm.updateValueAndValidity();
    if (this.updateContactForm.invalid) {
      return;
    }
    console.log("form value---", this.updateContactForm.value);
    this.contactServiceService.updateContact(this.contactDetailsData.id, this.updateContactForm.value).subscribe(res => {
      console.log("result---", res);
      this.router.navigate(['/contact-list']);
    })
  }

}
