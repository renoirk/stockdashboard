# Stock Dashboard

Supabase 기반 주식 포트폴리오 관리 앱 (Next.js + Tailwind CSS)

## 주요 기능

- 보유 종목 목록 조회 (종목코드 · 종목명 · 수량 · 매수평균가 · 매수금액 · 메모)
- 종목 추가 / 수정 / 삭제
- 총 매수금액 자동 계산
- 다크 테마 UI

## 기술 스택

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL)

---

## 로컬 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/renoirk/stockdashboard.git
cd stockdashboard
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 입력합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Supabase 대시보드 → Project Settings → API 에서 확인할 수 있습니다.

### 3. Supabase 테이블 생성

Supabase 대시보드 → SQL Editor에서 `supabase/schema.sql` 내용을 실행합니다.

```sql
-- supabase/schema.sql 내용을 복사해 SQL Editor에 붙여넣기 후 실행
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 환경변수 목록

| 변수명 | 설명 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명(anon) 키 |

> `.env.local` 파일은 절대 git에 커밋하지 마세요. `.gitignore`에 이미 포함되어 있습니다.
