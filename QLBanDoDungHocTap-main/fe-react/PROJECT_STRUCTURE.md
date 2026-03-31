# Cấu trúc dự án React - Quản lý chi tiêu

## Cấu trúc thư mục

```
fe-react/
├── public/                     # Tài nguyên tĩnh
│   ├── images/                 # Ảnh tĩnh
│   └── index.html
│
├── src/
│   ├── assets/                 # Tài nguyên import qua bundler
│   │   ├── images/             # Ảnh, icons
│   │   ├── fonts/              # Font chữ
│   │   └── styles/             # CSS global
│   │       ├── global.css      # Style toàn cục
│   │       └── auth.css        # Style xác thực
│   │
│   ├── components/             # Component dùng chung
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Layout.css
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.css
│   │   ├── ProtectedRoute/
│   │   │   └── ProtectedRoute.tsx
│   │   └── index.ts            # Re-export components
│   │
│   ├── pages/                  # Các trang của ứng dụng
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── Login/
│   │   │   ├── Login.tsx
│   │   │   └── Login.css
│   │   ├── Register/
│   │   │   ├── Register.tsx
│   │   │   └── Register.css
│   │   ├── Transaction/
│   │   │   ├── Transaction.tsx
│   │   │   └── Transaction.css
│   │   ├── Wallet/
│   │   │   ├── Wallet.tsx
│   │   │   └── Wallet.css
│   │   ├── Category/
│   │   │   ├── Category.tsx
│   │   │   └── Category.css
│   │   ├── Budget/
│   │   │   ├── Budget.tsx
│   │   │   └── Budget.css
│   │   ├── Goal/
│   │   │   ├── Goal.tsx
│   │   │   └── Goal.css
│   │   ├── Admin/
│   │   │   ├── Admin.tsx
│   │   │   └── Admin.css
│   │   └── index.ts
│   │
│   ├── services/               # Gọi API, tách theo domain
│   │   ├── auth.service.ts     # Xác thực
│   │   ├── wallet.service.ts   # Ví
│   │   ├── category.service.ts # Danh mục
│   │   ├── transaction.service.ts # Giao dịch
│   │   └── transfer.service.ts # Chuyển tiền
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useFetch.ts
│   │
│   ├── types/                  # TypeScript interfaces/types
│   │   ├── user.type.ts
│   │   ├── wallet.type.ts
│   │   ├── category.type.ts
│   │   ├── transaction.type.ts
│   │   ├── transfer.type.ts
│   │   └── budget.type.ts
│   │
│   ├── contexts/               # React Context providers
│   │   └── AuthContext.tsx
│   │
│   ├── config/                 # Cấu hình app
│   │   ├── api.ts              # API base URL
│   │   ├── axios.ts            # Axios config
│   │   └── constants.ts        # Hằng số
│   │
│   ├── utils/                  # Helper functions
│   │   ├── format.ts           # Format chung
│   │   ├── formatDate.ts       # Format ngày
│   │   ├── formatMoney.ts      # Format tiền
│   │   └── storage.ts          # LocalStorage helper
│   │
│   ├── routes/                 # Cấu hình routing
│   │   └── index.tsx
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .gitignore
```

## Quy ước đặt tên

### Components
- Tên file: PascalCase (VD: `Header.tsx`, `UserProfile.tsx`)
- Tên component: PascalCase
- CSS file: cùng tên với component (VD: `Header.css`)

### Services
- Tên file: camelCase + `.service.ts` (VD: `auth.service.ts`)
- Export: named exports

### Types
- Tên file: camelCase + `.type.ts` (VD: `user.type.ts`)
- Interface/Type: PascalCase (VD: `User`, `Transaction`)

### Utils
- Tên file: camelCase (VD: `formatDate.ts`, `storage.ts`)
- Function: camelCase

### Pages
- Mỗi page có thư mục riêng
- File chính: PascalCase (VD: `Dashboard.tsx`)
- CSS: cùng tên (VD: `Dashboard.css`)

## Import Guidelines

```typescript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Third-party imports
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 3. Internal imports - absolute paths
import { Button } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user.type';
import { formatDate } from '@/utils/formatDate';

// 4. Styles
import './Dashboard.css';
```

## Best Practices

1. **Component Organization**
   - Một component = một thư mục
   - Bao gồm: `.tsx`, `.css`, và test files (nếu có)

2. **State Management**
   - Local state: `useState`
   - Global state: Context API
   - Server state: React Query (nếu cần)

3. **API Calls**
   - Tất cả API calls trong `services/`
   - Sử dụng axios instance từ `config/axios.ts`

4. **Type Safety**
   - Định nghĩa types trong `types/`
   - Sử dụng TypeScript strict mode

5. **Styling**
   - CSS Modules hoặc CSS-in-JS
   - Global styles trong `assets/styles/`
   - Component-specific styles cùng thư mục

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```
