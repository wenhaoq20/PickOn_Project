<?php
include_once './pickon.conf';
// var_dump($_POST);
if (isset($_POST['code_textbox'])) {
    if (hash_equals(INSTRUCTOR_PASSWORD, crypt(@$_POST['code_textbox'], INSTRUCTOR_PASSWORD))) {
        setcookie('code', INSTRUCTOR_PASSWORD, time() + ABSENT_EXPIRES);
        $_COOKIE['code'] = INSTRUCTOR_PASSWORD;
    }
}
print "<form id='manager_form' action='{$_SERVER['PHP_SELF']}' method=post>";
if (isset($_COOKIE['code']) and ( $_COOKIE['code'] === INSTRUCTOR_PASSWORD )) {
    include_once './roster.inc';
    $pickondata = unserialize(@file_get_contents(PICKON_DATA_FILE));

    print 'Class over at: ' . date('l jS \of F Y h:i:s A', $pickondata['class_over_time']);
    switch (@$_POST['action']) {
        case 'Load Updated Roster':
            print $_POST['action'];
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
            foreach ($_POST['delete_files'] as $filename => $selected) {
                unlink($filename);
            }
            break;
    }


    print <<< _MENU_
   <ol>
   <li><a href='./pick_on.php' target="_blank">Start Picking!</a></li>
   <li><input type=submit name=action value='Load Updated Roster'></li>
    <li><input type=submit name=action value='Clear Answer History'></li>
        <li><input type=submit name=action value='Clear Absent History'></li>
        <li><input type=submit name=action value='Show Uploaded Pics'></li>
    <li><input type=submit name=action value='Logout'></li>
</ol>
_MENU_;
} else {
    ?>
    <input type=password style="background-color:gray" value="<?php echo @$_POST['code_textbox'] ?>" name=code_textbox>
    </form>
    <?php
    exit;
}
?>

</form>
