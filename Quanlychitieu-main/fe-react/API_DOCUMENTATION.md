# API Documentation - Frontend Integration

## API Gateway Configuration

**Base URL:** `http://localhost:7001`

### Routes Configuration (Ocelot)

1. **Wallet & Budget API** - Port 44308 (HTTPS)
   - `/walletbudget/{everything}` → `https://localhost:44308/{everything}`
   - `/api/{everything}` → `https://localhost:44308/api/{everything}`

2. **Login API** - Port 7072 (HTTPS)
   - `/login/{everything}` → `https://localhost:7072/{everything}`

## Authentication API

### Base Path: `/login/api/auth`

#### 1. Login
```typescript
POST /login/api/auth/login
Body: {
  TenDangNhap: string,  // Email or username
  MatKhau: string
}
Response: {
  token: string,
  user: {
    id: number,
    tenDangNhap: string,
    hoTen: string,
    quyen: string
  }
}
```

#### 2. Get Current User
```typescript
GET /login/api/auth/me
Headers: Authorization: Bearer {token}
Response: {
  userName: string,
  claims: Array<{type: string, value: string}>
}
```

## Wallet API

### Base Path: `/api/wallets`

#### 1. Get All Wallets
```typescript
GET /api/wallets?taiKhoanId={id}&includeDeleted={bool}
Response: Wallet[]
```

#### 2. Get Single Wallet
```typescript
GET /api/wallets/{id}?taiKhoanId={id}&includeDeleted={bool}
Response: Wallet
```

#### 3. Create Wallet
```typescript
POST /api/wallets
Body: {
  taiKhoanId: number,
  tenVi: string,
  loaiVi: string,  // 'Tiền mặt' | 'Ngân hàng' | 'Ví điện tử'
  soDuBanDau: number,
  ghiChu?: string
}
Response: { id: number }
```

#### 4. Update Wallet
```typescript
PUT /api/wallets/{id}?taiKhoanId={id}
Body: WalletUpdateRequest
Response: 204 No Content
```

#### 5. Lock/Unlock Wallet
```typescript
PATCH /api/wallets/{id}/lock
Body: {
  taiKhoanId: number,
  isLocked: boolean
}
Response: 204 No Content
```

#### 6. Delete Wallet (Soft Delete)
```typescript
DELETE /api/wallets/{id}?taiKhoanId={id}
Response: 204 No Content
```

## Category API

### Base Path: `/api/categories`

#### 1. Get All Categories
```typescript
GET /api/categories?taiKhoanId={id}&loai={THU|CHI}&status={status}&includeDeleted={bool}
Response: Category[]
```

#### 2. Get Single Category
```typescript
GET /api/categories/{id}?taiKhoanId={id}&includeDeleted={bool}
Response: Category
```

#### 3. Create Category
```typescript
POST /api/categories
Body: {
  taiKhoanId: number,
  tenDanhMuc: string,
  loai: 'THU' | 'CHI',
  icon?: string,
  mauSac?: string,
  ghiChu?: string
}
Response: { id: number }
```

#### 4. Update Category
```typescript
PUT /api/categories/{id}
Body: CategoryUpdateRequest
Response: 204 No Content
```

#### 5. Lock/Unlock Category
```typescript
PATCH /api/categories/{id}/lock
Body: {
  taiKhoanId: number,
  isLocked: boolean
}
Response: 204 No Content
```

#### 6. Delete Category (Soft Delete)
```typescript
DELETE /api/categories/{id}?taiKhoanId={id}
Response: 204 No Content
```

## Transaction API

### Base Path: `/api/transactions`

#### 1. Get Transactions (with filters)
```typescript
GET /api/transactions?taiKhoanId={id}&from={date}&to={date}&viId={id}&danhMucId={id}&loai={THU|CHI}&q={search}&page={num}&pageSize={num}&sort={field_direction}&includeDeleted={bool}
Response: {
  items: Transaction[],
  total: number,
  page: number,
  pageSize: number,
  totalPages: number
}
```

#### 2. Get Single Transaction
```typescript
GET /api/transactions/{id}?taiKhoanId={id}&includeDeleted={bool}
Response: Transaction
```

#### 3. Create Transaction
```typescript
POST /api/transactions
Body: {
  taiKhoanId: number,
  viId: number,
  danhMucId: number,
  soTien: number,
  loaiGD: 'THU' | 'CHI',
  ngayGD: string,  // ISO date
  ghiChu?: string,
  anhHoaDon?: string
}
Response: { id: number }
```

#### 4. Update Transaction
```typescript
PUT /api/transactions/{id}
Body: TransactionUpdateRequest
Response: 204 No Content
```

#### 5. Delete Transaction (Soft Delete)
```typescript
DELETE /api/transactions/{id}?taiKhoanId={id}
Response: 204 No Content
```

#### 6. Restore Transaction
```typescript
PATCH /api/transactions/{id}/restore?taiKhoanId={id}
Response: 204 No Content
```

## Wallet Transfer API

### Base Path: `/api/wallet-transfers`

#### 1. Create Transfer
```typescript
POST /api/wallet-transfers
Body: {
  taiKhoanId: number,
  viNguonId: number,
  viDichId: number,
  soTien: number,
  ngayChuyen: string,  // ISO date
  ghiChu?: string
}
Response: WalletTransfer
```

#### 2. Get Transfers (with filters)
```typescript
GET /api/wallet-transfers?taiKhoanId={id}&from={date}&to={date}&viNguonId={id}&viDichId={id}&page={num}&pageSize={num}&includeDeleted={bool}
Response: WalletTransfer[]
```

#### 3. Get Single Transfer
```typescript
GET /api/wallet-transfers/{id}?taiKhoanId={id}
Response: WalletTransfer
```

#### 4. Delete Transfer (Soft Delete)
```typescript
DELETE /api/wallet-transfers/{id}?taiKhoanId={id}
Response: 204 No Content
```

## Error Responses

### Common Error Formats

```typescript
// 400 Bad Request
{
  message: string
}

// 401 Unauthorized
{
  message: "Sai tên đăng nhập hoặc mật khẩu"
}

// 404 Not Found
// Empty response or
{
  message: string
}

// 409 Conflict (Duplicate)
{
  message: "Tên ví đã tồn tại (chưa bị xóa)."
}
```

## Data Types

### Wallet
```typescript
interface Wallet {
  id: number;
  taiKhoanId: number;
  tenVi: string;
  loaiVi: string;
  soDuBanDau: number;
  ghiChu?: string;
  trangThai: string;  // 'Hoạt động' | 'Khóa'
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}
```

### Category
```typescript
interface Category {
  id: number;
  taiKhoanId: number;
  tenDanhMuc: string;
  loai: 'THU' | 'CHI';
  icon?: string;
  mauSac?: string;
  ghiChu?: string;
  trangThai: 'Hoạt động' | 'Khóa';
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}
```

### Transaction
```typescript
interface Transaction {
  id: number;
  taiKhoanId: number;
  viId: number;
  danhMucId: number;
  soTien: number;
  loaiGD: 'THU' | 'CHI';
  ngayGD: string;
  ghiChu?: string;
  anhHoaDon?: string;
  daXoa: boolean;
  ngayTao: string;
  ngayCapNhat: string;
}
```

### WalletTransfer
```typescript
interface WalletTransfer {
  id: number;
  taiKhoanId: number;
  viNguonId: number;
  viDichId: number;
  soTien: number;
  ngayChuyen: string;
  ghiChu?: string;
  giaoDichChiId: number;
  giaoDichThuId: number;
  trangThai: string;
  daXoa: boolean;
  ngayTao: string;
}
```

## Usage Examples

### Login Example
```typescript
import { authService } from './services/auth.service';

const login = async () => {
  try {
    const response = await authService.login('user@email.com', 'password');
    console.log('Token:', response.token);
    console.log('User:', response.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Get Wallets Example
```typescript
import { walletService } from './services/wallet.service';

const getWallets = async (userId: number) => {
  try {
    const wallets = await walletService.getWallets(userId);
    console.log('Wallets:', wallets);
  } catch (error) {
    console.error('Failed to get wallets:', error);
  }
};
```

### Create Transaction Example
```typescript
import { transactionService } from './services/transaction.service';

const createTransaction = async () => {
  try {
    const result = await transactionService.createTransaction({
      taiKhoanId: 1,
      viId: 1,
      danhMucId: 1,
      soTien: 100000,
      loaiGD: 'CHI',
      ngayGD: new Date().toISOString(),
      ghiChu: 'Mua sắm',
    });
    console.log('Created transaction ID:', result.id);
  } catch (error) {
    console.error('Failed to create transaction:', error);
  }
};
```

## Notes

1. **Authentication**: All protected endpoints require `Authorization: Bearer {token}` header
2. **Date Format**: Use ISO 8601 format (e.g., `2024-01-15T10:30:00Z`)
3. **Soft Delete**: Most delete operations are soft deletes (set `daXoa = true`)
4. **Pagination**: Default page size is 20, can be customized
5. **CORS**: Backend must allow origin `http://localhost:5173` for development
