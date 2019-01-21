

$(document).ready(function(){

   




      

// when clicking on the post button
$('#post').click(function(){
    console.log("post clicked")
    $.ajax({
        type: "POST",
        url: "/api/user/post",
        data:{ 
            post:$('#post-text').val()
    },
      }).done((data)=>{
        
       console.log(data);
       
          





})






})
})