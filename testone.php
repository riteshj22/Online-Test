<?php
   class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('/home/scf-24/jawale/sqlite/test.db');
      }
   }


   $db = new MyDB();
   
    if(!$db){
        echo $db->lastErrorMsg();
    } 
//    else {
//        echo "Opened database successfully\n";
//    }
//echo $_GET['email'];
    
    $status = 'fail';
    
    if(isset($_GET["login"])){
        $uid = -1;
        $email = $_GET['login']; 
        $count = -1;
        $results = $db->query('SELECT email FROM users');
        $testids = array();
        while ($row = $results->fetchArray()) {
            if( $row['email'] == $email){
                    $uid = $db->querySingle('select user_id from users where email ="'.$email.'"');
                    $status = 'success';
                }
        }
        if($uid != -1){
            $count = $db->querySingle('select count(*) from test where u_id ="'.$uid.'"');
            $results = $db->query('select test_id from test where u_id ="'.$uid.'"');
            
            while ($row = $results->fetchArray()) {
                    array_push($testids,$row['test_id']);
                }
        }
        
        
        
    echo json_encode(array("status"=>$status, "userid"=>$uid, "count"=>$count, "testids"=>$testids));
    }

   if(isset($_GET['signup'])){
       $status = 'fail';
        $flag  = false;
        $email = $_GET['signup'];    
        $results = $db->query('SELECT email FROM users');
        while ($row = $results->fetchArray()) {
            if( $row['email'] == $email){
                    $flag = true;
            }
        }
            
        if($flag == false){
            $ret =    $db->exec("INSERT INTO users (user_id,email,no_of_tests) VALUES (null,'$email','0')");    
            if(!$ret){
                echo $db->lastErrorMsg();
            } else {
                    $status = 'success';    
                
            }
        }
      echo $status;           
  } 


    if(isset($_GET["getdata"])){
        
        $filename = $_GET['getdata'];    
        $data = file_get_contents($filename);
        echo $data;
    }

if(isset($_GET["email1"])){
        
        $uid = $_GET['email1']; 
//        $uid = $db->querySingle('select user_id from users where email ="'.$email.'"');
        $results = $db->exec("INSERT INTO test (test_id,u_id) VALUES (null,'$uid')");
        $testid = $db->querySingle('select test_id from test where u_id ="'.$uid.'" order by rowid desc limit 1');
      
//    var_dump($uid);
    echo $testid;
}


if((isset($_GET["testid"])) && (isset($_GET["userid"]))){
        
        $testid = $_GET['testid'];
        $userid = $_GET['userid'];
        $answers = $_GET['answers'];
        $score = 0;
        $results = $db->query('SELECT ans_id FROM questions');
        $i = 0;
        while ($row = $results->fetchArray()) {
            if( $row['ans_id'] == $answers[$i]){
                    $score++; 
            }
                $i++;
        }
            
        $ret = $db->exec("INSERT INTO solution (solution_id,score,u_id,t_id,Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8) VALUES (null,'$score','$userid','$testid','$answers[0]','$answers[1]','$answers[2]','$answers[3]','$answers[4]','$answers[5]','$answers[6]','$answers[7]')");
         if(!$ret){
                echo $db->lastErrorMsg();
            } else {
                    $status = 'success';    
                
            }       
        echo $score;
}

if((isset($_GET["tid"])) && (isset($_GET["uid"]))){
        $answers = array();
        $testid = $_GET['tid'];
        $userid = $_GET['uid'];
        $results = $db->query('SELECT Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8 FROM solution where u_id ="'.$userid.'" and t_id ="'.$testid.'" ');
        $i = 0;
      
        $row = $results->fetchArray(1);
            echo json_encode($row);
}



$db->close();
?>