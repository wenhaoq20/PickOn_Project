<?php
// error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR);
error_reporting(0);
include_once '../roster.inc';

session_start();

// setcookie('student_name',$_POST['studentName'], time() - 1000);
// Student is checking in
if (isset($_POST['studentName'])) {
    // Give cookie to stay checked in
    setcookie('student_name', $_POST['studentName']);
    $_COOKIE['student_name'] = $_POST['studentName'];
}
?>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
</head>

<?php
 
if (isset($_POST['student_action'])) {
    $request_pass = false;
    switch ($_POST['student_action']) {
        case "Pick on me!":
            $_SESSION['current_student'] = $_COOKIE['student_name'];
            echo "ok, {$_COOKIE['student_name']} you will be picked on!";
            break;
        case "InstructorQuestion/Comment":
            $_SESSION['raised_hand'] = $_COOKIE['student_name'];
            break;
        case "Cancel InstructorQuestion/Comment":
            unset($_SESSION['raised_hand']);
            break;
        case "Pick on someone else!":
            echo "ok, {$_COOKIE['student_name']} your pass request has been made";
            $_SESSION['pass_me'] = $_COOKIE['student_name'];
            break;
    }
}


if (isset($_COOKIE['student_name'])) {
    echo "<form enctype='multipart/form-data' action='{$_SERVER['PHP_SELF']}' method='POST'>";
    echo "<center><h2> Hello {$_COOKIE['student_name']}, you are checked in to " . CLASS_NAME . "</h2></center>";
    // add student to session to check in if needed and update time active
    $_SESSION['checked_in'][$_COOKIE['student_name']] = time();
    
    if (isset($_SESSION['current_student']) and $_COOKIE['student_name'] == @$_SESSION['current_student']) {
        $pickon_str = 'Pick on someone else!';
    } else {
        $pickon_str = 'Pick on me!';
    }
    echo "<center><input type='submit' value='{$pickon_str}' name='student_action'>";
    $question_button_str = 'InstructorQuestion/Comment';
    if (isset($_SESSION['raised_hand']) and $_SESSION['raised_hand'] == $_COOKIE['student_name']) {
        $question_button_str = "Cancel " . $question_button_str;
    }
    echo "<input type='submit' value='$question_button_str' name='student_action'></center><br>";
    echo "</form>";
?>

    <script>
        if (typeof checkdata != 'function') {
            var result = null;

            function checkdata() {
                var scriptUrl = "view_pick.php";
                $.ajax({
                    url: scriptUrl,
                    type: 'get',
                    dataType: 'html',
                    async: true,
                    cache: false,
                    success: function(data) {
                        if (result != data) {
                            result = data;
                            $("body").html(data);
                            console.log('Page changed');
                        };
                    }
                });
            }
        }
        // set page to reload when changed on server
        if (typeof auto_refresh == 'undefined') {
            auto_refresh = setInterval(function() {
                checkdata();
            }, 4000);
        }
    </script>
<?php
} else if (!isset($_COOKIE['code'])) {
    echo "<center><h2> You are not checked in to " . CLASS_NAME . "</h2></center>";
?>
    <script>
        if (typeof auto_refresh != 'undefined') {
            clearInterval(auto_refresh);
            delete auto_refresh;
        }
    </script>
<?php
}

// Enable student to check in
if (!isset($_COOKIE['student_name'])) {
    $c = CLASS_NAME;
    @print <<< _SSID_CHECKIN_
    <script>
    function findId() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("resultsDiv").innerHTML = this.responseText;
                if(!this.responseText.includes("not found")) {
                    document.getElementById("successDiv").style.display="block";
                    // document.getElementById("check_in_form").reset();
                } else {
                    document.getElementById("successDiv").style.display="none";
                }
            }
        };
        xhttp.open("POST", "retrieve_roster.php", true);
        var studentIDvalue = encodeURIComponent(document.getElementById("studentId").value)
        var parameters = "studentId=" + studentIDvalue;
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhttp.send(parameters)
    }
</script>
    <h1>Check In</h1>

    <label for='studentId'>StudentID #:</label>
    <input type='text' id='studentId' size="8" maxlength="8" placeholder="12345678" onkeyup="findId()">
    <form id="check_in_form" enctype="multipart/form-data" action="{$_SERVER['PHP_SELF']}" method="POST">
        <p>
        <div id='resultsDiv'> </div>
        <div id='successDiv' style='display:none;'>
        <input type='hidden' name='class_name' value='$c'>
        <input type="submit" value="check in to $c">
        </div>
        <hr>
        
    </form>
_SSID_CHECKIN_;
    exit;
}

// if no one is being picked on, exit
if (!isset($_SESSION['current_student'])) {
    exit();
}

$pickondata = unserialize(@file_get_contents(PICKON_DATA_FILE));

$pool = array_diff_assoc($pickondata['names_left'], $pickondata['absent']);
// Use only checked in students 
$pool =  array_intersect_key($pool, $_SESSION['checked_in']);
$student = @$_SESSION['current_student'];

$img_file = BIO_IMAGE_DIR . '/' . $student;

list($last_name, $first_name) = sscanf($student, '%s %s');
$last_name = substr($last_name, 0, -1); // kill the last character which is a comma

if (!file_exists($img_file)) {
    $img_file = BIO_IMAGE_DIR . '/unknown.gif';
    if (isset($_SESSION['current_anon_img'])) {
        $img_file = $_SESSION['current_anon_img'];
    }
}

$a = empty($pickondata['credit'][$student]) ? 0 : $pickondata['credit'][$student];
$b = empty($pickondata['notinclass'][$student]) ? 0 : $pickondata['notinclass'][$student];
$credits = $pickondata['credit'];
ksort($credits);
arsort($credits);
echo '<center>';
echo '<table>';
print '<tr><th></th><th>' . count($pool) . ' more people left to pick on!</th><th></th></tr>';
// Who's absent
echo '<tr><td align=center>';
if (!empty($pickondata['absent'])) {
    echo '<b>Absent</b><br>';
    foreach ($pickondata['absent'] as $name => $times) {
        printf('%s<br>', $name);
    }
}
echo '</td>';

echo "<td><img src = '$img_file' width=400px height=340px></td>";
// Top 10
echo '<td><table>';
echo '<tr><th colspan=2>Top 10 Picked On</th><tr>';
$i = 1;
foreach ($credits as $name => $score) {
    if ($score > 0) {
        printf('<tr><td>%d. %s</td><td>%d</td></tr>', $i, $name, $score);
    }
    if ($i++ == 10)
        break;
}
echo '</table></td>';


echo '</tr></table>';
echo '<br><table border=1>';
echo '<tr><td><font size = 5 color=red><b>' . ucwords($first_name) . ' ' . ucwords($last_name) . '</b></td>';
echo "<td><font size = 5> total answers: $a </td><td><font size = 5> absent: $b</td></tr>";
echo '</table>';
?>