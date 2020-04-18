<?php
require("../config/conexion.php");
$input=$_GET["pregunta6"];
$arreglo=explode(',', $input);
$query = "SELECT DISTINCT f.uid, usuarios.unombre, f.sum FROM(SELECT fo.uid, SUM(fo.vprecio) FROM(SELECT foo.uid, viajes.vprecio FROM( SELECT * FROM tickets WHERE tickets.xfecha_compra BETWEEN '$arreglo[0]' AND '$arreglo[1]') AS foo, viajes WHERE foo.vid = viajes.vid) AS fo GROUP BY fo.uid) as f, usuarios WHERE f.uid = usuarios.uid ORDER BY f.uid";

  #Se prepara y ejecuta la consulta. Se obtienen TODOS los resultados
  $result = $db -> prepare($query);
  $result -> execute();
  $resultado = $result -> fetchAll();
  foreach ($resultado as $fila) {
      $a = $fila[0]; 
      $b = $fila[1];
      $c = $fila[2];
      ?>  
      <tr style="width: 680px">
          <td style="width: 200px"><?= $a?></td>
          <td style="width: 200px"><?= $b?></td>
          <td style="width: 200px"><?= $c?></td>
  
      </tr>
  <?php
  };
?>