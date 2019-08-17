
var text;
var line;
var gamekey;
var game;
var atrans;
var fparray = [];

function row(nome, pre, pos, prelinha) {
	this.nome = nome;
	this.pre = pre;
	this.pos = pos;
	this.prelinha = prelinha;
	return this.row;
}
function fpclass() {
	this.idx = 0;
	this.enaCheck = false;
	this.preLine = false;
	this.over = false;
	this.fpcur = [];
	this.fpgetrow = function () {
		this.over = false;
		this.fpcur = fparray[this.idx];
		if (this.fpcur.prelinha === false) {
			this.preLine = false;
			this.enaCheck = true;
		} else {
			this.preLine = true;
			this.enaCheck = false;
		}
	};
	this.next = function () {
		this.idx++;
		if (this.idx < fparray.length) {
			this.fpgetrow();
		} else {
			this.over = true;
		}
	};
	this.reset = function () {
		this.idx = 0;
		this.fpgetrow();
	};
	this.init = function () {
		fparray = [];
		fparray.push(new row('titulo', '<div id="imgtitle"><strong><span class="style1">', '</span>', false));
		fparray.push(new row('imagem', '<div id="jogoimg"><img src="', '"', false));
		fparray.push(new row('data', '<p>Data de Lançamento: ', '</p>', false));
		fparray.push(new row('genero', '<p>Gênero: ', '</p>', false));
		fparray.push(new row('descr', '<p>', '</p>', '<p>&nbsp;</p>'));
	};
	this.check = function () {
		if (this.over) {
			return false;
		}

		if (this.enaCheck) {
			var tempidx = line.search(RegExp(this.fpcur.pre, "i"));
			if (tempidx >= 0) {
				var tempxt = line.substr(tempidx + this.fpcur.pre.length);
				tempidx = tempxt.indexOf(this.fpcur.pos);
				if (tempidx >= 0) {
					line = tempxt.substr(0, tempidx);
					gamekey = this.fpcur.nome;
					return true;
				}
			}
		} else if (this.preLine) {
			if (line.indexOf(this.fpcur.prelinha) >= 0) {
				this.enaCheck = true;
			}
		}
		return false;
	};
}

var fparse = new fpclass();

function ficlass() {
	this.enaCheck = false;
	this.fiparms = new row('imgs', '<a href="', '"', '<div id="imagestxt">');
	this.reset = function () {
		this.enaCheck = false;
	};
	this.check = function () {
		if (this.enaCheck) {
			var tempidx = line.indexOf(this.fiparms.pre);
			if (tempidx >= 0) {
				var tempxt = line.substr(tempidx + this.fiparms.pre.length);
				tempidx = tempxt.indexOf(this.fiparms.pos);
				if (tempidx >= 0) {
					line = tempxt.substr(0, tempidx);
					return true;
				}
			}
		} else {
			if (line.indexOf(this.fiparms.prelinha) >= 0) {
				this.enaCheck = true;
			}
		}
		return false;
	};
}

var iparse = new ficlass();

function cgame() {
	this.titulo = "";
	this.imagem = "";
	this.data = "";
	this.genero = "";
	this.descr = "";
	this.imgini = 0;
	this.imgend = 0;
	return this.cgame;
}
;

var games = Array(18);
var imgarr = [];
var genarr = [''];
var imgidx = 0;

function txtTrans() {
	xmlhttp = new XMLHttpRequest();
	var openstr = 'gettrans.php';
	xmlhttp.open("GET", openstr, false);
	xmlhttp.send();
	var ttrans = xmlhttp.responseText;
	atrans = JSON.parse(ttrans);
	var epos = -1;
	for (var i = 0; i < atrans.length; i++) {
		if (atrans[i].orig === '&') {
			epos = i;
		}
	}
	if (epos >= 0) {
		var etrans = atrans.splice(epos, 1);
		i = atrans.unshift(etrans[0]);
	}
	butEna('b1', true);
}

function txtHtml(fname) {
	xmlhttp = new XMLHttpRequest();
	var openstr = 'gethtml.php?p=' + fname;
	xmlhttp.open("GET", openstr, false);
	xmlhttp.send();
	text = xmlhttp.responseText;
}

function txtrip() {
	var cut = text.indexOf("\n");
	if (cut < 0) {
		line = text;
		text = "";
	} else {
		line = text.slice(0, cut - 1);
		text = text.slice(cut + 1, text.length - 1);
	}
	return (text.length > 0);
}

function txtAdjust(selstr) {
	var tmpstr = selstr;
	for (var i = 0; i < atrans.length; i++) {
		var otrans = atrans[i];
		while (tmpstr.search(otrans.orig) >= 0) {
			tmpstr = tmpstr.replace(otrans.orig, otrans.subs);
		}
	}
	return tmpstr;
}

function jsHtmls() {
	logClear();
	document.getElementById('b1m').innerHTML = 'ESCANEANDO OS ARQUIVOS HTML E EXTRAINDO AS INFORMAÇOES PERTINENTES. ';
	fparse.init();
	for (var j = 1; j <= 18; j++) {
		var jName = ((j < 10) ? '0' : '') + j.toString();
		var jFile = 'j' + jName + '.html';
		var iFile = 'i' + jName + '.html';
		logAppend('Escaneando os arquivos: ' + jFile + ' ');
		txtHtml(jFile);
		game = new cgame();
		fparse.reset();
		while (txtrip()) {
			if (line.length >= 0) {
				if (fparse.check()) {
					game[gamekey] = line;
					fparse.next();
				}
			}
		}
		logLine(iFile);
		txtHtml(iFile);
		iparse.reset();
		game.imgini = imgidx;
		while (txtrip()) {
			if (line.length >= 0) {
				if (iparse.check()) {
					imgarr[imgidx++] = line;
				}
			}
		}
		game.imgend = imgidx - 1;
		games[j] = game;
	}
	document.getElementById('b1r').innerHTML = '... PRONTO';
	butEna('b1', false);
	butEna('b2', true);
}

function butEna($but, $stat) {
	if ($stat) {
		document.getElementById($but).removeAttribute('disabled');
	} else {
		document.getElementById($but).setAttribute('disabled', 'disabled');
	}
}

function logClear() {
	document.getElementById('log').innerHTML = "";
}

function logAppend(str) {
	document.getElementById('log').innerHTML += (str + ' ');
}

function logLine(ptr) {
	str = ptr + '<br>';
	logAppend(str);
}

function jsDBmake() {
	document.getElementById('b2m').innerHTML = 'Criando o banco de dados, estrutura de tabelas e índices. ';
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", 'nfsDbMake.php', false);
	xmlhttp.send();
	logClear();
	logAppend(xmlhttp.responseText);
	document.getElementById('b2r').innerHTML = '... PRONTO';
	butEna('b2', false);
	butEna('b3', true);
}

function baseName(str) {
	return str.substr(str.lastIndexOf("/") + 1);
}

function generoToId(str) {
	var genidx = genarr.indexOf(str);
	if (genidx >= 0) {
		return genidx;
	} else {
		genarr = genarr.concat([str]);
		return 1 - genarr.length;
	}
}

function transferData() {
	var d = "";
	var v = "";
	var toSend = "";
	var toSQL = "";
	for (var i = 1; i <= 18; i++) {
		d = '(';
		v = '(';
		game = games[i];
		for (var def in game) {
			if ((def === 'imgini') || (def === 'imgend')) {
				d += (def + ',');
				v += game[def] + ',';
			} else if (def === 'genero') {
				d += ('idGenero,');
				var g=generoToId(game[def]);
				if (g<=0) {
					toSQL = "INSERT INTO `nfsgeneros` (`nome`) VALUES ('" + game[def] + "');\r\n";
					toSend += toSQL;
					v += -g + ',';
				} else {
					v += g + ',';
				}
			} else {
				d += (def + ',');
				v += ('"' + ((def === 'imagem') ? baseName(game[def]) : game[def]) + '",');
			}
		}
		d = d.substr(0, d.length - 1) + ')';
		v = v.substr(0, v.length - 1) + ')';
		toSQL = 'INSERT INTO `nfsjogos` ' + d + ' VALUES ' + v + ";\r\n";
		toSend += toSQL;
		logLine(toSQL);
		for (var j = game.imgini; j <= game.imgend; j++) {
			v = ("(" + i + ",'" + baseName(imgarr[j]) + "')");
			toSQL = 'INSERT INTO `nfsimages` (`idJogo`, `imgs`) VALUES ' + v + ";\r\n";
			toSend += toSQL;
			logLine(toSQL);
		}
		logLine('');
	}
//	for (i = 1; i < genarr.length; i++) {
//		v = genarr[i];
//		toSQL = "INSERT INTO `nfsgeneros` (`nome`) VALUES ('" + v + "');\r\n";
//		toSend += toSQL;
//		logLine(toSQL);
//	}
//	logLine(toSend);
//	var fs = require('fs');
//	fs.writeFileSync('nfsDbFill.sql',toSend);

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", 'nfsDbMake.php', false);
	xmlhttp.setRequestHeader("Content-type", "text/plain; charset=utf-8");
//	xmlhttp.setRequestHeader("Content-type",'application/x-www-form-urlencoded');
	xmlhttp.send(toSend);
	logClear();
	logLine(xmlhttp.responseText);
}


function jsDBfill() {
	butEna('b3', false);
	document.getElementById('b3m').innerHTML = 'Transferindo par o banco de dados os dados obtidos dos arquivos HTML.';
	logClear();
	transferData();
	logLine('');
	document.getElementById('b3r').innerHTML = '... PRONTO';
}
