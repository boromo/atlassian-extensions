function dragElement(element) {
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;
    function elementDrag(e) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = "".concat(element.offsetTop - pos2, "px");
        element.style.left = "".concat(element.offsetLeft - pos1, "px");
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    function dragMouseDown(e) {
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
function handleParticipantClick(allParticipants, selectedParticipant) {
    allParticipants.forEach(function (participant) {
        if (participant.classList.contains('ghx-active')) {
            participant.click();
        }
    });
    selectedParticipant.click();
}
var list = document.createElement('div');
list.setAttribute('style', 'display:block;position:absolute;cursor:move;background:#0052aa;color:white;padding:30px;-webkit-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.75);z-index:9999;left:10px;top:350px; list-style: none;');
var logo = document.createElement('img');
logo.setAttribute('src', '/secure/projectavatar?pid=12744&avatarId=14246');
logo.setAttribute('style', 'background: white;padding: 3px 3px;margin-bottom: 12px;width: 30px;margin-left: 18px;');
list.appendChild(logo);
var closeBtn = document.createElement('div');
closeBtn.setAttribute('style', 'transform:translateY(-50%);z-index:1;width: 20px;height:20px;cursor:pointer;position:absolute; top:25px; right:10px;');
var closeFirst = document.createElement('span');
closeFirst.setAttribute('style', 'position:absolute;width:80%;height:3px;left:10%;top:45%;background-color: white;transform:rotate(45deg);');
var closeLast = document.createElement('span');
closeLast.setAttribute('style', 'position:absolute;width:80%;height:3px;left:10%;top:45%;background-color: white;transform:rotate(-45deg);');
closeBtn.appendChild(closeFirst);
closeBtn.appendChild(closeLast);
list.appendChild(closeBtn);
var queryParticipants = Array.from(document.querySelectorAll('dd a[title*="assignee = "]'));
var staticParticipants = [
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
console.log('query', queryParticipants);
var participants = (queryParticipants.length ? queryParticipants : staticParticipants)
    .slice()
    .sort(function () { return Math.random() - 0.5; })
    .forEach(function (participant) {
    var li = document.createElement('li');
    if (typeof participant === 'string') {
        li.innerHTML = participant;
    }
    else {
        var participantAnchor = document.createElement('a');
        participantAnchor.setAttribute('style', 'color: white');
        participantAnchor.addEventListener('click', function (e) {
            handleParticipantClick(queryParticipants, participant);
        });
        participantAnchor.innerHTML = participant.innerHTML;
        li.appendChild(participantAnchor);
    }
    list.appendChild(li);
});
closeBtn.addEventListener('click', function () {
    document.body.removeChild(list);
});
document.body.appendChild(list), dragElement(list);
//# sourceMappingURL=index.js.map