import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import auth from '../firebase/config';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {signIn, useSession} from 'next-auth/react'

export const UserProvider = createContext();

export default function AuthContext({ children }) {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true)
    const {data: userData, status} = useSession();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser, 'current user')
            setUser(currentUser)
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])


    const registerUsingCredintial = async (fullName, email, password, photoURL) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user, {
                displayName: fullName,
                photoURL: photoURL
            })
            setUser(result.user)
            return {
                success: true,
                message: 'Registration Successfully',
                resposne: result
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            };

        }
    };
    const loginUsingCredintial = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user)
            return {
                success: true,
                message: 'Login Successfully',
                resposne: result
            }
            
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            };
        }
    }
    const loginWithGoogle = async () => {
        try {
            new signIn('google');
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const photoURL = user.photoURL || user.providerData[0]?.photoURL || null;

            if (!user.photoURL && photoURL) {
                await updateProfile(user, { photoURL });
            }
            setUser(user);

            return {
                success: true,
                message: 'Login Successfully',
                response: result
            }
        } catch (error) {
            console.log('login with google error', error);
            return {
                error: true,
                message: error.message,
                code: error.code
            };
        }
    };

    const profileUpdate = async (name, photoURL) => {

        try {
            const result = await updateProfile(user, {
                displayName: name,
                photoURL
            })
            setUser(user);
            return {
                success: true,
                message: 'Profile update Successfully',
                response: result
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }

    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {
                success: true,
                message: 'User Logout Successfully'
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }
    }

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return {
                success: true,
                message: 'Send reset password link on your email. please check'
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                code: error.code
            }
        }
    }



    const data = {
        user,
        setUser,
        registerUsingCredintial,
        loginUsingCredintial,
        loginWithGoogle,
        logout,
        loading,
        profileUpdate,
        resetPassword
    }
    return <UserProvider.Provider value={data}>{children}</UserProvider.Provider>
}