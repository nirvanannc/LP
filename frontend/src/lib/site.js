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

export const IMAGES = {
  drPortrait:
    "https://static.prod-images.emergentagent.com/jobs/dd971548-208e-4315-bc1e-d4c72a117197/images/27d5157007be4a0d48bb4113d01bd92c35a8a50733f3b1d0b44005c788abca7d.jpeg",
  consult:
    "https://static.prod-images.emergentagent.com/jobs/dd971548-208e-4315-bc1e-d4c72a117197/images/b85c6de67d0b0f361af5733b2444007e4b9f70682d1c149f35802a86609b9386.jpeg",
  jali:
    "https://static.prod-images.emergentagent.com/jobs/dd971548-208e-4315-bc1e-d4c72a117197/images/669d9c226fa13de23483621b804d2ead949b14c7f41718d3143b1153daeb320f.jpeg",
};

export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text || "Namaste, I would like to know more about a consultation.")}`;
export const telLink = `tel:+${"91" + SITE.phone}`;
