# Quản lý chi tiêu - Frontend React

Ứng dụng quản lý chi tiêu cá nhân được xây dựng với React, TypeScript, và Vite.

## 🚀 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 📁 Cấu trúc dự án

```
src/
├── assets/          # Tài nguyên tĩnh (images, fonts, styles)
├── components/      # Components dùng chung
├── pages/          # Các trang của ứng dụng
├── services/       # API services
├── hooks/          # Custom React hooks
├── types/          # TypeScript types
├── contexts/       # React Context
├── config/         # Cấu hình
├── utils/          # Helper functions
└── routes/         # Routing configuration
```

## 🎯 Tính năng

- ✅ Đăng nhập / Đăng ký
- ✅ Quản lý ví tiền
- ✅ Quản lý giao dịch thu chi
- ✅ Quản lý danh mục
- ✅ Lập ngân sách
- ✅ Đặt mục tiêu tài chính
- ✅ Dashboard tổng quan

## 🔧 Công nghệ sử dụng

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 🌐 API Configuration

API Gateway mặc định: `http://localhost:7001`

Có thể thay đổi trong file `src/config/axios.ts`

## 📝 Scripts

- `npm run dev` - Chạy development server (port 5173)
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🎨 Pages

- `/login` - Trang đăng nhập
- `/register` - Trang đăng ký
- `/dashboard` - Tổng quan
- `/transactions` - Quản lý giao dịch
- `/wallets` - Quản lý ví
- `/categories` - Quản lý danh mục
- `/budgets` - Quản lý ngân sách
- `/goals` - Quản lý mục tiêu
- `/admin` - Trang quản trị (chỉ admin)

## 🔐 Authentication

Ứng dụng sử dụng JWT token để xác thực. Token được lưu trong localStorage hoặc sessionStorage tùy theo lựa chọn "Ghi nhớ đăng nhập".

## 📦 Dependencies chính

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.3",
  "axios": "^1.7.9",
  "typescript": "~5.6.2",
  "vite": "^6.0.5"
}
```

## 🚧 Development

1. Clone repository
2. Cài đặt dependencies: `npm install`
3. Chạy dev server: `npm run dev`
4. Mở browser tại: `http://localhost:5173`

## 📄 License

MIT
