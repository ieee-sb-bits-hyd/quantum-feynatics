document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Function to open the sidebar
    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('open');
    };

    // Function to close the sidebar
    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('open');
    };

    // Event listeners
    if (menuIcon) {
        menuIcon.addEventListener('click', openSidebar);
    }

    if (closeIcon) {
        closeIcon.addEventListener('click', closeSidebar);
    }

    // Add event listener to each sidebar link to close the menu on click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});