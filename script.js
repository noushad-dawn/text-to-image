const myKey = "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";
const inputTxt = document.querySelector(".text-field");
const imageGen = document.getElementById("image");
const genBtn = document.getElementById("btn");

async function query() {
    imageGen.src="load.gif"
    try {
        const response = await fetch(
            
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: { Authorization: `Bearer ${myKey}` },
                method: "POST",
                body: JSON.stringify({"inputs": inputTxt.value}),
            }
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('There was a problem with the request:', error);
        throw error;
    }
}

genBtn.addEventListener('click', async function () {
    try {
        const blobData = await query();
        const blobUrl = URL.createObjectURL(blobData);
        imageGen.src = blobUrl;
    } catch (error) {
        console.error('Error:', error);
        // Handle errors
    }
});

