<?php

include_once '../roster.inc';

$roster = read_roster(ROSTER_FILE);

if (isset($_POST['studentId'])) {
    // $id_index = array_search(trim($_POST['studentId']), $roster['ids']);
    $id_index = searchForId(str_replace(array("-"," "),"", trim($_POST['studentId'])), $roster);
    if ($id_index === false) {
        print $_POST['studentId'] . ' not found';
    } else {
        print array2Table(array(array($roster[$id_index]['ID'], $roster[$id_index]['StudentName'], $roster[$id_index]['Email'])));
        ?>
        <br>
        <input type="hidden" name="studentName" value="<?php echo trim($roster[$id_index]['StudentName']); ?>" />
        <input type="hidden" name="studentId" value="<?php echo trim($roster[$id_index]['ID']); ?>" />

                    <?php
                }
            }

            function array2Table($data) {
                echo '<table border=1>';
                foreach ($data as $row) {
                    echo "<tr>";
                    foreach ($row as $cell) {
                        echo "<td>" . escape($cell) . "</td>";
                    }
                    echo "</tr>";
                }
                echo '</table>';
            }

            function escape($string) {
                return htmlspecialchars($string, ENT_QUOTES);
            }

            function searchForId($id, $array) {
                foreach ($array as $key => $val) {
                    if ($val['ID'] === $id) {
                        return $key;
                    }
                }
                return false;
            }
            