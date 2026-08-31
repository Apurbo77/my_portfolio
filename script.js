document.addEventListener('DOMContentLoaded', () => {

// Populate Dynamic Data from data.js
if (typeof portfolioData !== 'undefined') {
    const data = portfolioData;

    // Hero section
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    if (heroName) {
        heroName.textContent = data.personalInfo.name;
        heroName.setAttribute('data-text', data.personalInfo.name);
    }
    if (heroSubtitle) heroSubtitle.textContent = data.personalInfo.title;

    // About section
    const aboutText1 = document.getElementById('about-text-1');
    const aboutText2 = document.getElementById('about-text-2');
    if (aboutText1) aboutText1.textContent = `Hello! I'm ${data.personalInfo.name}. I'm a creative worker, highly enthusiastic in planning and executing. I remain highly determined and honest in my goals and actions.`;
    if (aboutText2) aboutText2.textContent = `I am currently pursuing a Bachelor of Science in Computer Science and Engineering at BRAC University, building a strong foundation in problem-solving and software development.`;

    // Stats
    const creditsCompletedEl = document.getElementById('credits-completed');
    const expectedGraduationEl = document.getElementById('expected-graduation');
    if (creditsCompletedEl) creditsCompletedEl.textContent = data.creditsCompleted;
    if (expectedGraduationEl) expectedGraduationEl.textContent = data.expectedGraduation;

    // Skills
    const technicalSkills = document.getElementById('technical-skills');
    const softSkills = document.getElementById('soft-skills');
    const languages = document.getElementById('languages');

    if (technicalSkills) {
        technicalSkills.innerHTML = data.skills.technical.map((skill, i) =>
            `<span class="skill-tag${i < 3 ? ' highlighted' : ''}">${skill}</span>`
        ).join('');
    }
    if (softSkills) {
        softSkills.innerHTML = data.skills.soft.map(skill =>
            `<span class="skill-tag">${skill}</span>`
        ).join('');
    }
    if (languages) {
        languages.innerHTML = data.skills.languages.map(skill =>
            `<span class="skill-tag">${skill}</span>`
        ).join('');
    }

    // Education
    const educationGrid = document.getElementById('education-grid');
    if (educationGrid) {
        educationGrid.innerHTML = data.education.map(edu => {
            if (edu.degree === 'Bachelor of Science') {
                return `
                    <div class="project-card">
                        <div class="project-info" style="padding-top: 2rem;">
                            <div class="tech-stack" style="margin-bottom: 1rem;">
                                <span>Expected ${edu.expectedYear}</span>
                            </div>
                            <h3>${edu.degree}</h3>
                            <p>${edu.department}<br>Credits Completed: ${data.creditsCompleted}</p>
                            <h4 style="margin-top: 1rem;"><a href="${edu.universityUrl}" target="_blank"
                                    rel="noopener noreferrer"
                                    style="color: var(--primary-color); text-decoration: none;">${edu.university}</a></h4>
                        </div>
                    </div>`;
            } else if (edu.degree === 'Higher Secondary Certificate') {
                return `
                    <div class="project-card">
                        <div class="project-info" style="padding-top: 2rem;">
                            <div class="tech-stack" style="margin-bottom: 1rem;">
                                <span>Passing Year: ${edu.passingYear}</span>
                            </div>
                            <h3>${edu.degree}</h3>
                            <p>Group: ${edu.group}<br>Result: ${edu.result}<br>Board: ${edu.board}</p>
                        </div>
                    </div>`;
            } else {
                return `
                    <div class="project-card">
                        <div class="project-info" style="padding-top: 2rem;">
                            <div class="tech-stack" style="margin-bottom: 1rem;">
                                <span>Passing Year: ${edu.passingYear}</span>
                            </div>
                            <h3>${edu.degree}</h3>
                            <p>Group: ${edu.group}<br>Result: ${edu.result}<br>Board: ${edu.board}</p>
                        </div>
                    </div>`;
            }
        }).join('');
    }

    // Contact / Social Links
    const socialLinks = document.getElementById('social-links');
    if (socialLinks) {
        socialLinks.innerHTML = `
            <a href="mailto:${data.personalInfo.email}" class="social-btn">Email Me</a>
            <a href="tel:${data.personalInfo.phone}" class="social-btn">📞 Phone</a>
            <a href="${data.personalInfo.facebook}" target="_blank" rel="noopener noreferrer" class="social-btn">Facebook</a>
            <a href="${data.personalInfo.github}" target="_blank" rel="noopener noreferrer" class="social-btn">GitHub</a>
            <span class="social-btn" style="cursor: default; border-color: transparent;">📍 ${data.personalInfo.location}</span>
        `;
    }

    // Achievements page elements
    const cgpaValueEl = document.getElementById('cgpa-value');
    const creditsValueEl = document.getElementById('credits-value');
    if (cgpaValueEl) cgpaValueEl.textContent = data.cgpa;
    if (creditsValueEl) creditsValueEl.textContent = data.creditsCompleted;
}

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));

        // Prevent scrolling when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        });
    });
}

// Sticky Navbar Background
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 5, 5, 0.8)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 5, 5, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// Reveal Animation on Scroll
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// Form submission handler
const contactForm = document.querySelector('#contact-form, .contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;

        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(this);

        fetch("https://formsubmit.co/ajax/apurbobhaket17@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerText = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                submitBtn.style.opacity = '1';
                this.reset();

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                submitBtn.innerText = 'Error! Try Again.';
                submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                submitBtn.style.opacity = '1';

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
}

}); // end DOMContentLoaded
