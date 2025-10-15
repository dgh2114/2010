const SECRET = "2010";
const MUSIC_SRC = "music/romantic.mp3"; // Thay đổi URL nhạc tại đây

let backgroundAudio;
let galleryIndex = 0;
let opened = false;

// ========== LOGIN ==========
document.getElementById('loginBtn').addEventListener('click', () => {
  const password = document.getElementById('passwordInput').value.trim();
  if (password === SECRET) {
    gsap.to('#loginScreen', {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        gsap.fromTo('#mainContent', { opacity: 0 }, { opacity: 1, duration: 1.2 });
      }
    });
  } else {
    document.getElementById('loginMsg').textContent =
      "Sai mất rồi 😢 Thử lại nhé! Hôm nay là ngày gì ? (4 số)";
  }
});

// ========== DỮ LIỆU ẢNH ==========
const galleryData = [
  { type: "image", src: "images/IMG_20220702_125628.jpg", text: "Hồi mà em chưa gì đã nghĩ đến sẽ ăn thịt anh nè -.-" },
  { type: "image", src: "images/IMG20220727233422.jpg", text: "Có vẻ sắp được thịt rùi nè :>" },
  { type: "image", src: "images/IMG20220921211810.jpg", text: "Cố lên sắp tới rùi (hình như đây là tấm đầu tiên từ lúc iu thì phải á)" },
  { type: "image", src: "images/IMG_20221223_122314_417.jpg", text: "Em luôn là chỗ dựa cho anh :3 (chụi ui anh thích cảm giác được em ôm như này lắm)" },
  { type: "image", src: "images/IMG_20221223_122703_601.jpg", text: "Zui zẻ cùng nhaoooo 💕" },
  { type: "image", src: "images/IMG_20250502_140000292.jpg", text: "Anh cũng là chỗ dựa cho em nứaaa 💪" },
  { type: "image", src: "images/IMG_20221218_131511_701.jpg", text: "Đángggg iuuuu íii 🥰" },
  { type: "image", src: "images/IMG_20250716_155520.jpg", text: "hẹ hẹ hẹ 😝" },
  { type: "image", src: "images/IMG20221218195307.jpg", text: "Em luôn ở bên dõi theo anh (kể cả lúc anh đang ẻ 💩)" },
  { type: "image", src: "images/Locket_1752581000782_75.jpg", text: "Một chút vitamin xinh gái 😍" },
  { type: "image", src: "images/IMG_1758812697692_1758812716666.jpg", text: "Một chút vitamin đáng yêu 🥰" },
  { type: "image", src: "images/Locket_1754972493450_46.jpg", text: "Làm \"mặt xấu\" 😂" },
  { type: "image", src: "images/IMG_1745602237857_1745602609248.jpg", text: "Người đẹp bên phải, quái vật bên trái 😊" },
  { type: "image", src: "images/IMG_1756131903159_1756380896800.jpg", text: "i chơiiii 😆" },
  { type: "image", src: "images/IMG_1756131902868_1756137831540.jpg", text: "Chụp ảnh 📸" },
  { type: "image", src: "images/IMG_1745602237544_1745602604173.jpg", text: "Lại i chơi 🎈" },
  { type: "image", src: "images/IMG_1746258545743_1746270440119.jpg", text: "Lại chụp ảnh 😆" },
  { type: "image", src: "images/IMG_1744520107535_1744520303586.jpg", text: "Anh tổng tài bá đạo và cô thư kí xinh đẹp 🤭" },
  { type: "image", src: "images/IMG_1744520481775_1744520486142.jpg", text: "Ú òaaa 😍😍😍" }
];
// ========== PHẦN TỬ ==========
const flap = document.getElementById('flap');
const envelope = document.getElementById('envelope');
const paper = document.getElementById('paper');
const message = document.getElementById('message');
const nextBtn = document.getElementById('nextBtn');
const header = document.getElementById('header');
const mainContent = document.getElementById('mainContent');
const gallery = document.getElementById('gallery');
const galleryImg = document.getElementById('galleryImg');
const caption = document.getElementById('caption');
const heartScene = document.getElementById('heartScene');

// ========== HIỆU ỨNG GÕ CHỮ ==========
// Hàm gõ chữ có ngắt nghỉ
function typeText(text, el, cb) {
  let i = 0;
  el.innerHTML = "";
  const speed = 35;

  function typeNext() {
    if (i < text.length) {
      const char = text.charAt(i);
      el.innerHTML += char;

      // Dừng nhẹ hơn nếu gặp dấu chấm, phẩy hoặc xuống dòng
      let delay = speed;
      if (char === "." || char === "!" || char === "?") delay = 500;
      else if (char === ",") delay = 250;
      else if (char === "\n") delay = 300;

      i++;
      setTimeout(typeNext, delay);
    } else if (cb) cb();
  }
  typeNext();
}

// ========== MỞ PHONG BÌ ==========
envelope.addEventListener('click', () => {
  if (opened) return;
  opened = true;

  // Lật nắp phong bì
  gsap.to(flap, { rotateX: 180, duration: 1.2, ease: 'elastic.out(1,0.5)' });

  // Sau 1s → ẩn phong bì, hiện giấy
  gsap.to(envelope, {
    opacity: 0,
    delay: 1,
    duration: 0.8,
    onComplete: () => {
      envelope.style.display = "none";

      gsap.to(paper, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power3.out",
        onComplete: showLetter
      });
    }
  });
});

// ========== GÕ NỘI DUNG THƯ ==========
// Hiển thị nội dung bức thư
function showLetter() {
  const dateLine = `
    <div class='letter-header' 
       style='text-align: right; font-style: italic; color: #7e22ce; font-size: 0.9rem; margin-bottom: 0.8rem; margin-right: 8%; letter-spacing: 0.3px;'>
       Hà Nội, ngày 20 tháng 10 năm 2025
  </div>`;

  const body = `Gửi em yêu dấu 💜,
Nhân dịp hôm qua là ngày 19 và ngày mai là ngày 21 tháng 10. Anh có một món quà nho nhỏ muốn dành tặng đến người anh thương 😊.
Món quà này nhỏ và cũng đơn giản thui nhưng anh hi vọng là em bé sẽ thích nó ạ 😘
Anh xin chúc người yêu của anh có 1 ngày thật may mắn và tràn đầy niềm vui, hạnh phúc 😍.
Anh cảm ơn em vì đã luôn ở bên, luôn quan tâm và yêu thương anh nhiều đến vậy 🥰.
Cảm ơn em vì tất cả 💗.`;

  const signature = `
    <div class='letter-signature' 
         style='text-align: right; color: #6b21a8; margin-top: 1.5rem; font-size: 1rem; font-weight: 500;'>
         __Anh iuuuu của em 💗__
    </div>`;

  message.innerHTML = dateLine + "<div id='typingArea'></div>";
  const typingArea = document.getElementById("typingArea");

  typeText(body, typingArea, () => {
    typingArea.innerHTML += signature;

    // Hiện nút sau khi gõ xong
    gsap.fromTo(
      nextBtn,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        display: "block",
        ease: "elastic.out(1, 0.5)"
      }
    );
  });

  gsap.to(message, { opacity: 1, duration: 1, delay: 0.5 });
}

// ========== SAU KHI BẤM NÚT ==========
nextBtn.addEventListener('click', () => {
  // Ẩn toàn bộ phần thư và tiêu đề
  gsap.to([header, paper], {
    opacity: 0,
    y: -50,
    duration: 1,
    onComplete: () => {
      header.style.display = "none";
      paper.style.display = "none";
      envelope.style.display = "none";
      playBackgroundMusic();
      showGallery();
    }
  });
});

// ========== PHÁT NHẠC ==========
function playBackgroundMusic() {
  if (!backgroundAudio) {
    backgroundAudio = new Audio(MUSIC_SRC);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.7;
    backgroundAudio.load();
    backgroundAudio.play().catch(err => console.warn("Autoplay bị chặn:", err));
  }
}

// ========== HIỆN ẢNH ==========
function showGallery() {
  gallery.style.display = "block";

  if (galleryIndex >= galleryData.length) {
    fadeOutMusic();
    startHeartScene();
    return;
  }

  const item = galleryData[galleryIndex];
  galleryImg.style.opacity = 0;
  galleryImg.src = item.src;
  caption.textContent = "";

  gsap.to(galleryImg, { opacity: 1, duration: 1 });
  setTimeout(() => {
    typeText(item.text, caption, () => {
      galleryImg.onclick = () => {
        gsap.to(galleryImg, { opacity: 0, duration: 1, onComplete: () => {
          galleryIndex++;
          showGallery();
        }});
      };
    });
  }, 400);
}

// ========== GIẢM DẦN ÂM LƯỢNG ==========
function fadeOutMusic() {
  if (backgroundAudio) {
    const fadeInterval = setInterval(() => {
      if (backgroundAudio.volume > 0.05) {
        backgroundAudio.volume -= 0.05;
      } else {
        clearInterval(fadeInterval);
        backgroundAudio.pause();
      }
    }, 200);
  }
}

// ========== TIM BAY ==========
function startHeartScene() {
  gallery.style.display = 'none';
  heartScene.style.display = 'block';
  gsap.fromTo(heartScene, { opacity: 0 }, { opacity: 1, duration: 2 });

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = Math.random() > 0.5 ? '❤' : '💜';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 16 + Math.random() * 30 + 'px';
    heart.style.animationDuration = 4 + Math.random() * 3 + 's';
    heartScene.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 180);
}
