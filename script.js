
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize Lucide icons
            lucide.createIcons();

            // --- Dynamic Greeting and Time ---
            const greetingEl = document.getElementById('greeting');
            const dateTimeEl = document.getElementById('current-date-time');
            const userName = "Alex"; // This could be fetched from a server

            function updateTime() {
                const now = new Date();
                const hour = now.getHours();
                let greetingText;

                if (hour < 12) {
                    greetingText = `Good Morning, ${userName}!`;
                } else if (hour < 18) {
                    greetingText = `Good Afternoon, ${userName}!`;
                } else {
                    greetingText = `Good Evening, ${userName}!`;
                }
                greetingEl.textContent = greetingText;

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                dateTimeEl.textContent = now.toLocaleDateString('en-US', options);
            }
            updateTime();
            setInterval(updateTime, 1000 * 60); // Update every minute

            // --- Announcement Banner ---
            const banner = document.getElementById('announcement-banner');
            const dismissBtn = document.getElementById('dismiss-banner');
            if (banner && dismissBtn) {
                dismissBtn.addEventListener('click', () => {
                    banner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    banner.style.opacity = '0';
                    banner.style.transform = 'scale(0.95)';
                    setTimeout(() => banner.remove(), 500);
                });
            }

            // --- Upcoming Events Data & Rendering ---
            const events = [
                { title: 'Project Phoenix Kick-off', time: '10:00 AM', type: 'meeting', color: 'blue' },
                { title: 'Yoga & Mindfulness Session', time: '12:30 PM', type: 'wellness', color: 'green' },
                { title: 'Q3 Design Review', time: '2:00 PM', type: 'review', color: 'purple' },
            ];
            const eventsContainer = document.getElementById('events-container');

            events.forEach(event => {
                const eventEl = document.createElement('div');
                eventEl.className = 'flex items-center gap-4';
                eventEl.innerHTML = `
                    <div class="w-12 h-12 rounded-lg bg-${event.color}-100 flex items-center justify-center flex-shrink-0">
                        <i data-lucide="${event.type === 'meeting' ? 'briefcase' : event.type === 'wellness' ? 'heart' : 'figma'}" class="w-6 h-6 text-${event.color}-600"></i>
                    </div>
                    <div class="flex-1">
                        <p class="font-semibold">${event.title}</p>
                        <p class="text-sm text-gray-500">${event.time}</p>
                    </div>
                    <button data-event-title="${event.title}" class="rsvp-btn bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">RSVP</button>
                `;
                eventsContainer.appendChild(eventEl);
            });
            lucide.createIcons(); // Re-run for dynamically added icons

            // --- RSVP Modal Logic ---
            const modal = document.getElementById('rsvp-modal');
            const modalContent = modal.querySelector('.transform');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const modalCancelBtn = document.getElementById('modal-cancel-btn');
            const modalTitle = document.getElementById('modal-title');
            const modalDetails = document.getElementById('modal-event-details');

            function openModal(title) {
                modalTitle.textContent = `RSVP for ${title}`;
                modalDetails.textContent = `You'll be added to the guest list for "${title}".`;
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modalContent.classList.remove('scale-95', 'opacity-0');
                }, 10);
            }

            function closeModal() {
                modalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                   modal.classList.add('hidden');
                }, 300);
            }

            document.querySelectorAll('.rsvp-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    openModal(e.currentTarget.dataset.eventTitle);
                });
            });

            closeModalBtn.addEventListener('click', closeModal);
            modalCancelBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // --- Team Spotlight Carousel ---
            const spotlightMembers = [
                { name: 'Priya Sharma', role: 'Lead Designer', achievement: 'Launched the new branding guide.', avatar: 'https://placehold.co/80x80/fb923c/FFFFFF?text=P' },
                { name: 'Rohan Mehta', role: 'Backend Engineer', achievement: 'Optimized database queries by 30%.', avatar: 'https://placehold.co/80x80/34d399/FFFFFF?text=R' },
                { name: 'Anjali Rao', role: 'Product Manager', achievement: 'Celebrates 3 years at Innovate Inc!', avatar: 'https://placehold.co/80x80/a78bfa/FFFFFF?text=A' }
            ];
            const carouselContainer = document.getElementById('team-spotlight-carousel');
            const dotsContainer = carouselContainer.nextElementSibling;
            let currentSlide = 0;

            function renderCarousel() {
                carouselContainer.innerHTML = '';
                dotsContainer.innerHTML = '';
                spotlightMembers.forEach((member, index) => {
                    const slide = document.createElement('div');
                    slide.className = 'w-full text-center transition-opacity duration-500 ease-in-out';
                    if (index !== currentSlide) {
                        slide.classList.add('hidden', 'opacity-0');
                    } else {
                         slide.classList.add('opacity-100');
                    }
                    slide.innerHTML = `
                        <img src="${member.avatar}" class="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg">
                        <h4 class="font-bold text-lg">${member.name}</h4>
                        <p class="text-sm text-gray-500">${member.role}</p>
                        <p class="mt-2 text-sm italic">"${member.achievement}"</p>
                        <button class="mt-3 bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600 transition-colors">Send Kudos</button>
                    `;
                    carouselContainer.appendChild(slide);

                    const dot = document.createElement('button');
                    dot.className = 'w-2.5 h-2.5 rounded-full transition-colors';
                    dot.dataset.index = index;
                    dot.className += (index === currentSlide) ? ' bg-blue-600' : ' bg-gray-300';
                    dotsContainer.appendChild(dot);
                });

                dotsContainer.querySelectorAll('button').forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        currentSlide = parseInt(e.currentTarget.dataset.index);
                        renderCarousel();
                    });
                });
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % spotlightMembers.length;
                renderCarousel();
            }

            renderCarousel();
            setInterval(nextSlide, 5000); // Auto-rotate every 5 seconds

            // --- Poll Widget ---
            const pollOptionsContainer = document.getElementById('poll-options');
            const pollResultsContainer = document.getElementById('poll-results');
            const pollButtons = pollOptionsContainer.querySelectorAll('button');
            
            const pollData = {
                whiteboard: { label: 'Whiteboard Session', votes: 18, color: 'blue' },
                virtual: { label: 'Virtual Tools', votes: 25, color: 'purple' },
                solo: { label: 'Solo Thinking', votes: 12, color: 'green' }
            };

            function showPollResults() {
                pollOptionsContainer.classList.add('hidden');
                pollResultsContainer.innerHTML = '';
                const totalVotes = Object.values(pollData).reduce((sum, item) => sum + item.votes, 0);

                for (const key in pollData) {
                    const item = pollData[key];
                    const percentage = totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;
                    const resultEl = document.createElement('div');
                    resultEl.innerHTML = `
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm font-medium">${item.label}</span>
                            <span class="text-sm font-bold text-gray-600">${percentage}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-${item.color}-500 h-2.5 rounded-full" style="width: ${percentage}%"></div>
                        </div>
                    `;
                    pollResultsContainer.appendChild(resultEl);
                }
                pollResultsContainer.classList.remove('hidden');
            }

            pollButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const option = button.dataset.option;
                    pollData[option].votes++;
                    showPollResults();
                });
            });

            // --- Digital Sticky Notes ---
            const addNoteBtn = document.getElementById('add-note-btn');
            const notesContainer = document.getElementById('sticky-notes-container');
            const noteColors = ['yellow-200', 'green-200', 'pink-200', 'blue-200', 'purple-200'];

            function createStickyNote() {
                const noteEl = document.createElement('div');
                const color = noteColors[Math.floor(Math.random() * noteColors.length)];
                noteEl.className = `sticky-note p-4 rounded-lg shadow-md h-40 flex flex-col justify-between bg-${color} fade-in`;
                
                noteEl.innerHTML = `
                    <textarea class="bg-transparent border-none focus:ring-0 w-full h-full resize-none text-sm text-gray-800 p-0" placeholder="Type something..."></textarea>
                    <button class="delete-note-btn self-end text-gray-500 hover:text-red-500 p-1">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                `;
                
                notesContainer.prepend(noteEl);
                lucide.createIcons(); // Re-run for new icon

                noteEl.querySelector('.delete-note-btn').addEventListener('click', () => {
                    noteEl.style.transition = 'opacity 0.3s, transform 0.3s';
                    noteEl.style.opacity = '0';
                    noteEl.style.transform = 'scale(0.8)';
                    setTimeout(() => noteEl.remove(), 300);
                });
            }

            addNoteBtn.addEventListener('click', createStickyNote);
            // Add a default note to start
            createStickyNote();


            // --- Who's Online Widget ---
            const onlineUsers = [
                { name: 'Sarah J.', avatar: 'https://placehold.co/32x32/f472b6/FFFFFF?text=S' },
                { name: 'Mike L.', avatar: 'https://placehold.co/32x32/60a5fa/FFFFFF?text=M' },
                { name: 'Chen W.', avatar: 'https://placehold.co/32x32/a78bfa/FFFFFF?text=C' },
                { name: 'Emily R.', avatar: 'https://placehold.co/32x32/34d399/FFFFFF?text=E' },
            ];
            const onlineUsersContainer = document.getElementById('online-users');
            onlineUsers.forEach(user => {
                const userEl = document.createElement('div');
                userEl.className = 'flex items-center gap-3';
                userEl.innerHTML = `
                    <div class="relative">
                        <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full">
                        <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </div>
                    <span class="font-medium text-sm text-gray-700">${user.name}</span>
                `;
                onlineUsersContainer.appendChild(userEl);
            });

            // --- Mascot Easter Egg ---
            const mascot = document.getElementById('mascot');
            const mascotMessages = [
                "Have a productive day!",
                "Stay curious!",
                "Remember to take a break!",
                "You're doing great!",
                "Innovate and inspire!"
            ];
            mascot.addEventListener('click', () => {
                const message = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
                const messageBox = document.createElement('div');
                messageBox.className = 'absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap fade-in';
                messageBox.textContent = message;
                document.body.appendChild(messageBox);
                setTimeout(() => {
                    messageBox.style.transition = 'opacity 0.5s';
                    messageBox.style.opacity = '0';
                    setTimeout(() => messageBox.remove(), 500);
                }, 2500);
            });
        });
    