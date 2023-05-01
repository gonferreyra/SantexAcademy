const hamburguerBtn = document.querySelector('.hamburguer__menu__container');
const menuItems = document.querySelector('.header__items__mobile');

function toggleIcon() {
  hamburguerBtn.classList.toggle('open');
  menuItems.classList.toggle('menu__open');
}

const carousel = document.querySelector('.carousel');
const firstImg = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

// Getting max scrollable width
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showHideIcons = () => {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? 'none' : 'block';
};

arrowIcons.forEach((icon) => {
  icon.addEventListener('click', () => {
    // Getting first img width & adding 14 margin value
    let firstImgWidth = firstImg.clientWidth + 14;
    //If we click icon left, reduce the width value from the carousel scroll left, else add to id
    carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60); // call function after 6 ms
  });
});

const autoSlide = () => {
  // If there's no image left to scroll, then return
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth) {
    return;
  }

  positionDiff = Math.abs(positionDiff); // Making positionDiff to positive
  let firstImgWidth = firstImg.clientWidth + 14;
  // Geting difference value that needs to add of reduce from carusel to make img center
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // scrolling left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
  // updating global variables
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) {
    return;
  }
  e.preventDefault();
  isDragging = true;
  carousel.classList.add('dragging');
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');

  if (!isDragging) {
    return;
  }
  isDragging = false;
  autoSlide();
};

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);
