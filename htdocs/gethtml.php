<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");

$page = $_REQUEST["p"];
echo readfile($page);
?>