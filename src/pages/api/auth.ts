import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { getConnection } from './db';
import { RowDataPacket } from 'mysql2';


export default function configurePassport(passport: PassportStatic) {
  passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          const connection = await getConnection();
          const [rows] = (await connection.query(`SELECT * FROM users WHERE email = ?`, [email])) as RowDataPacket[][];
    
          if (rows.length === 0) {
            return done(null, false, { message: 'No user with that email' });
          }
    
          const user = rows[0];
    
          const isValidPassword = await bcrypt.compare(password, user.password);
    
          if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password' });
          }
          
          return done(null, user);
        } catch (error) {
          done(error);
        }
      })
    );
        

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const connection = await getConnection();
      const [rows] = (await connection.query(`SELECT * FROM users WHERE id = ?`, [id])) as RowDataPacket[][];

      if (rows.length === 0) {
        return done(null, false);
      }

      const user = rows[0];
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
