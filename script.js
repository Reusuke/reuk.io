let isLoggedIn = false; // Simulate login state [cite: 103]
let currentAuthMode = 'login'; // [cite: 104]

function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none'; // [cite: 105]
    });
    // Show the requested section
    const targetSection = document.getElementById(sectionId); // [cite: 106]
    if (targetSection) {
        targetSection.style.display = 'block'; // [cite: 107]
    }

    // Update navigation bar visibility and links
    updateNavDisplay(sectionId); // [cite: 108]
}

function updateNavDisplay(currentSectionId) {
    const mainNav = document.getElementById('mainNav'); // [cite: 109]
    const navLinksContainer = document.getElementById('navLinks');
    const authNavContainer = document.getElementById('authNavContainer');
    const loggedInLinks = document.querySelectorAll('.logged-in-link');
    const authLink = document.getElementById('authLink');
    const logoutBtn = document.getElementById('logoutBtn'); // [cite: 110]

    if (currentSectionId === 'auth') {
        // On the login/signup page
        mainNav.style.display = 'block'; // Ensure nav is visible [cite: 111]
        navLinksContainer.style.display = 'none'; // Hide the Home/Shop/About links [cite: 112]
        authNavContainer.style.display = 'block'; // Show Login/Sign Up link explicitly [cite: 113]
        authLink.style.display = 'inline-block'; // Make sure it's visible [cite: 114]
    } else {
        // On any other page (Home, Shop, About, etc.)
        mainNav.style.display = 'block'; // Ensure nav is visible [cite: 115]
        navLinksContainer.style.display = 'flex'; // Show the Home/Shop/About links [cite: 116]
        authNavContainer.style.display = 'none'; // Hide the direct Login/Sign Up link [cite: 117]
    }

    // Manage visibility of specific links based on isLoggedIn
    if (isLoggedIn) {
        loggedInLinks.forEach(link => {
            // Only show Home, Shop, About Us, Cart, Logout
            if (link.textContent.includes('Home') || link.textContent.includes('Shop') || link.textContent.includes('About Us') || link.textContent.includes('Cart') || link.id === 'logoutBtn') { // [cite: 118]
                link.style.display = 'inline-block';
            } else {
                link.style.display = 'none'; // Hide Categories for now as per request [cite: 119]
            }
        });
        logoutBtn.style.display = 'inline-block'; // Ensure logout is visible [cite: 120]
        authLink.style.display = 'none'; // Hide Login/Sign Up when logged in [cite: 121]
    } else {
        // When not logged in, only the authLink should be visible in the nav (managed by updateNavDisplay above)
        loggedInLinks.forEach(link => link.style.display = 'none'); // Hide all regular links [cite: 122]
        logoutBtn.style.display = 'none'; // [cite: 123]
    }
}

function handleAuth() {
    const user = document.getElementById('authUser').value; // [cite: 124]
    const pass = document.getElementById('authPass').value;

    if (currentAuthMode === 'login') {
        if (user === 'user' && pass === 'password') { // Simple mock login
            isLoggedIn = true; // [cite: 125]
            alert('Login successful!');
            // To load main.html content, we would typically use AJAX or fetch.
            // For this simple example, we'll simulate by redirecting.
            // In a real application, you'd load the content of main.html into a div.
            loadMainContent(); // Call function to load main content
            navigateTo('home'); // Redirect to home after login
        } else {
            alert('Invalid username or password.'); // [cite: 126]
        }
    } else { // Sign Up mode
        // In a real app, you'd send this to a server
        alert('Sign Up successful for ' + user + '! You can now log in.'); // [cite: 127]
        toggleAuthMode(); // Switch back to login after signup
    }
    return false; // Prevent form submission [cite: 128]
}

function toggleAuthMode() {
    const authTitle = document.getElementById('authTitle'); // [cite: 129]
    const authSubmit = document.getElementById('authSubmit');
    const toggleText = document.getElementById('toggleText');
    const toggleLink = document.getElementById('toggleLink'); // [cite: 130]

    if (currentAuthMode === 'login') {
        currentAuthMode = 'signup'; // [cite: 131]
        authTitle.innerText = 'Sign Up';
        authSubmit.value = 'Sign Up';
        toggleText.innerText = 'Already have an account?';
        toggleLink.innerText = 'Login'; // [cite: 132]
    } else {
        currentAuthMode = 'login'; // [cite: 133]
        authTitle.innerText = 'Login';
        authSubmit.value = 'Log In';
        toggleText.innerText = "Don't have an account?";
        toggleLink.innerText = 'Sign Up'; // [cite: 134]
    }
}

function logout() {
    isLoggedIn = false; // [cite: 135]
    alert('Logged out successfully.');
    navigateTo('auth'); // Go to login page after logout
    // Optionally remove the main content from the DOM
    const mainContentContainer = document.getElementById('mainContentContainer');
    if (mainContentContainer) {
        mainContentContainer.innerHTML = '';
    }
}

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase(); // [cite: 136]
    if (query.includes('cd') || query.includes('dvd') || query.includes('media')) {
        alert(`Searching for media related to "${query}"... (This is a mock search)`); // [cite: 137]
        navigateTo('shop');
    } else if (query.includes('computer') || query.includes('parts') || query.includes('storage') || query.includes('peripheral') || query.includes('cable')) {
        alert(`Searching for computer parts related to "${query}"... (This is a mock search)`); // [cite: 138]
        navigateTo('shop');
    } else if (query.includes('about')) {
        navigateTo('about'); // [cite: 139]
    } else if (query.includes('categories')) {
        navigateTo('categories'); // [cite: 140]
    } else {
        alert(`No direct results for "${query}". Please try a different search. (Mock search)`); // [cite: 141]
    }
}

// Function to load the content of main.html into the current page
async function loadMainContent() {
    try {
        const response = await fetch('main.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const mainHtml = await response.text();
        // Create a div to hold the main content, if it doesn't exist
        let mainContentContainer = document.getElementById('mainContentContainer');
        if (!mainContentContainer) {
            mainContentContainer = document.createElement('div');
            mainContentContainer.id = 'mainContentContainer';
            document.body.insertBefore(mainContentContainer, document.querySelector('.site-footer'));
        }
        mainContentContainer.innerHTML = mainHtml;
    } catch (error) {
        console.error('Failed to load main.html:', error);
        alert('Could not load main content.');
    }
}

// Initial load: always start at the auth page and manage navigation bar visibility
document.addEventListener('DOMContentLoaded', () => { // [cite: 142]
    navigateTo('auth'); // Start at the authentication page
});