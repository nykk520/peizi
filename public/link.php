<?php
// Get the URL parameter value
$url = $_GET['url'];
$url = "//".$url;
echo "<meta http-equiv='refresh' content='0;url=$url'>";
exit;
?>