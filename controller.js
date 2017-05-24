   $(function() {
         
       var count  = 0;
       var questionString = "";
       var dataCopy = "";
//        var category = '';
       var userid = 0; 
       var testid = 0;
       var quesno = 1;
       var dataCopy = '';
       var qarray = [];
       var answers = [];
       var total = 0;
       var curr_score = 0;
       var statement = '';
       var list = '';
       var newtestid = '';
       var email = '';
       var backcounter = 1;
       var ans = [];
       var counter = 1;   
       var review = false;
       var questionCount = 0;
       
       
       $('#signup').hide();
       $("#logout1").hide();
       $("#previousTest").hide();
       $('#startPage').hide();
       $('#test').hide();
       $("#final").hide();
            
       
            $('#signupButton').click(function(){
               $('#login').hide();
                 $('#signup').show();
            });
            
            var email = "";
            
       
       $("#logout").click(function(){
                $("#previousTest").empty();
                $("#options").empty();
           
                $("#startPage").hide();                
                $("#test").hide();               
                $("#previousTest").hide();           
                $("#final").hide();
                $("#logout1").hide();
           
                $("#message").show()
                $("#login").show();     
           
                quesno = 1;
                count = 0;
                counter = 1;
                backcounter = 1;
       });
       
       function load(){
              $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "login": email,
                },
                dataType: "json",
                success: function(data) {
                        
                          if (data.status == "success"){
                            userid = data.userid;
                            total = data.count;
                            $("#startPage").show();
                            $("#login").hide();
                            $("#previousTest").show();
                            list = '';
                            list += "<p id = 'total'><b> Total Tests :   " + total + "<b></p>";    
                            var index = 0;
                            list += '<div id="prevTestButtons">';
                            while (index != parseInt(total)) {
                                
                                list += '<div class="row"><p id = "ptest">' + (parseInt(index) + 1) + '&nbsp&nbsp&nbsp  TEST ID: ' + data.testids[index] + ' &nbsp&nbsp&nbsp&nbsp&nbsp<button  id ="' + data.testids[index] + '" type="button" class= "btn btn-default">View Test</button></p></div>';
                                index += 1;
                            }
                           list += '</div>';
                            $("#previousTest").append(list);
                          }
                }
             });
       }
       
        $('#login1').click(function(){
            
            
            email = $("#loginEmail").val();
           
            $("#previousTest").empty();
           
//            console.log(email);
             $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "login": email 
                },
                dataType: "json",
                success: function(data) {
//                            console.log(data);
                          if (data.status == "success"){
                            
                            $("#message").hide();
                            $("#login").hide();
                            $("#startPage").show();
                            $("#logout1").show();
                            $("#previousTest").show();
                              
                            userid = data.userid;
                            total = data.count;
                            
                            var list = '';
                            list = '';
                            list += "<div class = 'row'  id = 'total'><p style = 'margin-left :200' ><b> Total Tests :   " + total + "<b></p></div>";   
                              
                              
                            var index = 1;
                              
                              
                            list += '<div id="prevTestButtons" style = "text-align :center">';
                            
                            while (index != parseInt(total)) {
                                
                                list += '<div class="row" id = "ptest' + index + '"><p>' + index + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  TEST ID: ' + data.testids[index-1] + ' &nbsp&nbsp&nbsp&nbsp<button  id ="' + data.testids[index-1] + '" type="button" class= "btn btn-default">View Test</button></p></div>';
                                index += 1;
                            }
                           list += '</div>';
                              
                            $("#previousTest").append(list);
                            list = '';
                        }else{
                            
                            
                            $("#login").hide();
                            $("#signup").show();
                            $("#signupEmail").val(email);
                            $("#message").empty();
                            $("#message").append("<p>Signup with your email to create an account</p>");
                            $('#message').css('margin-left',200);
                        }
                }
             });
        });
           
      
       
       function gotoTest(testIndex){
          
           quesno = 1;
           count = 0;
           backcounter = 1;
           counter = 1;
           $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "getdata": "data.json" 
                },
                dataType: "json",
                success: function(jsonData) {
                    

                     $.ajax({
                        type: 'GET',
                        url: 'testone.php',
                        data: {
                            "uid": userid,
                            "tid": testIndex
                        },
                        dataType: "json",
                        success: function(data) {
//                             console.log(data);  
                            
                            $("#startPage").hide();
                            $("#options").empty();
                            $('#test').show();
                           
                            
                             ans = [data.Q1,data.Q2,data.Q3,data.Q4,data.Q5,data.Q6,data.Q7,data.Q8];
                                
                           var choice = 0;

                            var temp = 1;
                           
                            $.each(jsonData, function(i, curr_question) {
                        
                                review= true;
                                choice = 0;
                            if (ans[temp-1] == "A"){
                                    choice = 0;     
                            }else if (ans[temp-1] == "B"){
                                    choice = 1;     
                            } else if (ans[temp-1] == "C"){
                                    choice = 2;     
                            } else if (ans[temp-1] == "D"){
                                    choice = 3;     
                            } else if (ans[temp-1] == "E"){
                                    choice = 4;     
                            } 
                                
                                if (temp == 1){
                                    questionString  = '<div id = "q' + temp + '">';
                                    
                                }else{
                                    questionString  = '<div id = "q' + temp + '" style = "display:none">';    
                                }
                                questionString += '<br><div class="questionButton row" align="left"><button type="button" class = "btn btn-primary" id="question' + temp +'">QUESTION ' + temp + '</button></div><br>';
                                qarray.push(temp -1);
                                questionString += "<p>" + curr_question.text + "</p>";


                                
                                $.each(curr_question.answers, function(i, ans){
                                    var no = parseInt(i) + 1;
           
                                    if (choice == i){
                                         questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + temp + '" value="' + no + '" checked = "checked"/>' + ans.ans_text;     
                                    }else{
                                         questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + temp + '" value="' + no + '"/>' + ans.ans_text;
                                    }
                                   
                                });

                                $('#options').append(questionString);
                                $("input[type=radio]").attr('disabled', true);
                                temp += 1;
                                count += 1;
                            }); 
                            
                           questionCount = count; 
                        }
                     });
                    
                }
            });
        }
       
       
        $("#previousTest").on('click','button', function() {

//            $("#prevTestButtons").hide();
            $("#previousTest").hide();
            $("#review").hide();
            $("#submit").hide();
            gotoTest(this.id);
        
        });
        
        $('#signup1').click(function(){
//            email = $("#signupEmail").val();
             $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "signup": email 
                },
                dataType: "text",
                success: function(data) {
                        
                        if (data == "success"){
                            // inserted record
                            $("#signupButton").hide();
                            $("#signup").hide();
                            $("#login").show();
                            $("#message").show();
                            $("#message").empty();
                            $("#message").append("<p>You have successfully created an account.Please Login to continue</p>");
                            $('#message').css('font-size',24);
                        }else{
                            
                            // Already account
                            $("#message").empty();
                            $("#message").append("<p>You already have a account. Please Login to continue</p>");
                            $("#login").show();
                            $("#signup").hide();
                        }
            }
             });
        });
       
        $('#start').click(function(){

            $("#previousTest").hide();
            $("#test").show();
            
            $("#options").show();
            $("#next").show();
             $("#back").show();
             $("#submit").hide();
            $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "email1": userid
                },
                  dataType: "text",
                 success: function(data) {
             

                     newtestid = data;
            }
        
             });
            
             $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "getdata": "data.json" 
                },
                dataType: "json",
                success: function(jsonData) {
             
                    $("#startPage").hide();
                    
                    $('#test').show();
                    
                
                    dataCopy = jsonData;
                    var temp = 1;
                    $.each(jsonData, function(i, curr_question) {
                        
//                       console.log(questionString);
                    
                        
                        if (temp == 1){
                            questionString  = '<div id = "q' + temp + '">';    
                        }else{
                            questionString  = '<div id = "q' + temp + '" style = "display:none">';    
                        }
                         questionString += '<br><div class="questionButton row" align="left"><button type="button" class = "btn btn-primary" id="question"' + temp +'">QUESTION ' + temp + '</button></div><br>';
                        qarray.push(temp -1);
                        questionString += "<p>" + curr_question.text + "</p>";
                        

                        $.each(curr_question.answers, function(i, ans){
                            var no = parseInt(i) + 1;
                            no = no.toString();

                            questionString += '<br><input id = "answer' + no + '" type="radio" name="answer' + no + '" value="' + no + '"/>' + ans.ans_text;
                        });
                        
                        questionString += '</div>';
                        $('#options').append(questionString);
                        temp += 1;
                        count += 1;
                    });
            }
             });
        });
        
       
       $('#submit').click(function(){
            var finalString = '';    
           $.ajax({
                type: 'GET',
                url: 'testone.php',
                data: {
                    "testid": newtestid,
                    "userid":userid,
                    "answers": answers
                },
                dataType: "text",
                success: function(data) {
//                    console.log(data);
                    curr_score = parseInt(data);
                    $("#test").hide();
                    $('#final').show();
                    finalString += '<div id="thankyou"><p> Your Score is : ' + curr_score + '.</p><br><button type="button" class = "btn btn-default" id="home">HOME</button></div>';
                    $("#final").append(finalString);
                }
             });
           

           

       });
       
     
        $('#next').click(function(){
            
        
            if (counter >= count){
                if(review == true){

                    $("#startPage").show();
                    $("#test").hide();
                    $("#previousTest").show();
                   $("#prevTestButtons").show();
                }else{
                 $("#options").hide();
//                $("#question_list").show();
                $("#next").hide();
                $('#submit').show();   
                $("#buttons").show();
                    $("#back").hide();
                }
                
            }
            
            if(review == false){
                 value1 = $('input[name="answer' + counter +'"]:checked').val();

            if (value1 == 1){
                     answers.push("A");     
            }else
            if (value1 == 2){
                     answers.push("B");     
            }else if (value1 == 3){
                     answers.push("C");     
            }else if (value1 == 4){
                     answers.push("D");     
            }else if (value1 == 5){
                     answers.push("E");     
            }else{
                answers.push("Z");
            }
            }
           
           

            var prevQues = 'q' +quesno;
            quesno += 1;
            var nextQues = 'q' + quesno;
            $('#' + prevQues).hide();
            $('#' + nextQues).show();
             backcounter +=1;
            counter += 1;
            
    });
       
       
       
        $('#back').click(function(){
           
            backcounter-= 1;
            if (backcounter <= 0){
                var currQues = 'q' +quesno;
                 $('#' + currQues).show();
            }else{
                
            
                if(review == true){
                    var nextQues = 'q' + quesno;
                quesno -= 1;
                var prevQues = 'q' +quesno;


                $('#' + prevQues).show();
                $('#' + nextQues).hide();
                }else{
                    var value1 = '';
                    value1 = answers[backcounter-1];    


                    var choice = 0
                    if (value1 == "A"){
                            choice  = 1;     
                    }else
                    if (value1 == "B"){
                             choice  = 2;     
                    }else if (value1 == "C"){
                             choice  = 3;   
                    }else if (value1 == "D"){
                              choice  = 4; 
                    }else if (value1 == "E"){
                              choice  = 5;   
                    }else{
                         choice  = 0; 
                    }
                    var nextQues = 'q' + quesno;
                    quesno -= 1;
                    var prevQues = 'q' +quesno;


                    $('#' + prevQues).show();
                    $('#' + nextQues).hide();
                }
            }
            
    });
            
            
//         Selecting The Category
//            
//            $('#sel1').click(function() {
//                category = $(this).find("option:selected").text();
//                });
    

           
      function goToQuestion(qindex){
          
          
          if(quesno > count){
                $('#q' + 8).hide();    
            }
            else{
              $('#q' + quesno).hide();   
            }
          
          
            quesno = parseInt(qindex)+1;
          
          
            var currQues = 'q' + quesno;
          
            $("#submit").hide();
            $("#test").show();
            $("#options").show();
            $('#' + currQues).show();
            $("#next").show();
        
            var ansIndex = answers[qindex];
            var choice = 0;
            if (ansIndex == "A"){
                    choice = 1;     
            }else if (ansIndex == "B"){
                    choice = 2;     
            } else if (ansIndex == "C"){
                    choice = 3;     
            } else if (ansIndex == "D"){
                    choice = 4;     
            } else if (ansIndex == "E"){
                    choice = 5;     
            } 

          $('#answer' + choice).prop('checked', true);
    }
     
            
            var list= '';
             
            
// ////////          Review the Entire Section
       
    $(".reviewButton").on('click','#review', function() {

        var list = '';    
        var index = 1;
        list += '<div id="buttons">';
        $.each(dataCopy, function(i, curr_question) {
                
                list += '<br> <button  id =' + i + ' type="button" class= "btn btn-default">Question' + (i + 1)+ '</button><br>';
                index += 1;
        });
       list += '</div>';
        
        $('#question_list').append(list);
 
        $("#question_list").on('click','button', function() {

            $("#buttons").hide();

            goToQuestion(this.id);
        
        });
    });     
        
       $("#final").on('click', '#home' ,function(){
           $("#final").hide();
                      $("#previousTest").show();
           $("#previousTest").empty();
           load();
            $("#startPage").show();
            
       });
      
   
   });