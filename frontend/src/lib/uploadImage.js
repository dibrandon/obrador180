export async function uploadImage(file, onProgress) {
  const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD;
  const preset = import.meta.env.VITE_CLOUDINARY_PRESET;
  if (!cloud || !preset) throw new Error("Cloudinary no configurado");

  // Límite 2 MB → si supera, comprimimos a 1600px lado mayor
  let toSend = file;
  if (file.size > 2 * 1024 * 1024) {
    toSend = await compressImage(file, 1600);
  }

  const url = `https://api.cloudinary.com/v1_1/${cloud}/upload`;
  const form = new FormData();
  form.append("file", toSend);
  form.append("upload_preset", preset);
  // form.append("folder", "obrador/products"); 

  const xhr = new XMLHttpRequest();
  const p = new Promise((resolve, reject) => {
    xhr.open("POST", url);
    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        if (!json.secure_url) return reject(new Error("Upload fallido"));
        resolve(json.secure_url);
      } catch (e) { reject(e); }
    };
    xhr.onerror = () => reject(new Error("Error de red"));
    if (onProgress) {
      xhr.upload.onprogress = (ev) => {
        if (ev.lengthComputable) onProgress(Math.round((ev.loaded / ev.total) * 100));
      };
    }
    xhr.send(form);
  });
  return p;
}

async function compressImage(file, maxSide = 1600) {
  const img = await readFileToImage(file);
  const { w, h } = fitContain(img.naturalWidth, img.naturalHeight, maxSide);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.82));
  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
}

function fitContain(w, h, max) {
  if (w <= max && h <= max) return { w, h };
  const ratio = w > h ? max / w : max / h;
  return { w: Math.round(w * ratio), h: Math.round(h * ratio) };
}

function readFileToImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
