// Get elements
const searchInput = document.querySelector('.search-bar');
const cardsContainer = document.querySelector('.cards-grid');
const cards = document.querySelectorAll('.card') //querySelectorAll() = select all the card-item

// To animate the search bar
function animateSearchBar() {
    const searchContainer = document.querySelector('.search-container');

    searchInput.addEventListener('focus', function() {
       searchContainer.style.transform = 'scale(1.02)';
       searchContainer.style.boxShadow = '0 6px 25px rgba(76, 95, 213, 0.2)';
       searchContainer.style.borderColor = '#4c5fd5';
    });

    searchInput.addEventListener('blur', function() {
       searchContainer.style.transform = 'scale(1)';
       searchContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
       searchContainer.style.borderColor = '#fff';
    });
}

// Search function
// This function initializes the search functionality
function initSearch() {
    const cardData = Array.from(cards).map(card => ({
        element: card,
        title: card.querySelector('h2').textContent.toLowerCase(),
        description: card.querySelector('p').textContent.toLowerCase(),
        searchableText: card.querySelector('h2').textContent.toLowerCase() + ' ' + 
                       card.querySelector('p').textContent.toLowerCase()
    }));

   // Filter function
    /**
     * Filters the cards based on the search term.
     * @param {string} searchTerm - The term to search for.
     */
    function filterCards(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        // If no search term, show all cards
        if (term === '') {
            cardData.forEach(item => {
                item.element.style.display = 'flex';
                item.element.style.animation = 'fadeIn 0.3s ease-in';
            });
            updateResultsMessage('');
            return;
        }

        let visibleCount = 0;
        
        cardData.forEach(item => {
            if (item.searchableText.includes(term)) {
                item.element.style.display = 'flex';
                item.element.style.animation = 'fadeIn 0.3s ease-in';
                visibleCount++;
            } else {
                item.element.style.display = 'none';
            }
        });

        updateResultsMessage(term, visibleCount);
    }

    // Display the results message
    function updateResultsMessage(searchTerm, count = 0) {
        // Remove the old message if it exists
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (searchTerm !== '') {
            const message = document.createElement('div');
            message.className = 'search-results-message';
            message.innerHTML = count > 0 
                ? `<p>Found ${count} result${count !== 1 ? 's' : ''} for "<strong>${searchTerm}</strong>"</p>`
                : `<p>No results found for "<strong>${searchTerm}</strong>". Try a different search term.</p>`;

            // Style the message
            message.style.cssText = `
                text-align: center;
                margin: 2rem 0;
                padding: 1rem;
                background: ${count > 0 ? '#e8f5e8' : '#ffe8e8'};
                border: 1px solid ${count > 0 ? '#4CAF50' : '#f44336'};
                border-radius: 8px;
                color: ${count > 0 ? '#2e7d32' : '#c62828'};
                font-weight: 500;
            `;
            
            cardsContainer.insertAdjacentElement('beforebegin', message);
        }
    }

    // Listen for changes in the input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value;

        // Debounce to avoid too many calls
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterCards(searchTerm);
        }, 150);
    });

    // Form submission handling
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        filterCards(searchInput.value);
    });

    // Search on submit (Enter)
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            filterCards(this.value);
        }
    });
}

// Function to add CSS animations
function addSearchAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(10px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
        
        @keyframes fadeOut {
            from { 
                opacity: 1; 
                transform: translateY(0); 
            }
            to { 
                opacity: 0; 
                transform: translateY(-10px); 
            }
        }
        
        .card {
            transition: all 0.3s ease;
        }
        
        .search-container {
            transition: all 0.3s ease;
        }
        
        .search-results-message {
            animation: fadeIn 0.3s ease-in;
        }
    `;
    document.head.appendChild(style);
}

// Advanced function: fuzzy search (optional)
function fuzzySearch(searchTerm, text) {
    const term = searchTerm.toLowerCase();
    const target = text.toLowerCase();

    // Exact match first
    if (target.includes(term)) return true;

    // Search by individual words
    const words = term.split(' ').filter(word => word.length > 2);
    return words.some(word => target.includes(word));
}

// Function to improve: highlight results
function highlightSearchTerms(searchTerm) {
    if (!searchTerm.trim()) return;
    
    cards.forEach(card => {
        if (card.style.display !== 'none') {
            const title = card.querySelector('h2');
            const description = card.querySelector('p');
            
            [title, description].forEach(element => {
                const text = element.textContent;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                element.innerHTML = text.replace(regex, '<mark style="background: #fff3cd; padding: 2px 4px; border-radius: 3px;">$1</mark>');
            });
        }
    });
}

// Function to clear highlights
function clearHighlights() {
    cards.forEach(card => {
        const title = card.querySelector('h2');
        const description = card.querySelector('p');
        
        [title, description].forEach(element => {
            element.innerHTML = element.textContent;
        });
    });
}

// Initialization complete
function initInteractiveSearch() {
    // Check if elements exist
    if (!searchInput || !cardsContainer || cards.length === 0) {
        console.warn('Éléments de recherche non trouvés');
        return;
    }
    
    addSearchAnimations();
    animateSearchBar();
    initSearch();
    
    console.log('🔍 Recherche interactive initialisée avec succès !');
}

// Clean up function to reset search
function resetSearch() {
    searchInput.value = '';
    cards.forEach(card => {
        card.style.display = 'flex';
    });
    clearHighlights();
    const message = document.querySelector('.search-results-message');
    if (message) message.remove();
}

// Double-click to reset search
searchInput.addEventListener('dblclick', resetSearch);

// Initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveSearch);
} else {
    initInteractiveSearch();
}