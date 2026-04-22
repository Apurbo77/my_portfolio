// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');

    // Prevent scrolling when menu is open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

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
const contactForm = document.querySelector('.contact-form');
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
