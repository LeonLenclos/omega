let params = new URLSearchParams(document.location.search);

let nString = params.get("n");
let n;
if (nString == 'omega') n = Infinity;
else {
  n = parseInt(nString, 10);
  if(isNaN(n)){n = 0};
}

let ITEMS_BY_PAGE;
let page = 0;

let notation = params.get("notation");
let otherNotation;
if(notation=='set'){
  otherNotation='int'
  ITEMS_BY_PAGE = 5;
  document.body.className = 'set-notation';
}
else {
  notation = 'int'
  otherNotation='set'
  ITEMS_BY_PAGE = 100;
  document.body.className = 'int-notation';
}

document.getElementById('change-notation').href="?n="+nString+"&notation="+otherNotation;







let header = document.getElementById('header');
if(n==Infinity) header.innerHTML = 'ω';
else header.innerHTML = n;

function createListItem(n) {
  let list = document.getElementById('list');
  let item = document.createElement('li');
  let anchor = document.createElement('a');

  if(notation=='set')  anchor.innerHTML = writeSetNotation(n);
  else anchor.innerHTML = n;

  anchor.href = "?n="+n+"&notation="+notation;
  item.id = n;
  item.appendChild(anchor);
  list.appendChild(item);
}


function writeSetNotation(n){
  let s = '{';
  for (let i=0; i<n; i++){
      s+=writeSetNotation(i);
      if(i<n-1) s+= ',';
  }
  s+='}'
  return s;
}

function createListItemFromTo(from, to) {
  for(let n=from; n<to; n++){
    createListItem(n);  
  }
}

function createShowMore(p){
  let showmore = document.createElement('li');
  let anchor = document.createElement('a');
  showmore.id = "showmore";
  anchor.href = "#"+(p)*ITEMS_BY_PAGE;
  anchor.innerHTML = "...";
  showmore.onclick = ()=>{
    page = p;
    updateList();
  };
  showmore.appendChild(anchor);
    let list = document.getElementById('list');
  list.appendChild(showmore);
}

function updateList(){
  let from = ITEMS_BY_PAGE * page;
  let to = ITEMS_BY_PAGE * (page + 1);
  if (to >= n) to = n;

  createListItemFromTo(from, to);
  
  let showmore = document.getElementById('showmore');
  if (showmore) showmore.remove();
  if (to < n) 
  {
    createShowMore(page+1);
  }
}

updateList();


