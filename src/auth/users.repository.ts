import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //hash password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    // console.log('salt',salt)
    // console.log('hashedPassword',hashedPassword)

    const user = this.create({
      username,
      password: hashedPassword,
    })
    try {
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') { // 23505 is the code for duplicate entry
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException();
      }
    }

  }

}

