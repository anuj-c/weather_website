console.log('Client side javascript file is loaded');

const form = document.querySelector('form');
const search = document.querySelector('input');
form.addEventListener('submit',(e) => {
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?place='+location;
    const para = document.getElementById('result');
    para.style.color = 'blue'
    para.innerHTML = 'Loading...';
    para.style.padding = '5px';
    para.style.border = '2px black solid'

    // then is part of a bigger thing called promise api (we will learn later)
    // this is to fetch data from server and put it into console or anywhere we want
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                para.style.color = 'red';

                para.innerHTML = data.error;
            }else{
                para.style.color = 'rgb(0, 134, 0)';
                para.innerHTML = data.location+'<br><br>'+data.forecast;
            }
        })
    })
})