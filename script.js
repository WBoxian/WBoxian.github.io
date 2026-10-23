const pageLang = document.body.dataset.pageLang || "en";

const supportContent = {
  wechat: {
    title: { en: "WeChat Pay", zh: "微信支付" },
    caption: {
      en: "Thanks for the support. You can scan this WeChat QR code directly.",
      zh: "感谢支持，可以直接使用微信扫码。"
    },
    image: "/assets/support/wechat.jpg"
  },
  alipay: {
    title: { en: "Alipay", zh: "支付宝" },
    caption: {
      en: "Thanks for the support. You can scan this Alipay QR code directly.",
      zh: "感谢支持，可以直接使用支付宝扫码。"
    },
    image: "/assets/support/alipay.jpg"
  },
  paypal: {
    title: { en: "PayPal", zh: "PayPal" },
    caption: {
      en: "Thanks for the coffee. This PayPal QR code works well for international support.",
      zh: "感谢支持。这张 PayPal 付款码更适合国际赞助。"
    },
    image: "/assets/support/paypal.png"
  }
};

const modal = document.getElementById("support-modal");
const modalTitle = document.getElementById("support-title");
const modalImage = document.getElementById("support-image");
const modalCaption = document.getElementById("support-caption");
const modalClose = document.getElementById("modal-close");

document.querySelectorAll(".support-button").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.support;
    const content = supportContent[key];
    if (!content) {
      return;
    }

    modalTitle.textContent = content.title[pageLang];
    modalImage.src = content.image;
    modalImage.alt = content.title[pageLang];
    modalCaption.textContent = content.caption[pageLang];
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  });
});

const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = "";
};

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target.dataset.closeModal === "true") {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".topbar, .support-strip, .hero, .section").forEach((node) => {
  node.classList.add("reveal");
  observer.observe(node);
});

const canvas = document.querySelector(".hero-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const baseWidth = 520;
  const baseHeight = 340;
  canvas.width = baseWidth * ratio;
  canvas.height = baseHeight * ratio;
  ctx.scale(ratio, ratio);

  const nodes = Array.from({ length: 22 }, (_, index) => ({
    x: 50 + ((index * 29) % 420),
    y: 46 + ((index * 43) % 220),
    vx: ((index % 3) - 1) * 0.2 + 0.12,
    vy: (((index + 1) % 3) - 1) * 0.16 + 0.09,
    r: index % 4 === 0 ? 5 : 3.5
  }));
  let tick = 0;

  const draw = () => {
    ctx.clearRect(0, 0, baseWidth, baseHeight);
    tick += 0.008;

    const bg = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
    bg.addColorStop(0, "rgba(255,252,247,0.95)");
    bg.addColorStop(1, "rgba(240,247,244,0.92)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    ctx.lineWidth = 1;
    for (let band = 0; band < 4; band += 1) {
      ctx.beginPath();
      for (let x = 0; x <= baseWidth; x += 8) {
        const y =
          70 +
          band * 56 +
          Math.sin(x * 0.018 + tick * (band + 2)) * (10 + band * 1.5) +
          Math.cos(x * 0.01 + tick * 3.2) * 4;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = band % 2 === 0 ? "rgba(180,76,36,0.16)" : "rgba(13,107,92,0.16)";
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
    gradient.addColorStop(0, "rgba(180,76,36,0.24)");
    gradient.addColorStop(1, "rgba(13,107,92,0.24)");

    for (let i = 0; i < nodes.length; i += 1) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;

      if (a.x < 20 || a.x > baseWidth - 20) {
        a.vx *= -1;
      }
      if (a.y < 20 || a.y > baseHeight - 20) {
        a.vy *= -1;
      }

      for (let j = i + 1; j < nodes.length; j += 1) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 132) {
          ctx.strokeStyle = `rgba(26,40,64,${0.14 - distance / 1200})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(26,40,64,0.72)";
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  draw();
}
