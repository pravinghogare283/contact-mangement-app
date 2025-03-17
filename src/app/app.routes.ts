import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddNewContactComponent } from './components/add-new-contact/add-new-contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';

export const routes: Routes = [
    {path: 'contact-list',component:ContactListComponent},
    {path:'add-contact',component:AddNewContactComponent},
    {path:'update-contact',component:UpdateContactComponent},
];
