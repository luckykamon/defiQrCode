import {defineConfig} from "cypress";
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    e2e: {},

    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
    },
    video: false,
    screenshotOnRunFailure: false,
    env: {
        PORT: process.env.PORT,
        REACT_APP_URL_BACK: process.env.REACT_APP_URL_BACK
    },
});
