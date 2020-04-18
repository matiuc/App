<?php
require("../config/conexion.php");
$input=(int)$_GET["pregunta4"];

$query = "SELECT DISTINCT SUM(vprecio) from(SELECT vid FROM usuarios, tickets WHERE usuarios.uid = tickets.uid AND usuarios.uid = $input) as foo, viajes WHERE foo.vid = viajes.vid";

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