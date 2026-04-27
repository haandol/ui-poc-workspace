# DESIGN.md 실전 예시 (EncBird 프로젝트 스타일)

이 파일은 스킬이 DESIGN.md를 새로 만들 때 참고할 **실전 예시**다.
Stitch 공식 스펙(`spec.md`)은 포맷의 정답을 담고 있지만, 실제 프로젝트에서는
**Tailwind 클래스·DaisyUI 테마·다크모드**처럼 프레임워크 특화 정보가 함께 필요하다.
그런 현실적 디테일을 어떻게 녹여낼지 감을 잡는 데 사용한다.

공식 스펙과 충돌할 때는 **공식 스펙 우선**. 이 예시는 "스타일링 팁"일 뿐이다.

---

## 핵심 패턴

### 1. 최상단에 인덱스 + 메타데이터

DESIGN.md는 AI 에이전트가 **가장 먼저 읽는 파일**이다.
그래서 맨 위에는 다음이 있어야 한다:

- 이 문서가 무엇인지 한 줄 설명
- 하위 문서(있다면) 링크
- **Metadata** 섹션: App 이름, Stack(프레임워크 버전 포함), Icons/Font

```markdown
# DESIGN.md

Machine-readable design tokens for [앱 이름]. AI agents should read this file first for all UI work.

## Metadata

- **App**: [앱 이름] — [한 줄 설명]
- **Stack**: Nuxt 4 (TypeScript) + TailwindCSS 4 + DaisyUI 5
- **Icons**: PrimeIcons (`pi pi-*`) | **Font**: Inter var
```

### 2. 색상은 "역할 + Tailwind 클래스 + Hex" 3종 세트

추상 토큰(`primary`)만 있으면 AI가 Tailwind 클래스를 매번 번역해야 한다.
**표로** 역할·클래스·Hex를 함께 두면 바로 코드에 꽂을 수 있다.

```markdown
### Brand Gradient

| State    | Classes                       | Hex               |
| -------- | ----------------------------- | ----------------- |
| Default  | `from-blue-500 to-purple-500` | #3b82f6 → #8b5cf6 |
| Hover    | `from-blue-600 to-purple-600` | #2563eb → #7c3aed |
| Disabled | `from-gray-400 to-gray-500`   | #9ca3af → #6b7280 |

Use for: Main CTAs ("시작하기"), brand logo, gradient text, progress indicators.
```

### 3. 다크모드는 "토큰마다 light/dark 쌍"으로

```markdown
### Semantic Colors

| Token   | Light        | Dark         |
| ------- | ------------ | ------------ |
| Info    | `blue-600`   | `blue-300`   |
| Success | `green-600`  | `green-300`  |
| Warning | `orange-600` | `orange-300` |
| Error   | `red-600`    | `red-300`    |
```

### 4. 타이포는 "토큰 + Tailwind + Weight + Color" 표

```markdown
| Token | Size           | Tailwind               | Weight        | Color (light/dark)      |
| ----- | -------------- | ---------------------- | ------------- | ----------------------- |
| H1    | 2.25rem (36px) | `text-4xl lg:text-6xl` | `font-bold`   | `gray-900` / `white`    |
| Body  | 1rem (16px)    | `text-base`            | `font-normal` | `gray-600` / `gray-300` |
```

### 5. 기능/도메인별 색상 (선택)

프로젝트가 여러 기능 화면을 가지면, 기능별 액센트 컬러를 정해 두면 일관성이 생긴다.

```markdown
### Feature Colors

| Feature   | Gradient                      | Accent   |
| --------- | ----------------------------- | -------- |
| PicToChat | `from-blue-600 to-purple-600` | `blue-*` |
| DiaryChat | `from-rose-400 to-rose-500`   | `rose-*` |
```

### 6. Tailwind v4 마이그레이션 경고 (해당 시)

프로젝트가 Tailwind v4를 쓰면, v3 문법을 쓰지 말라는 경고를 표로 넣는다.
AI가 구버전 지식으로 회귀하는 걸 막는 장치다.

```markdown
| Deprecated (v3)             | Use (v4)             |
| --------------------------- | -------------------- |
| `bg-gradient-to-{dir}`      | `bg-linear-to-{dir}` |
| `flex-grow` / `flex-shrink` | `grow` / `shrink`    |
```

### 7. Do / Don't는 한 줄씩 끊어서 "· 구분자"로

공식 스펙의 "Do's and Don'ts" 섹션을 현실적으로 압축한 버전.

```markdown
## Do / Don't

**Do**: Blue-purple gradient for primary CTAs only · generous whitespace · both light/dark tested · semantic HTML · mobile-first · subtle animations (120–200ms)

**Don't**: Multiple accents on same screen · thick borders (>2px) · bounce/spring animations · `[data-theme="dark"]` · pure black bg · color alone for information
```

---

## 언제 공식 스펙(YAML frontmatter)을 쓸까

- **Stitch와 호환**되는 파일을 만들어야 할 때 → YAML frontmatter 필수
- 그 외 자체 프로젝트 전용이면 → encbird 스타일처럼 **Markdown 표만** 써도 충분

둘 다 지원하려면: YAML frontmatter에 토큰 값을 넣고, 아래 Markdown 본문에서
Tailwind 매핑 표로 같은 값을 반복한다. 중복이지만 AI 친화적이다.

---

## 안티패턴 (하지 말 것)

- **JSON design tokens만 덩그러니** — AI가 읽을 수는 있지만 맥락(언제 쓰는지)이 없다
- **Figma 스크린샷 링크로 때우기** — 이 스킬은 텍스트 기반만 다룬다
- **"brand color is cool"** 같은 모호한 산문 — 반드시 Hex 또는 Tailwind 토큰까지 내려가야 한다
- **컴포넌트 구현 코드 블록** — 그건 `AGENTS.md`/`components/`에 둔다. DESIGN.md는 "토큰과 규칙"까지다
