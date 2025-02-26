function reloadCSS() {
    let css = document.querySelector("link[rel='stylesheet']");
    let novoCSS = document.createElement("link");
    novoCSS.rel = "stylesheet";
    novoCSS.href = css.href.split("?")[0] + "?v=" + new Date().getTime();

    css.parentNode.replaceChild(novoCSS, css);
}

function dashboard() {
    console.log("");
}