async function fetchYouTubeVideosWithAPI() {
    const feedContainer = document.getElementById('youtube-feed-container');
    
    if (!feedContainer) {
        console.error('YouTube feed container not found.');
        return;
    }

    // Show loading state
    feedContainer.innerHTML = '<div class="loading">Loading videos...</div>';

    try {
        const channelId = 'UCY9jUT1jbbAnysQZnmOVaiA';
        const apiKey = window.YOUTUBE_API_KEY;
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const videos = data.items.map(item => ({
            id: { videoId: item.id.videoId },
            snippet: {
                title: item.snippet.title,
                thumbnails: {
                    medium: {
                        url: item.snippet.thumbnails.medium.url
                    }
                }
            }
        }));
        
        displayYouTubeVideos(videos, feedContainer);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        feedContainer.innerHTML = `
            <div class="error">
                <p>Failed to load YouTube videos.</p>
                <button onclick="fetchYouTubeVideosWithAPI()">Try Again</button>
            </div>`;
    }
}

function displayYouTubeVideos(videos, container) {
    container.innerHTML = '';

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails.medium.url;

        const videoDiv = document.createElement('div');
        videoDiv.classList.add('youtube-video-item');

        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${videoId}`;
        link.target = '_blank';
        link.rel = 'noopener';

        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailUrl;
        thumbnail.alt = title;
        link.appendChild(thumbnail);

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        videoDiv.appendChild(link);
        videoDiv.appendChild(titleElement);
        container.appendChild(videoDiv);
    });
}

function showPage(page) {
    document.getElementById('enterPage').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    
    // Hide all pages first
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('blogPage').style.display = 'none';
    document.getElementById('contactPage').style.display = 'none';
    
    // Show the selected page
    if (page === 'home') {
        document.getElementById('homePage').style.display = 'flex';
    } else if (page === 'blog') {
        document.getElementById('blogPage').style.display = 'block';
        fetchYouTubeVideosWithAPI();
    } else if (page === 'contact') {
        document.getElementById('contactPage').style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Logo click handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            showPage('home');
        });
    }

    // Navigation links click handlers
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = link.getAttribute('href').substring(1);
            showPage(href);
        });
    });
});
