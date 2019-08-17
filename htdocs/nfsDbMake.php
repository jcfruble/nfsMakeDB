
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=UTF-8");
//header('Content-type: text/plain; charset=UTF-8');
//header('Content-type: application/x-www-form-urlencoded');

$dbhnd = mysqli_connect("127.0.0.1", "root", "");
mysqli_set_charset($dbhnd, "utf8");
if (mysqli_connect_error($dbhnd)) {
	die('Connect Error: ' . mysqli_connect_error($dbhnd));
}

$rm = filter_input(INPUT_SERVER,"REQUEST_METHOD");
if ($rm == 'POST') {
	if (isset($HTTP_RAW_POST_DATA)) {
		$queryfile = file_get_contents('php://input');
	} else {
		$queryfile=' query not received ';
	}
	mysqli_select_db($dbhnd, 'nfssitedb');
}
if ($rm == 'GET') {
	$queryfile = file_get_contents("nfsDbCreate.sql");
}

//file_put_contents('phprecv.txt',$queryfile);
$queryarray = explode(";\r\n",$queryfile);
$querydesc="";
foreach ($queryarray as $querycomm) {
	$querydesc.= "SQL_COMMMAND\r\n";
	$querycomt= trim($querycomm);
	$querydesc.= $querycomt;
	if ($querycomt != "") {
	mysqli_query($dbhnd, $querycomt);
	if (mysqli_error($dbhnd)) {
		echo $querycomt."\r\n";
		die('------- Query Error: ' . mysqli_error($dbhnd));
	}
	}
	$querydesc.= "\r\n";
}
//$fitesc = mysqli_real_escape_string($dbhnd, $queryfile);
file_put_contents('phpecomms.txt',$querydesc);
//echo "<ul type='circle'>";

//$qstr = str_replace("\r\n","",$queryfile);
//$qtok = strtok($qstr, ";");
//while ($qtok !== false) {
//	$qhtml = htmlentities($qtok,ENT_COMPAT);
//	$qtom = mysqli_escape_string($dbhnd, $qtok);
//	echo "<li><pre>" . $qhtml . "</pre></li>";
//	mysqli_query($dbhnd, $qtom);
//	if (mysqli_error($dbhnd)) {
//		die('Create Db - Query Error: ' . mysqli_error($dbhnd));
//	}
//	$qtok = strtok(";");
//}


//foreach ($commands as $comm) {
//	$fitesc = mysqli_real_escape_string($dbhnd, $fit);
//	$fitent = htmlentities($fitesc, ENT_COMPAT, "UTF-8", true);
//	echo "<li><pre>" . htmlentities($comm) . "</pre></li>";
//}

//$qarr = explode(";",$qstr);
//for ($i=0; $i<count($qarr); $i++) {
//foreach ($qarr as $qitem) {
//	$fitesc = mysqli_real_escape_string($dbhnd, $fit);
//	$fitent = htmlentities($fitesc, ENT_COMPAT, "UTF-8", true);
//q	echo "<li><pre>" . mysqli_real_escape_string($dbhnd, addslashes($qarr[$i])) . "</pre></li>";
//}
//echo "</ul>";

mysqli_close($dbhnd);
?>
