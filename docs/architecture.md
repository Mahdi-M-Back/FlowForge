# FlowForge Backend Architecture v1.0

## Project Goal

FlowForge یک SaaS برای مدیریت تیم‌ها، پروژه‌ها و وظایف سازمانی است که با تمرکز بر معماری حرفه‌ای، مقیاس‌پذیری و قابلیت توسعه بلندمدت طراحی می‌شود. این پروژه باید در پایان قابلیت استقرار، استفاده در محیط Production و عرضه به مشتری را داشته باشد.

---

# Technology Stack

| Layer                 | Technology                            |
| --------------------- | ------------------------------------- |
| Runtime               | Node.js                               |
| Language              | TypeScript                            |
| Framework             | Express.js                            |
| Database              | PostgreSQL                            |
| Database Driver       | pg                                    |
| Validation            | Zod                                   |
| Authentication        | JWT + Refresh Token                   |
| Password Hashing      | bcrypt                                |
| Environment Variables | dotenv                                |
| Logging               | Pino _(در مراحل بعدی)_                |
| Testing               | Vitest                                |
| Linting               | ESLint                                |
| Formatting            | Prettier                              |
| Git Hooks             | Husky + lint-staged _(در مراحل بعدی)_ |
| ORM                   | استفاده نمی‌شود (فعلاً SQL خام)       |

---

# Architectural Principles

پروژه بر اساس یک **Modular Monolith** طراحی می‌شود.

هر ماژول مسئول منطق مربوط به خودش است و هیچ ماژولی نباید جزئیات داخلی ماژول دیگری را بداند.

Repository فقط مسئول ارتباط با دیتابیس است.

Service فقط مسئول Business Logic است.

Controller فقط مسئول دریافت درخواست، اعتبارسنجی و ارسال پاسخ است.

هیچ SQL خارج از Repository نوشته نخواهد شد.

هیچ Business Logic داخل Repository قرار نخواهد گرفت.

---

# Project Structure

```text
flowforge/
│
├── docs/
├── scripts/
├── tests/
│
├── src/
│   │
│   ├── config/
│   ├── database/
│   ├── modules/
│   │
│   │   ├── auth/
│   │   ├── workspace/
│   │   ├── membership/
│   │   ├── project/
│   │   ├── task/
│   │   ├── comment/
│   │   ├── notification/
│   │   └── activity/
│   │
│   ├── shared/
│   │   ├── constants/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

# Database Standards

## Primary Key

تمام Entityها از UUID به عنوان Primary Key استفاده می‌کنند.

---

## Naming Convention

در PostgreSQL از **snake_case** استفاده می‌شود.

نمونه‌ها:

- created_at
- updated_at
- deleted_at
- workspace_id
- project_id

در TypeScript از **camelCase** استفاده خواهد شد.

نمونه‌ها:

- createdAt
- workspaceId
- projectId

---

## Soft Delete

Soft Delete فقط برای Entityهایی استفاده می‌شود که حذف آن‌ها نباید باعث از بین رفتن اطلاعات شود.

Activity Log حذف نخواهد شد.

Workspace حذف فیزیکی نخواهد داشت.

---

## Membership

Membership یک Entity مستقل است.

Primary Key:

```text
id (UUID)
```

همچنین Constraint زیر وجود خواهد داشت:

```sql
UNIQUE(user_id, workspace_id)
```

هر کاربر فقط یک بار می‌تواند عضو یک Workspace باشد.

---

# Module Responsibilities

## Auth

مسئول احراز هویت کاربران.

نباید از جزئیات Workspace یا Project اطلاع داشته باشد.

---

## Workspace

ریشه اصلی Business Domain سیستم.

تمام Projectها، Membershipها و سایر بخش‌های سازمانی به Workspace وابسته هستند.

---

## Membership

رابط بین User و Workspace.

Role کاربران در هر Workspace داخل Membership نگهداری می‌شود.

Owner بودن یک ویژگی User نیست؛ بلکه یک Role در Membership است.

---

## Project

وابسته به Workspace.

تمام Taskها داخل Project قرار می‌گیرند.

---

## Task

مدیریت وظایف، تخصیص، وضعیت و تاریخچه فعالیت‌ها.

---

## Comment

مدیریت گفتگوها و توضیحات مربوط به Taskها.

---

## Notification

ارسال اعلان‌ها به کاربران.

---

## Activity

ثبت تاریخچه فعالیت‌ها.

این اطلاعات حذف نخواهند شد.

---

# Design Rules

- هیچ SQL خارج از Repository نوشته نمی‌شود.
- هیچ Business Logic داخل Repository قرار نمی‌گیرد.
- Controllerها باید سبک و بدون منطق تجاری باشند.
- Serviceها مسئول پیاده‌سازی قوانین کسب‌وکار هستند.
- هر فایل باید دلیل مشخصی برای وجود داشتن داشته باشد.
- از ایجاد فایل‌ها یا پوشه‌های غیرضروری از ابتدای پروژه خودداری می‌شود (YAGNI Principle).

---

# Initial Workspace Flow

ایجاد Workspace داخل یک Transaction انجام می‌شود.

مراحل:

1. ایجاد Workspace
2. ایجاد Membership با Role = OWNER
3. Commit

در صورت شکست هر مرحله:

- Rollback Transaction
- هیچ داده ناقصی داخل دیتابیس باقی نخواهد ماند.

---

# Current Development Strategy

توسعه پروژه به صورت تدریجی انجام می‌شود.

ابتدا فقط فایل‌هایی ایجاد می‌شوند که واقعاً موردنیاز هستند.

از اضافه کردن ساختارهای پیچیده مانند Generic Repository، DDD کامل یا Mapperهای غیرضروری در نسخه اول خودداری خواهد شد.

معماری به گونه‌ای طراحی می‌شود که در آینده مهاجرت به Prisma یا حتی تغییر لایه دسترسی به داده، با کمترین تغییر در Business Logic انجام شود.
