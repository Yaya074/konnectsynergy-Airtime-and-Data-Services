import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
    <AuthContext.Provider value={{
        user,
        setUser,
        register:async(email, password)=>{
            try{
            await auth().createUserWithEmailAndPassword(email, password);
            }catch(e){
                alert(e);
            }
        },
         signIn: async(email, password)=>{
            try{
                await auth().signInWithEmailAndPassword(email, password);
            }catch(e){
                alert(e)
            }            
         },
          signOut: async()=>{
                try{
                    await auth().signOut();
                }catch(e){
                    alert(e);
                }
          }, 
          forgotPassword: async(email)=>{
            try{
                await auth().sendPasswordResetEmail(email);
            }catch(e){
                alert(e);
            }
          }
    }}> 

            {children}

    </AuthContext.Provider>
    )
  
}

export default AuthProvider

const styles = StyleSheet.create({})
