
function fadeOut(link){
    document.getElementById("wrapper").style.animation = "fadeOut 1s";
    setTimeout(function()
    {
        document.getElementById("myForm").style.animation = "submerge ease-out 1s forwards";
        setTimeout(function()
        {
            window.location.href = link;
        }
        , 1000);
    }
    , 500);
}
