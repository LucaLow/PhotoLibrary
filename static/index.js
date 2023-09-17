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

var LoadedPhotos = 0;
var isLoading = false;
var LoadedAllPhotos = false;
console.log(isLoading);
setInterval(async () => {
    if ((window.innerHeight*3 + window.pageYOffset) >= document.body.offsetHeight && !isLoading && !LoadedAllPhotos) {
        console.log("Loading more photos " + LoadedAllPhotos);
        isLoading = true;

        for (tmp=LoadedPhotos+8; LoadedPhotos < tmp; LoadedPhotos++) {
            var imageUrl = "/getPhotos?PhotoCount=" + LoadedPhotos;
            var image = new Image();
            image.src = imageUrl;

            var html = [
                '<div class="cell">',
                '<input type="image" src="' + imageUrl + '" alt="1" class="image" id="' + LoadedPhotos + '" onclick="Overlay(this.id)" onerror="LoadedAllPhotos=true; console.log(`html code`);">',
                '<div id="text' + LoadedPhotos + '" class="overlay-text">Your text here<button>Download</button></div>',
                '</div>',
            ].join("\n");

            if(!LoadedAllPhotos) {
                document.getElementById("container").innerHTML += html;
            }
        }
        isLoading = false;
    }
}, 50);

