/* eslint-disable react/no-children-prop */
import React from "react";
import { signIn } from "next-auth/react";

const AuthDialog: React.FC<{ lng: string }> = (lng) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 text-b lack">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="space-y-4">
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-28 bg-blue-500 text-white rounded-lg py-3"
            >
              Login
            </button>
          </form>

          <div className="flex items-center space-x-2">
            <div className="border-t flex-1"></div>
            <span className="text-gray-600">OR</span>
            <div className="border-t flex-1"></div>
          </div>

          <button
            onClick={() => signIn("line")}
            className="w-full bg-green-600 text-white rounded-lg py-3"
          >
            Login with Line
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthDialog;
