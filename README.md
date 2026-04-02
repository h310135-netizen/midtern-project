# Campus Style Personal Website

一個為高中生設計的個人部落格網站模板，使用 React + Tailwind CSS 打造，支援 GitHub Pages 一鍵部署。

**只需要修改一個 JSON 檔案，就能打造出屬於你自己的個人網站！**

---

## 目錄

- [線上範例](#線上範例)
- [快速開始：三步驟部署你的網站](#快速開始三步驟部署你的網站)
- [如何自訂你的網站](#如何自訂你的網站)
  - [修改網站名稱與副標題](#1-修改網站名稱與副標題)
  - [修改主題配色](#2-修改主題配色)
  - [修改社群連結](#3-修改社群連結)
  - [修改導覽列](#4-修改導覽列)
  - [修改「關於我」](#5-修改關於我)
  - [修改文章](#6-修改文章)
  - [修改分類](#7-修改分類)
  - [更換照片](#8-更換照片)
- [本地開發](#本地開發)
- [專案結構](#專案結構)
- [常見問題](#常見問題)

---

## 線上範例

部署完成後，你的網站會出現在：`https://你的GitHub帳號.github.io/campus-style-personal-website/`

---

## 快速開始：三步驟部署你的網站

### 第一步：複製這個儲存庫

1. 點擊本頁面右上角的 **「Use this template」** 按鈕（或 **「Fork」**）
2. 在彈出的頁面中，輸入你的儲存庫名稱（例如 `my-blog`）
3. 選擇 **Public**，然後點擊 **「Create repository」**

### 第二步：開啟 GitHub Pages

1. 進入你新建的儲存庫頁面
2. 點擊上方的 **「Settings」**（設定）
3. 在左側選單中找到 **「Pages」**
4. 在 **「Source」** 的地方選擇 **「GitHub Actions」**

### 第三步：修改內容並推送

1. 在你的儲存庫中，找到 `src/data/content.json` 這個檔案
2. 點擊鉛筆圖示進行編輯（直接在 GitHub 網頁上就能改！）
3. 改完後點擊 **「Commit changes」**
4. GitHub 會自動幫你建置並部署網站，等幾分鐘後就能看到成果了！

> 每次你推送（push）到 `main` 分支，GitHub 都會自動重新部署你的網站。

---

## 如何自訂你的網站

所有內容都在 **一個檔案** 裡：`src/data/content.json`

打開這個檔案，你會看到以下可以修改的區塊：

### 1. 修改網站名稱與副標題

```json
{
  "siteName": "CAMPUS DIARIES",
  "subtitle": "高中生活與日常穿搭誌"
}
```

把 `"CAMPUS DIARIES"` 改成你想要的網站名稱，`"subtitle"` 改成你的副標題。

### 2. 修改主題配色

```json
{
  "theme": {
    "primaryColor": "#ce6d6d",
    "accentColor": "#55b4daee",
    "backgroundColor": "#ff1cff",
    "footerBackground": "#b411dd",
    "sidebarBackground": "#d148dd",
    "fontSans": "Montserrat",
    "fontSerif": "Cormorant Garamond"
  }
}
```

| 欄位 | 說明 | 範例 |
|------|------|------|
| `primaryColor` | 主要文字顏色 | `"#222222"` (深灰黑) |
| `accentColor` | 輔助/強調色 | `"#888888"` (灰色) |
| `backgroundColor` | 網站背景色 | `"#ffffff"` (白色) |
| `footerBackground` | 頁尾背景色 | `"#111111"` (深黑色) |
| `sidebarBackground` | 側邊欄背景色 | `"#fafafa"` (淺灰色) |

**配色靈感範例：**

- **暖色調**：`primaryColor: "#3d2c2c"`, `backgroundColor: "#fdf6f0"`, `footerBackground: "#3d2c2c"`, `sidebarBackground: "#fef9f4"`
- **冷色調**：`primaryColor: "#1a2332"`, `backgroundColor: "#f5f7fa"`, `footerBackground: "#1a2332"`, `sidebarBackground: "#eef1f5"`
- **森林系**：`primaryColor: "#2d3b2d"`, `backgroundColor: "#f9faf5"`, `footerBackground: "#2d3b2d"`, `sidebarBackground: "#f2f5ed"`

> 顏色使用 HEX 色碼格式，可以到 [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp) 挑選你喜歡的顏色。

### 3. 修改社群連結

```json
{
  "socialLinks": {
    "instagram": "https://instagram.com/你的帳號",
    "facebook": "https://facebook.com/你的帳號",
    "twitter": "https://twitter.com/你的帳號"
  }
}
```

填入你的社群網址。如果某個平台不想顯示，留空 `""` 即可。全部留空的話會顯示預設的圖標。

### 4. 修改導覽列

```json
{
  "nav": [
    { "label": "首頁", "type": "home" },
    { "label": "校園穿搭", "type": "category", "value": "OUTFIT" },
    { "label": "生活隨筆", "type": "category", "value": "LIFESTYLE" },
    { "label": "關於我", "type": "about" }
  ]
}
```

- `label`：顯示在導覽列上的文字
- `type`：功能類型（`home` = 首頁，`category` = 分類頁，`about` = 關於我）
- `value`：分類的英文名稱（必須和文章的 `category` 一致）

### 5. 修改「關於我」

```json
{
  "sidebar": {
    "about": {
      "title": "ABOUT ME",
      "image": "https://你的照片網址",
      "name": "小明 (Ming)",
      "description": "17歲，喜歡攝影、穿搭和記錄生活。"
    },
    "aboutExtended": "歡迎來到我的個人網站！這裡記錄了我的校園生活..."
  }
}
```

- `image`：你的大頭照或代表照片的網址
- `name`：你的名字
- `description`：簡短自我介紹（顯示在側邊欄）
- `aboutExtended`：完整自我介紹（顯示在「關於我」頁面）

### 6. 修改文章

#### 置頂文章（首頁最大的那篇）
```json
{
  "heroPost": {
    "id": "post-000",
    "category": "LIFESTYLE",
    "title": "文章標題",
    "date": "2026.03.12",
    "image": "照片網址",
    "excerpt": "文章摘要，顯示在首頁...",
    "content": [
      "第一段內容。",
      "第二段內容。",
      "第三段內容。"
    ]
  }
}
```

#### 一般文章
```json
{
  "posts": [
    {
      "id": "post-001",
      "category": "OUTFIT",
      "title": "文章標題",
      "date": "2026.03.05",
      "image": "照片網址",
      "excerpt": "文章摘要...",
      "content": [
        "第一段內容。",
        "第二段內容。"
      ]
    }
  ]
}
```

**新增文章**：在 `posts` 陣列中新增一個物件，記得：
- `id` 要是唯一的（例如 `"post-006"`）
- `category` 必須和導覽列設定的 `value` 一致
- `content` 是一個陣列，每個元素是一個段落

**刪除文章**：直接把該文章的整個 `{ ... }` 物件刪掉即可。

### 7. 修改分類

```json
{
  "sidebar": {
    "categories": [
      { "name": "校園穿搭 (OUTFITS)", "value": "OUTFIT", "count": 12 },
      { "name": "生活隨筆 (LIFESTYLE)", "value": "LIFESTYLE", "count": 8 }
    ]
  }
}
```

- `name`：顯示在側邊欄的分類名稱
- `value`：分類代碼（必須和文章的 `category` 以及導覽列的 `value` 一致）
- `count`：顯示的文章數量（可自行設定）

### 8. 更換照片

文章和大頭照使用的是網路圖片網址。你有兩種方式更換照片：

#### 方式一：使用 Unsplash 免費圖庫（推薦新手使用）

1. 到 [Unsplash](https://unsplash.com) 搜尋你想要的照片
2. 找到喜歡的照片後，右鍵點擊照片 → 「複製圖片網址」
3. 把網址貼到 `content.json` 裡對應的 `"image"` 欄位

#### 方式二：使用自己的照片

1. 在你的 GitHub 儲存庫中建立一個 `public/images` 資料夾
2. 上傳你的照片到這個資料夾
3. 在 `content.json` 中使用相對路徑：`"./images/你的照片.jpg"`

---

## 本地開發

如果你想在自己的電腦上預覽和開發：

```bash
# 1. 下載專案
git clone https://github.com/你的帳號/你的儲存庫名稱.git
cd 你的儲存庫名稱

# 2. 安裝套件
npm install

# 3. 啟動開發伺服器
npm run dev
```

打開瀏覽器前往 `http://localhost:3000` 即可看到你的網站。

修改 `src/data/content.json` 後儲存，網頁會自動更新。

---

## 專案結構

```
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Pages 自動部署設定
├── src/
│   ├── data/
│   │   └── content.json      ← ⭐ 你唯一需要修改的檔案
│   ├── App.tsx                ← 網站主要程式碼
│   ├── index.css              ← 字型與主題樣式
│   └── main.tsx               ← 程式進入點
├── index.html                 ← HTML 模板
├── package.json               ← 套件設定
├── vite.config.ts             ← 建置工具設定
└── README.md                  ← 你正在看的這份文件
```

---

## 常見問題

### Q：我改了 content.json 但網站沒有更新？
**A：** GitHub Actions 需要幾分鐘來建置和部署。到你的儲存庫點擊 「Actions」 分頁查看建置進度。如果失敗，檢查 JSON 格式是否正確（常見問題是少了逗號或多了逗號）。

### Q：我可以用 JSON 線上驗證工具嗎？
**A：** 可以！推薦使用 [JSONLint](https://jsonlint.com/) 來驗證你的 JSON 格式是否正確。

### Q：我的圖片在手機上顯示得太大/太小？
**A：** 建議使用寬度 800px 以上的圖片。如果使用 Unsplash，在網址後面加上 `&w=800` 可以控制圖片大小。

### Q：我可以增加更多分類嗎？
**A：** 可以！在 `nav` 陣列中新增一個 `{ "label": "新分類", "type": "category", "value": "NEW_CATEGORY" }`，然後在 `sidebar.categories` 也新增對應項目，並確保文章的 `category` 使用相同的 `value`。

### Q：我想改字型可以嗎？
**A：** `content.json` 中的 `theme.fontSans` 和 `theme.fontSerif` 目前做為標記使用。如果想更換字型，需要同時修改 `src/index.css` 中 Google Fonts 的 `@import` 連結和 `@theme` 的字型設定。

### Q：部署後網站是空白頁面？
**A：** 確認你已在 Settings → Pages 中選擇 **GitHub Actions** 作為 Source，而不是選擇分支。

---

## 技術堆疊

- [React 19](https://react.dev/) — UI 框架
- [TypeScript](https://www.typescriptlang.org/) — 型別安全
- [Vite](https://vitejs.dev/) — 建置工具
- [Tailwind CSS v4](https://tailwindcss.com/) — 樣式框架
- [Lucide React](https://lucide.dev/) — 圖標庫
- [GitHub Pages](https://pages.github.com/) — 免費部署

---

Made with dedication for students to build their first personal website.
