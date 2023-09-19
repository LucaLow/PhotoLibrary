var selected = "none";

function Overlay(id) {

    if (document.getElementById(selected) != null) {
        var element = document.getElementById(selected);
        element.classList.remove("imageClicked");
        document.getElementById("text" + selected).style.color = "rgba(0, 0, 0, 0)";
    }

    if (selected == id) {
        selected = "none";
        return;
    }

    selected = id;
    var element = document.getElementById(id);
    element.classList.add("imageClicked");
    document.getElementById("text" + id).style.color = "rgba(255, 255, 255, 255)";
}

var maxPhotoCount;

var LoadedPhotos = 0;
var isLoading = false;
var LoadedAllPhotos = false;

async function initialize() {
    maxPhotoCount = await GetMaxPhotoCount();

    setInterval(async () => {
        if ((window.innerHeight*3 + window.pageYOffset) >= document.body.offsetHeight && !isLoading && !LoadedAllPhotos) {
            isLoading = true;

        for (tmp=LoadedPhotos+8; LoadedPhotos < tmp; LoadedPhotos++) {
            var imageUrl = "/getPhotos?PhotoCount=" + LoadedPhotos;
            var image = new Image();
            image.src = imageUrl;

            var html = [
                '<div class="cell">',
                '<input type="image" src="' + imageUrl + '" alt="1" class="image" id="' + LoadedPhotos + '" onclick="Overlay(this.id)">',
                '<div id="text' + LoadedPhotos + '" class="overlay-text">Your text here<button>Download</button></div>',
                '</div>',
            ].join("\n");

            if(!LoadedAllPhotos && LoadedPhotos < maxPhotoCount) {
                document.getElementById("container").innerHTML += html;
            } else {
                LoadedAllPhotos = true;
            }
        }
        isLoading = false;
    }
}, 50);
}

initialize();

async function GetMaxPhotoCount() {
    var response = await fetch("/getPhotoCount");
    var data = await response.json();
    return data;
}