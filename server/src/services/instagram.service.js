const axios = require('axios');
const config = require('../config');

const FALLBACK_PHOTOS = [
  {
    id: "fb_1",
    media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK-48nzqziOQPo8BqWXWZCzrXt-DRDFu1S0WIa8AaJ4kSJI5vznPwYH6Tay6ZMSoKVQrPv51uFVrNJG8IzRdknyK6x_FglycDbIyRpGvHD3B5J-Jfp5kK14bRpJhKiwFWWFvc-_q70hZlSiIS3h-Y-yProyksoEyidefBqeIpYPnu5itUgPNylSA2Hv3MHmNLbvjhvIAlE8mWeG9FM0Rq4Jloqe-wTLtFXQtNRANb0-WOIViXX2bEW",
    permalink: "https://www.instagram.com/avasaastays/",
    caption: "Sunset glow casting on our handcarved wooden cabin balconies. #avaasa #jibhi #slowliving",
    media_type: "IMAGE"
  },
  {
    id: "fb_2",
    media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiqrG6Zj_Vxx0q9ds2Q3OwBRNKbYlyJafapeLAuKME0JZCiQRkYCwjF9G2HXwYUCd85587o1l10Mj-HrCWWOtHw24cVQeZD4HakevVtf66EVs8wBjfferyAP2KyJQ3FRJjmS-MpFYJf6izDuKELXqOBLdMZi1ig6xE05TQiXbtuXG0ULEkLiGNa61oazrGLxpS4RPskLjTp_6DLHsbVRiTWH0VbbOPm-ZEx9b1MvC7I6MTqnGpd3wp",
    permalink: "https://www.instagram.com/avasaastays/",
    caption: "A warm bath looking out into the dense pine and cedar forests. Morning rhythms. #retreat #escape",
    media_type: "IMAGE"
  },
  {
    id: "fb_3",
    media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCToewijSEL79Xo-GOkN2JkmPp6jJgPMaqRyV0DAzgjO0diDTmQhcoDVI_tAAkUs1flH56gx0kkPvYikt0swqtG7xC5covliw90Mmc2rUE2_62ds3Cd3_9tJcJYnv5EH5ilbGn-y7SpZKH3bdkk9Stp9gDE21b0EnTFCDNAelDZ5m3iKxeE40V2u1Fs0NGEf3tFyNnN_jH7LQxv3daIWQRviXjVll12Gw_fW6ZS4KEa9chf0LheQayN",
    permalink: "https://www.instagram.com/avasaastays/",
    caption: "Craftsmanship in wood: every corner at Avasaa carries details. #himachal #interiors #mountaindesign",
    media_type: "IMAGE"
  },
  {
    id: "fb_4",
    media_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSCkvIot5v7uygqLfZRjeUQRxZ1SVwSwUD-h-h0R2neRjrXP64djE_zeK0UlsFpSLsWebRwhwdrMBXMh8i4mIJCgm69gb1DajsxHeR7SgqYkZW4xmnQUnU1N6RhhaC8hDbHcujWIyA2h2?q=80&w=1200",
    permalink: "https://www.instagram.com/avasaastays/",
    caption: "Waking up above the clouds. First sun rays kissing Jibhi Valley. #morningglow #mountains",
    media_type: "IMAGE"
  }
];

/**
 * Service to fetch photos from Instagram Graph API or fall back to high quality mocks.
 */
const fetchPhotos = async () => {
  const token = config.INSTAGRAM_ACCESS_TOKEN;

  if (!token || token.trim() === "") {
    return { data: FALLBACK_PHOTOS, source: "fallback-unconfigured" };
  }

  try {
    const response = await axios.get('https://graph.instagram.com/me/media', {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
        access_token: token
      }
    });

    const photos = (response.data.data || [])
      .filter(item => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM")
      .slice(0, 4);

    if (photos.length === 0) {
      return { data: FALLBACK_PHOTOS, source: "fallback-empty" };
    }

    return { data: photos, source: "live-api" };
  } catch (error) {
    console.error("Error calling Instagram API, returning fallbacks:", error.message);
    return { data: FALLBACK_PHOTOS, source: "fallback-error" };
  }
};

module.exports = {
  fetchPhotos
};
