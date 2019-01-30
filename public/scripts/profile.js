



$(document).ready(function(){



    var  search=[]
  var items=  function(){ 
     
        $.ajax({
        type: "get",
        url: "/api/user/users"
        
      
    }).done((users)=>{
        console.log("byrga3 hena");
        $.each(users, function( key, value ) {
            console.log(value.firstName); 
        search.push( value.firstName );
          })
          console.log(search);

          search= search;
        })
        
    }
    items();

    
   
 var userid
console.log(userid);

// when clicking on the post button
    $('#post').click(function(){
        console.log("post clicked")
        $.ajax({
            type: "POST",
            url: "/api/user/post",
            data:{ 
                post:$('#post-text').val()
        },
        }).done(()=>{
            
            location.reload();
    })
    })


$('#logout').click(function(){
    console.log("Logout clicked")
    $.ajax({
        type: "get",
        url: "/api/user/logout",
      
    }).done((data)=>{
        console.log(data);
        
        window.location.replace('/');
})
})





$("#searchtext").autocomplete({
    source: search,
    minLength: 0
}).focus(function(){
    $(this).autocomplete("search");
});





$("#search").click(function(){

    console.log("search clicked")
    $.ajax({
      type:"post",
      url:"/api/user/search" ,
      data: { 
        firstName:$("#searchtext").val()
      },

    })
    .done((userid)=>{
       location.replace( "/api/user/" + userid)
       
            
    })


   
 


})



    

})
