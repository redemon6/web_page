function g(x) {
    document.getElementById(`country${x}`).style.display = 'block';
    for (i = 1; i <= 8; i++) {
        if (i === x) {
            continue
        }
        document.getElementById(`country${i}`).style.display = 'none';
    }

}
function menu() {
    x = document.getElementById('container').style.display;
    if (x === 'none') {
        document.getElementById('container').style.display = 'block';
    }
    else {
        document.getElementById('container').style.display = 'none'
    }
}