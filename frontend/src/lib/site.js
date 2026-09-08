export const SITE = {
  clinicName: "Dr. Aditya Soni Clinic",
  phone: "9929300003",
  phoneDisplay: "+91 99293 00003",
  whatsapp: "919929300003",
  email: "dradityasoni1@gmail.com",
  addressLine: "Pratap Nagar, Jaipur, Rajasthan",
  timings: "Mon – Sat · 10:00 AM – 7:00 PM",
  helpline: "14416",
  helplineName: "Tele-MANAS (National Mental Health Helpline)",
  helplineAlt: "1800-891-4416",
  mapEmbed:
    "https://www.google.com/maps?q=Pratap%20Nagar%2C%20Jaipur%2C%20Rajasthan&output=embed",
};

export const VIDEO_TESTIMONIALS = [
  {
    id: "recovery-1",
    poster: "/posters/recovery-1.jpg",
    src: "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/1oi296t3_video%20testimonial.mp4",
  },
  {
    id: "recovery-2",
    poster: "/posters/recovery-2.jpg",
    src: "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/m3ptzj18_7680c4c3-20ac-4cf7-b547-3fe8a921564f.MP4",
  },
  {
    id: "recovery-3",
    poster: "/posters/recovery-3.jpg",
    src: "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/b0t90fm5_best%20psychologist%20in%20jaipur.mp4",
  },
  {
    id: "recovery-4",
    poster: "/posters/recovery-4.jpg",
    src: "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/xt8algvx_best-psychiatrist-in-jaipur.mp4",
  },
];

export const IMAGES = {
  drPortrait:
    "https://customer-assets-lqy194kg.emergentagent.net/job_drsoni-jaipur/artifacts/09dj5g2o_ChatGPT%20Image%20Jul%2024%2C%202026%2C%2007_16_48%20PM.png",
  consult:
    "https://static.prod-images.emergentagent.com/jobs/dd971548-208e-4315-bc1e-d4c72a117197/images/b85c6de67d0b0f361af5733b2444007e4b9f70682d1c149f35802a86609b9386.jpeg",
  jali:
    "https://static.prod-images.emergentagent.com/jobs/dd971548-208e-4315-bc1e-d4c72a117197/images/669d9c226fa13de23483621b804d2ead949b14c7f41718d3143b1153daeb320f.jpeg",
};

export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text || "Namaste, I would like to know more about a consultation.")}`;
export const telLink = `tel:+${"91" + SITE.phone}`;
