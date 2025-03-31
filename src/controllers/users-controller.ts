import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { hash } from "bcrypt";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "Nome é obrigatorio" }),
      email: z.string().trim().email({ message: "E-mail inválido" }),
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 dígitos" }),
      role: z
        .enum([UserRole.employe, UserRole.manager])
        .default(UserRole.employe),
    });

    const { name, email, password, role } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail");
    }

    const hashedPassowrd = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassowrd,
        role,
      },
    });

    response.status(201).json();
  }
}

export { UsersController };
