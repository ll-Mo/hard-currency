async function fetchYouTubeVideosWithAPI() {
    const apiKey = 'AIzaSyCoMW6F0nZ8EZ5bfukKtYe8poHrUHR7Ps0';
    const channelId = 'UCY9jUT1jbbAnysQZnmOVaiA';
    const maxResults = 5; // Number of videos to display
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&key=${apiKey}&maxResults=${maxResults}`;
    const feedContainer = document.getElementById('youtube-feed-container');

    // Basic error handling: Check if the container exists
    if (!feedContainer) {
        console.error('YouTube feed container not found.');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayYouTubeVideos(data.items, feedContainer);
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        feedContainer.innerHTML = '<p>Failed to load YouTube videos.</p>';
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
    document.getElementById('portfolioPage').style.display = 'none';
    document.getElementById('contactPage').style.display = 'none';
    
    // Show the selected page
    if (page === 'home') {
        document.getElementById('homePage').style.display = 'flex';
    } else if (page === 'blog') {
        document.getElementById('blogPage').style.display = 'block';
        fetchYouTubeVideosWithAPI();
    } else if (page === 'portfolio') {
        document.getElementById('portfolioPage').style.display = 'block';
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
