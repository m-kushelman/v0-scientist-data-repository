// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Utility function to get auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Utility function to set auth token
function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

// Utility function to remove auth token
function removeAuthToken() {
    localStorage.removeItem('authToken');
}

// Utility function to get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Utility function to set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Utility function to remove current user
function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

// API request wrapper
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// Authentication API
const authAPI = {
    async register(userData) {
        return await apiRequest('/register', {
            method: 'POST',
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                firstName: userData.firstName,
                lastName: userData.lastName,
                country: userData.country,
                institutionType: userData.institutionType,
                institutionName: userData.institutionName,
                role: userData.role
            })
        });
    },

    async login(email, password) {
        const data = await apiRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.token) {
            setAuthToken(data.token);
            setCurrentUser(data.user);
        }
        
        return data;
    },

    async getCurrentUser() {
        return await apiRequest('/me');
    },

    logout() {
        removeAuthToken();
        removeCurrentUser();
        window.location.href = 'index.html';
    }
};

// Posts API
const postsAPI = {
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/posts?${queryString}`);
    },

    async getById(id) {
        return await apiRequest(`/posts/${id}`);
    },

    async getFeatured() {
        return await apiRequest('/posts/featured');
    },

    async create(postData, file = null) {
        const formData = new FormData();
        
        // Add text fields
        Object.keys(postData).forEach(key => {
            if (postData[key] !== null && postData[key] !== undefined && postData[key] !== '') {
                formData.append(key, postData[key]);
            }
        });
        
        // Add file if provided
        if (file) {
            formData.append('dataFile', file);
        }

        const token = getAuthToken();
        const url = `${API_BASE_URL}/posts`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create post');
        }
        
        return data;
    },

    async getUserPosts(userId) {
        return await apiRequest(`/users/${userId}/posts`);
    }
};

// Users API
const usersAPI = {
    async getById(id) {
        return await apiRequest(`/users/${id}`);
    },

    async update(id, userData) {
        return await apiRequest(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }
};

// Stats API
const statsAPI = {
    async getStats() {
        return await apiRequest('/stats');
    }
};

// Check if user is authenticated
function isAuthenticated() {
    return !!getAuthToken();
}

// Require authentication (redirect to login if not authenticated)
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update navigation based on auth status
function updateNavigation() {
    const isAuth = isAuthenticated();
    const navLoginLink = document.getElementById('nav-login-link');
    const navProfileLink = document.getElementById('nav-profile-link');
    const navLogoutLink = document.getElementById('nav-logout-link');
    
    if (navLoginLink) {
        navLoginLink.style.display = isAuth ? 'none' : 'inline';
    }
    if (navProfileLink) {
        navProfileLink.style.display = isAuth ? 'inline' : 'none';
        if (isAuth) {
            const user = getCurrentUser();
            if (user) {
                navProfileLink.textContent = user.firstName || 'Profile';
            }
        }
    }
    if (navLogoutLink) {
        navLogoutLink.style.display = isAuth ? 'inline' : 'none';
        if (navLogoutLink && !navLogoutLink.hasListener) {
            navLogoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                authAPI.logout();
            });
            navLogoutLink.hasListener = true;
        }
    }
}

// Initialize navigation on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavigation);
} else {
    updateNavigation();
}

