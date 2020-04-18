<?php
require("../config/conexion.php");
$query = "SELECT username, ucorreo FROM usuarios ";

  #Se prepara y ejecuta la consulta. Se obtienen TODOS los resultados
  $result = $db -> prepare($query);
  $result -> execute();
  $resultado = $result -> fetchAll();
  foreach ($resultado as $fila) {
      $a = $fila[0]; 
      $b = $fila[1];
      ?>  
      <tr style="width: 680px">
          <td style="width: 200px"><?= $a?></td>
          <td style="width: 200px"><?= $b?></td>
  
      </tr>
  <?php
  };
?>