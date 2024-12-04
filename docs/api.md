# Cyan API 文档 v1.0

## 基础信息

- 基础路径: `/api`
- 内容类型: `application/json`
- 认证方式: Bearer Token

## 认证相关 `/auth`

### 注册用户
http
POST /auth/signup
Content-Type: application/json
{
"first_name": "string",
"last_name": "string",
"email": "string"
}
Response 200:
{
"id": "uuid",
"email": "string",
"token": "string"
}


### 用户登录
http
POST /auth/signin
Content-Type: application/json
{
"email": "string"
}
Response 200:
{
"id": "uuid",
"email": "string",
"token": "string"
}


### 验证邮箱
http
GET /auth/verify?token=string
Response 200:
{
"message": "Email verified successfully"
}

## 职位相关 `/jobs`
### 创建职位
http
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json
{
"title": "string",
"company": "string",
"location": "string",
"salary_min": number,
"salary_max": number,
"description": "string",
"requirements": "string",
"tags": ["string"]
}
Response 200:
{
"id": number,
"title": "string",
"company": "string",
"location": "string",
"salary_min": number,
"salary_max": number,
"description": "string",
"requirements": "string",
"tags": ["string"],
"status": "string",
"created_at": "datetime",
"updated_at": "datetime"
}

### 获取职位列表
http
GET /jobs?page=1&limit=10&search=keyword&tags=tag1,tag2
Response 200:
{
"items": [
{
"id": number,
"title": "string",
"company": "string",
"location": "string",
"salary_min": number,
"salary_max": number,
"tags": ["string"],
"created_at": "datetime"
}
],
"total": number,
"page": number,
"limit": number
}

## 企业相关 `/companies`

### 创建企业资料
http
POST /companies
Authorization: Bearer <token>
Content-Type: application/json
{
"name": "string",
"description": "string",
"website": "string",
"location": "string",
"size": "string",
"industry": "string"
}
Response 200:
{
"id": "uuid",
"name": "string",
"description": "string",
"website": "string",
"location": "string",
"size": "string",
"industry": "string",
"created_at": "datetime",
"updated_at": "datetime"
}

## 简历相关 `/resumes`

### 上传简历
http
POST /resumes
Authorization: Bearer <token>
Content-Type: multipart/form-data
file: <file>
Response 200:
{
"id": "uuid",
"filename": "string",
"url": "string",
"created_at": "datetime"
}


## 申请相关 `/applications`

### 创建职位申请
http
POST /applications
Authorization: Bearer <token>
Content-Type: application/json
{
"job_id": number,
"resume_id": "uuid",
"cover_letter": "string"
}
Response 200:
{
"id": "uuid",
"job_id": number,
"status": "string",
"created_at": "datetime"
}

## 搜索相关 `/search`
### 搜索职位
http
GET /search/jobs?q=keyword&location=city&tags=tag1,tag2&salary_min=1000&salary_max=2000
Response 200:
{
"items": [
{
"id": number,
"title": "string",
"company": "string",
"location": "string",
"salary_min": number,
"salary_max": number,
"tags": ["string"],
"created_at": "datetime"
}
],
"total": number
}

## 错误响应
### 所有 API 在发生错误时将返回以下格式:
http
{
"error": {
"code": "string",
"message": "string"
}
}

### 常见错误码:
- 400: 请求参数错误
- 401: 未认证
- 403: 无权限
- 404: 资源不存在
- 422: 验证错误
- 500: 服务器内部错误

## 通用查询参数

- `page`: 页码，默认 1
- `limit`: 每页数量，默认 10
- `sort`: 排序字段
- `order`: 排序方向 (asc/desc)
- `search`: 搜索关键词





