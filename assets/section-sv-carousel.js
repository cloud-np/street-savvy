const nextBtnEl = document.querySelector('.swiper-button-next span');
const prevBtnEl = document.querySelector('.swiper-button-prev span');

class Node {
  constructor(value) {
    this.prev = undefined;
    this.next = undefined;
    this.value = value;
  }

}

// All this was done more as an exercise we 
// do need this all complexity lol.
class List {
    constructor() {
        if(!List.instance) {
            this.head = undefined;
            this.tail = undefined;
            List.instance = this;
        }
        return List.instance;
    }

    addNodeByValue(value) {
        const newNode = new Node(value);
        if (this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            this.head = newNode;
            this.tail = newNode;
        }
        return newNode;
    }

    findNodeByValue(value) {
        let currNode = this.head;
        while(currNode !== undefined) {
            if (currNode.value === value) {
                return currNode;
            }
            currNode = currNode.next
        }
        return undefined;
    }

    getSlideIndexesFromValue(value) {
        const node = this.findNodeByValue(value);
        return {
            curr: node.value,
            prev: node.prev?.value || this.tail.value,
            next: node.next?.value || this.head.value 
        }
    }
}

function handleNextSlide() {
    const swiperEl = document.querySelector('.swiper');
    const { swiper } = swiperEl;
    swiper.slideNext();
    handleSlideChange();
}

function handlePrevSlide() {
    const swiperEl = document.querySelector('.swiper');
    const { swiper } = swiperEl;
    swiper.slidePrev();
    handleSlideChange();
}

let initializeList = false;

function handleSlideChange() {
    const swiperEl = document.querySelector('.swiper');
    const { swiper } = swiperEl;

    const activeSlideElement = swiper.wrapperEl.querySelector('.swiper-slide-active');
    const slideIdNumber = parseInt(activeSlideElement.id.match(/slide-(\d+)$/)[1]);

    // This should be runned once.
    if (!initializeList) {
        // We need min 3 slides for the iteration to work.
        for (let i = 0; i < swiper.slides.length; i++) {
            globalList.addNodeByValue(i + 1);
        }
        initializeList = true;
    }
    const indexes = globalList.getSlideIndexesFromValue(slideIdNumber);
    prevBtnEl.textContent = `0${indexes.prev}`;
    nextBtnEl.textContent = `0${indexes.next}`;
}

document.querySelector('.swiper-button-next').addEventListener('click', handleNextSlide);
document.querySelector('.swiper-button-prev').addEventListener('click', handlePrevSlide);

List.instance = null;
const globalList = new List();