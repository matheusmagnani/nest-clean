import { Body, UsePipes } from "@nestjs/common";
import { ConflictException } from "@nestjs/common";
import { Controller, HttpCode, Post } from "@nestjs/common";
import { hash } from "bcrypt";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod"

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string()
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema){
    const {name, email, password} = body

    if(!name || !email || !password){
      throw new ConflictException('name, email e password necessario')
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (userWithSameEmail){
      throw new ConflictException('user with same email adress already exists')
    }

    const hashedpassword = await hash(password, 8)
  
    await this.prisma.user.create({
      data: {
      name,
      email,
      password: hashedpassword
    }
    })
  
  }
}