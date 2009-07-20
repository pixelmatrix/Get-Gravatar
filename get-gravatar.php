{
	"gravatar_id": "<?php
$email = $_GET['email'];
echo md5(strtolower($email));
?>"
}