<?php
require("../config/conexion.php");
$input=$_GET["pregunta3"];
$query = "SELECT DISTINCT pnombre FROM(SELECT pid FROM(SELECT cid FROM(SELECT hid FROM usuarios, reservas WHERE usuarios.uid = reservas.uid AND usuarios.username LIKE '%$input%')  AS foo, hoteles WHERE foo.hid = hoteles.hid) AS fo, ciudades WHERE fo.cid = ciudades.cid) AS f, paises WHERE f.pid = paises.pid";

  #Se prepara y ejecuta la consulta. Se obtienen TODOS los resultados
  $result = $db -> prepare($query);
  $result -> execute();
  $resultado = $result -> fetchAll();
  foreach ($resultado as $fila) {
      $a = $fila[0]; 
      ?>  
      <tr style="width: 680px">
          <td style="width: 200px"><?= $a?></td>
  
      </tr>
  <?php
  };
?>