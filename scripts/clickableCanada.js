const canada = document.querySelectorAll('.canada');

const clickCanada = function(){
    alert('You clicked on Canada!');
}

canada.forEach(function(element) {
    element.addEventListener("click", clickCanada);
});