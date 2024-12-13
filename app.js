const speakers = document.querySelectorAll('#canvas main .speakers ul li button');

const modals = document.querySelectorAll('#canvas main .description');

const closeButtons = document.querySelectorAll('#canvas main .description img');


speakers.forEach((speaker, index) => {  


  speaker.addEventListener("click", () => {
    
    for(let i = 0; i < 4; i++){
   
  if(i === index){
  modals[i].classList.toggle('showModal');
  modals[i].style.top = speaker.offsetTop + 'px';
  modals[i].style.left = (speaker.offsetLeft - 70) + 'px';
  modals[i].style.bottom = speaker.offsetBottom + 'px';
  modals[i].style.right = speaker.offsetRight + 'px';

  closeButtons[i].addEventListener("click", () => {
    modals[i].classList.remove('showModal');
  });
  
    
  }else{
  modals[i].classList.remove('showModal');
   }
   
  }
    
});
  
});

