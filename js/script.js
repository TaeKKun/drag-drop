const drag_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault",
  "Bill Gates",
  "Larry Ellison",
  "Larry Page",
  "Mark Zuckerberg",
  "Sergey Brin",
  "Steve Ballmer",
  "Warren Buffet",
];

// store list items
const listItems = [];

let dragStartIndex;

// insert list items into DOM
const createList = () => {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      // listItem.classList.add('');
      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
            </div>
        `;

      listItems.push(listItem);

      drag_list.appendChild(listItem);
    });

  addEventListener();
};

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'dragdrop');
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      // listItem.classList.remove('wrong');
      listItem.classList.add("right");
    }
  });
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add("over");
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove("over");
}

function addEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);

createList();
