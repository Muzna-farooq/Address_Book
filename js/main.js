$(document).ready(function(){
  var href = window.location.href;
  // console.log(window.location.href)
  var loginemail_1= localStorage.getItem('loggedinUser')
  // console.log(loginemail_1)
    if((localStorage.getItem("loggedinUser") == null || localStorage.getItem("loggedinUser") == '') && href.indexOf('/address.html') > -1){
      window.location.href = "index.html";
    }

  $('#log').click(function(){
    window.location.href = "index.html";
    var empty_data = "";           
    console.log(empty_data)
    localStorage.setItem('loggedinUser',(empty_data));
    
  })

  



  
  // Signup
  var old_user = JSON.parse(localStorage.getItem("user"));
  let recent_user = old_user ? old_user : []; 
  let findUser = recent_user.filter(em => em.email);
  let storedEmail = findUser.map(e => e.email)
  $(document).ready(function(e){
      //submit refresh 
      //multiple data store in array
      // e.preventDefault()
    // const userdata = {};
        // console.log(userdata)
              $("#form_1").validate({
                  //validation
                  rules: {
                    firstname : {
                      required: true,
                    },
                    lastname: {
                      required: true,
                    },
                    email: {
                      required: true,
                    },
                    password: {
                      required: true,
                    }
                  },
                  messages : {
                    firstname: {
                      required: "Please enter your first name!"
                    },
                    lastname: {
                      required: "Please enter your last name!"
                    },
                    email: {
                      required: "The email should be in the format: abc@domain.tld"
                    },
                    password: {
                      required: "Password should be strong",
                    },
                    
                  },
                  submitHandler: function() {
                    alert("Form Submitted")
                    
                  const userdata = {
                    firstname: document.getElementById("firstname").value,
                    lastname: document.getElementById("lastname").value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                };
                console.log(userdata)
                if(storedEmail.includes(email.value)) {
                  $('.alert-danger').removeClass('d-none')
                  $('.alert-danger').text("Email aleady registered")
                  setTimeout(function() { 
                    $('.alert-danger').addClass('d-none')
                  }, 2000);
                  
                } else {
                  recent_user.push(userdata)
                  localStorage.setItem('user',JSON.stringify(recent_user));
                  window.location.href = "index.html";
                    }
                }
                });      
  })
  // Login
  $("#form_2").on('submit', function(e){
    
      //submit refresh 
      e.preventDefault()

      if(recent_user){
          var email = document.getElementById("loginemail").value;
          var password = document.getElementById("loginpassword").value;

          let findUser = recent_user.filter(em => em.email == email);
          let storedEmail = findUser.map(e => e.email)
          let storedPassword = findUser.map(e => e.password)
      
          if(email !== "" && password !== ""){
              if (email == storedEmail && password == storedPassword) {
                  $('.alert-success').removeClass('d-none')
                  setTimeout(function() { 
                      $('.alert-success').addClass('d-none')
                      window.location.href = "address.html";
                  }, 2000);
                  localStorage.setItem('loggedinUser', email)

              } 
              else {
                  $('.alert-danger').removeClass('d-none')
                  setTimeout(function() { 
                      $('.alert-danger').addClass('d-none')
                  }, 2000);
              }
          } 
          else {
              $('.alert-danger').removeClass('d-none')
              $('.alert-danger').text("Incorrect")
              setTimeout(function() { 
                  $('.alert-danger').addClass('d-none')
              }, 2000);
          }
      } 
        else {
          $('.alert-danger').removeClass('d-none')
          $('.alert-danger').text('No User Found')
          setTimeout(function() { 
              $('.alert-danger').addClass('d-none')
          }, 2000);
      }
  })

  // Address
  var firstname = document.getElementById("firstname");
  var lastname = document.getElementById("lastname");
  var email = document.getElementById("email");
  var address = document.getElementById("address");
  var phone = document.getElementById("phone");
  
  var old_address = JSON.parse(localStorage.getItem("address"));
  let recent_address = old_address ? old_address : []; 
  var data_address=localStorage.getItem('loggedinUser');
  //filter function
  $(".no-data-found").hide()
  let user_array = recent_address.filter(se => se.loginemail == data_address);
  if(user_array.length == 0){
    $(".no-data-found").show()
  } else {
    showall(user_array)
  }

  $(document).ready(function(e){
    $("#form_3").validate({
      rules: {
        firstname : {
          required: true,
        },
        lastname: {
          required: true,
        },
        email: {
          required: true,
        },
        phone: {
          required: true,
        },
        address: {
          required: true,
        }
      },
      messages : {
        firstname: {
          required: "Please enter your first name!"
        },
        lastname: {
          required: "Please enter your last name!"
        },
        email: {
          required: "The email should be in the format: abc@domain.tld"
        },
        phone: {
          required: "Enter digits!"
        },
        address: {
          required: "Address is reqiured",
        }
      },
      submitHandler: function(){
        const yourNewObject = {
          //multiple data store in array
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          email: document.getElementById("email").value,
          address: document.getElementById("address").value,
          phone: document.getElementById("phone").value,
          loginemail: localStorage.getItem('loggedinUser'),
      };
        //todo for each loop
        $.each(recent_user, function(index, value){
          // for(let i=0; i < recent_user.length; i++){
            if(value.recent_address != undefined && value.recent_address.email != undefined){
              value.recent_address = [];
            }
            if(value.email == document.getElementById("email").value){
              if(!value.recent_address){
                value.recent_address = [];
              }
              console.log(value)
              recent_user[index].recent_address.push(yourNewObject);
              console.log(recent_user[index].email);
              localStorage.setItem('user',JSON.stringify(recent_user));
            // }
          }
        })
      
        recent_address.push(yourNewObject)
        localStorage.setItem('address',JSON.stringify(recent_address));
        setTimeout(()=>{
          location.reload();
      }, 2000)
      }
      
      
    });

  })
  $("#form_3").on('submit', function(e){
      //submit refresh 
      e.preventDefault()
  })

  $('.del-button').click(function(e){
      // This is the email
      const storedData = e.target.parentElement.parentElement.childNodes[2].textContent;

      // This is your filteted array that needs to be sliced
      
      const index = recent_address.findIndex(object => {
        return object.email === storedData;
      });

      recent_address.splice(index, 1)
      localStorage.setItem('address', JSON.stringify(recent_address));
      setTimeout(()=>{
          location.reload();
      }, 2000)
  })
  $("#search").on("keyup", function() {
      var value = $(this).val();

      let findUser = recent_address.filter(el => el.email.includes(value));
      $.each(findUser, function(index, value){
            $("#table tbody").html( "<tr><td>" + value.firstname + '</td><td>' + value.lastname + '</td><td>' + value.email + '</td><td>' + value.address + '</td><td>' + value.phone + '</td><td>' + value.loginemail + '</td><td><button class="del-button">Delete</button></td></tr>');
        });

      if(value == ""){
        $("#table tbody").html('');
        showall(user_array)
      }

      // console.log(recent_address)
      // let filteredArray = recent_address.filter((record)=>{
      //   if(record.email.includes(value)){
      //     return record;
      //   }
      // })
      // console.log(filteredArray)
      
  });
  function showall(el){
    $.each(el, function(index, value){
          $("#table tbody").append("<tr><td>" + value.firstname + '</td><td>' + value.lastname + '</td><td>' + value.email + '</td><td>' + value.address + '</td><td>' + value.phone + '</td><td>' + value.loginemail + '</td><td><button class="del-button">Delete</button></td><td></tr>');
      });
      // const table = document.getElementById('table');
      // for(const obj of el){
      //     const row = document.createElement('tr');
      //     for(const val of Object.values(obj)){
      //         const col = document.createElement('td');
      //         btn_1D = document.createElement('button');
      //         btn_1D.setAttribute('class','del-button');
      //         btn_1D.textContent ='Delete';
      //         col.textContent = val;
      //         row.appendChild(col);
      //     }
      //     row.appendChild(btn_1D);
      //     table.appendChild(row);
      // }
  }
  
});