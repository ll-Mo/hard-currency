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
