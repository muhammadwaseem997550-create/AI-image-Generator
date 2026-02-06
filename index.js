// 1. Get your FREE token at huggingface.co (Settings -> Access Tokens)
const HF_TOKEN = "hf_xxxxxxxxxxxxxxxxxxxxxxx"; 

const genBtn = document.getElementById('gen-btn');
const promptInput = document.getElementById('user-prompt');
const outputImg = document.getElementById('output-image');
const loadingText = document.getElementById('loading');

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
            headers: { Authorization: `Bearer ${HF_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob(); // AI returns image data as a 'blob'
    return result;
}

genBtn.addEventListener('click', async () => {
    const text = promptInput.value;
    if(!text) return alert("Type something first!");

    loadingText.classList.remove('hidden');
    
    query({"inputs": text}).then((response) => {
        const objectURL = URL.createObjectURL(response);
        outputImg.src = objectURL;
        outputImg.style.display = 'block';
        loadingText.classList.add('hidden');
    }).catch(err => {
        console.error(err);
        alert("API is busy or key is wrong. Try again!");
        loadingText.classList.add('hidden');
    });
});