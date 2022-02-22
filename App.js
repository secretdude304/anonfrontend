import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, TextInput } from 'react-native';
import Home from "./Screens/Home";
import New from "./Screens/New";
import Postdetail from './Screens/Postdetails';
import SelectSchool from './Screens/SelectSchool';
import VerifySchool from './Screens/VerifySchools';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import SignInScreen from "./Screens/SignInScreen";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';


const AuthContext = React.createContext();

const Stack = createStackNavigator()



function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
function Register({route}) {
  const email = route.params.email
  const school = route.params.school
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);
  console.log(email)
  return (
      <View> 
        <Text>{email}</Text>
        <TextInput 
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
        title = "Sign up"
        onPress={()=> signUp({username,password,email})}
        />
      </View>
    
  ); 
}
function CreateUser(){
 const navigation = useNavigation(); 
 navigation.navigate("Home")
}
const headerstyles = {
  title:"All Posts",
  headerTintColor:"white",
  headerStyle : {
    backgroundColor:"blue"
  }
}



export default function App({navigation}) {
 
    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch (action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'SIGN_IN':
            return {
              ...prevState,
              isSignout: false,
              userToken: action.token,
            };
          case 'SIGN_OUT':
            return {
              ...prevState,
              isSignout: true,
              userToken: null,
            };
        }
      }, 
      {
        isLoading: true,
        isSignout: false,
        userToken: null,
      }
    );
    const authContext = React.useMemo(
      () => ({
        signIn: async (data) => {
          console.log(data.username)
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async (data) => {
          console.log(data.email)
          console.log(data.username)
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
    );
      
return (
  <AuthContext.Provider value={authContext}>
  <NavigationContainer>
    <Stack.Navigator>
    
       {state.userToken == null ? (
        // No token found, user isn't signed in
        <React.Fragment>
        <Stack.Screen name="VerifySchool" component = {VerifySchool}
        options = {{...headerstyles,title:"Verify school"}} /> 
        <Stack.Screen name="SelectSchool" component = {SelectSchool}
        options = {{...headerstyles,title:"Select Your School"}} /> 
        <Stack.Screen name="SignInScreen" component = {SignInScreen}
        options = {{...headerstyles,title:"Sign in"}} /> 
        <Stack.Screen name="Register" component = {Register}
        options = {{...headerstyles,title:"Register"}} /> 
        
       </React.Fragment>
  
       ) : (
       <React.Fragment>
        <Stack.Screen name="Home" component = {Home}
        options = {headerstyles} />
        <Stack.Screen name="new" component = {New}
        options = {{...headerstyles,title:"Create New Post"}} /> 
        <Stack.Screen name="detail" component = {Postdetail}
        options = {{...headerstyles,title:"View details"}} /> 
       </React.Fragment>
      )}
    </Stack.Navigator>
  </NavigationContainer>
</AuthContext.Provider>
);
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eddfdf', 
  },
});

