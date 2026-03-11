document.getElementById('directoryInput').addEventListener('change', handleFileSelect, false);
document.getElementById('submitComment').addEventListener('click', submitComment);

let videoList = [];
let relatedVideos = [];
let comments = [];

// Contoh dummy data untuk video terkait
const relatedVideosData = [
    {
        title: "Related Video 1",
        thumbnail: "https://via.placeholder.com/120x69",
        videoUrl: "https://yandex.com/video/1"
    },
    {
        title: "Related Video 2",
        thumbnail: "https://via.placeholder.com/120x69",
        videoUrl: "https://ds2play.com/e/p7eaam1ver782mq65zzhylsgimaf0pgs"
    }
    // Tambahkan lebih banyak data jika diperlukan
];

// Daftar situs untuk mengambil video acak
const videoSites = [
    'https://www.youtube.com/watch?v=udr93270R5s', // Ganti dengan URL yang sesuai
];

document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const recommendedVideosContainer = document.createElement('div');
    recommendedVideosContainer.id = 'recommendedVideos';
    recommendedVideosContainer.style.display = 'none';
    videoContainer.appendChild(recommendedVideosContainer);

    // Memanggil fungsi untuk menampilkan related videos saat halaman dimuat
    updateRelatedVideos();
    
    // Muat 10 video terkait
    fetchRelatedVideoData();

    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    const orientationToggle = document.getElementById('orientationToggle');
    let isLandscape = true;

    orientationToggle.addEventListener('click', function() {
        isLandscape = !isLandscape;
        if (isLandscape) {
            videoPlayerContainer.style.transform = 'rotate(0deg)';
            videoPlayerContainer.style.width = '100%';
            videoPlayerContainer.style.height = 'auto';
        } else {
            videoPlayerContainer.style.transform = 'rotate(90deg)';
            videoPlayerContainer.style.width = '56.25vh'; // 16:9 aspect ratio
            videoPlayerContainer.style.height = '100vw';
        }
        // Memastikan video mengisi container setelah rotasi
        videoPlayer.style.width = '100%';
        videoPlayer.style.height = '100%';
    });
});

videoPlayer.addEventListener('play', () => {
    videoTitle.innerHTML = `REC [ <span class="dot">❁</span> ]`;
});

videoPlayer.addEventListener('pause', () => {
    videoTitle.innerHTML = `▶️`;
});

function handleFileSelect(event) {
    const files = event.target.files;
    const videoListContainer = document.getElementById('videoList');
    videoListContainer.innerHTML = ''; // Clear previous list

    Array.from(files).forEach(file => {
        const li = document.createElement('li');
        li.classList.add('video-item');
        li.innerHTML = `
            <div class="video-thumbnail">
                <video src="${URL.createObjectURL(file)}" muted></video>
            </div>
            <div class="video-title-box">
                <div class="title">${file.name}</div>
                <div class="duration"></div>
            </div>
        `;
        li.addEventListener('click', () => loadVideo(file));
        videoListContainer.appendChild(li);
    });

    videoList = files; // Update videoList
}

function loadVideo(file, index) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoTitleInfo = document.getElementById('videoTitleInfo');
    const videoDuration = document.getElementById('videoDuration');
    const videoResolution = document.getElementById('videoResolution');
    const videoFormat = document.getElementById('videoFormat');
    const videoDescription = document.getElementById('videoDescription');

    videoPlayer.src = URL.createObjectURL(file);
    videoPlayer.loop = false; // Nonaktifkan loop
    videoPlayer.autoplay = true; // Video akan diputar otomatis
    videoTitle.innerHTML = file.name;
    videoTitleInfo.innerHTML = `Judul: ${file.name}`;
    videoFormat.innerHTML = `Format: ${file.type}`;
    videoResolution.innerHTML = ''; // This will be updated once video metadata is loaded

    videoPlayer.onloadedmetadata = function() {
        const duration = formatTime(videoPlayer.duration);
        const resolution = `${videoPlayer.videoWidth}x${videoPlayer.videoHeight}`;
        videoDuration.innerHTML = `Durasi: ${duration}`;
        videoResolution.innerHTML = `Resolusi: ${resolution}`;
    };

    // Update related videos
    updateRelatedVideos();
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function updateRelatedVideos() {
    const relatedVideosList = document.getElementById('relatedVideosList');
    const relatedVideoThumbnail = document.getElementById('relatedVideoThumbnail');
    relatedVideosList.innerHTML = ''; // Clear previous list

    // Set thumbnail default ke video pertama
    if (relatedVideosData.length > 0) {
        relatedVideoThumbnail.src = relatedVideosData[0].thumbnail;
    }

    relatedVideosData.forEach((video, index) => {
        const li = document.createElement('li');
        li.classList.add('related-video-item');
        li.innerHTML = `
            <div class="related-video-thumbnail">
                <img src="${video.thumbnail}" alt="Thumbnail">
            </div>
            <div class="related-video-title">${video.title}</div>
        `;
        li.addEventListener('click', () => {
            window.open(video.videoUrl, '_blank');
        });
        li.addEventListener('mouseover', () => {
            relatedVideoThumbnail.src = video.thumbnail;
        });
        li.addEventListener('mouseout', () => {
            // Kembalikan ke thumbnail default atau thumbnail video pertama
            relatedVideoThumbnail.src = relatedVideosData[0].thumbnail;
        });
        relatedVideosList.appendChild(li);
    });
}

function submitComment() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText) {
        const comment = {
            text: commentText,
            timestamp: new Date().toLocaleString()
        };

        comments.push(comment);
        displayComments();
        commentInput.value = ''; // Clear input
    }
}

function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Clear previous comments

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${comment.timestamp}</strong><br>${comment.text}`;
        commentsList.appendChild(commentDiv);
    });
}

// Fungsi untuk mengambil data video dari halaman web
async function fetchRelatedVideoData() {
    const randomSite = videoSites[Math.floor(Math.random() * videoSites.length)];
    
    try {
        const response = await fetch(randomSite);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const videoElements = doc.querySelectorAll('video, iframe');
        const imgElements = doc.querySelectorAll('img');

        const newVideos = [];

        for (let i = 0; i < 10 && i < videoElements.length; i++) {
            const videoElement = videoElements[i];
            const imgElement = imgElements[i] || imgElements[0];

            const videoUrl = videoElement.src || videoElement.getAttribute('data-src') || '';
            const thumbnailUrl = imgElement.src || imgElement.getAttribute('data-src') || 'https://via.placeholder.com/300x169';
            const title = videoElement.title || imgElement.alt || `Video Acak ${i + 1}`;

            newVideos.push({
                title: title,
                thumbnail: thumbnailUrl,
                videoUrl: videoUrl
            });
        }

        // Tambahkan video baru ke relatedVideosData
        relatedVideosData.push(...newVideos);

        // Batasi jumlah video terkait menjadi 10
        if (relatedVideosData.length > 10) {
            relatedVideosData = relatedVideosData.slice(-10);
        }

        // Perbarui daftar video terkait
        updateRelatedVideos();
    } catch (err) {
        console.error('Error mengambil data video:', err);
    }
}

let endTimeout;
let currentVideoIndex = 0;

function loadVideo(file, index) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoTitleInfo = document.getElementById('videoTitleInfo');
    const videoDuration = document.getElementById('videoDuration');
    const videoResolution = document.getElementById('videoResolution');
    const videoFormat = document.getElementById('videoFormat');

    videoPlayer.src = URL.createObjectURL(file);
    videoPlayer.loop = false;
    videoPlayer.autoplay = true; // Video akan diputar otomatis
    videoTitle.innerHTML = file.name;
    videoTitleInfo.innerHTML = `Judul: ${file.name}`;
    videoFormat.innerHTML = `Format: ${file.type}`;
    videoResolution.innerHTML = '';

    videoPlayer.onloadedmetadata = function() {
        const duration = formatTime(videoPlayer.duration);
        const resolution = `${videoPlayer.videoWidth}x${videoPlayer.videoHeight}`;
        videoDuration.innerHTML = `Durasi: ${duration}`;
        videoResolution.innerHTML = `Resolusi: ${resolution}`;
    };

    currentVideoIndex = index;
    updateRelatedVideos();
}

videoPlayer.addEventListener('ended', () => {
    console.log('Video selesai, menampilkan rekomendasi');
    showRecommendedVideos();
    clearTimeout(endTimeout);
    showCountdown(5);
    endTimeout = setTimeout(() => {
        if (currentVideoIndex < videoList.length - 1) {
            loadVideo(videoList[currentVideoIndex + 1], currentVideoIndex + 1);
        }
    }, 5000); // Tunggu 5 detik sebelum melanjutkan ke video berikutnya
});

videoPlayer.addEventListener('play', () => {
    hideRecommendedVideos();
    clearTimeout(endTimeout);
});

function showRecommendedVideos() {
    console.log('Menampilkan rekomendasi video');
    const videoPlayer = document.getElementById('videoPlayer');
    const recommendedVideosContainer = document.getElementById('recommendedVideos');
    
    if (!recommendedVideosContainer) {
        console.error('Elemen recommendedVideos tidak ditemukan');
        return;
    }
    
    recommendedVideosContainer.innerHTML = '';
    recommendedVideosContainer.style.display = 'flex';

    // Dapatkan ukuran video player
    const videoWidth = videoPlayer.offsetWidth;
    const videoHeight = videoPlayer.offsetHeight;

    // Atur ukuran container rekomendasi video
    recommendedVideosContainer.style.width = `${videoWidth}px`;
    recommendedVideosContainer.style.height = `${videoHeight / 3}px`; // Sepertiga tinggi video

    for (let i = 0; i < 2; i++) {
        if (currentVideoIndex + i + 1 < videoList.length) {
            const nextVideo = videoList[currentVideoIndex + i + 1];
            const videoElement = document.createElement('div');
            videoElement.classList.add('recommended-video');
            videoElement.innerHTML = `
                <video src="${URL.createObjectURL(nextVideo)}" muted></video>
                <p>${nextVideo.name}</p>
            `;
            videoElement.addEventListener('click', () => {
                clearTimeout(endTimeout);
                loadVideo(nextVideo, currentVideoIndex + i + 1);
            });
            recommendedVideosContainer.appendChild(videoElement);
        }
    }

    console.log('Rekomendasi video ditampilkan');
}

function hideRecommendedVideos() {
    const recommendedVideosContainer = document.getElementById('recommendedVideos');
    recommendedVideosContainer.style.display = 'none';
}

// Tambahkan ini di bagian atas file atau di dalam DOMContentLoaded event
const recommendedVideosContainer = document.createElement('div');
recommendedVideosContainer.id = 'recommendedVideos';
recommendedVideosContainer.style.display = 'none';
recommendedVideosContainer.style.position = 'absolute';
recommendedVideosContainer.style.top = '0';
recommendedVideosContainer.style.left = '0';
recommendedVideosContainer.style.right = '0';
recommendedVideosContainer.style.display = 'flex';
recommendedVideosContainer.style.justifyContent = 'space-around';
recommendedVideosContainer.style.padding = '10px';
recommendedVideosContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
document.querySelector('.video-container').appendChild(recommendedVideosContainer);

// Tambahkan CSS berikut
const style = document.createElement('style');
style.textContent = `
    #recommendedVideos {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 10;
    }
    .recommended-video {
        width: 48%;
        height: 100%;
        cursor: pointer;
        overflow: hidden;
    }
    .recommended-video video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .recommended-video p {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        padding: 5px;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
document.head.appendChild(style);

window.addEventListener('resize', () => {
    if (document.getElementById('recommendedVideos').style.display !== 'none') {
        showRecommendedVideos();
    }
});

// Tambahkan ini untuk menampilkan waktu tunggu
function showCountdown(seconds) {
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.style.position = 'absolute';
    countdownElement.style.top = '10px';
    countdownElement.style.right = '10px';
    countdownElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    countdownElement.style.color = 'white';
    countdownElement.style.padding = '5px 10px';
    countdownElement.style.borderRadius = '5px';
    document.querySelector('.video-container').appendChild(countdownElement);

    function updateCountdown() {
        countdownElement.textContent = `Video selanjutnya dalam ${seconds} detik`;
        if (seconds > 0) {
            seconds--;
            setTimeout(updateCountdown, 1000);
        } else {
            countdownElement.remove();
        }
    }

    updateCountdown();
}

function adjustVideoSize() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlayerContainer = document.getElementById('videoPlayerContainer');
    
    if (isLandscape) {
        videoPlayerContainer.style.width = '100%';
        videoPlayerContainer.style.height = 'auto';
    } else {
        videoPlayerContainer.style.width = '56.25vh'; // 16:9 aspect ratio
        videoPlayerContainer.style.height = '100vw';
    }
    
    videoPlayer.style.width = '100%';
    videoPlayer.style.height = '100%';
}

window.addEventListener('resize', adjustVideoSize);

videoPlayer.addEventListener('loadedmetadata', function() {
    adjustVideoSize();
    // ... (kode yang sudah ada) ...
});