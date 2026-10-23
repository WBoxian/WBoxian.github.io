const supportContent = {
  alipay: {
    title: { en: "Alipay", zh: "支付宝" },
    caption: {
      en: "Thanks for the support. You can scan this Alipay QR code directly.",
      zh: "感谢支持，可以直接使用支付宝扫码。"
    },
    image: "assets/support/alipay.jpg"
  },
  paypal: {
    title: { en: "PayPal", zh: "PayPal" },
    caption: {
      en: "Thanks for the coffee. This PayPal QR code works well for international support.",
      zh: "感谢支持。这张 PayPal 付款码更适合国际赞助。"
    },
    image: "assets/support/paypal.png"
  },
  wechat: {
    title: { en: "WeChat Pay", zh: "微信支付" },
    caption: {
      en: "Thanks for the support. You can scan this WeChat Pay QR code directly.",
      zh: "感谢支持，可以直接使用微信扫码。"
    },
    image: "assets/support/wechat.jpg"
  }
};

const body = document.body;
const modal = document.getElementById("support-modal");
const modalTitle = document.getElementById("support-title");
const modalImage = document.getElementById("support-image");
const modalCaption = document.getElementById("support-caption");
const modalClose = document.getElementById("modal-close");
const langButtons = document.querySelectorAll(".lang-button");
const supportButtons = document.querySelectorAll(".support-button");
const revealTargets = document.querySelectorAll(".topbar, .support-strip, .hero, .section");

const getLang = () => body.dataset.lang || "en";

const setLanguage = (lang) => {
  body.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.langTarget === lang);
  });
};

const openModal = (key) => {
  const lang = getLang();
  const content = supportContent[key];
  if (!content) {
    return;
  }

  modalTitle.textContent = content.title[lang];
  modalImage.src = content.image;
  modalImage.alt = content.title[lang];
  modalCaption.textContent = content.caption[lang];
  modal.hidden = false;
  body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.hidden = true;
  body.style.overflow = "";
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.langTarget));
});

supportButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.support));
});

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

revealTargets.forEach((node) => {
  node.classList.add("reveal");
  observer.observe(node);
});

setLanguage("en");
