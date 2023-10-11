const addMovieModal=document.getElementById('add-modal');
//const addMovieModal=document.queryselector('#add-modal');
//const addMovieModal=document.body.children[1];

//console.log(addMovieModal);

const startAddMovieButton = document.querySelector('header button');
//const starAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop=document.getElementById('backdrop');
// const backdrop=document.firstElementChild;
const cancelAddMovieButton=addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = addMovieModal.querySelectorAll('input');
//const userInput = addMovieModal.getelementsByTagName('input');
const movies = [];
const entryTextSection = document.getElementById('entry-text');

const updateUI = () => {
    if(movies.length === 0){
        entryTextSection.style.display='block';
    }else{
        entryTextSection.style.display='none';
    }
};

const deleteMovieHandler = (movieId) => {
    const movieIndex=0;
    for(const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex,1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    //listRoot.removeChild(listRoot.children[movieIndex]);
};

const renderNewMovieelement = (id,title,imageUrl,rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML=`
    <div class="movie-element_image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element_info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);

};

const toggelBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    toggelBackdrop();
};

const clearMovieInput = () => {
    for(const usrInput of userInput){
        usrInput.value='';
    }
};

const cancelAddMovieHandler = () => {
    toggleMovieModal();
    clearMovieInput();
};

const addMovieHandler = () => {
    const titleValue=userInput[0].value;
    const imageUrlValue=userInput[1].value;
    const ratingValue=userInput[2].value;

    if(titleValue.trim()==='' || imageUrlValue.trim()==='' || ratingValue.trim()==='' || ratingValue<1 || ratingValue>5){
        alert('Please put a valid input between 1 to 5');
        return;
    }

    const newMovie = {
        id:Math.random().toString(),
        title:titleValue,
        image:imageUrlValue,
        rating:ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    toggleMovieModal();
    clearMovieInput();
    renderNewMovieelement(newMovie.id,newMovie.image,newMovie.image,newMovie.rating);
    updateUI();
};



const backdropClickHandler = () => {
    toggleMovieModal();
};



startAddMovieButton.addEventListener('click',toggleMovieModal);
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieButton.addEventListener('click',cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click',addMovieHandler);