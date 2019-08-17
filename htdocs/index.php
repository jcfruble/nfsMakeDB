<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title></title>
		<script type="text/javascript" src="makedb.js"></script>
	</head>
	<body onload="txtTrans()">
		<dl>
			<dt><button id="b1" disabled="disabled" onclick="jsHtmls()">Parse HTML sources</button></dt>
			<dd><span id="b1m">&nbsp;</span><span id="b1r">&nbsp;</span></dd>
			<dt><button id="b2" disabled="disabled" onclick="jsDBmake()">Database Structure</button></dt>
			<dd><span id="b2m">&nbsp;</span><span id="b2r">&nbsp;</span></dd>
			<dt><button id="b3" disabled="disabled" onclick="jsDBfill()">Database Contents</button></dt>
			<dd><span id="b3m">&nbsp;</span><span id="b3r">&nbsp;</span></dd>
		</dl>
		<div id="log">&nbsp;</div>
	</body>
</html>
