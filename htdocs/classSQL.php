<?php

class SQL {

    private $con;
    private $dbname;
    private $errno;
    private $qtitle;
    private $qresul;
    private $json;

    private $njogos;
    private $ijogo;
    private $nimages;
    private $iimage;
    
    public function __construct($dbname) {
        $this->dbname = $dbname;
    }

    public function connect() {
        $this->con = mysqli_connect("localhost", "root", "", $this->dbname);
        $this->errno = mysqli_connect_errno();
        if ($this->errno) {
            return false;
        } else {
            return true;
        }
    }
    
    public function jogos_init() {
        $this->ijogo = 1;
        $query = "SELECT COUNT(*) AS njogos FROM nfsgames";
        $this->qresul = mysqli_query($this->con, $query);
        
        print_r($this->qresul);
        
        $this->errno = mysqli_errno($this->con);
        if ($this->errno) {
            return false;
        } else {
            return true;
        }
    }
    
    public function jogo_get() {
        $query = "SELECT A.GameName,A.LaunchDate,A.GameDescr,A.Imgsdir,A.Imgscover,B.StyleName FROM nfsgames A,nfsstyles B ";
        $query .= "WHERE (A.idStyle=".$this->ijogo." AND B.idStyle=".$this->ijogo.")";
        $this->qtitle = "jogo";
        $this->qresul = mysqli_query($this->con, $query);
    }
    
    public function jogo_hasPrev() {
        return (($this->ijogo)>1);
    }
    
    public function jogo_goPrev() {
        $this->ijogo--;
    }
    
    public function jogo_hasNext() {
        return (($this->ijogo)<($this->njogos));        
    }
    
    public function jogo_goNext() {
        $this->ijogo++;
    }
    
    public function ErrCode() {
        return $this->errno;
    }

    public function close() {
        mysqli_close($this->con);
    }

    public function Fetch($query,$command) {
        $n = 0;
        $result = mysqli_query($this->con, $command);
        $this->errno = mysqli_errno($this->con);
        if ($this->errno) {
            return false;
        }
        while ($arow = mysqli_fetch_assoc($result)) {
            $i = 0;
            foreach ($arow as $key => $value) {
                $objbuf[$i++] = '"'.$key.'":"' . $value . '"';
            }
            $rowbuf[$n++] = '{' . join(',', $objbuf) . '}';
        }
        $this->json = '{"'.$query.'":[' . join(',', $rowbuf) . ']}';
    }

    public function qtitle() {
        return $this->qtitle;
    }
    
    public function qresul() {
        return $this->qresul;
    }
    
    public function Respond() {
        echo $this->json;
    }
}

?>