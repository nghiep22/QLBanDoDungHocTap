# 🔌 API Connection Guide

## ✅ Đã hoàn thành

### 1. Services Layer
Tất cả API services đã được tạo và kết nối với backend:

- ✅ `auth.service.ts` - Authentication (Login, Register, Get Me)
- ✅ `wallet.service.ts` - Wallet management (CRUD operations)
- ✅ `category.service.ts` - Category management (CRUD operations)
- ✅ `transaction.service.ts` - Transaction management (CRUD + filters)
- ✅ `transfer.service.ts` - Wallet transfers

### 2. TypeScript Types
Tất cả types đã được định nghĩa match với backend models:

- ✅ `user.type.ts` - User, LoginRequest, LoginResponse
- ✅ `wallet.type.ts` - Wallet, WalletCreateRequest, WalletUpdateRequest
- ✅ `category.type.ts` - Category và các request types
- ✅ `transaction.type.ts` - Transaction và query params
- ✅ `transfer.type.ts` - WalletTransfer và request types

### 3. Axios Configuration
- ✅ Base URL: `http://localhost:7001`
- ✅ Auto token injection via interceptor
- ✅ Error handling structure

## 🚀 Cách sử dụng Services

### Authentication

```typescript
import { authService } from '../services/auth.service';
import { saveSession } from '../utils/storage';

// Login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authService.login(email, password);
    saveSession(response.token, response.user, true);
    // Navigate to dashboard
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const handleRegister = async (data: RegisterRequest) => {
  try {
    await authService.register(data);
    // Navigate to login
  } catch (error) {
    console.error('Register failed:', error);
  }
};
```

### Wallet Management

```typescript
import { walletService } from '../services/wallet.service';
import { getUserId } from '../utils/storage';

// Get all wallets
const loadWallets = async () => {
  try {
    const userId = getUserId();
    const wallets = await walletService.getWallets(userId);
    setWallets(wallets);
  } catch (error) {
    console.error('Failed to load wallets:', error);
  }
};

// Create wallet
const createWallet = async (data: WalletCreateRequest) => {
  try {
    const result = await walletService.createWallet(data);
    console.log('Created wallet ID:', result.id);
    loadWallets(); // Reload list
  } catch (error) {
    console.error('Failed to create wallet:', error);
  }
};

// Update wallet
const updateWallet = async (id: number, data: WalletUpdateRequest) => {
  try {
    const userId = getUserId();
    await walletService.updateWallet(id, userId, data);
    loadWallets(); // Reload list
  } catch (error) {
    console.error('Failed to update wallet:', error);
  }
};

// Delete wallet
const deleteWallet = async (id: number) => {
  try {
    const userId = getUserId();
    await walletService.deleteWallet(id, userId);
    loadWallets(); // Reload list
  } catch (error) {
    console.error('Failed to delete wallet:', error);
  }
};
```

### Category Management

```typescript
import { categoryService } from '../services/category.service';

// Get categories by type
const loadCategories = async (loai?: 'THU' | 'CHI') => {
  try {
    const userId = getUserId();
    const categories = await categoryService.getCategories(userId, loai);
    setCategories(categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
};

// Create category
const createCategory = async (data: CategoryCreateRequest) => {
  try {
    const result = await categoryService.createCategory(data);
    console.log('Created category ID:', result.id);
    loadCategories();
  } catch (error) {
    console.error('Failed to create category:', error);
  }
};
```

### Transaction Management

```typescript
import { transactionService } from '../services/transaction.service';

// Get transactions with filters
const loadTransactions = async (filters: TransactionQueryParams) => {
  try {
    const response = await transactionService.getTransactions({
      taiKhoanId: getUserId(),
      page: 1,
      pageSize: 20,
      sort: 'NgayGD_desc',
      ...filters,
    });
    
    setTransactions(response.items);
    setTotalPages(response.totalPages);
  } catch (error) {
    console.error('Failed to load transactions:', error);
  }
};

// Create transaction
const createTransaction = async (data: TransactionCreateRequest) => {
  try {
    const result = await transactionService.createTransaction(data);
    console.log('Created transaction ID:', result.id);
    loadTransactions({});
  } catch (error) {
    console.error('Failed to create transaction:', error);
  }
};

// Example: Filter by date range
const filterByDateRange = async (from: string, to: string) => {
  await loadTransactions({
    taiKhoanId: getUserId(),
    from,
    to,
  });
};

// Example: Filter by wallet
const filterByWallet = async (viId: number) => {
  await loadTransactions({
    taiKhoanId: getUserId(),
    viId,
  });
};
```

### Wallet Transfer

```typescript
import { transferService } from '../services/transfer.service';

// Create transfer
const createTransfer = async (data: WalletTransferCreateRequest) => {
  try {
    const result = await transferService.createTransfer(data);
    console.log('Created transfer:', result);
  } catch (error) {
    console.error('Failed to create transfer:', error);
  }
};

// Get transfers
const loadTransfers = async () => {
  try {
    const transfers = await transferService.getTransfers({
      taiKhoanId: getUserId(),
      page: 1,
      pageSize: 20,
    });
    setTransfers(transfers);
  } catch (error) {
    console.error('Failed to load transfers:', error);
  }
};
```

## 🔧 Backend Setup Required

### 1. Start Backend Services

```bash
# Start API Gateway (Port 7001)
cd Quanlychitieu-main/be/API_GETWAY
dotnet run

# Start Login API (Port 7072)
cd Quanlychitieu-main/be/API_Login
dotnet run

# Start Wallet/Budget API (Port 44308)
cd Quanlychitieu-main/be/WalletBudgetSolution
dotnet run
```

### 2. Configure CORS in Backend

Trong mỗi API project, thêm CORS configuration:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ...

app.UseCors("AllowReact");
```

### 3. Verify API Gateway Routes

File: `API_GETWAY/ocelot.json`

Đảm bảo routes đã được cấu hình đúng:
- `/login/{everything}` → Login API
- `/api/{everything}` → Wallet/Budget API
- `/walletbudget/{everything}` → Wallet/Budget API

## 🧪 Testing API Connections

### Test Login
```typescript
// In browser console or test file
import { authService } from './services/auth.service';

authService.login('test@email.com', 'password')
  .then(response => console.log('Success:', response))
  .catch(error => console.error('Error:', error));
```

### Test Wallet API
```typescript
import { walletService } from './services/wallet.service';

walletService.getWallets(1)
  .then(wallets => console.log('Wallets:', wallets))
  .catch(error => console.error('Error:', error));
```

## 📋 Checklist

### Frontend
- [x] Services created
- [x] Types defined
- [x] Axios configured
- [x] Login page integrated
- [x] Register page integrated
- [ ] Wallet page integrated (next step)
- [ ] Category page integrated (next step)
- [ ] Transaction page integrated (next step)

### Backend
- [ ] API Gateway running (Port 7001)
- [ ] Login API running (Port 7072)
- [ ] Wallet/Budget API running (Port 44308)
- [ ] CORS configured
- [ ] Database connected
- [ ] Test endpoints working

## 🐛 Troubleshooting

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Add CORS policy in backend as shown above

### 401 Unauthorized
```
401 Unauthorized
```
**Solution:** Check if token is being sent in Authorization header

### Network Error
```
Network Error
```
**Solution:** 
1. Check if backend is running
2. Verify ports are correct
3. Check firewall settings

### 404 Not Found
```
404 Not Found
```
**Solution:**
1. Verify API Gateway routes in ocelot.json
2. Check endpoint paths in services
3. Ensure backend controllers are registered

## 📞 Next Steps

1. **Start Backend Services**
   ```bash
   # Terminal 1
   cd be/API_GETWAY && dotnet run
   
   # Terminal 2
   cd be/API_Login && dotnet run
   
   # Terminal 3
   cd be/WalletBudgetSolution && dotnet run
   ```

2. **Start Frontend**
   ```bash
   cd fe-react
   npm run dev
   ```

3. **Test Login**
   - Open http://localhost:5173
   - Try to login with test credentials
   - Check browser console for any errors

4. **Implement Pages**
   - Use services in Wallet page
   - Use services in Category page
   - Use services in Transaction page

## 🎉 Ready to Connect!

All services are ready. Just start the backend and begin implementing the UI pages!
