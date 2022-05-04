import { CognitoUserPool, AuthenticationDetails} from "amazon-cognito-identity-js";

const poolData= {
    UserPoolId:"ap-south-1_psppVZAWJ",
    ClientId:"fi6uiflomup54urbknrlf0bdr"
}

export default new CognitoUserPool(poolData);
