<?php
require("../config/conexion.php");
$input=$_GET["pregunta2"];
echo $input;
$query = "SELECT DISTINCT cnombre FROM ciudades, paises WHERE LOWER(pnombre) LIKE LOWER(?) AND ciudades.pid = paises.pid";

  #Se prepara y ejecuta la consulta. Se obtienen TODOS los resultados
  $result = $db -> prepare($query);
  echo $query;
  $result->bindValue(1, '%'.$input.'%');
  echo $query;
  
 
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