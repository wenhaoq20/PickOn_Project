<?php
if(!empty($_POST)) {
    $fp = fopen('./registrations.dat','a');
    fputs($fp, "{$_POST['student_id']},{$_POST['student_name']},{$_SERVER['REMOTE_ADDR']},{$_SERVER['REQUEST_TIME']}\n");
    fclose($fp);

    exit("Thank you for registering {$_POST['student_name']} at IP {$_SERVER['REMOTE_ADDR']}");
}

?>
<form method=POST>
Name: <input type=text name=student_name>   ID: <input type=text name=student_id> <input type=submit value=Regsiter>
</form>
