// --- Project Video Hovers --- //
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const hoverSign = document.querySelector('.hover-sign');
const videoList = [video1, video2, video3];

videoList.forEach(function (video) {
    // Check if the video element actually exists before adding listeners
    if (video) {
        video.addEventListener("mouseover", function () {
            video.play();
            if (hoverSign) hoverSign.classList.add("active");
        });
        video.addEventListener("mouseout", function () {
            video.pause();
            if (hoverSign) hoverSign.classList.remove("active");
        });
    }
});


// --- Sidebar Logic --- //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

// When the menu icon is clicked, add the 'sidebar-open' class to show the menu
if (menu) {
    menu.addEventListener("click", function () {
        sideBar.classList.add("sidebar-open");
    });
}

// When the close icon is clicked, remove the 'sidebar-open' class to hide the menu
if (closeIcon) {
    closeIcon.addEventListener("click", function () {
        sideBar.classList.remove("sidebar-open");
    });
}