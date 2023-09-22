<?php
	$inData = getRequestInfo();
	
	$firstname = $inData["FirstName"];
	$lastname = $inData["LastName"];
	$login = $inData["Login"];
	$password = $inData["Password"];

	$conn = new mysqli("localhost", "Test", "TestUser", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$flag = $conn->prepare("SELECT * FROM Users WHERE Login = ?");
		$flag->bind_param("s", $login);
		$flag->execute();

		$result = $flag->get_result();

		if ($row = $result->fetch_assoc()) {
			returnWithInfo(0);
		}
		else {
			$stmt = $conn->prepare("INSERT into Users (FirstName,LastName,Login,Password) VALUES(?,?,?,?)");
			$stmt->bind_param("ssss", $firstname, $lastname, $login, $password);
			$stmt->execute();
	
			$stmt2 = $conn->prepare("SELECT ID from  Users where (FirstName = ? and LastName = ? and Login = ? and Password = ?)");
			$stmt2->bind_param("ssss", $firstname, $lastname, $login, $password);
			$stmt2->execute();
	
	
			$result2 = $stmt2->get_result();
	
			if ($row2 = $result2->fetch_assoc()) {
				returnWithInfo( $row2['ID'] );
			}
			else {
				returnWithError("Error. Please try again.");
			}

			$stmt->close();
			$stmt2->close();
		}
	
		$flag->close();
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
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>