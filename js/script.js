// ========================================
// DOSYA: js/script.js (WITH FLOATING CHAT WIDGET)
// ========================================

// AOS (Animate On Scroll) Initialization
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
    });
}

// ========================================
// FLOATING CHAT WIDGET (SHINEY.AI STYLE)
// ========================================

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatWidget);
    } else {
        initChatWidget();
    }

    function initChatWidget() {
        // Inject CSS
        injectCSS();
        
        // Inject HTML
        injectHTML();
        
        // Attach Event Listeners
        attachEventListeners();
    }

    function injectCSS() {
        const style = document.createElement('style');
        style.id = 'chatWidgetStyles';
        style.textContent = `
            /* Chat Widget Container */
            #chatWidgetContainer {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }

            @media (max-width: 768px) {
                #chatWidgetContainer {
                    bottom: 15px;
                    right: 15px;
                }
            }

            /* Chat Button */
            #chatButton {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 24px rgba(139, 92, 246, 0.6);
                transition: all 0.3s ease;
                animation: chatPulse 2s infinite;
                position: relative;
            }

            #chatButton::before {
                content: '';
                position: absolute;
                inset: -4px;
                border-radius: 50%;
                background: linear-gradient(135deg, #A78BFA, #06B6D4);
                filter: blur(8px);
                opacity: 0.7;
                z-index: -1;
                animation: chatRotate 3s linear infinite;
            }

            #chatButton:hover {
                transform: scale(1.1) translateY(-5px);
                box-shadow: 0 8px 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(6, 182, 212, 0.6);
            }

            #chatButton svg {
                width: 28px;
                height: 28px;
                color: white;
            }

            @keyframes chatPulse {
                0%, 100% {
                    box-shadow: 0 4px 24px rgba(139, 92, 246, 0.6);
                }
                50% {
                    box-shadow: 0 4px 24px rgba(139, 92, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.4);
                }
            }

            @keyframes chatRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            /* Chat Window */
            #chatWindow {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 40px);
                height: 500px;
                background: rgba(26, 27, 46, 0.95);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(139, 92, 246, 0.3);
                display: none;
                flex-direction: column;
                overflow: hidden;
                animation: chatSlideUp 0.3s ease-out;
            }

            #chatWindow.show {
                display: flex;
            }

            @media (max-width: 768px) {
                #chatWindow {
                    width: calc(100vw - 30px);
                    height: 450px;
                }
            }

            @keyframes chatSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Chat Header */
            #chatHeader {
                padding: 20px;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
                border-bottom: 1px solid rgba(139, 92, 246, 0.2);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            #chatHeaderLeft {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            #chatAvatar {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
            }

            #chatAvatar svg {
                width: 24px;
                height: 24px;
                color: white;
            }

            #chatInfo h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                background: linear-gradient(135deg, #A78BFA 0%, #06B6D4 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            #chatStatus {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-top: 4px;
            }

            #chatStatusDot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10B981;
                animation: chatBlink 2s infinite;
            }

            @keyframes chatBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            #chatStatusText {
                font-size: 12px;
                color: #10B981;
            }

            #chatCloseBtn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(139, 92, 246, 0.1);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            #chatCloseBtn:hover {
                background: rgba(139, 92, 246, 0.3);
                transform: rotate(90deg);
            }

            #chatCloseBtn svg {
                width: 16px;
                height: 16px;
                color: #A78BFA;
            }

            /* Chat Body */
            #chatBody {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            /* Scrollbar Styling */
            #chatBody::-webkit-scrollbar {
                width: 6px;
            }

            #chatBody::-webkit-scrollbar-track {
                background: rgba(139, 92, 246, 0.05);
                border-radius: 10px;
            }

            #chatBody::-webkit-scrollbar-thumb {
                background: rgba(139, 92, 246, 0.3);
                border-radius: 10px;
            }

            #chatBody::-webkit-scrollbar-thumb:hover {
                background: rgba(139, 92, 246, 0.5);
            }

            /* Bot Message */
            .bot-message {
                align-self: flex-start;
                max-width: 85%;
                background: rgba(139, 92, 246, 0.1);
                border: 1px solid rgba(139, 92, 246, 0.2);
                padding: 14px 18px;
                border-radius: 18px 18px 18px 4px;
                color: #E5E7EB;
                font-size: 15px;
                line-height: 1.5;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
                animation: messageSlide 0.3s ease-out;
            }

            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            /* Chat Options */
            #chatOptions {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 8px;
            }

            .chat-option-btn {
                background: rgba(139, 92, 246, 0.15);
                border: 1px solid rgba(139, 92, 246, 0.3);
                color: #A78BFA;
                padding: 14px 20px;
                border-radius: 12px;
                cursor: pointer;
                font-size: 15px;
                font-weight: 600;
                text-align: left;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .chat-option-btn:hover {
                background: rgba(139, 92, 246, 0.3);
                border-color: rgba(139, 92, 246, 0.5);
                transform: translateX(5px);
                box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
            }

            .chat-option-btn svg {
                width: 20px;
                height: 20px;
                flex-shrink: 0;
            }

            /* Powered By */
            #chatFooter {
                padding: 12px 20px;
                border-top: 1px solid rgba(139, 92, 246, 0.1);
                text-align: center;
                font-size: 11px;
                color: #9CA3AF;
            }

            #chatFooter span {
                background: linear-gradient(135deg, #A78BFA 0%, #06B6D4 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    function injectHTML() {
        const container = document.createElement('div');
        container.id = 'chatWidgetContainer';
        container.innerHTML = `
            <!-- Chat Button -->
            <button id="chatButton" aria-label="Chat ile Konuş">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
            </button>

            <!-- Chat Window -->
            <div id="chatWindow">
                <!-- Header -->
                <div id="chatHeader">
                    <div id="chatHeaderLeft">
                        <div id="chatAvatar">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div id="chatInfo">
                            <h3>AI Asistanı</h3>
                            <div id="chatStatus">
                                <span id="chatStatusDot"></span>
                                <span id="chatStatusText">Online</span>
                            </div>
                        </div>
                    </div>
                    <button id="chatCloseBtn" aria-label="Kapat">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <div id="chatBody">
                    <div class="bot-message">
                        👋 Merhaba! İşletmenizi otomatize etmeye hazır mısınız? Size nasıl yardımcı olabilirim?
                    </div>
                    <div id="chatOptions">
                        <button class="chat-option-btn" data-action="services">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Hizmetlerimiz Neler?
                        </button>
                        <button class="chat-option-btn" data-action="whatsapp">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            WhatsApp'tan Yaz
                        </button>
                    </div>
                </div>

                <!-- Footer -->
                <div id="chatFooter">
                    Powered by <span>BotMatik AI</span>
                </div>
            </div>
        `;
        document.body.appendChild(container);
    }

    function attachEventListeners() {
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const chatCloseBtn = document.getElementById('chatCloseBtn');
        const optionButtons = document.querySelectorAll('.chat-option-btn');

        // Toggle Chat Window
        chatButton.addEventListener('click', function() {
            chatWindow.classList.toggle('show');
        });

        // Close Chat Window
        chatCloseBtn.addEventListener('click', function() {
            chatWindow.classList.remove('show');
        });

        // Handle Option Buttons
        optionButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                if (action === 'services') {
                    window.location.href = 'hizmetler.html';
                } else if (action === 'whatsapp') {
                    // WhatsApp numaranızı buraya yazın (örnek: 905551234567)
                    window.open('https://wa.me/905551234567?text=Merhaba%2C%20BotMatik%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.', '_blank');
                }
            });
        });

        // Close chat when clicking outside
        document.addEventListener('click', function(event) {
            if (!chatButton.contains(event.target) && 
                !chatWindow.contains(event.target) && 
                chatWindow.classList.contains('show')) {
                chatWindow.classList.remove('show');
            }
        });
    }

})();
