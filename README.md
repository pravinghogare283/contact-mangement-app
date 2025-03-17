# ContactMangementApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.3.

##Installation & Setup
Prerequisites
Install Node.js (v14 or later)
Install Angular CLI
Install JSON Server
Step 1: Clone the Repository
                   git clone <repository-url>
                   cd contact-management-app
Step 2: Install Dependencies
                    npm install
Step 3: Start JSON Server
                   json-server --watch db.json --port 3000
Step 4: Start Angular Application
                   ng serve
##Architecture & Components Overview
 Project Structure
contact-management-app/
│── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── contact-list/
│   │   │   │   ├── contact-list.component.ts
│   │   │   │   ├── contact-list.component.html
│   │   │   │   ├── contact-list.component.css
│   │   │   ├── add-new-contact/
│   │   │   │   ├── add-new-contact.component.ts
│   │   │   │   ├── add-new-contact.component.html
│   │   │   │   ├── add-new-contact.component.css
│   │   │   ├── update-contact/
│   │   │   │   ├── update-contact.component.ts
│   │   │   │   ├── update-contact.component.html
│   │   │   │   ├── update-contact.component.css       
│   │   ├── services/
│   │   │   ├── contact-service.service.ts
│   │   ├── app.config
│   │   ├── app.routes
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.ts
│   ├── index.html
│   ├── styles.css
│   |── db.json
│   ├── main.ts
│── package.json
│── angular.json
│── README.md


##Key Features Implemented
✅ Bootstrap 5 UI
✅ Contact List
✅ Search & Filtering by Name/Email
✅ Sorting Contacts (Ascending/Descending by Name)
✅ Adding Contacts (Reactive Forms )
✅ Editing & Deleting Contacts
✅ Bootstrap Table for Listing Contacts
✅ Persistent Data Storage using JSON Server






                     
