import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactServiceService } from '../../services/contact-service.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contactList: any;
  contactListForm:any
  filteredContactList: any;
  sortOrder: string = 'asc';

  constructor(
    private contactServiceService: ContactServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.fetchContact();
    this.contactListForm = this.fb.group({
      name: [''],
      emailId: ['']
    });
  }

  fetchContact() {
    this.contactServiceService.fetchContactDetailsList().subscribe(res => {
      this.contactList = res;
      this.filteredContactList = this.contactList; 
    });
  }

  filterContactList() {
    const nameFilterValue = this.contactListForm.get('name')?.value || '';
    const emailIdFilterValue = this.contactListForm.get('emailId')?.value || '';
  
    if (!nameFilterValue && !emailIdFilterValue) {
      this.filteredContactList = this.contactList;
      return;
    }
  
    this.filteredContactList = this.contactList.filter((contact: any) => {
      const nameMatches = contact.name.toLowerCase().startsWith(nameFilterValue.toLowerCase());
      const emailIdMatches = contact.emailId.toLowerCase().startsWith(emailIdFilterValue.toLowerCase());
      return nameMatches && emailIdMatches;
    });
    this.sortContacts();
  }

  sortContacts() {
    this.filteredContactList.sort((a: { name: string; }, b: { name: string; }) => {
      return this.sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortContacts();
  }

  openUpdateContactDetailsPage(row: any) {
    this.contactServiceService.getContactDetailsById(row.id, row)

    this.router.navigate(['/update-contact']);
  }

  openViewContactDetailsPage(row: any) {
    this.contactServiceService.getContactDetailsById(row.id, row);
    this.router.navigate(['/update-contact'],{ queryParams: { viewMode: true } });
  }

  openDeleteContactDetailsPage(contact: any) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.contactServiceService.deleteContact(contact.id).subscribe(res => {
        this.fetchContact();
      })
    }

  }

}
