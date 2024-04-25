"use strict";

import { index } from "./profile.controller";
import router from "koa-router";

import { getProfilesByCountry , getUserCountByModuleAndScore} from "./profile.controller"; // Import the new controller method

const profiles = router();

profiles.get("/", index);

profiles.get("/getProfilesByCountry", getProfilesByCountry); // New route for fetching profiles
profiles.get("/getUserCountByModuleAndScore", getUserCountByModuleAndScore);  //New route for fetching User profile by module score per countrywise

export default profiles;
