// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main Entrance Animation
function initEntranceAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

    tl.from(".bg-watermark", {
        opacity: 0,
        y: 100,
        scale: 1.1,
        duration: 2,
    })
    .from("nav", {
        y: -50,
        opacity: 0,
    }, "-=1.5")
    .from(".line-inner", {
        y: "100%",
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
    }, "-=1.0")
    .from(".cta-group", {
        x: -50,
        opacity: 0,
    }, "-=1")
    .from(".feature-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
    }, "-=0.8")
    .from(".hero-right > *", {
        x: 50,
        opacity: 0,
        stagger: 0.15,
    }, "-=1.2")
    .from(".product-image-container", {
        scale: 0.8,
        opacity: 0,
        xPercent: -50,
        yPercent: -35,
        duration: 1.5,
    }, "-=1.5")
    .from(".hero-bottom", {
        y: 50,
        opacity: 0,
    }, "-=1");
}

// Hover effects for size options
function initInteractions() {
    const thumbs = document.querySelectorAll('.preview-thumb');
    const mainJacket = document.querySelector('#main-jacket');
    const root = document.querySelector(':root');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Update active state
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            const newImg = thumb.getAttribute('data-img');
            const newColor = thumb.getAttribute('data-color');

            // 1. Animate Color Change (via CSS variables)
            gsap.to(root, {
                "--accent-color": newColor,
                duration: 0.6,
                ease: "power2.inOut"
            });

            // 2. Animate Image Swap with Fade
            const tl = gsap.timeline();
            tl.to(mainJacket, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    mainJacket.src = newImg;
                }
            })
            .to(mainJacket, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Handle size selection
    const sizeOptions = document.querySelectorAll('.size-options span');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(s => s.classList.remove('active'));
            option.classList.add('active');
            
            // Subtle feedback animation
            gsap.fromTo(option, 
                { scale: 0.8 }, 
                { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1 }
            );
        });
    });

    // Parallax effect for the jacket placeholder as user moves mouse
    const container = document.querySelector('.container');
    const jacket = document.querySelector('.product-image-container');

    container.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30; // Reduced sensitivity
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(jacket, {
            x: xPos,
            y: yPos,
            // Preserve the CSS centering -50% -40%
            xPercent: -50,
            yPercent: -35,
            duration: 1,
            ease: "power2.out"
        });

        // Inverse effect for background watermark
        gsap.to(".bg-watermark", {
            x: -xPos * 0.5,
            y: -yPos * 0.5,
            xPercent: -50,
            yPercent: -50,
            duration: 1.5,
            ease: "power2.out"
        });
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('#mobile-toggle');
    const dropdown = document.querySelector('#mobile-dropdown');
    const links = document.querySelectorAll('.mobile-dropdown a');

    if (toggle && dropdown) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            dropdown.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = dropdown.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                dropdown.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Initializing animations on load
window.addEventListener('DOMContentLoaded', () => {
    initEntranceAnimation();
    initInteractions();
    initMobileMenu();
});
