// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Load jobs on page load
    searchJobs();
});

// Stripe configuration
const stripe = Stripe("pk_test_51RnZzV2LsjxmHdjJ3IUsSiAwD2v4lWuZflBMSonyRucpi96HZddxOLaEO3Z1AHecrOSHODsaFMamNzp42wA4683b00dE1JHoaC");

// Global variables for file storage
let uploadedFiles = {
    match: null,
    tailor: null,
    cover: null
};

let aiResults = {
    tailoredResume: null,
    coverLetter: null
};

// Utility Functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showLoading(buttonId, loadingId, textId, loadingText = 'Processing...') {
    document.getElementById(buttonId).disabled = true;
    document.getElementById(loadingId).classList.remove('hidden');
    document.getElementById(textId).textContent = loadingText;
}

function hideLoading(buttonId, loadingId, textId, originalText) {
    document.getElementById(buttonId).disabled = false;
    document.getElementById(loadingId).classList.add('hidden');
    document.getElementById(textId).textContent = originalText;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    if (type === 'success') {
        notification.className += ' bg-green-500 text-white';
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.className += ' bg-red-500 text-white';
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.className += ' bg-blue-500 text-white';
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// File Upload Handlers
function handleResumeUpload(input, type) {
    const file = input.files[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a PDF or Word document', 'error');
        input.value = '';
        return;
    }
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size must be less than 5MB', 'error');
        input.value = '';
        return;
    }
    
    uploadedFiles[type] = file;
    
    // Update UI to show file selected
    const uploadArea = input.parentElement;
    uploadArea.classList.add('border-green-500', 'bg-green-50');
    uploadArea.innerHTML = `
        <i class="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
        <p class="text-sm text-green-600">${file.name}</p>
        <p class="text-xs text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
    `;
    
    showNotification(`Resume uploaded successfully for ${type}`, 'success');
}

// AI Feature Functions
async function calculateMatchScore() {
    const resume = uploadedFiles.match;
    const jobUrl = document.getElementById('match-job-url').value.trim();
    
    if (!resume) {
        showNotification('Please upload your resume first', 'error');
        return;
    }
    
    if (!jobUrl) {
        showNotification('Please enter a job URL or description', 'error');
        return;
    }
    
    showLoading('match-btn-text', 'match-loading', 'match-btn-text', 'Analyzing...');
    
    try {
        const formData = new FormData();
        formData.append('file', resume);
        formData.append('job_description', jobUrl);
        
        const response = await fetch('/match-score', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Display results
        document.getElementById('match-score').textContent = `${data.match_score}%`;
        document.getElementById('match-details').textContent = data.details || 'Match analysis completed';
        document.getElementById('match-result').classList.remove('hidden');
        
        // Add animation to result
        document.getElementById('match-result').style.animation = 'bounceIn 0.6s ease-out';
        
        showNotification(`Match score calculated: ${data.match_score}%`, 'success');
        
    } catch (error) {
        console.error('Error calculating match score:', error);
        showNotification('Failed to calculate match score. Please try again.', 'error');
    } finally {
        hideLoading('match-btn-text', 'match-loading', 'match-btn-text', 'Calculate Match');
    }
}

async function tailorResume() {
    const resume = uploadedFiles.tailor;
    const jobUrl = document.getElementById('tailor-job-url').value.trim();
    
    if (!resume) {
        showNotification('Please upload your resume first', 'error');
        return;
    }
    
    if (!jobUrl) {
        showNotification('Please enter a target job URL', 'error');
        return;
    }
    
    showLoading('tailor-btn-text', 'tailor-loading', 'tailor-btn-text', 'Tailoring...');
    
    try {
        const formData = new FormData();
        formData.append('file', resume);
        formData.append('job_description', jobUrl);
        
        const response = await fetch('/tailor-resume', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store the tailored resume
        aiResults.tailoredResume = data.tailored_resume;
        
        // Display preview
        const preview = data.tailored_resume.substring(0, 200) + '...';
        document.getElementById('tailor-preview').textContent = preview;
        document.getElementById('tailor-result').classList.remove('hidden');
        
        // Add animation
        document.getElementById('tailor-result').style.animation = 'slideUp 0.6s ease-out';
        
        showNotification('Resume tailored successfully!', 'success');
        
    } catch (error) {
        console.error('Error tailoring resume:', error);
        showNotification('Failed to tailor resume. Please try again.', 'error');
    } finally {
        hideLoading('tailor-btn-text', 'tailor-loading', 'tailor-btn-text', 'Tailor Resume');
    }
}

async function generateCoverLetter() {
    const resume = uploadedFiles.cover;
    const jobUrl = document.getElementById('cover-job-url').value.trim();
    
    if (!resume) {
        showNotification('Please upload your resume first', 'error');
        return;
    }
    
    if (!jobUrl) {
        showNotification('Please enter a job URL', 'error');
        return;
    }
    
    showLoading('cover-btn-text', 'cover-loading', 'cover-btn-text', 'Generating...');
    
    try {
        const formData = new FormData();
        formData.append('file', resume);
        formData.append('job_description', jobUrl);
        
        const response = await fetch('/cover-letter', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store the cover letter
        aiResults.coverLetter = data.cover_letter;
        
        // Display preview
        const preview = data.cover_letter.substring(0, 200) + '...';
        document.getElementById('cover-preview').textContent = preview;
        document.getElementById('cover-result').classList.remove('hidden');
        
        // Add animation
        document.getElementById('cover-result').style.animation = 'fadeIn 0.6s ease-out';
        
        showNotification('Cover letter generated successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating cover letter:', error);
        showNotification('Failed to generate cover letter. Please try again.', 'error');
    } finally {
        hideLoading('cover-btn-text', 'cover-loading', 'cover-btn-text', 'Generate Letter');
    }
}

// Download Functions
function downloadTailoredResume() {
    if (!aiResults.tailoredResume) {
        showNotification('No tailored resume available', 'error');
        return;
    }
    
    const blob = new Blob([aiResults.tailoredResume], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailored_resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Tailored resume downloaded!', 'success');
}

function downloadCoverLetter() {
    if (!aiResults.coverLetter) {
        showNotification('No cover letter available', 'error');
        return;
    }
    
    const blob = new Blob([aiResults.coverLetter], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover_letter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Cover letter downloaded!', 'success');
}

// Job Search Functions
async function searchJobs() {
    const searchTerm = document.getElementById('job-search').value.trim();
    const location = document.getElementById('job-location').value;
    const filters = Array.from(document.querySelectorAll('.job-filter:checked')).map(cb => cb.value);
    
    // Show loading
    document.getElementById('jobs-loading').classList.remove('hidden');
    document.getElementById('jobs-container').innerHTML = '';
    document.getElementById('no-jobs').classList.add('hidden');
    
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (location) params.append('location', location);
        filters.forEach(filter => params.append('filters', filter));
        
        const response = await fetch(`/jobs?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide loading
        document.getElementById('jobs-loading').classList.add('hidden');
        
        if (!data.jobs || data.jobs.length === 0) {
            document.getElementById('no-jobs').classList.remove('hidden');
            return;
        }
        
        displayJobs(data.jobs);
        
    } catch (error) {
        console.error('Error fetching jobs:', error);
        document.getElementById('jobs-loading').classList.add('hidden');
        showNotification('Failed to load jobs. Please try again.', 'error');
    }
}

function displayJobs(jobs) {
    const container = document.getElementById('jobs-container');
    container.innerHTML = '';
    
    jobs.forEach((job, index) => {
        const jobCard = createJobCard(job);
        jobCard.setAttribute('data-aos', 'fade-up');
        jobCard.setAttribute('data-aos-delay', (index * 100).toString());
        container.appendChild(jobCard);
    });
    
    // Refresh AOS for new elements
    AOS.refresh();
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300';
    
    // Determine job type styling
    const jobTypeClass = getJobTypeClass(job.locations);
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center">
                <div class="bg-primary text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-briefcase"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">${job.roles || 'Job Title'}</h3>
                    <p class="text-gray-600">${job.companies || 'Company Name'}</p>
                </div>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-semibold ${jobTypeClass}">
                ${job.locations || 'Location'}
            </span>
        </div>
        
        <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-map-marker-alt w-4 mr-2 text-primary"></i>
                <span>${job.locations || 'Location not specified'}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-briefcase w-4 mr-2 text-primary"></i>
                <span>${job.experience || 'Experience not specified'}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
                <i class="fas fa-rupee-sign w-4 mr-2 text-primary"></i>
                <span class="font-semibold text-primary">${job.salaries || 'Salary not disclosed'}</span>
            </div>
        </div>
        
        <div class="mb-4">
            <p class="text-sm text-gray-700">
                <strong>Skills:</strong> ${job.skills || 'Skills not specified'}
            </p>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <button onclick="viewJobDetails('${job.id || Math.random()}')" class="text-primary hover:text-secondary font-semibold text-sm transition-colors">
                View Details <i class="fas fa-arrow-right ml-1"></i>
            </button>
            <button onclick="quickApply('${job.id || Math.random()}')" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors text-sm font-semibold">
                Quick Apply
            </button>
        </div>
    `;
    
    return card;
}

function getJobTypeClass(location) {
    if (!location) return 'bg-gray-100 text-gray-800';
    
    const loc = location.toLowerCase();
    if (loc.includes('remote')) return 'bg-green-100 text-green-800';
    if (loc.includes('bangalore') || loc.includes('mumbai') || loc.includes('delhi')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
}

function viewJobDetails(jobId) {
    showNotification(`Opening job details for ID: ${jobId}`, 'info');
    // Implement job details modal or navigation
}

function quickApply(jobId) {
    showNotification(`Quick apply initiated for job ID: ${jobId}`, 'success');
    // Implement quick apply functionality
}

// Stripe Payment Functions
async function upgradeToPro() {
    try {
        const response = await fetch('/create-checkout-session?plan=pro', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.id) {
            stripe.redirectToCheckout({ sessionId: data.id });
        } else {
            throw new Error('Failed to create checkout session');
        }
    } catch (error) {
        console.error('Error upgrading to Pro:', error);
        showNotification('Failed to start payment process. Please try again.', 'error');
    }
}

async function upgradeToProPlus() {
    try {
        const response = await fetch('/create-checkout-session?plan=pro_plus', {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.id) {
            stripe.redirectToCheckout({ sessionId: data.id });
        } else {
            throw new Error('Failed to create checkout session');
        }
    } catch (error) {
        console.error('Error upgrading to Pro Plus:', error);
        showNotification('Failed to start payment process. Please try again.', 'error');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search on Enter key
    document.getElementById('job-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchJobs();
        }
    });
    
    // Filter change listeners
    document.querySelectorAll('.job-filter').forEach(filter => {
        filter.addEventListener('change', searchJobs);
    });
    
    // Location change listener
    document.getElementById('job-location').addEventListener('change', searchJobs);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95', 'backdrop-blur-sm');
    } else {
        navbar.classList.remove('bg-white/95', 'backdrop-blur-sm');
    }
});