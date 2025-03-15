// Intro Dots Animation
const dotsContainer = document.querySelector('.dots-container');
for (let i = 0; i < 100; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.top = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${Math.random() * 3 + 2}s`;
  dotsContainer.appendChild(dot);
}

// Loading Animation
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
});

// Cursor Tracking
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

// Tap-to-Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Easter Egg Popup on Page Load
const showEasterEggPopup = async () => {
  try {
    const { latitude, longitude } = await getUserLocation();
    const location = await fetchLocationData(latitude, longitude);
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    let message = '';

    if (location.toLowerCase().includes('india')) {
      if (month === 3 && day >= 7 && day <= 14) {
        message = '🎉 Happy Holi! 🎉';
      } else if (month === 10 && day === 2) {
        message = '🇮🇳 Happy Gandhi Jayanti! 🇮🇳';
      }
    } else if (location.toLowerCase().includes('united states')) {
      if (month === 10 && day === 31) {
        message = '🎃 Happy Halloween! 🎃';
      } else if (month === 12 && day === 25) {
        message = '🎄 Merry Christmas! 🎄';
      }
    } else if (month === 1 && day === 1) {
      message = '🎉 Happy New Year! 🎉';
    }

    if (message) {
      const popup = document.createElement('div');
      popup.className = 'easter-egg-popup';
      popup.innerHTML = `
        <p>${message}</p>
        <button id="closePopup">Close</button>
      `;
      document.body.appendChild(popup);

      const closePopupBtn = document.getElementById('closePopup');
      closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    }
  } catch (error) {
    console.error('Error showing Easter Egg popup:', error);
  }
};

window.addEventListener('load', showEasterEggPopup);

// Smooth Scroll for Sections with Animation
const sections = document.querySelectorAll('section');
let currentSection = 0;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY > 0 && currentSection < sections.length - 1) {
    currentSection++;
  } else if (e.deltaY < 0 && currentSection > 0) {
    currentSection--;
  }
  sections[currentSection].scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Projects Section - Show More Projects and Show Less Button
const moreProjectsBtn = document.querySelector('.more-projects');
const projectsGrid = document.querySelector('.projects-grid');
const hiddenProjects = [
  {
    title: 'Project 7',
    description: 'Description of Project 7.',
    image: 'Images/Projets-images/project1',
  },
  {
    title: 'Project 8',
    description: 'Description of Project 8.',
    image: 'Images/Projets-images/project1',
  },
  {
    title: 'Project 9',
    description: 'Description of Project 9.',
    image: 'Images/Projets-images/project1',
  },
];

const showMoreProjects = () => {
  hiddenProjects.forEach((project) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="#" class="view-project">View Project</a>
    `;
    projectsGrid.appendChild(projectCard);
  });

  moreProjectsBtn.textContent = 'Show Less';
  moreProjectsBtn.removeEventListener('click', showMoreProjects);
  moreProjectsBtn.addEventListener('click', showLessProjects);
};

const showLessProjects = () => {
  for (let i = 0; i < hiddenProjects.length; i++) {
    projectsGrid.removeChild(projectsGrid.lastElementChild);
  }

  moreProjectsBtn.textContent = 'More Projects';
  moreProjectsBtn.removeEventListener('click', showLessProjects);
  moreProjectsBtn.addEventListener('click', showMoreProjects);
};

moreProjectsBtn.addEventListener('click', showMoreProjects);

// Resume Download Button
const resumeBtn = document.querySelector('.resume-btn');
resumeBtn.addEventListener('click', () => {
  window.open('Assets/Images/resume.pdf', '_blank');
});

// Helper Functions
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const fetchLocationData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    const data = await response.json();
    return data.countryName || data.city || 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location data:', error);
    return 'Unknown Location';
  }
};