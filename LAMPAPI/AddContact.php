<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["FirstName"];
	$lastname = $inData["LastName"];
	$email = $inData["Email"];
	$phonenumber = $inData["PhoneNumber"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "Test", "TestUser", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (FirstName,LastName,Email,PhoneNumber,UserID VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $firstname, $lastname, $email, $phonenumber,$userId);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>