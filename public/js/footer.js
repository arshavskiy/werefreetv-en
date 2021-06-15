const popUp_cookie_name = 'wearefreetv_accepted';
const popUp = document.querySelector('#mailFormPopUp');
const popUpBtn = document.querySelector(".mailFormPopUp_header h4");

const cookies = document.cookie.split(';');
const popUp_cookie = cookies.filter(function (item) {
    return item.indexOf(popUp_cookie_name) !== -1;
});

function closePopUpEmail() {
    if (popUp) popUp.style.display = 'none';
    document.cookie = popUp_cookie_name + '=true;max-age=144000';
}

if (popUp_cookie.length === 0) {

    popUp.style.display = "block";

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//forms.aweber.com/form/34/1679204634.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "aweber-wjs-ux2mk7xrx"));

    popUpBtn.addEventListener('click', closePopUpEmail);

}