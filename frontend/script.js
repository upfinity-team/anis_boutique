const input = document.getElementById("cameraInput");
const preview = document.getElementById("previewImage");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusText = document.getElementById("status");

let selectedFile = null;

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  selectedFile = file;
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
});

analyzeBtn.addEventListener("click", () => {
  if (!selectedFile) {
    alert("Please take a photo first");
    return;
  }

  statusText.innerText = "Uploading image...";

  const formData = new FormData();
  formData.append("image", selectedFile);

  fetch("http://localhost:8000/api/visual-search", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      statusText.innerText = "Image received by server ✅";
      console.log(data);
    })
    .catch(err => {
      statusText.innerText = "Upload failed ❌";
      console.error(err);
    });
});
