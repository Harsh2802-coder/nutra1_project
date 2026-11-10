import { useEffect, useState } from "react";
import axios from "axios";

/*
  Shared disease-image helpers.
  Use them in the dashboard AND in the disease detail page so
  every disease always shows a picture.

  Order tried for each picture:
    1. the image sent by your API / passed in
    2. the image in DISEASE_IMAGES below
    3. a real picture fetched from Wikipedia
    4. nothing (the page then shows an emoji)
*/

// Your own image links (key = disease name in lowercase)
export const DISEASE_IMAGES = {
  "diabetes": "https://media.istockphoto.com/id/1280251169/photo/world-diabetes-day-awareness-concept-the-diabetic-measures-the-level-of-glucose-in-the-blood.jpg?s=612x612&w=0&k=20&c=I2jo3Upbhc400oRey4QfaFE_0EAuuhn8EvvdHXqFZsM=",
  "migraine": "https://media.istockphoto.com/id/511735934/photo/feeling-stressed.jpg?s=612x612&w=0&k=20&c=bRo19DzLWLIOuDwyBzkX56gdEYkphj7naBmv76DHJNs=",
  "hypertension": "https://media.istockphoto.com/id/873891794/photo/doctor-measuring-blood-pressure-of-patient.jpg?s=612x612&w=0&k=20&c=jtehUFdLwMJe7Vb5vzicqUiEmBXZV4B0ABywcI5vkHk=",
  "asthma": "https://media.istockphoto.com/id/1641029118/photo/asthma-inhaler.jpg?s=612x612&w=0&k=20&c=j2dGc0FcjpZGOKZ7tPbeRrYQSO7uV9jfDRZTukel4Ek=",
  "arthritis": "https://media.istockphoto.com/id/1310226894/photo/jogging-injury-warp-up-before-any-exercise-coopy-space-for-text.jpg?s=612x612&w=0&k=20&c=zEwiimCgB7NWeI8V25lbzWJBQ13luJ0CVD1r8MABy-E=",
  "cold": "https://media.istockphoto.com/id/1469093296/photo/young-girl-suffering-from-cold-by-sneezing-at-home-while-sleeping-on-bed-concept-of.jpg?s=612x612&w=0&k=20&c=fdvPA0s8udi2k_-rOwc840eZSdWa-XPviiJNjlxWoLQ=",
  "cough": "https://media.istockphoto.com/id/1059369662/photo/man-coughing-into-his-fist-isolated-on-a-gray-background.jpg?s=612x612&w=0&k=20&c=0D7jHBh1fsEYHD3iuVbkkxyUYQZOdndwMZ8n7zgEdiQ=",
  "acidity": "https://media.istockphoto.com/id/1899582356/photo/gerd-acidity-stomach-reflux-heartburn-ache.jpg?s=612x612&w=0&k=20&c=3OmYpfIui9Tw4DKt1UG-SgI01ZymZYYeqoohTkVYfTw=",
  "constipation": "https://media.istockphoto.com/id/1328091327/photo/young-man-feels-uncomfortable-in-his-stomach-and-is-constipated-in-the-toilet.jpg?s=612x612&w=0&k=20&c=6nBVALem1-LXR4qDCzNUBeT1OUbDeWTdvhfpsf60cFg=",
  "insomnia": "https://media.istockphoto.com/id/629189620/photo/woman-in-bed-late-night-trying-to-sleep-suffering-insomnia.jpg?s=612x612&w=0&k=20&c=tuk0ce_uzgaE6cKIn6ELD8TLrPvyhRz-TwEzY2SByiI=",
  "anxiety": "https://media.istockphoto.com/id/1185422927/photo/depressive-man.jpg?s=612x612&w=0&k=20&c=RJO_EsbyHzZYUZmcmOEBqQR2rwsH5QOz5rnQ1O7DevU=",
  "depression": "https://media.istockphoto.com/id/820808100/photo/sad-businessman-sitting-head-in-hands-on-the-bed-in-the-dark-bedroom-with-low-light.jpg?s=612x612&w=0&k=20&c=bVqvcehryhVEJtoDpI2aVeEvaMXbhXmudvLkdLpF0Qs=",
  "obesity": "https://media.istockphoto.com/id/1314797892/photo/obesity-unhealthy-weight-nutritionist-inspecting-a-womans-waist-using-a-meter-tape-to.jpg?s=612x612&w=0&k=20&c=1hsjTpScP_NJ-gYfMHStLV-fbyqi8iv1ORNJ2J06grE=",
  "skin infection": "https://media.istockphoto.com/id/1284084384/photo/annoyed-man-scratching-itch-on-his-arm.jpg?s=612x612&w=0&k=20&c=4ZHwfb9FmayJPTGd_uXmtd7gp0U0jhONaZnPHuGYr3Q=",
  "hair fall": "https://media.istockphoto.com/id/1345475766/photo/woman-have-damaged-and-broken-hair-loss-hair-dry-problem-concept.jpg?s=612x612&w=0&k=20&c=4Yzv2YXMKWkzfFsSmSPuEcFup3MvH4oJzhLYevKv8m8=",
  "thyroid": "https://media.istockphoto.com/id/1098337094/photo/the-illustration-of-the-thyroid-is-on-the-woman-throat.jpg?s=612x612&w=0&k=20&c=ChG9f9kupKfyTptWzgKlK8OrXdVHXtGi-npAcNytLfE=",
  "fever": "https://media.istockphoto.com/id/612409562/photo/sick-child-with-high-fever.jpg?s=612x612&w=0&k=20&c=DNchQeK5vlvWiBDdYvMKkNsC_-T5ZOFcOupnesSGLSY=",
  "diarrhea": "https://media.istockphoto.com/id/2150081409/photo/constipation-and-diarrhea-in-bathroom-hurt-man-touch-belly-stomach-ache-painful-colon.jpg?s=612x612&w=0&k=20&c=S2pJOyHYIKFBrrbewt3FzCbGknF7oIhQX7ZZzFqbzV0=",
  "ulcer": "https://thumbs.dreamstime.com/b/woman-touching-stomach-painful-stomachach-suffering-stomachache-causes-menstruation-period-gastric-ulcer-appendicitis-128341188.jpg?w=992",
  "kidney stones": "https://thumbs.dreamstime.com/b/kidney-22641666.jpg?w=576",
  "liver disorder": "https://thumbs.dreamstime.com/b/liver-pain-abdominal-discomfort-hepatic-strain-organ-distress-bile-issue-jaundice-symptom-inflammation-detox-failure-cirrhosis-373368317.jpg?w=992",
  "pcos": "https://thumbs.dreamstime.com/b/doctor-holding-uterus-ovaries-model-ovarian-cervical-cancer-cervix-disorder-endometriosis-hysterectomy-uterine-fibroids-267992419.jpg?w=992",
  "back pain": "https://thumbs.dreamstime.com/b/back-pain-29514675.jpg?w=768",
  "eye strain": "https://thumbs.dreamstime.com/b/woman-suffering-eye-strain-her-laptop-young-removing-eyeglasses-to-rub-eyes-finger-pained-46472250.jpg?w=992",
};

// Shown when no picture could be loaded at all
export const DISEASE_EMOJIS = {
  "diabetes": "🩸",
  "migraine": "🤕",
  "hypertension": "❤️",
  "asthma": "🫁",
  "arthritis": "🦴",
  "cold": "🤧",
  "cough": "😷",
  "acidity": "🔥",
  "constipation": "🚽",
  "insomnia": "😴",
  "anxiety": "😰",
  "depression": "😔",
  "obesity": "⚖️",
  "skin infection": "🧴",
  "hair fall": "💇",
  "thyroid": "🦋",
  "fever": "🌡️",
  "diarrhea": "💧",
  "ulcer": "🩹",
  "kidney stones": "🪨",
  "liver disorder": "🧪",
  "pcos": "🌸",
  "back pain": "🧍",
  "eye strain": "👁️",
};

// Wikipedia article used to fetch a picture if the links above fail
const WIKI_TITLES = {
  "diabetes": "Diabetes",
  "migraine": "Migraine",
  "hypertension": "Hypertension",
  "asthma": "Asthma",
  "arthritis": "Arthritis",
  "cold": "Common cold",
  "cough": "Cough",
  "acidity": "Gastroesophageal reflux disease",
  "constipation": "Constipation",
  "insomnia": "Insomnia",
  "anxiety": "Anxiety",
  "depression": "Major depressive disorder",
  "obesity": "Obesity",
  "skin infection": "Skin infection",
  "hair fall": "Hair loss",
  "thyroid": "Thyroid",
  "fever": "Fever",
  "diarrhea": "Diarrhea",
  "ulcer": "Peptic ulcer disease",
  "kidney stones": "Kidney stone disease",
  "liver disorder": "Liver disease",
  "pcos": "Polycystic ovary syndrome",
  "back pain": "Back pain",
  "eye strain": "Eye strain",
};

// "kidney stone", "Kidney Stones" and "kidneystones" all match the same key
const normalizeName = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/s$/, "");

export const lookupByName = (map, name) => {
  const target = normalizeName(name);
  const key = Object.keys(map).find(
    (k) => normalizeName(k) === target
  );
  return key ? map[key] : "";
};

// Works whether the API returns names (strings) or objects
export const getDiseaseName = (item) =>
  typeof item === "string"
    ? item
    : item?.displayName || item?.name || item?.disease || "";

export const getDiseaseEmoji = (name) =>
  lookupByName(DISEASE_EMOJIS, name) || "🌿";

const wikiImageCache = {};

const fetchWikiImage = async (title, size) => {
  const key = `${title}|${size}`;
  if (key in wikiImageCache) return wikiImageCache[key];

  try {
    const res = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        origin: "*",
        redirects: 1,
        prop: "pageimages",
        piprop: "thumbnail",
        pithumbsize: size,
        titles: title,
      },
    });
    const pages = res.data?.query?.pages || {};
    const page = Object.values(pages)[0];
    wikiImageCache[key] = page?.thumbnail?.source || "";
  } catch (err) {
    wikiImageCache[key] = "";
  }

  return wikiImageCache[key];
};

/*
  const { src, onError } = useDiseaseImage(diseaseName, apiImage, 1000);
  {src && <img src={src} onError={onError} referrerPolicy="no-referrer" />}
  size = width in pixels you need (100 for small circles, 1000 for banners)
*/
export const useDiseaseImage = (name, primary, size = 400) => {
  const local = lookupByName(DISEASE_IMAGES, name);
  const candidates = [primary, local].filter(
    (url, i, all) => url && all.indexOf(url) === i
  );
  const key = candidates.join("|");

  const [index, setIndex] = useState(0);
  const [wikiSrc, setWikiSrc] = useState("");
  const [wikiState, setWikiState] = useState("idle");

  const inWiki = index >= candidates.length;

  useEffect(() => {
    setIndex(0);
    setWikiSrc("");
    setWikiState("idle");
  }, [key, name]);

  useEffect(() => {
    if (!inWiki) return undefined;

    let alive = true;
    const title = lookupByName(WIKI_TITLES, name);

    if (!title) {
      setWikiState("none");
      return undefined;
    }

    setWikiState("loading");

    fetchWikiImage(title, size).then((url) => {
      if (!alive) return;
      if (url) {
        setWikiSrc(url);
        setWikiState("ready");
      } else {
        setWikiState("none");
      }
    });

    return () => {
      alive = false;
    };
  }, [inWiki, name, size]);

  const src = !inWiki
    ? candidates[index]
    : wikiState === "ready"
    ? wikiSrc
    : "";

  const onError = () => {
    if (!inWiki) {
      setIndex((i) => i + 1);
    } else {
      setWikiSrc("");
      setWikiState("none");
    }
  };

  return { src, onError };
};