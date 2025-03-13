document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const chatbotHeader = document.getElementById('chatbot-header');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    let isChatbotOpen = false;

    // Add event listener to toggle the chatbot
    chatbotHeader.addEventListener('click', function() {
        isChatbotOpen = !isChatbotOpen;
        if (isChatbotOpen) {
            chatbot.classList.add('active'); // Show chatbot
        } else {
            chatbot.classList.remove('active'); // Hide chatbot
        }
    });

    // Function to append messages
    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    window.sendUserMessage = function() {
        const message = chatbotInput.value.trim();
        if (message) {
            appendMessage('User', message);
            chatbotInput.value = '';
            processMessage(message);
        }
    };

    window.sendPredefinedMessage = function(message) {
        appendMessage('User', message);
        processMessage(message);
    };

    chatbotInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendUserMessage();
        }
    });

    function processMessage(message) {
        let response = '';
        message = message.toLowerCase();

        if (message.includes('hello') || message.includes('hi')) {
            response = 'Hello! How can I assist you today?';
        } else if (message.includes('admission requirements')) {
            response = 'Admission requirements vary by program. Please check our official website or visit our admission page for detailed information. Would you like to go to the admission page? (yes/no)';
            setTimeout(function() {
                appendMessage('Bot', response);
            }, 500);
        } else if (message.includes('yes') && chatbotMessages.lastChild.textContent.includes('admission page')) {
            response = 'Redirecting you to the admission page...';
            setTimeout(function() {
                window.location.href = 'about.html'; // Replace with your actual admission page URL
            }, 1000);
        } else if (message.includes('courses offered')) {
            response = 'We offer a wide range of courses including Engineering, Management, and more. Visit our website for a complete list.';
        } else if (message.includes('placement record')) {
            response = 'Our placement record is excellent, with many students securing jobs in top companies. Specific placement statistics can be found on our placements page. Would you like to visit the placement page? (yes/no)';
            setTimeout(function() {
                appendMessage('Bot', response);
            }, 500);
        } else if (message.includes('yes') && chatbotMessages.lastChild.textContent.includes('placement page')) {
            response = 'Redirecting you to the placement page...';
            setTimeout(function() {
                window.location.href = 'placements.html'; // Replace with your actual placement page URL
            }, 1000);

        } else if (message.includes('contact administration')) {
            response = 'You can contact the administration by phone at [Phone Number] or by email at [Email Address]. Would you like to visit the contact page? (yes/no)';
              setTimeout(function() {
                appendMessage('Bot', response);
            }, 500);
        } else if (message.includes('yes') && chatbotMessages.lastChild.textContent.includes('contact page')) {
            response = 'Redirecting you to the contact page...';
            setTimeout(function() {
                window.location.href = 'address.html'; // Replace with your actual contact page URL
            }, 1000);

        } else if (message.includes('eamcet code')) {
            response = 'Our EAMCET code is [Your EAMCET Code].';
        } else {
            response = 'I am still learning. Could you please rephrase your question?';
        }
        setTimeout(function() {
            appendMessage('Bot', response);
        }, 500);
    }
});
