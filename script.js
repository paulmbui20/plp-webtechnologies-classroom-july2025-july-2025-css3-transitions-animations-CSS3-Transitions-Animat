  /* ========================================
           PART 2: JAVASCRIPT FUNCTIONS
           Demonstrating Scope, Parameters & Return Values
           ======================================== */

        /* GLOBAL SCOPE VARIABLES
           These can be accessed from anywhere in the code */
        let totalClicks = 0;
        const cardNames = ["Card 1", "Card 2", "Card 3", "Card 4"];

        /**
         * FUNCTION 1: Get a random animation type
         * Shows: Return values, local variables
         * @returns {string} Animation class name
         */
        function getRandomAnimation() {
            // LOCAL VARIABLE - only exists in this function
            const animations = ['flip', 'bounce', 'pulse'];
            const randomNum = Math.floor(Math.random() * animations.length);
            
            return animations[randomNum];
        }

        /**
         * FUNCTION 2: Count total clicks
         * Shows: Parameters, global scope modification
         * @param {number} cardIndex - Which card was clicked
         * @returns {number} Total clicks so far
         */
        function countClick(cardIndex) {
            // Modifying GLOBAL variable
            totalClicks++;
            
            console.log("Card " + (cardIndex + 1) + " clicked. Total clicks: " + totalClicks);
            
            return totalClicks;
        }

        /**
         * FUNCTION 3: Create message based on click count
         * Shows: Parameters, conditional logic, return values
         * @param {number} clicks - Number of clicks
         * @returns {string} Message to display
         */
        function createMessage(clicks) {
            // LOCAL VARIABLE
            let message = "";
            
            if (clicks > 10) {
                message = "Wow! You've clicked " + clicks + " times!";
            } else if (clicks > 5) {
                message = "Nice! " + clicks + " clicks so far.";
            } else {
                message = "You clicked! Total: " + clicks;
            }
            
            return message;
        }

        /**
         * FUNCTION 4: Calculate delay for staggered animations
         * Shows: Parameters, math operations, return values
         * @param {number} index - Position in sequence
         * @returns {number} Delay in milliseconds
         */
        function calculateDelay(index) {
            // LOCAL CONSTANT
            const delayPerItem = 150;
            return index * delayPerItem;
        }

        /**
         * Handle card click - triggers CSS animations via JS
         * Shows: Using functions together, DOM manipulation
         * @param {HTMLElement} card - The card that was clicked
         * @param {number} index - Card number (0-3)
         */
        function handleCardClick(card, index) {
            // Use our counting function
            const clicks = countClick(index);
            
            // Get a random animation using our function
            const animClass = getRandomAnimation();
            
            // Add the CSS class to trigger animation
            card.classList.add(animClass);
            
            // Remove the class after animation finishes
            setTimeout(function() {
                card.classList.remove(animClass);
            }, 600);
            
            // Create and show a message
            const message = createMessage(clicks);
            showModal("Card Clicked!", message);
        }

        /**
         * Animate all cards with the same animation
         * Shows: Loops, timing, DOM manipulation
         * @param {string} animationType - Type of animation (flip/bounce/pulse)
         */
        function animateAllCards(animationType) {
            const cards = document.querySelectorAll('.card');
            
            // Loop through each card
            for (let i = 0; i < cards.length; i++) {
                // Calculate delay for this card
                const delay = calculateDelay(i);
                
                // Add animation after delay
                setTimeout(function() {
                    cards[i].classList.add(animationType);
                    
                    // Remove animation class after it finishes
                    setTimeout(function() {
                        cards[i].classList.remove(animationType);
                    }, 600);
                }, delay);
            }
        }

        /**
         * Show the loading spinner
         * Shows: CSS class manipulation for animations
         */
        function showLoadingAnimation() {
            const spinner = document.getElementById('spinner');
            
            // Add class to show and animate spinner
            spinner.classList.add('active');
            
            // Hide after 2 seconds
            setTimeout(function() {
                spinner.classList.remove('active');
            }, 2000);
        }

        /**
         * Show modal popup with a message
         * Shows: DOM manipulation, CSS animation triggers
         * @param {string} title - Modal title
         * @param {string} text - Modal message
         */
        function showModal(title, text) {
            const modal = document.getElementById('modal');
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalText').textContent = text;
            
            // Add 'show' class to trigger CSS fade-in
            modal.classList.add('show');
        }

        /**
         * Close the modal popup
         * Shows: Removing CSS classes to reverse animations
         */
        function closeModal() {
            const modal = document.getElementById('modal');
            modal.classList.remove('show');
        }

        // Click outside modal to close it
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        }