# 婚禮請帖

這是一份原生 HTML、CSS、JavaScript 電子請帖，已準備好使用 GitHub Pages 自動發布。無須安裝套件。

## 第一次發布

1. 建立 GitHub 儲存庫，預設名稱 `wedding-invitation`，分支使用 `main`。
2. 將此資料夾內所有檔案推送到儲存庫，包括 `.github/workflows/pages.yml`；不要再包一層資料夾。
3. 開啟儲存庫 **Settings → Pages → Build and deployment → Source**，選擇 **GitHub Actions**。
4. 在 **Actions → 發布婚禮請帖 → Run workflow** 執行第一次部署。
5. 等待綠色勾號；網站連結會顯示在 **Settings → Pages** 或該次部署的 **github-pages** environment。請分享網站連結，不是原始碼儲存庫連結。

GitHub Free 通常需使用公開儲存庫來使用 Pages；公開儲存庫內的程式碼、照片及歷史紀錄均可供他人查看。使用私人儲存庫發布 Pages 需符合帳號方案條件。

## 之後自己修改並發布

1. 登入 GitHub，開啟這份儲存庫。
2. 選擇要修改的檔案，按鉛筆 **Edit this file**。
3. 修改後按 **Commit changes**，選擇提交至 `main`。
4. 開啟 **Actions** 查看部署，出現綠色勾號後重新整理網站。

每次提交到 `main` 都會自動發布。不需要回到 Codex，也不需要每次重新開啟 Pages 設定。

| 要修改的內容 | 檔案 |
|---|---|
| 邀請文字、場地地址、頁面標題 | `index.html` |
| 新人姓名、婚禮倒數日期、照片、音樂、行事曆活動 | `script.js` |
| 字型、顏色、排版 | `style.css` |
| 婚紗照、音檔、粉圓字體、月曆圖 | `assets/` |

注意：日期與場地部分文字同時出現在 HTML 及 JavaScript，修改時需要一起確認。月曆圖片為 `assets/calendar.svg`。

## 加入音樂

在 GitHub 開啟 `assets` 資料夾，選 **Add file → Upload files**，上傳可使用的 MP3，命名為 `music.mp3`。再將 `script.js` 頂部的 `music: ''` 改為 `music: 'assets/music.mp3'`，提交後自動發布。賓客點右上角播放按鈕即可播放。

## 出席回覆

已串接 Google Apps Script，回覆寫入新人指定的「婚禮統計」試算表之「婚禮出席回覆」分頁。只有收到後端儲存確認才顯示成功；失敗時保留輸入，相同內容重試使用同一編號防止重複。電話以文字儲存，保留開頭的 0。

請從線上 GitHub Pages 網站送出，直接開啟本機 HTML 僅供預覽。接收網址位於 script.js 的 rsvpEndpoint。不要將賓客回覆、電話、地址或 Google 憑證上傳到公開儲存庫。

## 網址

GitHub Pages 會提供新的 `github.io` 網址。原本的 `chatgpt.site` 網站是另一套託管，不會跟著 GitHub 提交更新。確認 GitHub Pages 發布成功後，請改分享新的 GitHub Pages 網址。

## 字體授權

粉圓字體由 justfont 提供，授權隨附於 `assets/Huninn-LICENSE.txt`。照片未附開源授權，請勿將程式碼儲存庫視為授權他人使用照片。

官方文件：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
