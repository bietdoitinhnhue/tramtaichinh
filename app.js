// Legal Report JavaScript - Navigation and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeNavigation();
    initializeScrollSpy();
    initializePrintFunctionality();
    initializeApp();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                scrollToSection(targetElement);
                updateActiveNavLink(this);
            }
        });
    });
}

/**
 * Smooth scroll to target section
 */
function scrollToSection(targetElement) {
    const headerHeight = document.querySelector('.report-header')?.offsetHeight || 0;
    const offsetTop = targetElement.offsetTop - headerHeight - 20;
    
    // Use both methods for better compatibility
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else {
        // Fallback for browsers that don't support smooth scrolling
        animateScrollTo(offsetTop, 600);
    }
}

/**
 * Animate scroll for browsers without smooth scroll support
 */
function animateScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeInOutCubic = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        window.scrollTo(0, startY + difference * easeInOutCubic);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.table-of-contents a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Initialize scroll spy functionality
 */
function initializeScrollSpy() {
    const sections = document.querySelectorAll('.report-section[id]');
    const navLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    
    if (sections.length === 0) return;
    
    // Throttled scroll handler for better performance
    let ticking = false;
    
    function updateActiveSection() {
        const scrollPosition = window.pageYOffset + 150; // Offset for header
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            updateActiveNavLinkBySection(currentSection.id);
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveSection);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial check
    updateActiveSection();
}

/**
 * Update active nav link based on visible section
 */
function updateActiveNavLinkBySection(sectionId) {
    const navLinks = document.querySelectorAll('.table-of-contents a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize print functionality
 */
function initializePrintFunctionality() {
    // Simplified print functionality - don't prevent default Ctrl+P
    document.addEventListener('keydown', function(e) {
        // Just log when Ctrl+P is pressed, but don't interfere with browser default
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            console.log('Print shortcut detected');
            // Let the browser handle the default print behavior
        }
    });
    
    // Add explicit print button
    addPrintButton();
}

/**
 * Add a print button to the interface
 */
function addPrintButton() {
    const header = document.querySelector('.report-meta');
    if (header) {
        const printButton = document.createElement('button');
        printButton.className = 'btn btn--outline btn--sm';
        printButton.innerHTML = '🖨️ In báo cáo';
        printButton.style.marginTop = '8px';
        printButton.type = 'button';
        
        printButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Multiple approaches to ensure print works
            try {
                // Method 1: Direct window.print()
                window.print();
            } catch (error) {
                console.warn('Print method 1 failed:', error);
                
                try {
                    // Method 2: Focus then print
                    window.focus();
                    setTimeout(() => window.print(), 100);
                } catch (error2) {
                    console.warn('Print method 2 failed:', error2);
                    
                    // Method 3: Create a print-specific window
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                        printWindow.document.write(document.documentElement.outerHTML);
                        printWindow.document.close();
                        printWindow.focus();
                        setTimeout(() => {
                            printWindow.print();
                            printWindow.close();
                        }, 100);
                    }
                }
            }
        });
        
        header.appendChild(printButton);
    }
}

/**
 * Handle responsive navigation for mobile
 */
function handleResponsiveNavigation() {
    const tableOfContents = document.querySelector('.table-of-contents');
    const isMobile = window.innerWidth <= 1024;
    
    if (isMobile && tableOfContents) {
        tableOfContents.classList.add('mobile-nav');
    } else if (tableOfContents) {
        tableOfContents.classList.remove('mobile-nav');
    }
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Enhance accessibility
 */
function enhanceAccessibility() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link sr-only';
    skipLink.textContent = 'Chuyển đến nội dung chính';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 1000;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const reportContent = document.querySelector('.report-content');
    if (reportContent) {
        reportContent.id = 'main-content';
        reportContent.setAttribute('role', 'main');
        reportContent.setAttribute('aria-label', 'Nội dung báo cáo pháp lý');
    }
    
    // Enhance navigation accessibility
    const nav = document.querySelector('.table-of-contents');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Mục lục báo cáo');
    }
    
    // Enhance table accessibility
    const tables = document.querySelectorAll('table');
    tables.forEach((table, index) => {
        table.setAttribute('role', 'table');
        table.setAttribute('aria-label', `Bảng ${index + 1}`);
        
        // Add scope to headers
        const headers = table.querySelectorAll('th');
        headers.forEach(header => {
            header.setAttribute('scope', 'col');
        });
        
        // Add scope to row headers if any
        const rowHeaders = table.querySelectorAll('tbody tr th');
        rowHeaders.forEach(header => {
            header.setAttribute('scope', 'row');
        });
    });
}

/**
 * Add loading states and error handling
 */
function handleLoadingStates() {
    document.body.classList.add('loading');
    
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        
        // Ensure navigation works after load
        setTimeout(initializeNavigation, 100);
    });
}

/**
 * Initialize tooltips for legal terms
 */
function initializeTooltips() {
    const legalTerms = document.querySelectorAll('[data-tooltip]');
    
    legalTerms.forEach(term => {
        term.addEventListener('mouseenter', function(e) {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        term.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        // Keyboard accessibility
        term.addEventListener('focus', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        term.addEventListener('blur', function() {
            hideTooltip();
        });
    });
}

/**
 * Show tooltip
 */
function showTooltip(element, text) {
    hideTooltip(); // Remove any existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.id = 'dynamic-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: var(--color-charcoal-800);
        color: var(--color-white);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + window.pageYOffset + 'px';
    
    // Trigger opacity transition
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

/**
 * Hide tooltip
 */
function hideTooltip() {
    const tooltip = document.getElementById('dynamic-tooltip');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 200);
    }
}

/**
 * Handle window resize
 */
window.addEventListener('resize', debounce(function() {
    handleResponsiveNavigation();
    hideTooltip(); // Hide tooltips on resize
}, 250));

/**
 * Initialize all functionality
 */
function initializeApp() {
    handleLoadingStates();
    enhanceAccessibility();
    initializeTooltips();
    handleResponsiveNavigation();
    
    // Add error handling for uncaught errors
    window.addEventListener('error', function(e) {
        console.error('Application error:', e.error);
    });
    
    console.log('Legal Report Application initialized successfully');
}

// Ensure proper initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}