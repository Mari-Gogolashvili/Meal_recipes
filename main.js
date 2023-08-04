const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

function dragStart(e) {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

function dragging(e) {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}

function dragStop() {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragging) return;
  isDragging = false;

  autoSlide();
}

function autoSlide() {
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth) return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft += positionDiff / 3 ? valDifference : -positionDiff);
  }
  carousel.scrollLeft -= positionDiff / 3 ? valDifference : -positionDiff;
}

function showHideIcons() {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // მაქსიმალური სიგანე
  if (carousel.scrollLeft == 0) {
    arrowIcons[0].style.display = "none";
  } else {
    arrowIcons[0].style.display = "block";
  }

  if (carousel.scrollLeft == scrollWidth) {
    arrowIcons[1].style.display = "none";
  } else {
    arrowIcons[1].style.display = "block";
  }
}

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    if (icon.id === "left") {
      carousel.scrollLeft = carousel.scrollLeft - firstImgWidth;
    } else {
      carousel.scrollLeft = carousel.scrollLeft + firstImgWidth;
    }
    setTimeout(() => showHideIcons(), 20);
  });
});


