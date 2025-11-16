// Advanced Search Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Make sure API is loaded
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }

    const advancedToggle = document.getElementById('advanced-toggle');
    const advancedPanel = document.getElementById('advanced-panel');
    
    if (advancedToggle && advancedPanel) {
        advancedToggle.addEventListener('click', function() {
            advancedPanel.classList.toggle('hidden');
            advancedToggle.classList.toggle('active');
        });
    }

    // Clear Advanced Search
    const clearAdvanced = document.getElementById('clear-advanced');
    if (clearAdvanced) {
        clearAdvanced.addEventListener('click', function(e) {
            e.preventDefault();
            const form = document.querySelector('.advanced-form');
            if (form) {
                form.reset();
            }
        });
    }

    // Apply Advanced Search
    const applyAdvanced = document.getElementById('apply-advanced');
    if (applyAdvanced) {
        applyAdvanced.addEventListener('click', async function(e) {
            e.preventDefault();
            const searchParams = {
                search: document.getElementById('main-search')?.value || '',
                fieldOfStudy: document.getElementById('field-of-study')?.value || '',
                dataType: document.getElementById('data-type')?.value || '',
                author: document.getElementById('author')?.value || ''
            };

            // Remove empty params
            Object.keys(searchParams).forEach(key => {
                if (!searchParams[key]) delete searchParams[key];
            });

            try {
                const data = await postsAPI.getAll(searchParams);
                // Redirect to browse page with results
                window.location.href = `browse.html?${new URLSearchParams(searchParams).toString()}`;
            } catch (error) {
                console.error('Search failed:', error);
                alert('Search failed. Please try again.');
            }
        });
    }

    // Main Search Functionality
    const mainSearch = document.getElementById('main-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (mainSearch && searchBtn) {
        const performSearch = async function() {
            const query = mainSearch.value.trim();
            if (query) {
                try {
                    const data = await postsAPI.getAll({ search: query });
                    window.location.href = `browse.html?search=${encodeURIComponent(query)}`;
                } catch (error) {
                    console.error('Search failed:', error);
                    alert('Search failed. Please try again.');
                }
            }
        };

        searchBtn.addEventListener('click', performSearch);
        mainSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Load stats on index page
    if (document.querySelector('.stats-section')) {
        loadStats();
    }

    // Load featured posts on browse page
    if (document.querySelector('.featured-section')) {
        loadFeaturedPosts();
        loadAllPosts();
    }

    // Sign Up Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm && window.location.pathname.includes('signup.html')) {
        setupSignupForm(signupForm);
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        setupLoginForm(loginForm);
    }

    // Create Post Form
    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) {
        setupCreatePostForm(createPostForm);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Load stats
async function loadStats() {
    try {
        const stats = await statsAPI.getStats();
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('.stat-number').textContent = formatNumber(stats.datasets);
            statCards[1].querySelector('.stat-number').textContent = formatNumber(stats.researchers);
            statCards[2].querySelector('.stat-number').textContent = formatNumber(stats.institutions);
            statCards[3].querySelector('.stat-number').textContent = formatNumber(stats.countries);
        }
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

// Load featured posts
async function loadFeaturedPosts() {
    try {
        const posts = await postsAPI.getFeatured();
        const featuredGrid = document.querySelector('.featured-grid');
        
        if (featuredGrid && posts.length > 0) {
            featuredGrid.innerHTML = posts.map(post => createFeaturedCard(post)).join('');
        }
    } catch (error) {
        console.error('Failed to load featured posts:', error);
    }
}

// Load all posts
async function loadAllPosts() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            search: urlParams.get('search') || '',
            fieldOfStudy: urlParams.get('fieldOfStudy') || '',
            dataType: urlParams.get('dataType') || '',
            author: urlParams.get('author') || '',
            page: urlParams.get('page') || '1',
            limit: '20'
        };

        // Remove empty params
        Object.keys(params).forEach(key => {
            if (!params[key]) delete params[key];
        });

        const data = await postsAPI.getAll(params);
        const datasetsGrid = document.querySelector('.datasets-grid');
        
        if (datasetsGrid) {
            if (data.posts && data.posts.length > 0) {
                datasetsGrid.innerHTML = data.posts.map(post => createDatasetCard(post)).join('');
            } else {
                datasetsGrid.innerHTML = '<p class="no-results">No datasets found. Try adjusting your search criteria.</p>';
            }
        }
    } catch (error) {
        console.error('Failed to load posts:', error);
    }
}

// Create featured card HTML
function createFeaturedCard(post) {
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    const tags = post.tags && post.tags.length > 0 
        ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';
    
    return `
        <article class="featured-card">
            <div class="featured-badge">Featured</div>
            <div class="card-header">
                <h3 class="card-title">${escapeHtml(post.title)}</h3>
                <div class="card-meta">
                    <span class="author">${escapeHtml(post.author)}</span>
                    <span class="institution">${escapeHtml(post.authorInstitution || '')}</span>
                </div>
            </div>
            <p class="card-description">${escapeHtml(post.description)}</p>
            <div class="card-tags">${tags}</div>
            <div class="card-footer">
                <span class="date">Published: ${date}</span>
                <a href="#" class="card-link" onclick="viewPost(${post.id}); return false;">View Dataset →</a>
            </div>
        </article>
    `;
}

// Create dataset card HTML
function createDatasetCard(post) {
    const date = new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const tags = post.tags && post.tags.length > 0 
        ? post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')
        : '';
    
    return `
        <article class="dataset-card">
            <div class="card-header">
                <h3 class="card-title">${escapeHtml(post.title)}</h3>
                <div class="card-meta">
                    <span class="author">${escapeHtml(post.author)}</span>
                    <span class="institution">${escapeHtml(post.authorInstitution || '')}</span>
                </div>
            </div>
            <p class="card-description">${escapeHtml(post.description)}</p>
            <div class="card-tags">${tags}</div>
            <div class="card-footer">
                <span class="date">${date}</span>
                <a href="#" class="card-link" onclick="viewPost(${post.id}); return false;">View →</a>
            </div>
        </article>
    `;
}

// View post (placeholder - can be expanded)
function viewPost(id) {
    alert(`Viewing post ${id}. This would open a detailed view page.`);
    // In a full implementation, this would navigate to a post detail page
}

// Setup signup form
function setupSignupForm(form) {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    const passwordMatch = document.getElementById('password-match');

    // Password Strength Checker
    if (password && passwordStrength) {
        password.addEventListener('input', function() {
            const pwd = password.value;
            let strength = 0;
            
            if (pwd.length >= 8) strength++;
            if (/[a-z]/.test(pwd)) strength++;
            if (/[A-Z]/.test(pwd)) strength++;
            if (/[0-9]/.test(pwd)) strength++;
            if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
            
            passwordStrength.className = 'password-strength';
            if (pwd.length === 0) {
                passwordStrength.className = 'password-strength';
            } else if (strength <= 2) {
                passwordStrength.className = 'password-strength weak';
            } else if (strength <= 4) {
                passwordStrength.className = 'password-strength medium';
            } else {
                passwordStrength.className = 'password-strength strong';
            }
        });
    }

    // Password Match Checker
    if (password && confirmPassword && passwordMatch) {
        const checkPasswordMatch = function() {
            if (confirmPassword.value.length === 0) {
                passwordMatch.textContent = '';
                passwordMatch.className = 'password-match';
                return;
            }
            
            if (password.value === confirmPassword.value) {
                passwordMatch.textContent = '✓ Passwords match';
                passwordMatch.className = 'password-match match';
            } else {
                passwordMatch.textContent = '✗ Passwords do not match';
                passwordMatch.className = 'password-match no-match';
            }
        };

        password.addEventListener('input', checkPasswordMatch);
        confirmPassword.addEventListener('input', checkPasswordMatch);
    }

    // Form Submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const errorDiv = document.getElementById('signup-error') || createErrorDiv(form);
        
        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--red)';
            } else {
                field.style.borderColor = '';
            }
        });

        // Check password match
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            isValid = false;
            confirmPassword.style.borderColor = 'var(--red)';
            showError(errorDiv, 'Passwords do not match');
            return;
        }

        // Check terms acceptance
        const terms = document.getElementById('terms');
        if (terms && !terms.checked) {
            isValid = false;
            showError(errorDiv, 'Please accept the Terms of Service and Privacy Policy');
            return;
        }

        if (isValid) {
            try {
                const formData = {
                    firstName: document.getElementById('first-name').value,
                    lastName: document.getElementById('last-name').value,
                    country: document.getElementById('country').value,
                    institutionType: document.querySelector('input[name="institution-type"]:checked').value,
                    institutionName: document.getElementById('institution-name').value,
                    role: document.getElementById('role').value,
                    email: document.getElementById('email').value,
                    password: password.value
                };

                const result = await authAPI.register(formData);
                
                if (result.requiresVerification) {
                    alert('Account created successfully! Please check your email to verify your account before logging in.');
                    window.location.href = 'login.html';
                } else if (result.token) {
                    setAuthToken(result.token);
                    setCurrentUser(result.user);
                    alert('Account created successfully! Redirecting...');
                    window.location.href = 'index.html';
                } else {
                    alert('Account created successfully! Please check your email to verify your account.');
                    window.location.href = 'login.html';
                }
            } catch (error) {
                showError(errorDiv, error.message || 'Failed to create account. Please try again.');
            }
        }
    });
}

// Setup login form
function setupLoginForm(form) {
    const errorDiv = document.getElementById('login-error');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        try {
            const result = await authAPI.login(email, password);
            alert('Login successful! Redirecting...');
            window.location.href = 'index.html';
        } catch (error) {
            let errorMessage = error.message || 'Invalid email or password';
            
            // Check if it's a verification error
            if (error.message && error.message.includes('not verified')) {
                errorMessage = 'Email not verified. Please check your email and verify your account before logging in.';
            }
            
            if (errorDiv) {
                errorDiv.textContent = errorMessage;
                errorDiv.style.display = 'block';
            } else {
                alert(errorMessage);
            }
        }
    });
}

// Setup create post form
function setupCreatePostForm(form) {
    // Check authentication
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return;
    }

    const errorDiv = document.getElementById('post-error');
    const successDiv = document.getElementById('post-success');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (errorDiv) errorDiv.style.display = 'none';
        if (successDiv) successDiv.style.display = 'none';
        
        try {
            const postData = {
                title: document.getElementById('post-title').value,
                description: document.getElementById('post-description').value,
                methods: document.getElementById('post-methods').value || null,
                dataType: document.getElementById('post-data-type').value || null,
                fieldOfStudy: document.getElementById('post-field-of-study').value || null,
                subtopic: document.getElementById('post-subtopic').value || null,
                organisms: document.getElementById('post-organisms').value || null,
                tags: document.getElementById('post-tags').value
            };

            const fileInput = document.getElementById('post-file');
            const file = fileInput.files.length > 0 ? fileInput.files[0] : null;

            const result = await postsAPI.create(postData, file);
            
            if (successDiv) {
                successDiv.textContent = 'Post created successfully! Redirecting...';
                successDiv.style.display = 'block';
            }
            
            setTimeout(() => {
                window.location.href = 'browse.html';
            }, 1500);
        } catch (error) {
            if (errorDiv) {
                errorDiv.textContent = error.message || 'Failed to create post. Please try again.';
                errorDiv.style.display = 'block';
            } else {
                alert(error.message || 'Failed to create post. Please try again.');
            }
        }
    });
}

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function createErrorDiv(parent) {
    const div = document.createElement('div');
    div.id = 'signup-error';
    div.className = 'error-message';
    div.style.display = 'none';
    parent.insertBefore(div, parent.firstChild);
    return div;
}
