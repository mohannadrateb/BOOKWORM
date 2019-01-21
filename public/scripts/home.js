$(document).ready(function(){



//when clicking on the login button
$('#login').click(function(){
 
$('#registerform').fadeOut();
$('#loginform').show();

$('html,body').animate({

    scrollTop:$("#loginform").offset().top
    

},1000)

console.log($("#loginform").offset().top)

})


//when clicking on the register button

$('#register').click(function(){
    $("#loginform").fadeOut("");
    $('#registerform').css('display','block');
    
    
    
    $('html,body').animate({
    
        scrollTop:$("#registerform").offset().top
        
    
    },1000)
    
    console.log($("#registerform").offset().top)
    
    })

    $('#registerlogin').click(function(){
        $("#loginform").fadeOut("fast");
        $('#registerform').fadeIn("fast")
        
        
        
        $('html,body').animate({
        
            scrollTop:$("#registerform").offset().top
            
        
        },1000)
        
        console.log($("#registerform").offset().top)
        
        })







        //when clicking on the login after entering the credentials
        $('#logging-in').click(()=>{
            $.ajax({
                type: "POST",
                url: "/api/auth/login",
                data:{ email:$('#email-login').val(),password:$('#password-login').val()},
                
                
              }).done(data=>{
                window.location.replace('/api/user/profile/'+data._id);
              })

            })

              $('#regist').click(()=>{
                console.log(
                    $("email-registration").val()
                )
                $.ajax({
                    type: "POST",
                    url: "/api/register/firsttime",
                    data:{ firstName:$('#firstname-registration').val(),
                    lastName:$('#lastname-registration').val(),
                    email:$("#email-registration").val(),
                    password:$('#password-registration').val(),
                    bookGenre:$('#bookgenre-registration').val()
                    
                },
                  }).done((data)=>{
                    console.log("this is home");
                      console.log(data);
                    window.location.replace('/api/user/profile/'+data._id);
                          
                      
                  })      


       


        })


        




        
})



