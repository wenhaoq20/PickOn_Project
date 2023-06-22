<?php
// error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR);

include_once '../roster.inc';

if (!isset($_COOKIE['code']) or ($_COOKIE['code'] !== INSTRUCTOR_PASSWORD)) {
    header('Location:./manager.php');
}

session_start();

?>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
        if (typeof checkdata != 'function') {
            var result = null;

            function checkdata() {
                var scriptUrl = "pick_on.php";
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

        if (typeof post_action == 'undefined') {
            function post_action(action) {
                var the_post_data = {};
                the_post_data[action] = "TRUE";
                $.ajax({
                    url: 'pick_on.php',
                    type: 'POST',
                    data: the_post_data,
                    async: true,
                    cache: false,
                    success: function(data) {
                        console.log('POST: ' + action);
                    }
                });
            }
        }
    </script>

<body>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method=post>
        <?php
        // Logout?
        if (array_key_exists('logout_button', $_POST)) {
            setcookie('code', '', time() - 1000);
            unset($_COOKIE['code']);
            // check out all students 
            $_SESSION['checked_in'] = array();
            unset($_SESSION['current_student']);
            unset($_SESSION['current_anon_img']);
            header("Location: {$_SERVER['PHP_SELF']}");
        }

        // Only the logged in instructor can start a class
        if (isset($_COOKIE['code']) and ($_COOKIE['code'] === INSTRUCTOR_PASSWORD)) {
            // initialize new class data file if not present
            if (!file_exists(PICKON_DATA_FILE)) {
                foreach (read_roster(ROSTER_FILE) as $index => $info) {
                    $pickondata['credit'][$info['StudentName']] = 0;
                    $pickondata['absent'] = array();
                }
                file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
            }
        }

        $pickondata = unserialize(@file_get_contents(PICKON_DATA_FILE));
        // add new students if they are checked in and are not in the data file
        foreach ($_SESSION['checked_in'] as $student_name => $check_in_time) {
            if (!isset($pickondata['credit'][$student_name])) {
                $pickondata['credit'][$student_name] = 0;
                $pickondata['names_left'][$student_name] = $student_name;
            }
        }

        if (!isset($pickondata['absent'])) $pickondata['absent'] = array();
        $sec_array = array_combine(array_keys($pickondata['credit']), array_keys($pickondata['credit']));
        // Start a new class time
        //        $pickondata['class_over_time'] = time() - 10000;  // DEBUG: force new class start
        if ((time() > (int) @$pickondata['class_over_time'])) {
            $pickondata['names_left'] = isset($pickondata['names_left']) ? $pickondata['names_left'] + $pickondata['absent'] : array();
            $pickondata['absent'] = $pickondata['credit']; // everyone absent until check in
            $pickondata['class_over_time'] = time() + ABSENT_EXPIRES;  /* set up to hold absentees and expire in ABSENT_EXPIRES seconds */
            unset($_SESSION['current_student']);
            unset($_SESSION['current_anon_img']);
            // Check out old students except those recently checked in
            foreach ($_SESSION['checked_in'] as $student => $check_in_time) {
                if (time() - $check_in_time > ABSENT_EXPIRES) {
                    unset($_SESSION['checked_in'][$student]);
                }
            }
        }

        // Only the logged in instructor can reset, choose a student, mark absent, or cancel/answer a raised hand 
        if (isset($_COOKIE['code']) and INSTRUCTOR_PASSWORD === $_COOKIE['code']) {
            // cancel a raised hand
            if (array_key_exists('cancel_hand_up', $_POST)) {
                unset($_SESSION['raised_hand']);
            }
            // handle resets
            if (array_key_exists('submit_button', $_POST)) {
                switch ($_POST['submit_button']) {
                    case 'RESET':
                        $pickondata['names_left'] = array();
                        break;

                    case 'RESET ABSENT':
                        if (!empty($pickondata['absent'])) {
                            $pickondata['names_left'] += $pickondata['absent'];
                            $pickondata['absent'] = array();
                        }
                        break;
                }
            }

            // get previous name (if it exists)
            if (!empty($_POST['name_index'])) {
                $prev_name = $_POST['name_index'];
                unset($_SESSION['current_student']);
                unset($_SESSION['current_anon_img']);
                if (@$_POST['submit_button'] == "Pick On Someone Else!") {
                    // do nothing so may be picked again
                } elseif (strstr(@$_POST['submit_button'], "answered")) {
                    // give credit
                    @$pickondata['credit'][$prev_name]++;
                    // remove it so it will not be picked again unless the array is empty
                    unset($pickondata['names_left'][$prev_name]);
                    // Give a good job
                    $files = glob('../gifs/*.*');
                    $file = array_rand($files);
                    if (!file_exists($files[$file]))
                        $file = array_rand($files);
        ?>
                    <center>
                        <?php print "<font size=9>$prev_name</font><p>"; ?>
                        <img src='<?php echo $files[$file]; ?>' width=400 height=340>
                        <form action='<?php echo $_SERVER['PHP_SELF']; ?>' method=post>
                            <input type='submit' value='Next Victim'>
                        </form>
                    </center>
                    <script>
                        window.clearInterval(auto_refresh);
                        auto_refresh = undefined;
                    </script>
        <?php
                    file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
                    exit;
                } elseif (strstr(@$_POST['submit_button'], "absent") and count($pickondata['names_left']) > 0) {
                    $pickondata['absent'][$prev_name] = $prev_name;
                    // keep track of absent people
                    @$pickondata['notinclass'][$prev_name]++;
                    // remove this person from pick on pool
                    unset($pickondata['names_left'][$prev_name]);
                }
                echo "";
            }

            // initial set of names
            if (count(array_diff_assoc($pickondata['names_left'], $pickondata['absent'])) == 0 and count($pickondata['absent']) < count($sec_array)) {
                $pickondata['names_left'] = $sec_array;
            }
        }

        $pickondata['absent'] = array_diff_key($pickondata['absent'], $_SESSION['checked_in']);
        // Only the logged in instructor can make changes to the class data file
        if (isset($_COOKIE['code']) and ($_COOKIE['code'] === INSTRUCTOR_PASSWORD)) {
            // update checked in students for this class session
            $pickondata['attendance'][$pickondata['class_over_time']] = $_SESSION['checked_in'];

            file_put_contents(PICKON_DATA_FILE, serialize($pickondata));
        }
        // If no students are checked in no need to continue
        if (!isset($_SESSION['checked_in']) or empty($_SESSION['checked_in'])) {
            exit('<h2>No students have checked in for ' . CLASS_NAME . '</h1>');
        }
        $pool = array_diff_assoc($pickondata['names_left'], $pickondata['absent']);
        // Use only checked in students 
        $pool =  array_intersect_key($_SESSION['checked_in'], $pool);
        // No more students to pick on? Reset the pick on list with those who are checked in
        if (count($pool) == 0) {
            $pool = $_SESSION['checked_in'];
        }

        if (!isset($_SESSION['current_student']) or isset($_SESSION['pass_me'])) {

            // Handle a student requesting a pass but only if there are others in the pool
            if (isset($_SESSION['pass_me']) and (count($pool) > 1)) {
                $pool = array_diff_key($pool, array($_SESSION['pass_me'] => null));
                echo "{$_SESSION['pass_me']} has passed<br>";
            }
            // grab random name, but not last person if Pick on Someone Else. If last person then must be picked on
            if (isset($prev_name) and (count($pool) > 1)) {
                unset($pool[$prev_name]);
            }
            $_SESSION['current_student'] = @array_rand($pool);
            unset($_SESSION['current_anon_img']);
            unset($_SESSION['pass_me']);
        }


        $student = @$_SESSION['current_student'];

        list($last_name, $first_name) = sscanf($student, '%s %s');
        $last_name = substr($last_name, 0, -1); // kill the last character which is a comma

        $img_file = BIO_IMAGE_DIR . '/' . $student;
        if (!file_exists($img_file)) {
          // $img_file = BIO_IMAGE_DIR . '/unknown.gif';
            if (!isset($_SESSION['current_anon_img'])) {
                // Give a rand image for anonymous
                $files = glob('../anonymous/*.*');
                $_SESSION['current_anon_img'] = $files[array_rand($files)];
            }
            $img_file = $_SESSION['current_anon_img'];
        }
      
        $a = empty($pickondata['credit'][$student]) ? 0 : $pickondata['credit'][$student];
        $b = empty($pickondata['notinclass'][$student]) ? 0 : $pickondata['notinclass'][$student];
        $credits = $pickondata['credit'];
        ksort($credits);
        arsort($credits);
        echo '<center>';
        echo '<table>';
        print '<tr><th></th><th>' . count($pool) . ' more people left to pick on!</th><th></th></tr>';
        // Is a hand raised?
        if (isset($_SESSION['raised_hand'])) {
            print "<tr><th></th><th style='color: white; background-color: #4CAF50;' onclick='post_action(\"cancel_hand_up\");this.style.backgroundColor=\"red\";'>Hand up: {$_SESSION['raised_hand']}</th><th></th></tr>";
        }

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
        <input type=hidden value="<?php echo $student ?>" name=name_index>
        <input type=submit style="background-color:lightgreen" value="<?php echo $first_name ?> answered" name=submit_button>
        <input type=submit style="background-color:orange" value="Pick On Someone Else!" name=submit_button>
        <br>
        <p>
            <input type=submit style="background-color:gray" value="<?php echo $first_name ?> is absent" name=submit_button>
            <br>
            <p>
                <p>
                    <input type=submit value="RESET" name=submit_button>
                    <input type=submit value="RESET ABSENT" name=submit_button>
                    <p>
                        <input type=submit value="LOGOUT" name=logout_button>
                        <br>
    </form>

<audio src="../Jeopardy-theme-song.mp3" controls>
Error: your web browser does not support this audio player.
</audio>

    </center>
</body>
