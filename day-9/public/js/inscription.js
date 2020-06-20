const tabs = document.querySelectorAll('.menu a');
for(let i = 0; i < tabs.length; i++){

tabs[i].addEventListener('click', function (e) {

const li = this.parentNode;
const div = this.parentNode.parentNode.parentNode;

if (li.classList.contains('active')) {
    return false
}


// la

div.querySelector('.menu .active').classList.remove('active');
    
li.classList.add('active');

div.querySelector('.contenu.active').classList.remove('active');

div.querySelector(this.getAttribute('href')).classList.add('active');

    });
}

// window.addEventListener("scroll", function (e){
	
// 	window.scrollTo(0, 0);
	
// }, false);
