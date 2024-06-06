import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const AuthCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      AuthCtx.authenticated(token);
    } catch (error) {
      console.log(error);
      Alert.alert("Signup failed!", `An error occured try later`);
    }
    setIsAuthenticating(false);
  }

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
