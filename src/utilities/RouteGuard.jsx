import React from "react";
import { Route } from "react-router-dom";

function RouteGuard(props){
	const conditionOfRender = { props };
	return <>{conditionOfRender && <Route {...props} />}</>;
}

export default RouteGuard;
