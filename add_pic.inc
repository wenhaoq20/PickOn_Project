<head>
    <title>Add Your PickOn Picture</title>
    <style>
        body {
            font-family: Helvetica, sans-serif;
            //font-size: 12px;
        }

        table, td {
            border: 1px solid #000;
            border-collapse: collapse;
            padding: 2px 4px;
        }
    </style>

    <script>
        function findId() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("resultsDiv").innerHTML = this.responseText;
                    if(!this.responseText.includes("not found")) {
                        document.getElementById("successDiv").style.display="block";
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

    <script>
        function loadFile(event) {
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('thumb');
                output.src = reader.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        ;
    </script>
</head>

<?php
?>
<body>
    <h1>Add Your PickOn Picture</h1>

    <label for='studentId'>StudentID #:</label>
    <<input type='text' id='studentId' size="8" maxlength="8" placeholder="12345678" onkeyup="findId()">
    <form enctype="multipart/form-data" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="POST">
        <p>
        <div id='resultsDiv'> </div>
        <div id='successDiv' style='display:none;'>
        <input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
        Choose an image to upload: <input name="uploadedfile" type="file" accept="image/*" onchange="document.getElementsByName('upload_file_submit')[0].value = 'Upload ' + this.value.replace(/.*[\/\\]/, '');loadFile(event);"/><br />
        <input type="submit" value="Upload File" name="upload_file_submit"/>
        <br><img width="100px" height="100px" id="thumb"/>
        <p>
            <em>Note: Your image will be displayed with width=400 height=340<em>
    </div>

        <hr>

    </form>

</body>


<?php
$phpFileUploadErrors = array(
    0 => 'There is no error, the file uploaded with success',
    1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
    2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
    3 => 'The uploaded file was only partially uploaded',
    4 => 'No file was uploaded',
    6 => 'Missing a temporary folder',
    7 => 'Failed to write file to disk.',
    8 => 'A PHP extension stopped the file upload.',
);

if (isset($_POST['upload_file_submit'])) {
    include_once 'pickon.conf';

    $target_path = BIO_IMAGE_DIR . '/' . $_POST['studentName'];
    if (move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
        chmod($target_path, 0666); // rw by all
        echo "The image " . basename($_FILES['uploadedfile']['name']) .
        " has been added to PickOn for {$_POST['studentName']}. <p> Here's what it looks like:<p>";
        echo "<img width='400px' height='340px' src='$target_path'><p>Thanks for uploading and upload again soon!";
    } else {
        echo $phpFileUploadErrors[$_FILES["uploadedfile"]["error"]];
    }
}
?>