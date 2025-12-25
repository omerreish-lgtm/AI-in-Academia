# תוכנית ארגון מחדש: מבנה תיקיות לפרויקט AI באקדמיה

## מצב נוכחי - אבחון

### בעיות שזוהו:

| בעיה | דוגמה | השפעה |
|------|-------|--------|
| **ערבוב בשורש** | קבצי config, מחקר, אודיו, תמלולים - הכל ביחד | קשה למצוא קבצים |
| **שמות לא עקביים** | עברית/אנגלית מעורבב, שמות ארוכים | בלבול |
| **כפילויות** | 3 גרסאות של "מידול שימוש סטודנטים" | לא ברור מה עדכני |
| **תיקיות משנה מבולגנות** | "שיחות עבר בקלוד" עם תת-תיקיות מקוננות | ניווט קשה |
| **קבצי מדיה מעורבים** | m4a ליד md ליד pdf | רעש |

### קבצים קיימים (32 פריטים בשורש):
- 6 קבצי config/meta (CLAUDE.md, GEMINI.md, etc.)
- 8 קבצי מחקר/דוחות
- 4 קבצי אודיו (m4a)
- 3 תיקיות משנה (על המרצה, ג׳מיני שיחות, שיחות עבר)
- 1 תיקיית meetings
- שונות (zip, log, pdf)

---

## מבנה מוצע - MECE

```
בינה מלאכותית באקדמיה/
│
├── .meta/                           # ← קונפיגורציה (מוסתר)
│   ├── CLAUDE.md
│   ├── GEMINI.md
│   └── AI_Context_Optimization_Protocol.md
│
├── 00-project/                      # ← ניהול פרויקט
│   ├── TASKS.md
│   ├── LOG.md
│   ├── README.md                    # תיאור הפרויקט
│   └── milestones.md
│
├── 01-research/                     # ← מחקר ותוצרים
│   ├── reports/                     # דוחות סופיים
│   │   ├── claude-report.md         # (דוח-קלוד.md)
│   │   └── student-usage-model.md   # (מידול שימוש...)
│   ├── frameworks/                  # מסגרות תיאורטיות
│   │   ├── blueprint-framework.md
│   │   └── mckinsey-advisor.md
│   └── SOURCES.md
│
├── 02-stakeholders/                 # ← בעלי עניין
│   ├── dean-renana/                 # על הדיקנית
│   │   ├── cv.md
│   │   ├── syllabi/
│   │   └── research-style.md
│   ├── faculty-mapping.md           # מיפוי סגל
│   └── external-advisors.md         # יועצים חיצוניים
│
├── 03-meetings/                     # ← פגישות וראיונות
│   ├── avi_02.12.2025.md
│   ├── renana_10.12.2025.md
│   ├── keren_19.12.2025.md
│   └── transcripts/                 # תמלולים מלאים
│       ├── keren-call-1.txt
│       └── keren-call-2.txt
│
├── 04-deliverables/                 # ← תוצרים ללקוח
│   ├── proposals/                   # הצעות
│   └── presentations/               # מצגות
│
├── archive/                         # ← ארכיון שיחות AI
│   ├── claude-sessions/
│   └── gemini-sessions/
│
└── media/                           # ← קבצי מדיה
    └── recordings/                  # הקלטות שיחות
        ├── keren-call-1.m4a
        ├── keren-call-2.m4a
        └── keren-call-3.m4a
```

---

## עקרונות המבנה

### 1. MECE (מקינזי)
- **Mutually Exclusive**: כל קובץ שייך לתיקייה אחת בלבד
- **Collectively Exhaustive**: כל סוג קובץ יש לו בית

### 2. מספור תיקיות
- `00`, `01`, `02`... - מבטיח סדר אלפביתי הגיוני
- תיקיות עבודה לפני archive

### 3. שמות באנגלית
- תיקיות: אנגלית (תאימות מערכת)
- קבצים: עברית או אנגלית לפי תוכן

### 4. הפרדת סוגי תוכן
- `.meta/` - קונפיג (מוסתר מעין)
- `media/` - לא-טקסט
- `archive/` - היסטוריה

---

## פעולות נדרשות

### שלב 1: יצירת מבנה תיקיות
```bash
mkdir -p .meta 00-project 01-research/{reports,frameworks} \
         02-stakeholders/dean-renana/syllabi 03-meetings/transcripts \
         04-deliverables/{proposals,presentations} \
         archive/{claude-sessions,gemini-sessions} media/recordings
```

### שלב 2: העברת קבצים

| מקור | יעד |
|------|-----|
| `CLAUDE.md`, `GEMINI.md`, `AI_Context_*.md` | `.meta/` |
| `TASKS.md`, `LOG.md` | `00-project/` |
| `דוח-קלוד.md`, `מידול*.md` | `01-research/reports/` |
| `blueprint*.md`, `בניית יועץ*.md` | `01-research/frameworks/` |
| `SOURCES.md` | `01-research/` |
| `על המרצה/*` | `02-stakeholders/dean-renana/` |
| `meetings/*` | `03-meetings/` |
| `*.m4a` | `media/recordings/` |
| `שיחות עבר בקלוד/*` | `archive/claude-sessions/` |
| `ג׳מיני שיחות/*` | `archive/gemini-sessions/` |

### שלב 3: ניקוי
- מחיקת קבצי `.DS_Store`
- מחיקת `firebase-debug.log`
- מחיקת קבצי zip מיותרים
- איחוד גרסאות כפולות

### שלב 4: עדכון Git
```bash
git add -A
git commit -m "Restructure: MECE-based folder organization"
git push
```

---

## החלטות

| נושא | החלטה | נימוק |
|------|--------|-------|
| **CLAUDE.md** | נשאר בשורש | Claude Code מצפה לזה שם |
| **שמות קבצים** | **אנגלית** | החלטת משתמש |
| **גרסאות כפולות** | שמירת עדכני + archive | לא לאבד מידע |

### מיפוי שמות (עברית → אנגלית)

| שם מקורי | שם חדש |
|----------|--------|
| דוח-קלוד.md | claude-report.md |
| מידול שימוש סטודנטים ב-AI באקדמיה.md | student-ai-usage-model.md |
| בניית יועץ אסטרטגי AI מבוסס מקינזי.md | mckinsey-advisor-framework.md |
| ראיון_מלא_הסיפור_של_פרויקט_ה_ai.md | full-interview-project-story.md |
| מדריך_אופטימיזציית_טוקנים.md | token-optimization-guide.md |
| על המרצה/ | dean-renana/ |
| שיחות עבר בקלוד ואחרים/ | archive/claude-sessions/ |
| ג׳מיני שיחות ותוצרים/ | archive/gemini-sessions/ |

---

## יתרונות צפויים

| לפני | אחרי |
|------|------|
| 32 פריטים בשורש | 8 תיקיות מאורגנות |
| ערבוב סוגים | הפרדה ברורה |
| קשה למצוא | מבנה צפוי |
| שמות ארוכים | קצר וברור |
