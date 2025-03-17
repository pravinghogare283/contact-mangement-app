import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ContactServiceService } from '../../services/contact-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-contact.component.html',
  styleUrl: './add-new-contact.component.css'
})
export class AddNewContactComponent {

  contactForm: any;
  constructor(
    private contactServiceService: ContactServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      emailId: ['', [Validators.required,Validators.email]],
      phoneNo: ['', [Validators.pattern('^[0-9\]+$'), this.mobileNumberValidator()]]
    });
  }

  getFormControlError(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
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
  

  onSubmitContactDetails() {
    this.contactForm.markAllAsTouched();
    this.contactForm.updateValueAndValidity();
    if (this.contactForm.invalid) {
      return;
    }
    console.log("form value---", this.contactForm.value);
    this.contactServiceService.addNewContact(this.contactForm.value).subscribe(res => {
      console.log("result---", res);
      this.router.navigate(['/contact-list']);
    })
  }

  backToContactList() {
    this.router.navigate(['/contact-list']);
  }








}
