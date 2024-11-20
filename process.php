<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $url = $_POST['tiktok_url'];
    
    // Validasi URL TikTok
    if (!filter_var($url, FILTER_VALIDATE_URL) || strpos($url, 'tiktok.com') === false) {
        echo "<p>URL tidak valid. Harap masukkan URL TikTok yang benar.</p>";
        return;
    }
    
    // API Endpoint untuk TikTok Downloader
    $api_url = "https://api.tikdown.org/api/download"; // Contoh API (ubah sesuai layanan yang dipakai)

    // Kirim permintaan ke API
    $response = file_get_contents($api_url . '?url=' . urlencode($url));
    $data = json_decode($response, true);

    if ($data && isset($data['downloadUrl'])) {
        echo "<p>Video berhasil ditemukan! Klik tombol di bawah untuk mendownload:</p>";
        echo "<a href='" . htmlspecialchars($data['downloadUrl']) . "' target='_blank'>Download Video</a>";
    } else {
        echo "<p>Gagal memproses URL. Coba lagi nanti.</p>";
    }
}
?>
