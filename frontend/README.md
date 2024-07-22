# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

//PROJECT FLOW
Initially User can access , signup and login page where registered user only can login ,without signup ,login functionality not allowed it will throw error that user not found .
Initially User can access home page where home page is having button which is allowing user to redirect to expenses if already logged in if not then redirect to login 
after login user can access expenses which is having three different navigating links where 
first for adding expenses which will be stored to expense collection.
second for viewing ,updating and deleting the existing expense details
third for summary view where user can see daily , weekly and monthly spendings along with the categories where hi spent.