const startButton = document.getElementById('startBtn');
const button = document.getElementById('mergeBtn');
const buttonText = document.getElementById('btnText');
const photoStage = document.querySelector('.photo-stage');
const mainPhoto = document.querySelector('.main-photo');
const titleText = document.getElementById('titleText');
const backPhotoButtons = document.querySelectorAll('.back-photo-button');
const previousPhotoButton = document.getElementById('previousPhoto');
const nextPhotoButton = document.getElementById('nextPhoto');
const gallery = [
	{ src: 'images/together.jpg', alt: '2 котека вместе' },
	{ src: 'images/photo1.jpg', alt: '2 котека вместе' },
	{ src: 'images/photo2.jpg', alt: '2 котека вместе' },
];
let currentPhotoIndex = 0;
let separationTimer;

function putMainPhoto(photo) {
	mainPhoto.src = photo.src;
	mainPhoto.alt = photo.alt;
}

function updateTitle(text) {
	titleText.textContent = text;
}

function updateGalleryPreview() {
	const leftIndex = (currentPhotoIndex - 1 + gallery.length) % gallery.length;
	const rightIndex = (currentPhotoIndex + 1) % gallery.length;
	const leftPhoto = backPhotoButtons[0].querySelector('img');
	const rightPhoto = backPhotoButtons[1].querySelector('img');

	leftPhoto.src = gallery[leftIndex].src;
	leftPhoto.alt = gallery[leftIndex].alt;
	rightPhoto.src = gallery[rightIndex].src;
	rightPhoto.alt = gallery[rightIndex].alt;
}

function showGalleryPhoto(direction) {
	currentPhotoIndex = (currentPhotoIndex + direction + gallery.length) % gallery.length;
	const selectedPhoto = gallery[currentPhotoIndex];

	mainPhoto.src = selectedPhoto.src;
	mainPhoto.alt = selectedPhoto.alt;
	updateTitle('2 котека вместе');
	updateGalleryPreview();
	photoStage.classList.remove('back-photo-selected', 'is-next', 'is-previous');
	void photoStage.offsetWidth;
	photoStage.classList.add(direction > 0 ? 'is-next' : 'is-previous', 'back-photo-selected');
}

function resetTogetherPhoto() {
	putMainPhoto({
		src: 'images/together.jpg',
		alt: '2 котека вместе',
	});
	currentPhotoIndex = 0;
	updateTitle('2 котека вместе');
	updateGalleryPreview();
}

startButton.addEventListener('click', () => {
	document.body.classList.add('started');
});

button.addEventListener('click', () => {
	const isTogether = document.body.classList.toggle('together');
	buttonText.textContent = isTogether ? 'разъединить' : 'соединить';

	if (isTogether) {
		resetTogetherPhoto();
	}

	if (!isTogether) {
		clearTimeout(separationTimer);
		document.body.classList.add('separating');
		separationTimer = setTimeout(() => {
			document.body.classList.remove('separating');
		}, 850);
	}
});

backPhotoButtons.forEach((photoButton) => {
	const photo = photoButton.querySelector('img');
	photo.addEventListener('error', () => {
		photo.src = 'images/together.jpg';
	});
});

previousPhotoButton.addEventListener('click', () => showGalleryPhoto(-1));
nextPhotoButton.addEventListener('click', () => showGalleryPhoto(1));

