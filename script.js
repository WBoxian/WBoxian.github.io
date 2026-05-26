const pageLang = document.body.dataset.pageLang || "en";

const supportContent = {
  wechat: {
    title: { en: "WeChat Pay", zh: "微信支付" },
    caption: {
      en: "Thanks for the support. You can scan this WeChat QR code directly.",
      zh: "感谢支持，可以直接使用这张微信付款码。"
    },
    image: "/assets/support/wechat.jpg"
  },
  alipay: {
    title: { en: "Alipay", zh: "支付宝" },
    caption: {
      en: "Thanks for the support. You can scan this Alipay QR code directly.",
      zh: "感谢支持，可以直接使用这张支付宝付款码。"
    },
    image: "/assets/support/alipay.jpg"
  },
  paypal: {
    title: { en: "PayPal", zh: "PayPal" },
    caption: {
      en: "Thanks for the coffee. This PayPal QR code is suitable for international support.",
      zh: "感谢支持，这张 PayPal 付款码更适合国际赞助。"
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
    const content = supportContent[button.dataset.support];
    if (!content || !modal) {
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
  if (!modal) {
    return;
  }
  modal.hidden = true;
  document.body.style.overflow = "";
};

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
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

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

const canvas = document.querySelector(".hero-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const baseWidth = 640;
  const baseHeight = 420;
  canvas.width = baseWidth * ratio;
  canvas.height = baseHeight * ratio;
  ctx.scale(ratio, ratio);

  const nodes = Array.from({ length: 18 }, (_, index) => ({
    x: 72 + ((index * 37) % 500),
    y: 72 + ((index * 53) % 260),
    vx: (((index % 4) - 1.5) * 0.12) + 0.08,
    vy: ((((index + 2) % 4) - 1.5) * 0.1) + 0.06,
    r: index % 5 === 0 ? 5 : 3.2
  }));

  let tick = 0;

  const drawWave = (offset, amplitude, color) => {
    ctx.beginPath();
    for (let x = 0; x <= baseWidth; x += 8) {
      const y =
        offset +
        Math.sin(x * 0.013 + tick * 1.8) * amplitude +
        Math.cos(x * 0.008 + tick * 1.2) * (amplitude * 0.35);
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  };

  const draw = () => {
    tick += 0.01;
    ctx.clearRect(0, 0, baseWidth, baseHeight);

    const bg = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
    bg.addColorStop(0, "rgba(255,255,255,0.94)");
    bg.addColorStop(1, "rgba(245,244,240,0.94)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    drawWave(110, 14, "rgba(54,95,143,0.18)");
    drawWave(190, 18, "rgba(138,90,53,0.13)");
    drawWave(275, 15, "rgba(54,95,143,0.12)");
    drawWave(340, 12, "rgba(28,30,36,0.08)");

    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 30 || node.x > baseWidth - 30) {
        node.vx *= -1;
      }
      if (node.y < 30 || node.y > baseHeight - 30) {
        node.vy *= -1;
      }

      for (let j = i + 1; j < nodes.length; j += 1) {
        const peer = nodes[j];
        const dx = node.x - peer.x;
        const dy = node.y - peer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 138) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(peer.x, peer.y);
          ctx.strokeStyle = `rgba(30, 36, 44, ${0.11 - distance / 1500})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      const fill = ctx.createLinearGradient(node.x - 6, node.y - 6, node.x + 6, node.y + 6);
      fill.addColorStop(0, "rgba(54,95,143,0.72)");
      fill.addColorStop(1, "rgba(138,90,53,0.64)");
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  draw();
}
