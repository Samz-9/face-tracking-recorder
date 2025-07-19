# 🎥 AI Face Tracking & Recording App

A real-time **Face Detection and Video Recording** web application built with **Next.js (App Router)**, **Tailwind CSS**, and **face-api.js**. Users can record themselves while tracking their face with visual overlays, and save the video locally using `localStorage`.


---

## ✨ Features

- ✅ Real-time face detection using `face-api.js` (`tiny_face_detector`)
- ✅ Live tracking box over detected faces
- ✅ Start/stop video recording with overlays
- ✅ Save the video to browser's `localStorage`
- ✅ Responsive UI with beautiful gradient effects
- ✅ Built with Next.js App Router + Tailwind CSS

---

## 🚀 How It Works
- Uses the webcam via navigator.mediaDevices.getUserMedia

- Loads face detection models into browser memory

- Continuously detects faces and draws rectangles using a `canvas` overlay

- Records combined video and canvas using the MediaRecorder API

- Converts video to base64 and stores it in localStorage

---
## 🗂️ Tech Stack
- Framework: Next.js 14 App Router

- Styling: Tailwind CSS

- Face Detection: face-api.js

- Video Recording: Native MediaRecorder API

- Storage: Browser's localStorage
---
## 📸 Future Improvements
- Add multiple saved recordings list

 - Use IndexedDB for larger video files

 - Expression/age detection overlays

 - Upload to cloud or backend storage

 ---
 ## 🧑‍💻 Author
```
Developed as part of a 24-hour challenge given by House Of Couton Pvt.Ltd.
```

