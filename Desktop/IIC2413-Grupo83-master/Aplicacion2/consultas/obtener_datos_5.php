<?php
require("../config/conexion.php");
$input=$_GET["pregunta5"];

$query = "SELECT DISTINCT fo.uid, fo.unombre, fo.fecha_ingreso, fo.fecha_salida, hoteles.hnombre FROM(SELECT usuarios.uid, usuarios.unombre, foo.fecha_ingreso, foo.fecha_salida, foo.hid FROM(SELECT * FROM reservas WHERE reservas.fecha_ingreso >= '2020-01-01' AND reservas.fecha_salida <= '2020-03-31') AS foo, usuarios WHERE usuarios.uid = foo.uid) AS fo, hoteles WHERE fo.hid = hoteles.hid";

  #Se prepara y ejecuta la consulta. Se obtienen TODOS los resultados
  $result = $db -> prepare($query);
  $result -> execute();
  $resultado = $result -> fetchAll();
  foreach ($resultado as $fila) {
      $a = $fila[0]; 
      $b = $fila[1];
      $c = $fila[2]; 
      $d = $fila[3];
      $e = $fila[4]; 
      ?>  
      <tr style="width: 680px">
          <td style="width: 200px"><?= $a?></td>
          <td style="width: 200px"><?= $b?></td>
          <td style="width: 200px"><?= $c?></td>
          <td style="width: 200px"><?= $d?></td>
          <td style="width: 200px"><?= $e?></td>

  
      </tr>
  <?php
  };
?>