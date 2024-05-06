document.addEventListener('DOMContentLoaded', function() {
    
    sliderInterval = startSlider();
});

let isPaused = false;

// Funzione per avviare lo slider
function startSlider() {
    const interval = setInterval(() => {
        if (!isPaused) {
            const previews = document.querySelectorAll('.content-preview');
            previews.forEach(preview => {
                const firstItem = preview.querySelector('.preview-item');
                const lastItem = preview.lastElementChild;
                preview.insertBefore(lastItem, firstItem);
                preview.style.transition = 'transform 0.5s ease-in-out';
                preview.style.transform = 'translateX(-20%)'; 
                setTimeout(() => {
                    preview.style.transition = 'none';
                    preview.style.transform = 'translateX(0)';
                }, 500); 
            });
        }
    }, 3000); 

    
    const previewItems = document.querySelectorAll('.preview-item');
    previewItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            isPaused = true; 
        });
        item.addEventListener('mouseout', () => {
            isPaused = false;
        });
    });

    return interval; 
}

document.addEventListener('DOMContentLoaded', async function() {
    
    async function getRandomMovieInfo() {
        const apiKey = 'd17db5b54a58299665c6692212882ee6'; 
        const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=it-IT`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Errore nel caricamento dei dati');
            }
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const randomMovie = data.results[randomIndex];
            if (randomMovie.poster_path) { 
                return {
                    title: randomMovie.title,
                    description: randomMovie.overview,
                    image: `https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`
                };
            } else {
                
                return await getRandomMovieInfo();
            }
        } catch (error) {
            console.error('Si è verificato un errore:', error.message);
            return null;
        }
    }

   
    const heroPreview = document.querySelector('.hero-preview');
    const previewImg = heroPreview.querySelector('img');
    const previewTitle = heroPreview.querySelector('h2');
    const previewDescription = heroPreview.querySelector('p');

    const randomMovie = await getRandomMovieInfo();
    if (randomMovie) {
        previewImg.src = randomMovie.image;
        previewImg.alt = randomMovie.title;
        previewTitle.textContent = randomMovie.title;
        previewDescription.textContent = randomMovie.description;
    } else {
        console.error('Impossibile ottenere informazioni sul film.');
    }
});
