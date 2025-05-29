import React, { useEffect, useState } from "react";

export const Variables = () => {
  const [runtimeConfig, setRuntimeConfig] = useState(null);

    /**
    Build time environment variables
Important: Only environment variables prefixed with REACT_APP_ will be embedded into your React build and available in the browser.
The other variables (without prefix REACT_APP_) are only available during the build process on the server, not in the browser.
     */
        const REPO_SECRET = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_REPO_SECRET : 'undefined';
        const REPO_VARIABLE = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_REPO_VARIABLE : 'undefined';
        const VERSION = typeof process !== 'undefined' && process.env ? process.env.REACT_APP_VERSION : 'undefined';

    //Deploy time?


    /**
    Run time variables
window.RUNTIME_CONFIG (Runtime configuration)
This will be available in the browser after deployment.
These are configured in yml file which uses environment variables and environment secrets setup in github environments.
 */

    // In your React component
    useEffect(() => {
        // Console log everything
        console.log('=== PROCESS.ENV ===');
        // console.log(process?.env);
        const envVars = {

            /**
Browser environment: Browsers don't have a process object (that's Node.js only)
Webpack replacement: During build, webpack finds patterns like process.env.NODE_ENV and replaces them with actual string values
No object iteration: You can't do Object.keys(process.env) because process literally doesn't exist in the browser
Specific access only: You must access each variable by its exact name: process.env.REACT_APP_VERSION
During build time: React's build process (webpack) finds all instances of process.env.VARIABLE_NAME and replaces them with the actual string values
After build: The word "process" doesn't actually exist in your bundled code - it gets completely replaced
             */
            NODE_ENV: typeof process !== 'undefined' && process.env ? process.env.NODE_ENV : 'undefined',//After webpack build, it becomes "development" or "production"
            REACT_APP_REPO_SECRET: typeof process !== 'undefined' && process.env ? process.env.REACT_APP_REPO_SECRET : 'undefined',
            REACT_APP_REPO_VARIABLE: typeof process !== 'undefined' && process.env ? process.env.REACT_APP_REPO_VARIABLE : 'undefined',
            REACT_APP_VERSION: typeof process !== 'undefined' && process.env ? process.env.REACT_APP_VERSION : 'undefined',
            PUBLIC_URL: typeof process !== 'undefined' && process.env ? process.env.PUBLIC_URL : 'undefined'
        };
        console.log(envVars);

        
        console.log('=== WINDOW.RUNTIME_CONFIG ===');
        console.log(window?.RUNTIME_CONFIG);

        // Access the runtime config that was injected during deployment
        if (window?.RUNTIME_CONFIG) {
            // Set runtime config for rendering
            setRuntimeConfig(window.RUNTIME_CONFIG || {});
        }

        // // This runs in the browser, can fetch dynamic config
        // fetch('/config.js')
        //     .then(response => response?.text())
        //     .then(configScript => {
        //     // Execute the config script
        //     eval(configScript);
        //     setApiUrl(window?.APP_CONFIG?.apiUrl);
        //     });
    }, []);


    return (
        <ul>
            <li>
                <h2>Build time</h2>
                {/* <p>{JSON.stringify(process?.env, null, 2)}</p> */}
                <span></span>
            </li>
            <li>
                <h2>Deploy time</h2>
                <span></span>
                <span></span>
            </li>
            <li>
                <h2>Runtime</h2>

            {runtimeConfig && Object.keys(runtimeConfig).length > 0 ? (
                <pre className="text-sm overflow-x-auto text-gray-700">
                {JSON.stringify(runtimeConfig, null, 2)}
                </pre>
            ) : (
                <p className="text-gray-500 italic">No runtime config available (probably in development mode)</p>
            )}
            </li>
        </ul>
    )
}