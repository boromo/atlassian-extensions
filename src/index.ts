function dragElement(element: HTMLElement) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  element.onmousedown = dragMouseDown;
}

const list = document.createElement('div');
list.setAttribute(
  'style',
  'display:block;position:absolute;cursor:move;background:#0052aa;color:white;padding:30px;-webkit-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);z-index:9999;left:10px;top:350px; list-style: none;'
);

const logo = document.createElement('img');
logo.setAttribute('src', '/secure/projectavatar?pid=12744&avatarId=14246');
logo.setAttribute('style', 'background: white;padding: 3px 3px;margin-bottom: 12px;width: 30px;margin-left: 18px;');

list.appendChild(logo);

const closeBtn = document.createElement('div');
closeBtn.setAttribute(
  'style',
  'transform:translateY(-50%);z-index:1;width: 20px;height:20px;cursor:pointer;position:absolute; top:25px; right:10px;'
);
const closeFirst = document.createElement('span');
closeFirst.setAttribute(
  'style',
  'position:absolute;width:80%;height:3px;left:10%;top:45%;background-color: white;transform:rotate(45deg);'
);
const closeLast = document.createElement('span');
closeLast.setAttribute(
  'style',
  'position:absolute;width:80%;height:3px;left:10%;top:45%;background-color: white;transform:rotate(-45deg);'
);

closeBtn.appendChild(closeFirst);
closeBtn.appendChild(closeLast);

list.appendChild(closeBtn);

const queryParticipants: Array<string> = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('#js-plan-quickfilters > dd a[title*="assignee = "]')
).map((m) => m.innerHTML);
const staticParticipants = [
  'Thomas',
  'Anne',
  'Ali',
  'Boris',
  'Martin',
  'Nilesh',
  'Tanya',
  'Pablo',
  'Christine',
  'Joao',
  'Fabio',
  'Lan',
  'Kriszta',
  'Milan',
  'Sarah',
];
const participants = (queryParticipants.length ? queryParticipants : staticParticipants)
  .slice()
  .sort(() => Math.random() - 0.5)
  .forEach((participant) => {
    const li = document.createElement('li');
    li.innerHTML = participant;
    list.appendChild(li);
  });

closeBtn.addEventListener('click', () => {
  document.body.removeChild(list);
});

document.body.appendChild(list), dragElement(list);
