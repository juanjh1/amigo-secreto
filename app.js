const amistades = document.getElementById("amigo");
const listaForUpgrade = document.getElementById("listaAmigos");
const winerContainer = document.getElementById("resultado");
const buttonComment = document.getElementById("button-message");
const aletContainer = document.getElementById("alert-container");
const inputContainer = document.getElementById("input-container")
const describeTitle = document.getElementById("describe-title")
let amigos = [];
let statusMap = new Map();
statusMap.set("ForPLay", 0)
statusMap.set("played", 1)
let currentStatus = 0


const addNewLi = (element) => {
	return `<li style="background-color: #4B69FD; color: white; justify-content: space-between;">
            <span style="padding-right: 48%;">${element}</span>
            <span style="color:#4B69FD ; cursor: pointer; background-color:white; font-size: 20px; border-radius: 2px; padding: 4px;" onclick="deleteFriend(this)">    x</span>
            </li>`
}

const toPascalcase = (string) => {
	return string.split("").map((c, i) => {
		return i == 0 ? c.toUpperCase() : c.toLowerCase()
	}).join("")
}


const normalizeString = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const CreateMessage = (message) => {
	return `
            <div class="alert alert-primary d-flex align-items-center" role="alert" style="height:max-content; margin: 0px;">
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"  viewBox="0 0 16 16" role="img" aria-label="Warning:" style="width: 20px;">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div style="width: 90%;">
                  ${message}
                </div>
                 <span style="color: brown;cursor: pointer; font-size: 25px; font-weight: bold;" onclick="cerrarNotificaion(this)">x</span> <!-- i can use this in this context????-->
            </div> `
}

const cerrarNotificaion = (element) => {
	element.parentElement.remove();

}


const deleteFriend = (friend) => {
	amigos = amigos.filter((f) => f.toLowerCase() != friend.parentElement.innerText.toLowerCase().split(" ")[0])
	friend.parentElement.remove();

}

document.getElementById('amigo').addEventListener('keypress', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		agregarAmigo()
	}
});

function agregarAmigo() {
	if (amistades.value.length == 0) {
		aletContainer.innerHTML += CreateMessage("El nombre no puede estar vacio");
	} else {
		if (/^[\p{Ll}\p{Lu}]+$/u.test(amistades.value)) {
			let itsUniq = true;
			amigos.forEach(element => {
				if (normalizeString(element) == normalizeString(amistades.value)) {
					itsUniq = false;
				}
			});
			if (itsUniq || amigos.length == 0) {
				amigos.push(toPascalcase(amistades.value));
				listaForUpgrade.innerHTML = "";
				amigos.forEach(element => {
					listaForUpgrade.innerHTML += addNewLi(element);
				});
			} else {
				aletContainer.innerHTML += CreateMessage("El nombre debe ser unico");
			}
		} else {
			aletContainer.innerHTML += CreateMessage("El Nombre solo puede contener caracteres");
		}
		amistades.value = "";
	}
}


const sortearAmigo = () => {


	if (currentStatus == statusMap.get("ForPLay")) {
		if (amigos.length >= 2) {
			listaForUpgrade.innerHTML = "";
			let randomNumber = Math.floor(Math.random() * amigos.length)
			winerContainer.innerHTML = `${amigos[randomNumber]}`;
			amigos = [];
			buttonComment.innerHTML = "Volver a empezar"
			inputContainer.style.display = "none"
			describeTitle.innerText = "🎉 Felicidades has sido elegido 🎉"
			currentStatus = 1;

		} else {
			aletContainer.innerHTML += CreateMessage("Necesitas mas de un amigo en la lista");
		}
	} else if (currentStatus == statusMap.get("played")) {
		winerContainer.innerHTML = "";
		inputContainer.style.display = "flex"
		buttonComment.innerHTML = "Sortear amigo";
		describeTitle.innerText = "Digite el nombre de sus amigos"
		currentStatus = 0;
	}


}