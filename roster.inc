<?php

ini_set("auto_detect_line_endings", true);

function read_roster($roster_data_file) {

    if (file_exists($roster_data_file)) {
        // read the entire roster into the $roster array
        // $roster = file($roster_data_file);
       // $fp = fopen($roster_data_file,'r');
        $str = file_get_contents($roster_data_file);
       // $csv = array_map('str_getcsv', file($roster_data_file));
        //fclose($fp);
        // $roster = explode("\r", $str);
        $roster = preg_split('/\r\n|\r|\n/', $str);
        // first line of roster file should have keys (tab separated) for student information so use the first element of $roster to get keys
        $keys = explode("\t", $roster[0]);

        // get the indices of information we want
        $student_name_index = array_search('StudentName', $keys);
        $email_index = array_search('Email', $keys);
        $id_index = array_search('ID', $keys);
        // populate the information arrays
        for ($i = 1; $i < count($roster); $i++) {
            if(empty($roster[$i])) continue;
            $entry = explode("\t", $roster[$i]);
            array_walk($entry, 'trim_val');
            if(count($entry)==count($keys)) { 
                $data[] = array_combine($keys, $entry);
            }
        }
    }

    return !empty($data) ? $data : array();
}

function trim_val(&$val, $key) {
    $val = trim($val);
}

function arrayfile_to_array($filepath) {

// This function reads the file at $filepath and returns an array. It is
// assumed that the file being read was a serialized array (perhaps created
// using array_to_arrayfile)
    $fsize = @filesize($filepath);
    if ($fsize > 0) {
        $fp = fopen($filepath, "r+");
        $encoded = fread($fp, $fsize);
        fclose($fp);
        return unserialize($encoded);
    } else {
        echo "$filepath does not exist!";
        return false;
    }
}

function array_to_arrayfile($theArray, $filepath) {
// This function serializes an array in $theArray and saves it in the
// file at $filepath. The file may then be converted back into an array
// by using the arrayfile_to_array() function)
    if ($fp = fopen($filepath, "w+")) {
        $encoded = serialize($theArray);
        fwrite($fp, $encoded);
        fclose($fp);
    } else {
        echo "Unable to write array to $filepath";
        return false;
    }
}

?>