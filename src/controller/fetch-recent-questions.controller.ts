import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const pageQueryParamSchema = z.object({
  page: z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
})


const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
  
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(AuthGuard('jwt'))
export class FetchRecentQuestionController {
  constructor( private prisma : PrismaService) {}

  @Get()
  async handle(@Query(queryValidationPipe)query: PageQueryParamSchema){
    const { page } = query
    const question = await this.prisma.question.findMany({
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        created_at: 'desc'
      }
    })

    return { question, page }
  }

}