<?php

// var_dump($_POST);
if (isset($_POST['code_textbox'])) {
    if (hash_equals(INSTRUCTOR_PASSWORD, crypt(@$_POST['code_textbox'], INSTRUCTOR_PASSWORD))) {
        setcookie('code', INSTRUCTOR_PASSWORD, time() + ABSENT_EXPIRES);
        $_COOKIE['code'] = INSTRUCTOR_PASSWORD;
    }
}
print "<form id='manager_form' action='{$_SERVER['PHP_SELF']}' method=post>";
if (isset($_COOKIE['code']) and ( $_COOKIE['code'] === INSTRUCTOR_PASSWORD )) {
    include_once '../roster.inc';
    $pickondata = unserialize(@file_get_contents(PICKON_DATA_FILE));

    print 'Class over at: ' . date('l jS \of F Y h:i:s A', $pickondata['class_over_time']);
    switch (isset($_POST['action'])?$_POST['action']:'') {
    // dumps class dates, attendance, attendance and participation by student
    case 'Dump pickOn data':
      $num_classes = count($pickondata['attendance']);

      echo "<br><b>attendance & participation over ". $num_classes ." classes:</b><br>";

    $attended = array();
	foreach($pickondata['attendance'] as $date => $attendace_array) {
        if(!is_null($pickondata['attendance'])) {
            continue;
        }
        echo "<br>". date('l m/d/Y h:i:s A', $date). ": " . count($attendace_array);
        if(count($attendace_array) > 2) {
            foreach($attendace_array as $student => $time) {
                if(!isset($attended[$student])) {
                    $attended[$student] = 0;
                }
                $attended[$student] += 1;
            }
        }
    }
    echo "<table border='1'><tr><th>Name</th><th>Attendance</th><th>Participation</th>";
    foreach($attended as $name => $attendance) {
       echo
         "<tr><td>{$name}</td><td>"
         . $attendance
         . " ("
         . round(100*$attendance/$num_classes,0)
         . "%)</td><td>"
         . $pickondata['credit'][$name]
         . " ("
         . round(100*($pickondata['credit'][$name]/$num_classes),0)
	 . "%)</td></tr>";
    }
    echo "</table>";
//	var_dump($pickondata);
	break;
        case 'Load Updated Roster':
            print $_POST['action'];
            foreach (read_roster(ROSTER_FILE) as $index => $info) {
                if(!isset($pickondata['credit'][$info['StudentName']])) { 
                    $pickondata['credit'][$info['StudentName']] = 0;
                }
            }
            file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
            print '<br>Updated!';
            break;
        case 'Clear Answer History':
            print $_POST['action'] . '...';
            // back up
            file_put_contents(PICKON_DATA_FILE . '_' . time(), serialize($pickondata));
            $pickondata['credit'] = array_fill_keys(array_keys($pickondata['credit']), 0);
            file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
            print '<br>Cleared!';
            break;
        case 'Clear Absent History':
            print $_POST['action'] . '...';
            // back up
            file_put_contents(PICKON_DATA_FILE . '_' . time(), serialize($pickondata));
            $pickondata['notinclass'] = array_fill_keys(array_keys($pickondata['notinclass']), 0);
            file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
            print '<br>Cleared!';
            break;
        case 'Show Uploaded Pics':
            print "<br>{$_POST['action']}</br>";
            $images = glob('pics/*');

            foreach ($images as $image) {
                echo
                <<<_IMGBOX
                <div style="display:inline-block;">
                    <img height = 100px width = 100px src = "$image" />
                    <div>
                        <input type="checkbox" style="align:right;" name="delete_files[$image]">
                        $image
                    </div>
                </div>             
_IMGBOX;
            }
            echo
            <<<_DELETE
            <p>
                <input type='submit' name='action' value='Delete Selected' onclick='return confirm("Are you sure?");' >
_DELETE;
            break;
        case 'Logout':
            setcookie('code', '', time() - 1000);
            print '<meta http-equiv="refresh" content="3">';
            exit('Logged out...');
            break;


        case 'Delete Selected':
            foreach($_POST['delete_files'] as $filename => $selected) {
                unlink($filename);
            }
            break;
    }


    print <<< _MENU_
   <ol>
   <li><a href='./pick_on.php' target="_blank">Start Picking!</a></li>
   <li><input type=submit name=action value='Load Updated Roster'></li>
   <li><input type=submit name=action value='Dump pickOn data'></li>
    <li><input type=submit name=action value='Clear Answer History'></li>
        <li><input type=submit name=action value='Clear Absent History'></li>
        <li><input type=submit name=action value='Show Uploaded Pics'></li>
    <li><input type=submit name=action value='Logout'></li>
</ol>
_MENU_;
} else {
    ?>
    <input type=password style="background-color:gray" value="<?php echo @$_POST['code_textbox'] ?>" name="code_textbox">
    </form>
    <?php
    exit;
}
?>

</form>
