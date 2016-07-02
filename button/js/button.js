$(function(){

    $(".switch").find("label").click(function(e){
        e.preventDefault();
    })
    $(".switch").click(function(){
        $(".switch").toggleClass("off")
    })
})