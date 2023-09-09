<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["FirstName"];
	$lastname = $inData["LastName"];
	$login = $inData["Login"];
	$password = $inData["Password"];
    $id = $inData["Id"];

	$conn = new mysqli("localhost", "Test", "TestUser", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Users set FirstName = ?, LastName = ?, Login = ?, Password = ? where ID = ?");
		$stmt->bind_param("sssss", $firstname, $lastname, $login, $password, $id);
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