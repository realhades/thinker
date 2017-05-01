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
Use your own custom way of filtering through data, as in below is searches the array to see if it contains the 'key'.
Example thinker.php
```
  <?php 
  $items_to_check = ["Cheese", "Chili", "Hamburger", "Ham Sandwich"];
  $result = array();
  $txtkey = strtolower($_POST['key']);

  for ($x = 0; $x < sizeof($items_to_check); $x++) {
    $lcase = strtolower($items_to_check[$x]);
    if (strpos($lcase, $txtkey) !== false) { 
        $result[] = $items_to_check[$x];
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
### v1.0 Released 4/4/17

#### [MIT License](https://opensource.org/licenses/mit-license.php)
