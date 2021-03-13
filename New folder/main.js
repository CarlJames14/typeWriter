const typeWriter = function(txtElement, word, wait = 3000) {
    this.txtElement = txtElement;
    this.word= word;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//type method
typeWriter.prototype.type = function() {
    const currentIndex = this.wordIndex % this.word.length;
    const fullTxt = this.word[currentIndex ];
    
    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    if(!this.isDeleting && this.txt == fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500
    }

    setTimeout(() => this.type(), typeSpeed);
}



//init DOM
document.addEventListener('DOMContentLoaded', init);

//init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const word = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new typeWriter(txtElement, word, wait)
}
