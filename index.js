var selected = "none";

function Overlay(id) {
    console.log(selected);

    if (document.getElementById(selected) != null) {
        var element = document.getElementById(selected);
        element.classList.remove("imageClicked");
        document.getElementById("text" + selected.slice(-1)).style.color = "rgba(0, 0, 0, 0)";
    }

    if (selected == id) {
        selected = "none";
        return;
    }

    selected = id;
    var element = document.getElementById(id);
    element.classList.add("imageClicked");
    console.log("text" + id.slice(-1));
    document.getElementById("text" + id.slice(-1)).style.color = "rgba(255, 255, 255, 255)";

}