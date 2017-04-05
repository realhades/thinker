# thinker
Use jQuery to give suggestions as typing in an input box

## To Use
Include the thinker.js file after jQuery Example `<script src="thinker.js"></script>`
Set thinker to desired input box
Example
```
$("#inputboxid").thinker();

```
Create a thinker.php file where server side processing is done using the sent data 'key' and 'maxResults'
return with key 'items' as a JSON type.
Use your own custom way of filtering through data, as in below is searches for if the query contains the 'key' by 
using wildcards on either side.  Could check if starts with key by using wildcard at end of the key.
Example thinker.php
```
  <?php 
  $sql = "SELECT [column] FROM [table] WHERE [column] LIKE (?)"; 
  // Append wildcards to check if key is found anywhere in column
  $param = ['%' . $_POST['key'] . '%'];
  $stmt = sqlsrv_query($conn, $sql, $param);  
  if (!$stmt) {
	die( print_r( sqlsrv_errors(), true));
  }

  $result = array();
  while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC)) {
  	array_push($result, $row[0]);
  }
// Encode and put key as 'items' so thinker.js can find the data
echo json_encode(array('items' => $result));
  ?>
```
  
## Options
To use
```
  $("#inputboxid").thinker({ backgroundColorHover:'red' } );

  url: link to data source (default 'thinker.php')
  type: GET or POST (default 'POST')
  backgroundColor: (default 'white')
  textColor: (default 'black')
  backgroundColorHover: (default 'blue')
  textColorHover: (default 'white')
  minLength: Minimun characters needed before searching (default 1)
  maxResults: Max results to show (default 10)
  ```
