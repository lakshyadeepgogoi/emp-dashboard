# 🏢 Mini Employee Dashboard

A modern, feature-rich employee management dashboard built with **Angular 19** and **TypeScript**. This application allows you to efficiently manage employee records with a beautiful, responsive UI.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

### Core Features
- ✅ **List Employees** - View all employees in a beautiful card grid layout
- ✅ **Add Employees** - Add new employees with a validated form
- ✅ **Edit Employees** - Update existing employee information
- ✅ **Delete Employees** - Remove employees with confirmation dialog

### Data Handling
- 🔄 **Angular Services** - Centralized state management using Angular signals
- 💾 **LocalStorage Persistence** - All data persists across browser sessions

### Employee Fields
- 👤 **Name** - Minimum 3 characters, letters only
- 📧 **Email** - Valid email format required
- 🏢 **Department** - Dropdown selection (HR, Engineering, Sales, Marketing, Finance, Operations)
- 📅 **Date of Joining** - Cannot be a future date

### UI Features
- 🔍 **Search** - Case-insensitive search by name or email
- 🏷️ **Filter** - Filter by department
- ↕️ **Sort** - Sort by name or date of joining (ascending/descending)
- 📊 **Results Counter** - Shows filtered vs total count

### Validation
- ✓ Name: Required, minimum 3 characters, letters and spaces only
- ✓ Email: Required, valid email format
- ✓ Department: Required selection
- ✓ Date of Joining: Required, must not be a future date

### 🎁 Bonus Features (Implemented!)
- 📁 **Export to CSV** - Export employee list with one click
- 🌙 **Dark Mode Toggle** - Beautiful dark theme with system preference detection

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```
   or
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🛠️ Technical Implementation

### Angular Features Used
- **Standalone Components** - Modern component architecture without NgModules
- **Signals** - Reactive state management with Angular signals
- **Reactive Forms** - Form handling with FormBuilder and validators
- **Input/Output** - Component communication using signal-based inputs
- **Dependency Injection** - Service injection with `inject()` function

### JavaScript Skills Demonstrated
- Array methods (map, filter, sort, find)
- LocalStorage for data persistence
- Date handling and validation
- CSV generation and file download
- String manipulation for search

### CSS Features
- CSS Custom Properties (variables) for theming
- Flexbox and CSS Grid layouts
- Modern animations and transitions
- Responsive design with media queries
- Glassmorphism and gradient effects

## 📝 Assumptions

1. **Data Persistence**: Employee data is stored in the browser's LocalStorage. Data is not synced across devices.

2. **Department List**: A predefined list of departments is used (HR, Engineering, Sales, Marketing, Finance, Operations). This list is not user-configurable.

3. **Unique Identification**: Each employee is assigned a unique ID generated using timestamp and random string. Email uniqueness is not enforced.

4. **Browser Support**: The application is optimized for modern browsers (Chrome, Firefox, Safari, Edge). Internet Explorer is not supported.

5. **Date Validation**: The "Date of Joining" validation uses the browser's local date/time for comparison.

## 🎨 Design Decisions

- **Card Layout**: Chose card-based design for better visual hierarchy and mobile experience
- **Color Coding**: Each department has a unique color badge for quick identification
- **Avatar Initials**: Used initials-based avatars with gradient backgrounds
- **Dark Mode**: Implemented with CSS variables for seamless theme switching
- **Form Modal**: Used modal overlay for add/edit to maintain context

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1400px+)

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Angular
