# TEST ADMIN LOGIN

## Admin Credentials (THẬT)

```
Email: superAdmin
Password: 123qwe!@#QWE
```

## Cách test:

### 1. Mở app (đang chạy port 5176)

```
http://localhost:5176
```

### 2. Login với admin account

- Username: `superAdmin`
- Password: `123qwe!@#QWE`

### 3. Check Browser Console (F12)

Sẽ thấy logs:

```
API Request: POST /admin/auth/login
API Response: {status: 200, data: {...}}
Login successful!
```

### 4. Check localStorage

```javascript
localStorage.getItem("accessToken");
localStorage.getItem("refreshToken");
localStorage.getItem("auth-storage");
```

### 5. Vào trang Articles

Sau khi login thành công, vào `/articles` sẽ thấy:

```
API Request: GET /admin/articles?page=1&limit=10
API Response: {items: [...], total: X}
```

## Nếu có lỗi:

### 401 Unauthorized

- Email/password sai
- Check lại credentials

### 404 Not Found

- API endpoint sai
- Backend chưa có endpoint `/admin/auth/login`

### Network Error

- API server không chạy
- CORS chưa config

## Expected Flow:

1. ✅ Login → Save tokens → Redirect to /dashboard
2. ✅ Navigate to /articles → Auto add Bearer token → Fetch articles
3. ✅ All CRUD operations work với token

## Code đã implement:

✅ `/admin/auth/login` - Admin login endpoint
✅ Bearer token auto-inject vào mọi request
✅ React Query cho data fetching/caching
✅ Generic CRUD service cho tất cả resources
✅ Error handling với logging chi tiết

## Next: Sau khi login thành công

Nếu vẫn không load data:

1. Check response format từ API
2. Verify pagination structure (items vs data)
3. Check API có trả về đúng admin resources không
