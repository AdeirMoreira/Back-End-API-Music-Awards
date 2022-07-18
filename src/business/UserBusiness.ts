import { UserDatabase } from "../data/UserData";
import { stringToUserRole, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";


export class UserBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private hashGenerator: HashManager,
      private tokenGenerator: Authenticator,
      private userDatabase: UserDatabase
   ){}

   public async signup(
      name: string,
      email: string,
      password: string,
      role: string
   ) {
      try {
         if (!name || !email || !password || !role) {
            throw new CustomError(422, "Missing input");
         }

         if (email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email");
         }

         if (password.length < 6) {
            throw new CustomError(422, "Invalid password");
         }

         const id = this.idGenerator.generateId();

         const cypherPassword = await this.hashGenerator.hash(password);

         const user = new User(id, name, email, cypherPassword, stringToUserRole(role))
         
         await this.userDatabase.createUser(user);

         const token = this.tokenGenerator.generate({
            id,
            role: user.getRole()
         });
         return { token };
      } catch (error: any) {
         throw new CustomError(error.statusCode, error.message)
      }

   }

   public async login(email: string, password: string) {

      try {
         if (!email || !password) {
            throw new CustomError(422, "Missing input");
         }

         const user = await this.userDatabase.getUserByEmail(email);

         if (!user) {
            throw new CustomError(401, "Invalid credentials");
         }

         
         const isPasswordCorrect = await this.hashGenerator.compare(
            password,
            user.getPassword()
         );

         if (!isPasswordCorrect) {
            throw new CustomError(401, "Invalid credentials");
         }

         const token = this.tokenGenerator.generate({
            id: user.getId(),
            role: user.getRole(),
         });

         return { token };
      } catch (error: any) {
         throw new CustomError(error.statusCode, error.message)
      }
   }

   public async getUserById(id: string){
      const user = await this.userDatabase.getUserById(id);

      if(!user){
         throw new CustomError(404, "User not found");
      };
      return {
         id: user.getId(),
         name: user.getName(),
         email: user.getEmail(),
         role: user.getRole(),
      };
   };
}

export default new UserBusiness( 
   new IdGenerator(),
   new HashManager(),
   new Authenticator(),
   new UserDatabase()
);  