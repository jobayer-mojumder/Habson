<?php 
	/*$name=$_POST['name'];
	$email=$_POST['email'];
	$subject=$_POST['subject'];
	$message=$_POST['comments'];
	
		$to = "mahajur88@gmail.com";
		$subject = $subject;
		$msg = $message." From ".$name;
		$headers = $email;

		mail($to,$subject,$msg,$headers);*/
		$to      = 'jobayer.pro@gmail.com';
		$subject = 'the subject';
		$message = 'hello';
		$headers = 'From: mahajur88@gmail.com' . "\r\n" .
		    'Reply-To: webmaster@example.com' . "\r\n" .
		    'X-Mailer: PHP/' . phpversion();

		mail($to, $subject, $message, $headers);
?>