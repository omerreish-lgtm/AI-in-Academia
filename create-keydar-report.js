const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: "1a365d", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER, bidirectional: true } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "2c5282", font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0, bidirectional: true } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "2d3748", font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1, bidirectional: true } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "4a5568", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2, bidirectional: true } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, bidirectional: true, children: [new TextRun("ניתוח פרופ' רננה קדר")] }),
      new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "דוח לבניית הצעת AI מותאמת", size: 28, color: "4a5568" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, spacing: { after: 400 }, children: [new TextRun({ text: "דצמבר 2025", size: 22, color: "718096" })] }),

      // השורה התחתונה
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("השורה התחתונה")] }),
      new Paragraph({ bidirectional: true, spacing: { after: 200 }, children: [
        new TextRun("פרופ' רננה קדר היא חוקרת-משפטנית הומניסטית-ליברלית שמציבה "),
        new TextRun({ text: "עדות של נפגעים ושורדים", bold: true }),
        new TextRun(" בלב ההבנה של משפט, זיכרון וצדק. היא מחברת עמוקות בין "),
        new TextRun({ text: "משפט, ספרות ומדעי הנתונים", bold: true }),
        new TextRun(", ומבקשת לעצב צדק מעברי כמרחב "),
        new TextRun({ text: "רב-קולי, ביקורתי כלפי כוח מדינתי", bold: true }),
        new TextRun(", עם שימוש זהיר אך אמיץ בבינה מלאכותית ככלי להקשבה ולא לשליטה.")
      ]}),
      new Paragraph({ bidirectional: true, spacing: { after: 400 }, shading: { fill: "EDF2F7", type: ShadingType.CLEAR }, children: [
        new TextRun({ text: "תפיסת ה-AI שלה: ", bold: true }),
        new TextRun('"AI כמכונת הקשבה" — טכנולוגיה שמשרתת את היכולת של חברה לשמוע טוב יותר את מי שהודרו, ולא טכנולוגיה שמשרתת עוד שכבה של כוח מוסדי/ביטחוני.')
      ]}),

      // חלק א: פרופיל
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק א': פרופיל")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. מסלול אקדמי — ציר זמן")] }),

      // Timeline table
      new Table({
        columnWidths: [2000, 3500, 3860],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: "2c5282", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "תקופה", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, shading: { fill: "2c5282", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "תפקיד", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, shading: { fill: "2c5282", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "מוסד", bold: true, color: "FFFFFF" })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2003")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("LL.B + B.A (בהצטיינות)")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("אוניברסיטת תל אביב")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2003-2007")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("עורכת דין")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("מחלקת בג\"צים, פרקליטות המדינה")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2009-2015")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("דוקטורט (ספרות השוואתית)")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("אוניברסיטת סטנפורד")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2020-כיום")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun({ text: "מרצה בכירה (tenure-track)", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("פקולטה למשפטים + מדעי הרוח, האוניברסיטה העברית")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2020-כיום")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun({ text: "ראש מעבדת לנדקר", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("לניתוח חישובי של עדויות שואה")] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("2021-כיום")] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun({ text: "מנהלת אקדמית", bold: true })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3860, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun("המרכז למדעי הרוח הדיגיטליים")] })] }),
          ]}),
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("נקודות מפנה")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("המעבר מפרקליטות לאקדמיה — מפרקטיקה משפטית לחקר תיאורטי")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הדוקטורט בסטנפורד בספרות השוואתית — שילוב משפט, ספרות ומדעי הרוח")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הקמת מעבדת לנדקר (2020) — מפנה לעבר מחקר חישובי")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('7 באוקטובר 2023 — הקמת "עדות 710" ליישום מיידי של הידע המחקרי')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. השפעות — הוגים ומסורות מחשבתיות")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("הוגים מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "דורי לאוב", bold: true }), new TextRun(" — תיאוריה של הקשבה אתית לעדות טראומה")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "מסורת Digital Humanities", bold: true }), new TextRun(" — שילוב distant reading + close reading")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "משפט פלילי בינלאומי ביקורתי", bold: true }), new TextRun(' — חשדנות כלפי נרטיב "ההתקדמות"')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("3. רשתות — שותפי כתיבה, מוסדות, מימון")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("שותפי מחקר מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פרופ' עומרי אבנד (מדעי המחשב) — NLP, עיבוד עדויות")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פרופ' גבריאל סטנובסקי (מדעי המחשב) — AI משפטי, LLM")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פרופ' עמית פינצ'בסקי (תקשורת) — תיאוריה של עדות")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פרופ' תומר ברודי (משפט) — משפט בינלאומי")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("גופי מימון")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Alfred Landecker Foundation — €1,230,000 (2020-2027)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("המועצה להשכלה גבוהה — NIS 4.9 מיליון (מרכז DH)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("מלגת אלון (2021-2024) — מלגת יוקרה")] }),

      // חלק ב: מחקר
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק ב': מחקר")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. מפה נושאית — תחומים ופרויקטים")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("תחום א': עדות שואה וניתוח חישובי")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("ניתוח Topic Modeling של משפט אייכמן")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('"עדות מהמכונה" — האזנה קולקטיבית לעדויות שואה')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("מעבדת ALDH — ארכיוני פורטונוף וספילברג")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("תחום ב': עדות 710 (7 באוקטובר)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("ארכיון דיגיטלי של למעלה מ-1600 עדויות")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("400+ מתנדבים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: 'דגש: "לא הסברה, לא תעמולה — תיעוד היסטורי והקשבה לשורדים"', italics: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun('תחום ג\': משפט בינלאומי וזכויות אדם')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('ניתוח 180,000 המלצות של האו"ם')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("עדויות בבתי דין בינלאומיים")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun('תחום ד\': מגדר ו"הקורבן המושלם"')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("ניתוח 855 פסקי דין בעבירות מין")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('חשיפת "מיתוסי האונס" בפסיקה')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. ליבה תיאורטית — טענה מרכזית ומושגים")] }),
      new Paragraph({ bidirectional: true, shading: { fill: "E6FFFA", type: ShadingType.CLEAR }, spacing: { after: 200 }, children: [
        new TextRun({ text: "טענה מרכזית: ", bold: true }),
        new TextRun('עדות היא גם ראיה וגם אקט מוסרי-פוליטי של תיקון. כמות העדויות אינה "רעש סטטיסטי" — היא חלק מהותי מהתגובה לצדק.')
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("מושגים מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "Quantitative Turn", bold: true }), new TextRun(": המפנה הכמותי — הבנה שכמות העדויות היא רכיב מהותי בצדק")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "עדות/קול/הקשבה", bold: true }), new TextRun(": שלישייה מושגית — העדות כתביעה להכרה")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "AI כמכונת הקשבה", bold: true }), new TextRun(": טכנולוגיה שמרחיבה יכולת לשמוע, לא תחליף לאדם")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "פלורליזם נרטיבי", bold: true }), new TextRun(": ריבוי קולות כתנאי לצדק")] }),

      // חלק ג: טכנולוגיה
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק ג': טכנולוגיה — עמדות כלפי AI")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. טבלת עמדות: AI ככלי vs. AI כאיום")] }),

      // AI positions table
      new Table({
        columnWidths: [4680, 4680],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ tableHeader: true, children: [
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "48BB78", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "AI ככלי (הזדמנות)", bold: true, color: "FFFFFF" })] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, shading: { fill: "F56565", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: "AI כאיום (סיכון)", bold: true, color: "FFFFFF" })] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"מכונת הקשבה רבת-עוצמה"')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"רגולציה שמסתמכת על בנצ\'מרקים היא אשליה מסוכנת"')] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"אמצעי לגישור בין מחקר כמותני לאיכותני"')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"מודלים יכולים להיות שיטתיים בטעויות"')] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"הרחבת היכולת לשמוע קולות של נפגעים"')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"קופסה שחורה שמחליפה שופטים — לא לגיטימי"')] })] }),
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"כלי לחשיפת הטיות בדין ובמוסדות"')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ bidirectional: true, children: [new TextRun('"שימוש לצרכי הסברה/תעמולה"')] })] }),
          ]}),
        ]
      }),

      new Paragraph({ bidirectional: true, spacing: { before: 300, after: 200 }, shading: { fill: "EBF8FF", type: ShadingType.CLEAR }, children: [
        new TextRun({ text: "ציטוט מפתח: ", bold: true }),
        new TextRun({ text: '"בינה מלאכותית היא \'מכונת הקשבה\' פוטנציאלית — אם משתמשים בה כדי להרחיב את ההקשבה והאחריות, לא כדי לצמצם אותן."', italics: true })
      ]}),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. תנאי לגיטימציה — מתי מותר, קווים אדומים")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("תנאים להשימוש לגיטימי ב-AI")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "AI משרת הקשבה, לא שליטה", bold: true }), new TextRun(" — מרחיב את היכולת לשמוע קולות מודרים")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "שקיפות", bold: true }), new TextRun(" — ברור מה הכלי עושה ומה המגבלות שלו")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "שליטת המשתמש/העד בנרטיב", bold: true }), new TextRun(' — לא "הפקעה" של העדות')] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "כפיפות לנורמות של שלטון החוק וזכויות אדם", bold: true })] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "אתיקה כחלק מהתכנון", bold: true }), new TextRun(" — לא תוספת בדיעבד")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("קווים אדומים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("AI שמחליף שיקול דעת אנושי במשפט")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('שימוש ל"הסברה" או תעמולה')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("אוטומציה עיוורת ללא פיקוח")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("כלים ללא שקיפות (קופסה שחורה)")] }),

      // חלק ד: פדגוגיה
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק ד': פדגוגיה")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. פילוסופיית הוראה — מה בונה בסטודנטים")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("ערכים מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "חשיבה ביקורתית ומושכלת", bold: true }), new TextRun(" — ביטוי חוזר בכל הסילבוסים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "בין-תחומיות", bold: true }), new TextRun(' — "פיתוח מיומנות בחשיבה בין-תחומית חיונית בעולם המשפטי המתפתח"')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "כבוד הדדי ושיחה אמיתית", bold: true }), new TextRun(" — דגש על קשר אישי עם סטודנטים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "אוריינות דיגיטלית", bold: true }), new TextRun(' — "בסיס לעבודה ביקורתית ומושכלת"')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("ביטויים חוזרים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: '"באופן ביקורתי ומושכל"', italics: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: '"מה כל כלי מאפשר לנו ומה לא"', italics: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: '"הרכיב העיקרי המסב לי סיפוק והנאה מההוראה הוא המפגש אתכם.ן"', italics: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. עיצוב קורסים — מטלות, טקסטים, מרצי אורח")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("קורסים מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "משפט, טכנולוגיה ומידע", bold: true }), new TextRun(" (LL.B) — AI במשפט, פרטיות, אלגוריתמים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "מחקר הומניסטי בעידן דיגיטלי", bold: true }), new TextRun(" (M.A) — Digital Humanities")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "משפט, ספרות וזכויות אדם", bold: true }), new TextRun(" (LL.B) — נרטיבים ועדות")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "סמינר AI, דמוקרטיה ושלטון החוק", bold: true }), new TextRun(" (2024-2025)")] }),

      // חלק ה: תמריצים
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק ה': תמריצים")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. כמנהלת אקדמית של מרכז DH — אינטרסים מוסדיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הקמת תשתית DH בפקולטה למדעי הרוח")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הכשרת דור חדש של חוקרים בכלים חישוביים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("מיצוב האוניברסיטה העברית כמובילה ב-Digital Humanities")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. כחוקרת — מניעים אקדמיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פרסום ב-journals בדירוג Q1")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("פיתוח מתודולוגיות חדשות (NLP למשפט עברי — ראשון מסוגו)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הכרה בינלאומית (Stanford, Brandeis)")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("3. כמובילת עדות 710 — ציפיות ואילוצים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("תיעוד היסטורי אתי של אירועי 7 באוקטובר")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("יישום מיידי של הידע המחקרי מעדויות שואה")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("הימנעות מניצול הסברתי-פוליטי")] }),

      // חלק ו: המלצות
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("חלק ו': המלצות — לבניית הצעת AI")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("1. נקודות חיבור — ערכים לבסס עליהם הצעה")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "AI כמכשיר להקשבה", bold: true }), new TextRun(" — לא תחליף, אלא הרחבה")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "שימוש אתי בטכנולוגיה", bold: true }), new TextRun(" — אתיקה מובנית בתכנון")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "שקיפות ואחריות", bold: true }), new TextRun(" — ברור מה הכלי עושה")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "צדק ודמוקרטיה", bold: true }), new TextRun(" — AI שמשרת פלורליזם")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "גישה בין-תחומית", bold: true }), new TextRun(" — משפט + מדעי הרוח + טכנולוגיה")] }),
      new Paragraph({ numbering: { reference: "numbered-list", level: 0 }, bidirectional: true, children: [new TextRun({ text: "העצמת קולות מודרים", bold: true }), new TextRun(" — במיוחד נפגעים ומיעוטים")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("2. נקודות חיכוך — מה יעורר התנגדות")] }),
      new Paragraph({ bidirectional: true, shading: { fill: "FED7D7", type: ShadingType.CLEAR }, spacing: { after: 200 }, children: [new TextRun({ text: "להימנע מ:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('כל דבר שנראה כ"הסברה" או תעמולה')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("אוטומציה שמחליפה שיקול דעת אנושי")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("כלים ללא שקיפות (קופסה שחורה)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("benchmarks כאמצעי רגולציה יחיד")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('"יעילות" כערך עליון על פני צדק')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("3. מסגור — שפה, מטאפורות, פרויקטים לחבר")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("שפה מומלצת")] }),
      new Paragraph({ bidirectional: true, children: [new TextRun({ text: '"הקשבה", "קולות", "עדות", "צדק", "פלורליזם", "הרחבת היכולת", "העמקת הבנה", "שקיפות", "אחריות"', italics: true })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("מטאפורות")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('AI כ'), new TextRun({ text: '"מכונת הקשבה"', bold: true }), new TextRun(' — לא כ"מחליף" או "אוטומט"')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('AI כ'), new TextRun({ text: '"כלי ביקורתי"', bold: true }), new TextRun(" — חושף הטיות, לא משכפל אותן")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('AI כ'), new TextRun({ text: '"שותף מחקר"', bold: true }), new TextRun(" — עוזר, לא מוביל")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun('4. אופרטיבי — 5 להדגיש, רשימת "לא", שאלות צפויות')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("5 דברים להדגיש בכל הצעה")] }),
      new Paragraph({ bidirectional: true, shading: { fill: "C6F6D5", type: ShadingType.CLEAR }, children: [new TextRun({ text: "1. AI שמרחיב הקשבה, לא מחליף שיקול דעת", bold: true })] }),
      new Paragraph({ bidirectional: true, children: [new TextRun('"הכלי מאפשר להקשיב לקולות שאחרת היו נבלעים"')] }),
      new Paragraph({ bidirectional: true, shading: { fill: "C6F6D5", type: ShadingType.CLEAR }, children: [new TextRun({ text: "2. שקיפות ואחריות מובנית", bold: true })] }),
      new Paragraph({ bidirectional: true, children: [new TextRun('"תמיד ברור מה הכלי עשה ומה המשתמש עשה"')] }),
      new Paragraph({ bidirectional: true, shading: { fill: "C6F6D5", type: ShadingType.CLEAR }, children: [new TextRun({ text: "3. שליטת המשתמש בתוצר", bold: true })] }),
      new Paragraph({ bidirectional: true, children: [new TextRun('"הסטודנט/החוקר שומר על אוטונומיה מלאה"')] }),
      new Paragraph({ bidirectional: true, shading: { fill: "C6F6D5", type: ShadingType.CLEAR }, children: [new TextRun({ text: "4. גישה בין-תחומית", bold: true })] }),
      new Paragraph({ bidirectional: true, children: [new TextRun('"שילוב של מומחיות משפטית, הומניסטית וטכנולוגית"')] }),
      new Paragraph({ bidirectional: true, shading: { fill: "C6F6D5", type: ShadingType.CLEAR }, children: [new TextRun({ text: "5. חיבור למחקר קיים", bold: true })] }),
      new Paragraph({ bidirectional: true, children: [new TextRun('"בונה על התשתית של Digital Humanities ומשפט חישובי"')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun('רשימת "לא" — מה לא לעשות')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('❌ לא להציג AI כ"פתרון" שמחליף עבודה אנושית')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('❌ לא להתמקד ב"יעילות" או "חיסכון בזמן" כערך עליון')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("❌ לא להשתמש בשפה של benchmarks וציונים ללא הקשר")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun('❌ לא להציג כלי "קופסה שחורה" ללא שקיפות')] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("❌ לא לחבר להסברה או תעמולה")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, bidirectional: true, children: [new TextRun("שאלות צפויות ותשובות מומלצות")] }),
      new Paragraph({ bidirectional: true, children: [new TextRun({ text: '"איך מבטיחים שקיפות?"', bold: true })] }),
      new Paragraph({ bidirectional: true, spacing: { after: 150 }, children: [new TextRun("תשובה: \"הכלי מסביר את התהליך, לא רק את התוצאה. תמיד ניתן לראות מה הוא עשה.\"")] }),
      new Paragraph({ bidirectional: true, children: [new TextRun({ text: '"מה קורה עם הטיות?"', bold: true })] }),
      new Paragraph({ bidirectional: true, spacing: { after: 150 }, children: [new TextRun("תשובה: \"הכלי נבנה לחשוף הטיות, לא לשכפל אותן. יש מנגנוני ביקורת מובנים.\"")] }),
      new Paragraph({ bidirectional: true, children: [new TextRun({ text: '"מי שולט בנתונים?"', bold: true })] }),
      new Paragraph({ bidirectional: true, spacing: { after: 150 }, children: [new TextRun("תשובה: \"המשתמשים. אין העברה של נתונים ללא הסכמה מפורשת.\"")] }),
      new Paragraph({ bidirectional: true, children: [new TextRun({ text: '"איך זה משרת צדק ולא רק יעילות?"', bold: true })] }),
      new Paragraph({ bidirectional: true, spacing: { after: 150 }, children: [new TextRun("תשובה: \"הכלי מאפשר להקשיב לקולות שאחרת לא היו נשמעים — זה הערך המרכזי.\"")] }),

      // מקורות
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, bidirectional: true, children: [new TextRun("מקורות")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("קבצים מקומיים שנותחו")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("keydar_cv_2025.docx — קורות חיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("resume.md — רזומה")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("keydar-writing-map-worldview-analysis.md — ניתוח השקפת עולם")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("persona-analysis-framework.md — מסגרת ניתוח")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("סילבוסים: syllabus-33500-2026.pdf, syllabus-62971-2024.pdf, law-and-data-syllabus.pdf")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("פרסומים מרכזיים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Keydar, R. (2022). Changing the Lens on Survivor Testimony. Jewish Studies Quarterly.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Keydar, R. et al. (2024). Testimony from the Machine. Law, Society and Culture.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Keydar, R. et al. (2024). The Discursive Evolution of Human Rights Law. Human Rights Law Review.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Habba, E., Keydar, R. et al. (2023). The Perfect Victim. ICAIL 2023.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("Keydar, R. (2019). Mass Atrocity, Mass Testimony, and the Quantitative Turn. Law and Society Review.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, bidirectional: true, children: [new TextRun("קישורים")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("https://renanakeydar.huji.ac.il")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("https://law.huji.ac.il/people/רננה-קידר")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("https://www.edut710.org")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, bidirectional: true, children: [new TextRun("https://digitalhumanities.huji.ac.il")] }),

      new Paragraph({ bidirectional: true, alignment: AlignmentType.CENTER, spacing: { before: 400 }, children: [new TextRun({ text: "— סוף הדוח —", color: "718096" })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/omerreish/בינה מלאכותית באקדמיה/דוח-ניתוח-פרופ-קדר.docx", buffer);
  console.log("Document created successfully!");
});
