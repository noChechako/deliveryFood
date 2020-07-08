let info=document.getElementById('order__food');
for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    info.innerHTML+=key + ' --- ' + localStorage.getItem(key)+' <br \/>';
  }