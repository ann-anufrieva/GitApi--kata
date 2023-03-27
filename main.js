const app = document.getElementById('app');
const form = document.querySelector('.search');
const input = document.querySelector('.search-input');
const ul = document.querySelector('.search-list');
const savedBox = document.querySelector('.savedBox');

let arr =[];

const debounce = (fn, throttleTime) => {
  let time;
  return function (...args) {
      clearTimeout(time);
      time = setTimeout(() => {
        fn.apply(this, args);
      }, throttleTime);
  }
};

input.addEventListener('keyup',debounce(async (e) =>{  
  if(e.target.value.lenght == 0){
    let links = document.querySelectorAll('.autocomplite');    
    links.forEach(el => el.remove());
  } else {
    ul.innerHTML = '';
    fetch (`https://api.github.com/search/repositories?q=${e.target.value}&per_page=5`).then(response =>{
      if (response.ok){
        
        response.json().then((data)=>{
          let links = document.querySelectorAll('.autocomplite');
          
          links.forEach(el => el.remove());
          data.items.forEach((el) =>{

            let links = document.createElement('li');
            links.classList.add('autocomplite');
            
            links.addEventListener('click',(data) =>{
              const savedLi = document.createElement('div');
              savedLi.classList.add('save-link');
              savedBox.appendChild(savedLi);
              const savedLiText = document.createElement('li');
              const buttonClose = document.createElement('button');
              buttonClose.textContent = 'X';
              savedLi.appendChild(savedLiText);
              savedLi.appendChild(buttonClose);
              buttonClose.addEventListener('click',(el)=>savedLi.remove());
              savedLiText.textContent = 'Name:' + el.name + '\n' + 'Owner:' + el.owner.login +'\n' + 'Stars:' + el.stargazers_count;
            })


            links.textContent = el.name;
            ul.appendChild(links);
          })
          
        })
      }
    })
  }
}, 400))

let links = ul.querySelectorAll('.autocomplite');
