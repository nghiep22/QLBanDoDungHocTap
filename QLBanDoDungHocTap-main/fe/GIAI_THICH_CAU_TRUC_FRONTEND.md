# GIẢI THÍCH TỔNG QUAN CẤU TRÚC FRONTEND

## 📂 Cấu trúc thư mục

```
fe/                                    # Thư mục gốc Frontend
├── public/                            # Tài nguyên tĩnh (hình ảnh, favicon)
├── src/                               # Mã nguồn chính
│   ├── components/                    # Các thành phần dùng chung
│   │   ├── Header/                    # Thanh đầu trang
│   │   │   ├── Header.tsx            # Component Header
│   │   │   └── styles.ts             # CSS cho Header
│   │   ├── Footer/                    # Chân trang
│   │   │   ├── Footer.tsx            # Component Footer
│   │   │   └── styles.ts             # CSS cho Footer
│   │   ├── ProductCard/               # Thẻ hiển thị sản phẩm
│   │   │   ├── ProductCard.tsx       # Component ProductCard
│   │   │   └── styles.ts             # CSS cho ProductCard
│   │   └── ProtectedRoute.tsx         # Bảo vệ route cần đăng nhập
│   │
│   ├── pages/                         # Các trang của ứng dụng
│   │   ├── Home/                      # Trang chủ
│   │   │   ├── Home.tsx              # Component trang chủ
│   │   │   └── styles.ts             # CSS cho trang chủ
│   │   ├── Login/                     # Trang đăng nhập
│   │   │   ├── Login.tsx             # Component đăng nhập
│   │   │   └── styles.ts             # CSS cho đăng nhập
│   │   ├── Register/                  # Trang đăng ký
│   │   │   └── Register.tsx          # Component đăng ký
│   │   ├── Category/                  # Trang danh mục sản phẩm
│   │   │   ├── Category.tsx          # Component danh mục
│   │   │   └── styles.ts             # CSS cho danh mục
│   │   ├── Cart/                      # Trang giỏ hàng
│   │   │   ├── Cart.tsx              # Component giỏ hàng
│   │   │   └── styles.ts             # CSS cho giỏ hàng
│   │   └── Admin/                     # Trang quản trị
│   │       ├── Admin.tsx             # Component quản trị
│   │       └── styles.ts             # CSS cho quản trị
│   │
│   ├── context/                       # Quản lý state toàn cục
│   │   ├── AuthContext.tsx           # Context đăng nhập
│   │   └── CartContext.tsx           # Context giỏ hàng
│   │
│   ├── services/                      # Dịch vụ gọi API
│   │   └── api.ts                    # Các hàm gọi backend
│   │
│   ├── types/                         # Định nghĩa kiểu dữ liệu
│   │   └── index.ts                  # TypeScript interfaces
│   │
│   ├── data/                          # Dữ liệu mẫu (mock data)
│   │   └── products.ts               # Danh sách sản phẩm mẫu
│   │
│   ├── styles/                        # CSS toàn cục
│   │   ├── GlobalStyles.ts           # CSS reset và global
│   │   └── theme.ts                  # Theme màu sắc, font
│   │
│   ├── App.tsx                        # Component gốc, định nghĩa routes
│   ├── main.tsx                       # Entry point, render App
│   └── vite-env.d.ts                 # TypeScript definitions
│
├── index.html                         # File HTML gốc
├── package.json                       # Dependencies và scripts
├── tsconfig.json                      # Cấu hình TypeScript
└── vite.config.ts                     # Cấu hình Vite (build tool)
```

---

## 🏗️ Kiến trúc Frontend (Architecture)

### 1. **Component-Based Architecture** (Kiến trúc dựa trên Component)

Frontend được chia thành các **component** (thành phần) nhỏ, độc lập, có thể tái sử dụng.

```
App (Ứng dụng gốc)
├── Header (Thanh đầu)
├── Routes (Định tuyến)
│   ├── Home (Trang chủ)
│   │   └── ProductCard (Thẻ sản phẩm) x N
│   ├── Category (Danh mục)
│   │   └── ProductCard x N
│   ├── Login (Đăng nhập)
│   ├── Cart (Giỏ hàng)
│   └── Admin (Quản trị)
└── Footer (Chân trang)
```

---

## 📦 Giải thích từng thư mục

### 1. **components/** - Các thành phần dùng chung

**Mục đích:** Chứa các component được sử dụng ở nhiều nơi trong ứng dụng.

#### a) **Header/** - Thanh đầu trang
```typescript
// Header.tsx
export const Header = () => {
  return (
    <header>
      <Logo />              // Logo Thiên Long
      <SearchBar />         // Ô tìm kiếm
      <CartButton />        // Nút giỏ hàng
      <UserMenu />          // Menu người dùng
    </header>
  );
};
```

**Chức năng:**
- Hiển thị logo
- Thanh tìm kiếm sản phẩm
- Nút giỏ hàng (hiển thị số lượng)
- Menu đăng nhập/đăng xuất
- Menu danh mục sản phẩm

**Xuất hiện ở:** Tất cả trang (trừ Login, Register, Admin)

---

#### b) **Footer/** - Chân trang
```typescript
// Footer.tsx
export const Footer = () => {
  return (
    <footer>
      <CompanyInfo />       // Thông tin công ty
      <Links />             // Các link hữu ích
      <SocialMedia />       // Mạng xã hội
      <Copyright />         // Bản quyền
    </footer>
  );
};
```

**Chức năng:**
- Thông tin liên hệ
- Link chính sách, hướng dẫn
- Link mạng xã hội
- Bản quyền

**Xuất hiện ở:** Tất cả trang (trừ Login, Register, Admin)

---

#### c) **ProductCard/** - Thẻ hiển thị sản phẩm
```typescript
// ProductCard.tsx
export const ProductCard = ({ sanPham }) => {
  return (
    <div className="card">
      <img src={sanPham.hinhAnh} />     // Hình ảnh
      <h3>{sanPham.ten}</h3>            // Tên sản phẩm
      <p>{sanPham.giaBan}₫</p>          // Giá
      <button>Thêm vào giỏ</button>     // Nút mua
    </div>
  );
};
```

**Chức năng:**
- Hiển thị thông tin sản phẩm
- Nút thêm vào giỏ hàng
- Badge giảm giá, mới, hot

**Xuất hiện ở:** Home, Category, Search

---

#### d) **ProtectedRoute.tsx** - Bảo vệ route
```typescript
// ProtectedRoute.tsx
export const ProtectedRoute = ({ children, yeuCauAdmin }) => {
  const { daDangNhap, nguoiDung } = useDangNhap();
  
  // Chưa đăng nhập → Chuyển đến /dang-nhap
  if (!daDangNhap) {
    return <Navigate to="/dang-nhap" />;
  }
  
  // Không phải admin → Chuyển về /
  if (yeuCauAdmin && nguoiDung.vaiTro_Id !== 1) {
    return <Navigate to="/" />;
  }
  
  // OK → Cho phép truy cập
  return <>{children}</>;
};
```

**Chức năng:**
- Kiểm tra đăng nhập
- Kiểm tra quyền admin
- Redirect nếu không đủ điều kiện

**Sử dụng cho:** Admin page, Profile page

---

### 2. **pages/** - Các trang của ứng dụng

**Mục đích:** Mỗi trang là một màn hình riêng biệt trong ứng dụng.

#### a) **Home/** - Trang chủ
```typescript
// Home.tsx
export const Home = () => {
  const [sanPhams, setSanPhams] = useState([]);
  
  return (
    <>
      <Banner />                        // Banner chào mừng
      <CategoryButtons />               // Nút danh mục
      <ProductGrid>                     // Lưới sản phẩm
        {sanPhams.map(sp => 
          <ProductCard sanPham={sp} />
        )}
      </ProductGrid>
    </>
  );
};
```

**Route:** `/`

**Chức năng:**
- Banner chào mừng
- 6 nút danh mục
- Hiển thị 8 sản phẩm nổi bật

---

#### b) **Login/** - Trang đăng nhập
```typescript
// Login.tsx
export const Login = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const { dangNhap } = useDangNhap();
  
  const xuLySubmit = async () => {
    const ketQua = await dangNhap({ tenDangNhap, matKhau });
    
    // Phân quyền
    if (ketQua.user.vaiTro_Id === 1) {
      navigate('/admin');  // Admin
    } else {
      navigate('/');       // User
    }
  };
  
  return <Form onSubmit={xuLySubmit}>...</Form>;
};
```

**Route:** `/dang-nhap`

**Chức năng:**
- Form nhập username, password
- Gọi API đăng nhập
- Lưu token vào localStorage
- Redirect theo vai trò

---

#### c) **Register/** - Trang đăng ký
```typescript
// Register.tsx
export const Register = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');
  
  const xuLySubmit = async () => {
    // Validation
    if (matKhau !== xacNhanMatKhau) {
      setError('Mật khẩu không khớp');
      return;
    }
    
    // Gọi API đăng ký
    await dichVuApi.dangKy({ tenDangNhap, matKhau });
    
    // Tự động đăng nhập
    await dangNhap({ tenDangNhap, matKhau });
    navigate('/');
  };
  
  return <Form onSubmit={xuLySubmit}>...</Form>;
};
```

**Route:** `/dang-ky`

**Chức năng:**
- Form nhập username, password, confirm password
- Validation
- Gọi API đăng ký
- Tự động đăng nhập sau khi đăng ký

---

#### d) **Category/** - Trang danh mục
```typescript
// Category.tsx
export const Category = () => {
  const { slug } = useParams();  // Lấy slug từ URL
  const [sanPhams, setSanPhams] = useState([]);
  
  // Lọc sản phẩm theo danh mục
  useEffect(() => {
    const filtered = allProducts.filter(
      sp => sp.loaiId === categoryInfo.id
    );
    setSanPhams(filtered);
  }, [slug]);
  
  return (
    <>
      <Banner>{categoryInfo.ten}</Banner>
      <ProductGrid>
        {sanPhams.map(sp => <ProductCard sanPham={sp} />)}
      </ProductGrid>
    </>
  );
};
```

**Route:** `/danh-muc/:slug`

**Ví dụ:**
- `/danh-muc/but-viet` → Bút viết
- `/danh-muc/van-phong-pham` → Văn phòng phẩm

**Chức năng:**
- Lọc sản phẩm theo loại
- Hiển thị banner danh mục
- Grid sản phẩm

---

#### e) **Cart/** - Trang giỏ hàng
```typescript
// Cart.tsx
export const Cart = () => {
  const { gioHang, xoaKhoiGio, capNhatSoLuong } = useGioHang();
  
  return (
    <>
      <h1>Giỏ hàng của bạn</h1>
      {gioHang.map(item => (
        <CartItem 
          sanPham={item.sanPham}
          soLuong={item.soLuong}
          onDelete={() => xoaKhoiGio(item.sanPham.id)}
          onUpdate={(sl) => capNhatSoLuong(item.sanPham.id, sl)}
        />
      ))}
      <TotalPrice />
      <CheckoutButton />
    </>
  );
};
```

**Route:** `/gio-hang`

**Chức năng:**
- Hiển thị sản phẩm trong giỏ
- Cập nhật số lượng
- Xóa sản phẩm
- Tính tổng tiền
- Nút thanh toán

---

#### f) **Admin/** - Trang quản trị
```typescript
// Admin.tsx
export const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <AdminLayout>
      <Sidebar>
        <MenuItem onClick={() => setActiveTab('dashboard')}>
          Dashboard
        </MenuItem>
        <MenuItem onClick={() => setActiveTab('products')}>
          Sản phẩm
        </MenuItem>
        <MenuItem onClick={() => setActiveTab('orders')}>
          Đơn hàng
        </MenuItem>
      </Sidebar>
      
      <MainContent>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'orders' && <OrderManagement />}
      </MainContent>
    </AdminLayout>
  );
};
```

**Route:** `/admin` (Protected - Chỉ admin)

**Chức năng:**
- Dashboard thống kê
- Quản lý sản phẩm (CRUD)
- Quản lý đơn hàng
- Quản lý khách hàng
- Quản lý kho hàng
- Báo cáo

---

### 3. **context/** - Quản lý state toàn cục

**Mục đích:** Chia sẻ dữ liệu giữa các component mà không cần truyền props.

#### a) **AuthContext.tsx** - Context đăng nhập
```typescript
// AuthContext.tsx
export const AuthProvider = ({ children }) => {
  const [nguoiDung, setNguoiDung] = useState(null);
  const [token, setToken] = useState(null);
  
  const dangNhap = async (duLieu) => {
    const ketQua = await dichVuApi.dangNhap(duLieu);
    setNguoiDung(ketQua.user);
    setToken(ketQua.token);
    localStorage.setItem('token', ketQua.token);
    localStorage.setItem('user', JSON.stringify(ketQua.user));
  };
  
  const dangXuat = () => {
    setNguoiDung(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ nguoiDung, token, dangNhap, dangXuat }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng
export const useDangNhap = () => useContext(AuthContext);
```

**Quản lý:**
- Thông tin người dùng
- Token JWT
- Trạng thái đăng nhập
- Hàm đăng nhập/đăng xuất

**Sử dụng ở:**
- Header (hiển thị tên user)
- Login page (đăng nhập)
- ProtectedRoute (kiểm tra quyền)
- Admin page (kiểm tra admin)

---

#### b) **CartContext.tsx** - Context giỏ hàng
```typescript
// CartContext.tsx
export const CartProvider = ({ children }) => {
  const [gioHang, setGioHang] = useState([]);
  
  const themVaoGio = (sanPham) => {
    const existing = gioHang.find(item => item.sanPham.id === sanPham.id);
    
    if (existing) {
      // Tăng số lượng
      setGioHang(gioHang.map(item =>
        item.sanPham.id === sanPham.id
          ? { ...item, soLuong: item.soLuong + 1 }
          : item
      ));
    } else {
      // Thêm mới
      setGioHang([...gioHang, { sanPham, soLuong: 1 }]);
    }
  };
  
  const xoaKhoiGio = (sanPhamId) => {
    setGioHang(gioHang.filter(item => item.sanPham.id !== sanPhamId));
  };
  
  const tongSoLuong = gioHang.reduce((sum, item) => sum + item.soLuong, 0);
  const tongTien = gioHang.reduce((sum, item) => 
    sum + (item.sanPham.giaBan * item.soLuong), 0
  );
  
  return (
    <CartContext.Provider value={{ 
      gioHang, 
      themVaoGio, 
      xoaKhoiGio, 
      tongSoLuong, 
      tongTien 
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng
export const useGioHang = () => useContext(CartContext);
```

**Quản lý:**
- Danh sách sản phẩm trong giỏ
- Số lượng từng sản phẩm
- Tổng số lượng
- Tổng tiền
- Hàm thêm/xóa/cập nhật

**Sử dụng ở:**
- Header (hiển thị số lượng)
- ProductCard (nút thêm vào giỏ)
- Cart page (hiển thị giỏ hàng)

---

### 4. **services/** - Dịch vụ gọi API

**Mục đích:** Tập trung các hàm gọi backend API.

```typescript
// api.ts
class DichVuApi {
  // Đăng nhập
  async dangNhap(duLieu: YeuCauDangNhap) {
    const phanHoi = await fetch(`${URL_API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duLieu)
    });
    return phanHoi.json();
  }
  
  // Đăng ký
  async dangKy(duLieu: YeuCauDangKy) {
    const phanHoi = await fetch(`${URL_API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duLieu)
    });
    return phanHoi.json();
  }
  
  // Lấy danh sách sản phẩm
  async laySanPhams() {
    const phanHoi = await fetch(`${URL_API}/products`);
    return phanHoi.json();
  }
}

export const dichVuApi = new DichVuApi();
```

**Chức năng:**
- Gọi API đăng nhập/đăng ký
- Gọi API lấy sản phẩm
- Gọi API tạo đơn hàng
- Xử lý lỗi
- Thêm token vào header

---

### 5. **types/** - Định nghĩa kiểu dữ liệu

**Mục đích:** Định nghĩa TypeScript interfaces cho type safety.

```typescript
// index.ts

// Người dùng
export interface NguoiDung {
  taiKhoan_Id: number;
  tenDangNhap: string;
  vaiTro_Id: number;
}

// Sản phẩm
export interface SanPham {
  id: number;
  ten: string;
  giaBan: number;
  hinhAnh: string;
  loaiId: number;
  soLuongTon: number;
}

// Giỏ hàng
export interface GioHang {
  sanPham: SanPham;
  soLuong: number;
}

// Request đăng nhập
export interface YeuCauDangNhap {
  tenDangNhap: string;
  matKhau: string;
}
```

**Lợi ích:**
- Autocomplete trong IDE
- Phát hiện lỗi sớm
- Code dễ maintain
- Documentation tự động

---

### 6. **data/** - Dữ liệu mẫu

**Mục đích:** Dữ liệu giả để test khi chưa có backend.

```typescript
// products.ts
export const mockSanPhams: SanPham[] = [
  {
    id: 1,
    ten: 'Bút bi Thiên Long',
    giaBan: 5000,
    hinhAnh: '/images/but-bi.jpg',
    loaiId: 1,
    soLuongTon: 100
  },
  // ... 47 sản phẩm khác
];
```

**Sử dụng:**
- Test UI khi backend chưa sẵn sàng
- Demo cho khách hàng
- Development nhanh hơn

---

### 7. **styles/** - CSS toàn cục

#### a) **GlobalStyles.ts** - CSS reset và global
```typescript
// GlobalStyles.ts
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Roboto', sans-serif;
    background: #f5f5f5;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;
```

**Chức năng:**
- Reset CSS mặc định của browser
- Font chữ toàn ứng dụng
- Màu nền mặc định

---

#### b) **theme.ts** - Theme màu sắc
```typescript
// theme.ts
export const theme = {
  colors: {
    primary: '#e31e24',      // Đỏ Thiên Long
    secondary: '#333',       // Xám đen
    background: '#f5f5f5',   // Xám nhạt
    text: '#333',            // Màu chữ
    white: '#fff',
  },
  
  fonts: {
    main: "'Roboto', sans-serif",
    heading: "'Montserrat', sans-serif",
  },
  
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px',
  }
};
```

**Sử dụng:**
```typescript
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.main};
`;
```

---

## 🔄 Luồng dữ liệu (Data Flow)

### Ví dụ: Đăng nhập

```
1. User nhập form
   ↓
2. Login.tsx → xuLySubmit()
   ↓
3. useDangNhap() → dangNhap()
   ↓
4. AuthContext → dangNhap()
   ↓
5. dichVuApi.dangNhap()
   ↓
6. HTTP POST → Backend
   ↓
7. Backend trả về { token, user }
   ↓
8. AuthContext lưu vào state + localStorage
   ↓
9. Header tự động cập nhật (hiển thị tên user)
   ↓
10. Redirect đến trang chủ hoặc admin
```

---

## 🎯 Tóm tắt

### Cấu trúc Frontend gồm:

1. **components/** - Thành phần dùng chung (Header, Footer, ProductCard)
2. **pages/** - Các trang (Home, Login, Cart, Admin)
3. **context/** - Quản lý state toàn cục (Auth, Cart)
4. **services/** - Gọi API backend
5. **types/** - Định nghĩa kiểu dữ liệu TypeScript
6. **data/** - Dữ liệu mẫu
7. **styles/** - CSS toàn cục và theme

### Nguyên tắc:

- ✅ **Component-based**: Chia nhỏ thành các component
- ✅ **Reusable**: Tái sử dụng component
- ✅ **Separation of Concerns**: Tách biệt UI, logic, data
- ✅ **Type Safety**: Dùng TypeScript
- ✅ **State Management**: Dùng Context API
- ✅ **Responsive**: Giao diện responsive

### Công nghệ:

- **React** - UI library
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS
- **React Router** - Routing
- **Context API** - State management
- **Vite** - Build tool
