document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent || target.innerText;

          if(target.className === "list-item" || target.className === "list-item-text" || target.className === "list-title"){
			let oldMsg = target.childNodes[0].textContent;

			var newText = window.prompt("Enter your new text: ");	

			if(newText !== null && newText.length !== 0)
				target.childNodes[0].textContent = newText;
			else
				target.childNodes[0].textContent = oldMsg;
          }
}, false);

	let list_items;
	let lists;

function refreshLists(){
	list_items = document.querySelectorAll('.list-item');
	lists = document.querySelectorAll('.list');
}

refreshLists();

let draggedItem = null;

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	addListItemListeners(item);

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];
		addListeners(list);
	}

	var listsDiv = document.getElementById("lists");

	function addNewList(){
		let newDiv = document.createElement("div");
		let newTitleDiv = document.createElement("div");
		let newTitleText = document.createElement("div");
		let newListDltBtn = document.createElement("button");

		newListDltBtn.className = "list-delete-button";
		newListDltBtn.onclick = function(){removeNewList(newListDltBtn)};
		

		var title = window.prompt("Enter your Title: ");	

		if(title !== null && title.length !== 0)
			newTitleText.textContent = title;
		else
			newTitleText.textContent = "Title";

		newTitleText.className = "list-item-text";

		newTitleDiv.appendChild(newTitleText);
		newTitleDiv.appendChild(newListDltBtn);

		newDiv.appendChild(newTitleDiv);
		newDiv.className = "list";
		newTitleDiv.className = "list-title";	

		addListeners(newDiv);
		listsDiv.appendChild(newDiv);
		
		refreshLists();
	}

	function addNewListItem(){
		let newLisItem = document.createElement("div");
		let newListText = document.createElement("div");
		let newLisItemDltBtn = document.createElement("button");

		newLisItem.className = "list-item";
		newLisItem.draggable = "true";
		
		
		newLisItem.appendChild(newListText);
		newListText.className = "list-item-text";
		newListText.textContent = "Deneme Text";

		newLisItem.appendChild(newLisItemDltBtn);

		//newLisItemDltBtn.textContent = "Delete";
		newLisItemDltBtn.className = "list-item-delete-button";
		newLisItemDltBtn.onclick = function(){removeListItem(newLisItemDltBtn)};

		addListItemListeners(newLisItem);
		document.getElementById("first-list").appendChild(newLisItem);
		refreshLists();
	}

	function removeNewList(button){
		/*if(lists.length > 1)
			listsDiv.removeChild(listsDiv.lastChild);

		refreshLists();*/
		var dltedDiv = button.parentNode.parentNode;
		console.log(dltedDiv);
		dltedDiv.parentNode.removeChild(dltedDiv);
	}

	function removeListItem(button){
		var dltedDiv = button.parentNode;
		dltedDiv.parentNode.removeChild(dltedDiv);
	}

	function addListeners(newDiv){
		newDiv.addEventListener('dragover', function (e) {
			e.preventDefault();
		});

		newDiv.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});

		newDiv.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});

		newDiv.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}

	function addListItemListeners(item){
		item.addEventListener('dragstart', function () {
			draggedItem = item;
			setTimeout(function () {
				item.style.display = 'none';
			}, 0)
		});
	
		item.addEventListener('dragend', function () {
			setTimeout(function () {
				draggedItem.style.display = 'flex';
				draggedItem = null;
			}, 0);
		})
	}
}
