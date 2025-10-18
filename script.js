const SECRET = "2010";
const MUSIC_SRC = "music/romantic.mp3";

let backgroundAudio;
let galleryIndex = 0;
let opened = false;

// ========== LOGIN ==========
document.getElementById("loginBtn").addEventListener("click", () => {
  const password = document.getElementById("passwordInput").value.trim();
  if (password === SECRET) {
    gsap.to("#loginScreen", {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("mainContent").classList.remove("hidden");
        gsap.fromTo("#mainContent", { opacity: 0 }, { opacity: 1, duration: 1.2 });
      },
    });
  } else {
    document.getElementById("loginMsg").textContent =
      "Sai mất rồi 😢 Thử lại nhé! Hôm nay là ngày gì ? (4 số)";
  }
});

// ========== DỮ LIỆU ẢNH ==========
const galleryData = [
  { src: "images/IMG_20220702_125628.jpg", text: "Hồi mà em chưa gì đã nghĩ đến sẽ ăn thịt anh nè -.-" },
  { src: "images/IMG20220727233422.jpg", text: "Có vẻ sắp được thịt rùi nè :>" },
  { src: "images/IMG20220921211810.jpg", text: "Cố lên sắp tới rùi (hình như đây là tấm đầu tiên từ lúc iu thì phải á)" },
  { src: "images/IMG_20221223_122314_417.jpg", text: "Em luôn là chỗ dựa cho anh :3 (chụi ui anh thích cảm giác được em ôm như này lắm)" },
  { src: "images/IMG_20221223_122703_601.jpg", text: "Zui zẻ cùng nhaoooo 💕" },
  { src: "images/IMG_20250502_140000292.jpg", text: "Anh cũng là chỗ dựa cho em nứaaa 💪" },
  { src: "images/IMG_20221218_131511_701.jpg", text: "Đángggg iuuuu íii 🥰" },
  { src: "images/IMG_20250716_155520.jpg", text: "hẹ hẹ hẹ 😝" },
  { src: "images/IMG20221218195307.jpg", text: "Em luôn ở bên dõi theo anh (kể cả lúc anh đang ẻ 💩)" },
  { src: "images/Locket_1752581000782_75.jpg", text: "Một chút vitamin xinh gái 😍" },
  { src: "images/IMG_1758812697692_1758812716666.jpg", text: "Một chút vitamin đáng yêu 🥰" },
  { src: "images/Locket_1754972493450_46.jpg", text: "Làm \"mặt xấu\" 😂" },
  { src: "images/IMG_1745602237857_1745602609248.jpg", text: "Người đẹp bên phải, quái vật bên trái 😊" },
  { src: "images/IMG_1756131903159_1756380896800.jpg", text: "i chơiiii 😆" },
  { src: "images/IMG_1756131902868_1756137831540.jpg", text: "Chụp ảnh 📸" },
  { src: "images/IMG_1745602237544_1745602604173.jpg", text: "Lại i chơi 🎈" },
  { src: "images/IMG_1746258545743_1746270440119.jpg", text: "Lại chụp ảnh 😆" },
  { src: "images/IMG_1744520107535_1744520303586.jpg", text: "Anh tổng tài bá đạo và cô thư kí xinh đẹp 🤭" },
  { src: "images/IMG_1744520481775_1744520486142.jpg", text: "Ú òaaa 😍😍😍" },
];

// ========== PHẦN TỬ ==========
const flap = document.getElementById("flap");
const envelope = document.getElementById("envelope");
const paper = document.getElementById("paper");
const message = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const header = document.getElementById("header");
const mainContent = document.getElementById("mainContent");
const gallery = document.getElementById("gallery");
const galleryImg = document.getElementById("galleryImg");
const caption = document.getElementById("caption");
const heartScene = document.getElementById("heartScene");

// ========== HIỆU ỨNG GÕ CHỮ ==========
function typeText(text, el, cb) {
  let i = 0;
  el.innerHTML = "";
  const speed = 35;
  function typeNext() {
    if (i < text.length) {
      const char = text.charAt(i);
      el.innerHTML += char;
      let delay = speed;
      if (".!?".includes(char)) delay = 500;
      else if (char === ",") delay = 250;
      else if (char === "\\n") delay = 300;
      i++;
      setTimeout(typeNext, delay);
    } else if (cb) cb();
  }
  typeNext();
}

// ========== MỞ PHONG BÌ ==========
envelope.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  gsap.to(flap, { rotateX: 180, duration: 1.2, ease: "elastic.out(1,0.5)" });
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
        onComplete: showLetter,
      });
    },
  });
});

// ========== HIỆN NỘI DUNG THƯ ==========
function showLetter() {
  const dateLine = `<div class='letter-header' style='text-align:right;font-style:italic;color:#7e22ce;font-size:0.9rem;margin-bottom:0.8rem;margin-right:8%;'>Hà Nội, ngày 20 tháng 10 năm 2025</div>`;
  const body = `Gửi em yêu dấu 💜,
Nhân dịp hôm qua là ngày 19 và ngày mai là ngày 21 tháng 10.
Anh có một món quà nho nhỏ muốn dành tặng đến người anh thương 😊.
Món quà này nhỏ và cũng đơn giản thui nhưng anh hi vọng là em bé sẽ thích nó ạ 😘
Anh xin chúc người yêu của anh có 1 ngày thật may mắn và tràn đầy niềm vui, hạnh phúc 😍.
Anh cảm ơn em vì đã luôn ở bên, luôn quan tâm và yêu thương anh nhiều đến vậy 🥰.
Cảm ơn em vì tất cả 💗.`;
  const signature = `<div class='letter-signature' style='text-align:right;color:#6b21a8;margin-top:1.5rem;font-size:1rem;font-weight:500;'>__Anh iuuuu của em 💗__</div>`;
  message.innerHTML = dateLine + "<div id='typingArea'></div>";
  const typingArea = document.getElementById("typingArea");
  typeText(body, typingArea, () => {
    typingArea.innerHTML += signature;
    gsap.fromTo(nextBtn, { opacity: 0, scale: 0.9 }, {
      opacity: 1, scale: 1, duration: 1, display: "block", ease: "elastic.out(1,0.5)"
    });
  });
  gsap.to(message, { opacity: 1, duration: 1, delay: 0.5 });
}

// ========== CHUYỂN SANG PHẦN ẢNH ==========
nextBtn.addEventListener("click", () => {
  gsap.to([header, paper], {
    opacity: 0,
    y: -50,
    duration: 1,
    onComplete: () => {
      header.style.display = "none";
      paper.style.display = "none";
      playBackgroundMusic();
      showGallery();
    },
  });
});

// ========== PHÁT NHẠC ==========
function playBackgroundMusic() {
  if (!backgroundAudio) {
    backgroundAudio = new Audio(MUSIC_SRC);
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.7;
    backgroundAudio.load();
    backgroundAudio.play().catch((err) => console.warn("Autoplay bị chặn:", err));
  }
}

// ========== HIỆN ẢNH + CHỮ ==========
function showGallery() {
  if (galleryIndex >= galleryData.length) {
  showQuestionForm(); // ✅ hiện form hỏi thay vì sang tim bay luôn
  return;
}


  const item = galleryData[galleryIndex];
  gallery.style.display = "block";

  // Reset caption & ảnh
  caption.innerHTML = "";
  gsap.set(caption, { opacity: 1 }); // ✅ đảm bảo caption luôn hiển thị
  gsap.set(galleryImg, { opacity: 0 });
  galleryImg.onclick = null;

  // Xử lý hiển thị ảnh & chữ
  const handleShow = () => {
    gsap.to(galleryImg, { opacity: 1, duration: 0.8, ease: "power2.out" });

    // Sau khi ảnh hiện, gõ caption
    setTimeout(() => {
      typeText(item.text, caption, () => {
        // Khi gõ xong → click để chuyển ảnh kế
        galleryImg.onclick = () => {
          // Ẩn cả ảnh và caption
          gsap.to([galleryImg, caption], {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              galleryIndex++;
              showGallery();
            },
          });
        };
      });
    }, 400);
  };

  // Luôn gắn onload (đề phòng ảnh chưa cache)
  galleryImg.onload = handleShow;
  galleryImg.src = item.src;

  // Nếu ảnh đã cache → chạy luôn
  if (galleryImg.complete) handleShow();
}

// ========== GỬI CÂU TRẢ LỜI QUA EMAILJS ==========
(function(){
  emailjs.init("86AyhCFYF1Ky5RLyW");
})();

document.getElementById("loveForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const formData = {
    question1: data.get("q1"),
    question2: data.get("q2"),
    question3: data.get("q3"),
    question4: data.get("q4"),
    question5: data.get("q5"),
    question6: data.get("q6"),
    question7: data.get("q7"),
  };

  console.log("📤 Dữ liệu gửi:", formData);

  emailjs.send("service_w97fwyf", "template_reeaxp8", formData)
    .then((res) => {
      console.log("✅ EmailJS response:", res);

      const formSection = document.getElementById("questionForm");
      const thankMsg = document.getElementById("thankMsg");
      e.target.reset();

      // 💿 Đảm bảo nhạc phát (và KHÔNG dừng nữa)
      if (!backgroundAudio || backgroundAudio.paused) {
        playBackgroundMusic();
      }

      // Ẩn form, hiện lời cảm ơn
      gsap.to(formSection, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          formSection.classList.add("hidden");
          thankMsg.classList.remove("hidden");

          // Hiện lời cảm ơn chính
          thankMsg.innerHTML = `
            💜 Cảm ơn em bé đã trả lời nhaaa 💕<br>
            Anh nhận được rồi đó, yêu em nhìu 😚
          `;
          gsap.fromTo(
            thankMsg,
            { opacity: 0, y: 20, display: "block" },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );

          // ⏳ Sau 3 giây -> thêm tim bay + dòng phụ
          setTimeout(() => {
            thankMsg.innerHTML += `<br><span class="text-sm opacity-80">(Nhìn này, tim bay nè 💖)</span>`;
            startHeartScene();

            // ❤️ Sau 7 giây -> dừng tim bay + hiện lời cuối
            setTimeout(() => {
              stopHearts();
              gsap.to(thankMsg, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                  thankMsg.innerHTML = `
                    💌 Cảm ơn em bé lần nữa nha 💕<br>
                    Anh thương em nhiều lắm 💜
                  `;
                  gsap.fromTo(thankMsg, { opacity: 0 }, { opacity: 1, duration: 1.2 });
                },
              });
            }, 7000); // tim bay 7s
          }, 3000); // chờ 3s mới bay tim
        },
      });
    })
    .catch((err) => {
      console.error("❌ Lỗi gửi email:", err);
      alert("Oops 😢 Có lỗi khi gửi thư, thử lại nha!");
    });
});



// ========== SAU KHI XEM HẾT ẢNH ==========
function showQuestionForm() {
  gallery.style.display = "none";
  const formSection = document.getElementById("questionForm");
  formSection.classList.remove("hidden");
  gsap.fromTo(formSection, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
}

// ========== TIM BAY ==========
let heartInterval;

function startHeartScene() {
  gallery.style.display = "none";
  heartScene.style.display = "block";
  gsap.fromTo(heartScene, { opacity: 0 }, { opacity: 1, duration: 1 });

  heartInterval = setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "💜" : "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 16 + Math.random() * 30 + "px";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    heartScene.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 180);
}

function stopHearts() {
  clearInterval(heartInterval);
  gsap.to(heartScene, {
    opacity: 0,
    duration: 1.5,
    onComplete: () => {
      heartScene.innerHTML = "";
      heartScene.style.display = "none";
    },
  });
}


// Gọi hàm này cuối hàm fadeOutMusic để tắt tim cùng lúc
function fadeOutMusic() {
  if (backgroundAudio) {
    const fade = setInterval(() => {
      if (backgroundAudio.volume > 0.05) {
        backgroundAudio.volume -= 0.05;
      } else {
        clearInterval(fade);
        backgroundAudio.pause();
        stopHearts(); // 💜 dừng tim bay luôn
      }
    }, 200);
  }
}

