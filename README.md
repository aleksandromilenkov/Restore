# ReStore - E-Commerce Platform

<img width="942" alt="Image" src="https://github.com/user-attachments/assets/3818fd86-3338-4cdb-a2a2-355d18e15c95" />

## 🚀 Overview
ReStore is a modern e-commerce web application built with **ASP.NET Web API** and **React**. It allows users to browse products, add them to the cart, and complete their purchases through **Stripe** payments. The application includes features like **authentication, order management, discount codes, admin inventory management, and more**.

## ✨ Features
### 🛒 Shopping & Checkout
- Browse products with **search, filtering, and pagination**.
- View product details on a separate product page.
- Add products to the cart directly from the catalog or product page.
- View cart items with the ability to **increase, decrease, or remove items**.
- Checkout process with **address input, payment via Stripe, and order summary**.
- **Discount codes** applied at checkout (managed via Stripe).
- Orders are processed with **Stripe webhooks** for real-time payment status updates.
- Users can view their **order history**.

### 🔐 Authentication & User Management
- **Register & login** to place orders.
- **IdentityUser with cookie-based authentication**.
- Profile page to **update profile image, email, and password**.
- **Logout functionality**.

### 🛠️ Admin & Inventory Management
- **Admins can create, update, and delete products** via the inventory page.
- Product images are uploaded using **Cloudinary**.
- Secure role-based access for admin functionalities.

### 🎨 UI/UX Features
- **Modern design with Material UI**.
- **Dark mode support**.
- **Toast notifications** for user interactions.
- **Smooth navigation with React Router**.

## 🏗️ Tech Stack
### Backend: **ASP.NET Web API**
- **Entity Framework Core** for database management.
- **SQL Server** for data storage.
- **Cloudinary** for image uploads.
- **Stripe** for payment processing.
- **Middleware for exception handling & security**.
- **DTOs for optimized data transfer**.

### Frontend: **React**
- **Redux Toolkit & RTK Query** for state management.
- **React Hook Form** for form handling.
- **React Router** for navigation.
- **Material UI** for a beautiful UI.
- **React Dropzone** for file uploads.
- **JS Cookie** for cookie management.
- **Toastify** for user notifications.
- **Redux Persist** for persisting state.

## 📸 Screenshots
| Home Page | Product Page | Cart | Checkout |
|-----------|-------------|------|----------|
| ![Home](https://your-image-url.com/home.png) | ![Product](https://your-image-url.com/product.png) | ![Cart](https://your-image-url.com/cart.png) | ![Checkout](https://your-image-url.com/checkout.png) |

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/reStore.git
cd reStore
```

### 2️⃣ Backend Setup
```sh
cd backend
# Install dependencies
dotnet restore
# Apply migrations
dotnet ef database update
# Run the API
dotnet run
```

### 3️⃣ Frontend Setup
```sh
cd frontend
# Install dependencies
yarn install  # or npm install
# Start the React app
yarn start  # or npm start
```

## 🎯 Roadmap
- ✅ Product catalog with search & filtering
- ✅ Shopping cart functionality
- ✅ User authentication & profile management
- ✅ Checkout & payment with Stripe
- ✅ Order management
- 🔄 Wishlist feature (Coming Soon)
- 🔄 Email notifications for orders (Coming Soon)

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact
For inquiries or collaboration, contact me at [your-email@example.com](mailto:your-email@example.com).

---
### ⭐ If you like this project, don't forget to star the repo!

