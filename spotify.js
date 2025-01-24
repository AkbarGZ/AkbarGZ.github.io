const apiUrl = "https://api.siputzx.my.id/api/d/spotify?url="; // Ganti dengan API endpoint Anda

async function fetchSpotifyData() {
    const spotifyUrl = document.getElementById('spotifyUrl').value;
    const resultDiv = document.getElementById('result');
     resultDiv.innerHTML = `<p class="message-result">Loading...</p>`;

    if (!spotifyUrl) {
        resultDiv.innerHTML = `<p style="color: red;">Please enter Spotify URL.</p>`;
        return;
    }

    try {
        const response = await fetch(apiUrl + encodeURIComponent(spotifyUrl));

        if (!response.ok) {
               const errorMessage = `HTTP error! status: ${response.status}`;
               throw new Error(errorMessage);
        }

        const data = await response.json();
        if (data.status) {
           const downloadLink = data.download;
            resultDiv.innerHTML = `
                <a href="${downloadLink}" target="_blank">Download Music</a>
            `;
        } else {
             resultDiv.innerHTML = `<p style="color: red;">Failed to fetch music data. Please check URL and try again.</p>`;
        }

    } catch (error) {
      resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Fetch error:', error);
    }
}
