# thinker
Use jQuery to give suggestions as typing in an input box

## To Use
Include the thinker.js file after jQuery Example `<script src="thinker.js"></script>`
Set thinker to desired input box and create a div with an id of 'completion-results': 
Example
```
$("#inputboxid").thinker();
...
<div id="completion-results"></div>
```
Create a thinker.php file where server side processing is done using the sent data 'key' and 'maxResults'
**Note: Currently each individual data piece needs to be wrapped in a `<li>...</li>` tag**
Example thinker.php
```
  <?php 
  $sql = "SELECT TOP " . $_POST['maxResults'] . " [column] FROM [table] WHERE [column] LIKE (?)"; 
  $param = ['%' . $_POST['key'] . '%'];
  $stmt = sqlsrv_query($conn, $sql, $param);  
  if (!$stmt) {
	  die( print_r( sqlsrv_errors(), true));
  }
  $result = "";
  while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_NUMERIC)) {
    $result = $result . "<li>" . $row[0] . "</li>";
  }
  echo $result;
  ?>
```
  
## Options
To use
```
  $("#inputboxid").thinker({ backgroundColorHover:'red' } );

  url: link to data source (default 'thinker.php')
  type: GET or POST (default 'POST')
  completionObject: ID of DOM elemnt, usually a div (default $( "#completion-results" ))
  backgroundColor: (default 'white')
  textColor: (default 'black')
  backgroundColorHover: (default 'blue')
  textColorHover: (default 'white')
  minLength: Minimun characters needed before searching (default 1)
  maxResults: Max results to show ** Sends to PHP file, does not enforce yet (default 10)
  ```
