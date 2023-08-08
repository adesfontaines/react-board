/* eslint-disable react/no-children-prop */
import React from 'react';
import MicrosoftLogin from 'react-microsoft-login';

const AuthDialog: React.FC = () => {
    const CLIENT_ID = "1f6f0d65-b614-45b6-8346-79ac0c61bbe2";

    const authHandler = (err: any, data: any) => {
        console.log(err, data);
    };
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 text-b lack">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="space-y-4">
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input type="password" id="password" name="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500" />
                        </div>
                        <button type="submit" className="w-28 bg-blue-500 text-white rounded-lg py-3">Login</button>
                    </form>

                    <div className="flex items-center space-x-2">
                        <div className="border-t flex-1"></div>
                        <span className="text-gray-600">OR</span>
                        <div className="border-t flex-1"></div>
                    </div>

                    <MicrosoftLogin clientId={CLIENT_ID} redirectUri='http://localhost:3000/' authCallback={authHandler} children={undefined}></MicrosoftLogin>

                    <button className="w-full bg-gray-600 text-white rounded-lg py-3">
                        Login with Microsoft
                        <i className="ms-Icon ms-Icon--AADLogo ms-Button-icon"></i>
                    </button>
 
                    <button className="w-full bg-red-600 text-white rounded-lg py-3">

                        Login with Google

                    </button>
                </div>
            </div>
        </div>


    );
};

export default AuthDialog;
