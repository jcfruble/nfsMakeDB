<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

$tarray = get_html_translation_table();
reset($tarray);

$json = '[';
foreach ($tarray as $key => $value) {
	$torig = '{ "orig" : "' . addslashes($key) . '" , ';
	$tsubs = '"subs" : "' . addslashes($value) . '" },';
	$json .= $torig . $tsubs;
}
$json[strlen($json) - 1] = ']';
echo $json;
?>