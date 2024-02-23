declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO: "mongodb+srv://Ravi:Ravi@cluster0.acluwv8.mongodb.net/MoneyLover";
        JWT : 12345;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}