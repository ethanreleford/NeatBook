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
		$stmt = $conn->prepare("INSERT into Contacts (FirstName,LastName,Email,PhoneNumber,UserID) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $firstname, $lastname, $email, $phonenumber,$userId);
		$stmt->execute();

		$stmt2 = $conn->prepare("SELECT * FROM Contacts WHERE FirstName like ? and LastName like ? and Email like ? and PhoneNumber like ? and UserID = ?");
		$stmt2->bind_param("sssss", $firstname, $lastname, $email, $phonenumber,$userId);
		$stmt2->execute();

		$result = $stmt2->get_result();

		if($row = $result->fetch_assoc())
		{
			returnWithInfo($row['ID'] );
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
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

	function returnWithInfo( $id )
	{
		$retValue = '{"id":' . $id . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>